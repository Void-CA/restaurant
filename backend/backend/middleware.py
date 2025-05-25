# middleware.py
from django.http import JsonResponse
from django.shortcuts import resolve_url
from django.conf import settings

class CustomLoginRequiredMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        # Si el usuario no está autenticado y fue redirigido a LOGIN_URL, devolver JSON
        if (
            response.status_code == 302
            and response["Location"].startswith(resolve_url(settings.LOGIN_URL))
            and request.headers.get("x-requested-with") == "XMLHttpRequest"
        ):
            return JsonResponse({"error": "Authentication required"}, status=401)
        return response
