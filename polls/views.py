import os
import random
import string

from django.http import HttpResponse, JsonResponse

from .models import Schedule
from .models import Ticket
from .models import Users


def generate_random_token(length):
    token = ''.join(random.choices(string.ascii_letters + string.digits, k=length))
    return token


def login(request):
    username = request.GET.get('username')
    password = request.GET.get('pass')
    if not username or not password:
        return JsonResponse({
            "message": "Login or password is empty",
        }, status=400)
    if not Users.objects.filter(login=username, password=password).exists():
        return JsonResponse({
            "message": "Wrong username or password",
        }, status=404)
    user = Users.objects.get(login=username, password=password)
    user.token = generate_random_token(50)
    user.save()
    return JsonResponse({
        "message": "success",
        "token": user.token
    })


def register(request):
    username = request.GET.get('username')
    password = request.GET.get('pass')
    if not username or not password:
        return JsonResponse({
            "message": "Login or password is empty",
        }, status=400)
    if Users.objects.filter(login=username).exists():
        return JsonResponse({
            "message": "User already exists",
        }, status=400)
    user = Users(login=username, password=password, token=generate_random_token(50))
    user.save()
    return JsonResponse({
        "message": "success",
        "token": user.token
    })


def schedule(request):
    days = Schedule.objects.all()
    ans = []
    for i in days:
        ans.append({
            "id": i.id,
            "movie_id": i.movie_id.id,
            "date": i.date,
            "time": i.time,
            "price": i.price,
            "hall": i.hall,
            "title": i.movie_id.title,
            "year": i.movie_id.year,
            "img": f"https://fdsafasdf.pythonanywhere.com/img/?film_id={i.movie_id.id}",
            "imdb_rating": i.movie_id.imdb_rating,
            "seats": eval("[" + i.seats + "]")
        })
    return JsonResponse({
        "message": "success",
        "schedule": ans
    })




def send_img(request):
    id = request.GET.get('film_id')
    if not os.path.exists(f"polls/img/{id}.jpg"):
        return JsonResponse({
            "message": "not found",
        }, status=404)
    with open(f"polls/img/{id}.jpg", "rb") as f:
        return HttpResponse(f.read(), content_type='image/jpeg')


def buy(request):
    schedule_id = request.GET.get('schedule_id')
    token = request.GET.get('token')
    username = request.GET.get('username')
    seat = int(request.GET.get('seat'))
    if not token or not username or not schedule_id:
        return JsonResponse({
            "message": "missing params",
            "params": [token, username, schedule_id, seat]
        }, status=404)
    if not Users.objects.filter(login=username, token=token).exists():
        return JsonResponse({
            "message": "User not found",
        }, status=404)
    user = Users.objects.get(login=username, token=token)
    if token != user.token:
        return JsonResponse({
            "message": "user not found",
        }, status=404)
    schedule = Schedule.objects.get(id=schedule_id)
    avi_seats = eval("[" + schedule.seats + "]")
    if seat not in avi_seats:
        return JsonResponse({
            "message": "Seat not found",
        }, status=404)
    avi_seats.remove(seat)
    schedule.seats = str(avi_seats)[1:-1]
    schedule.save()
    Ticket.objects.create(
        user=user.id,
        schedule=schedule.id,
        seat=seat,
        price=schedule.price,
        date=schedule.date,
        time=schedule.time,
        hall=schedule.hall,
        title=schedule.movie_id.title,
    )

    return JsonResponse({
        "message": "success",
    })

def get_Tickets(request):
    username = request.GET.get('username')
    token = request.GET.get('token')
    if not token or not username:
        return JsonResponse({
            "message": "missing params",
            "params": [token, username]
        }, status=404)
    if not Users.objects.filter(login=username, token=token).exists():
        return JsonResponse({
            "message": "User not found",
        }, status=404)
    user = Users.objects.get(login=username, token=token)
    if token != user.token:
        return JsonResponse({
            "message": "user not found",
        }, status=404)
    tickets = Ticket.objects.filter(user=user.id)
    ans = []
    for i in tickets:
        ans.append({
            "id": i.id,
            "schedule_id": i.schedule,
            "seat": i.seat,
            "price": i.price,
            "date": i.date,
            "time": i.time,
            "hall": i.hall,
            "title": i.title,
        })
        #fdsf

    return JsonResponse({
        "tickets": ans
    })
