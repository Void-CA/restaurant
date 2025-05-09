from rest_framework import viewsets
from .models import Table, OrderItem, Order, Product, Waiter, Bill
from . import serializers
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

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

@csrf_exempt
def logout_view(request):
    logout(request)
    return JsonResponse({'message': 'Logged out'})


@api_view(['PATCH'])
def update_table_status(request, table_id):
    try:
        table = Table.objects.get(id=table_id)
    except Table.DoesNotExist:
        return Response({"error": "Mesa no encontrada"}, status=status.HTTP_404_NOT_FOUND)

    new_status = request.data.get("status")

    if new_status not in dict(Table.StatusChoices.choices):
        return Response({"error": "Estado inválido"}, status=status.HTTP_400_BAD_REQUEST)

    table.status = new_status
    table.save()
    return Response({"message": f"Estado actualizado a {new_status}"}, status=status.HTTP_200_OK)

class ProductPagination(PageNumberPagination):
    page_size = 10  # Número de productos por página

@api_view(['GET'])
def search_products(request):
    query = request.query_params.get('query', None)
    if query:
        products = Product.objects.filter(name__icontains=query)
    else:
        products = Product.objects.all()

    paginator = ProductPagination()
    result_page = paginator.paginate_queryset(products, request)
    serializer = serializers.ProductSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)

@api_view(['GET'])
def get_table_orders(request, table_id):
    try:
        table = Table.objects.get(id=table_id)
    except Table.DoesNotExist:
        return Response({"error": "Mesa no encontrada"}, status=status.HTTP_404_NOT_FOUND)

    orders = Order.objects.filter(table=table)
    serializer = serializers.OrderSerializer(orders, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_waiter_by_phone(request, phone_number):
    try:
        waiter = Waiter.objects.get(phone_number=phone_number)
    except Waiter.DoesNotExist:
        return Response({"error": "Camarero no encontrado"}, status=status.HTTP_404_NOT_FOUND)

    serializer = serializers.WaiterSerializer(waiter)
    return Response(serializer.data, status=status.HTTP_200_OK)


class BillViewSet(viewsets.ModelViewSet):
    queryset = Bill.objects.all()
    serializer_class = serializers.BillSerializer
    
class TableViewSet(viewsets.ModelViewSet):
    queryset = Table.objects.all()
    serializer_class = serializers.TableSerializer

class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = OrderItem.objects.all()
    serializer_class = serializers.OrderItemSerializer

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = serializers.OrderSerializer

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = serializers.ProductSerializer

class WaiterViewSet(viewsets.ModelViewSet):
    queryset = Waiter.objects.all()
    serializer_class = serializers.WaiterSerializer