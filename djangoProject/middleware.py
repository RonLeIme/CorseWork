from django.http import JsonResponse


class ErrorHandlerMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        try:
            response = self.get_response(request)
        except Exception as e:
            response = self.handle_exception(request, e)
        return response

    def handle_exception(self, request, exception):
        # Handle the exception and return an appropriate response
        error_message = str(exception)
        return JsonResponse({"error": error_message}, status=500)
