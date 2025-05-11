from django.shortcuts import render
from django.http import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
import json
# Create your views here.
@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'Login successful', 'username': user.username})
        else:
            return JsonResponse({'error': 'Invalid credentials'}, status=400)
    if request.method == 'GET':
        if request.user.is_authenticated:
            return JsonResponse({'message': 'Already logged in', 'username': request.user.username})
        else:
            return JsonResponse({'error': 'Not authenticated'}, status=401)

@login_required
def logout_view(request):
    logout(request)
    return JsonResponse({'message': 'Logged out'})

@login_required
def auth_check(request):
    if request.user.is_authenticated:
        return JsonResponse({'message': 'Authenticated', 'username': request.user.username})
    else:
        return JsonResponse({'error': 'Not authenticated'}, status=401)

