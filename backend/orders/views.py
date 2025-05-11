from rest_framework import viewsets
from . import models
from . import serializers
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator


@login_required
@api_view(['PATCH'])
def update_table_status(request, table_id):
    try:
        table = models.models.Table.objects.get(id=table_id)
    except models.models.Table.DoesNotExist:
        return Response({"error": "Mesa no encontrada"}, status=status.HTTP_404_NOT_FOUND)

    new_status = request.data.get("status")

    if new_status not in dict(models.models.Table.StatusChoices.choices):
        return Response({"error": "Estado inválido"}, status=status.HTTP_400_BAD_REQUEST)

    models.table.status = new_status
    models.table.save()
    return Response({"message": f"Estado actualizado a {new_status}"}, status=status.HTTP_200_OK)

class ProductPagination(PageNumberPagination):
    page_size = 10  # Número de productos por página

@login_required
@api_view(['GET'])
def search_products(request):
    query = request.query_params.get('query', None)
    if query:
        products = models.Product.objects.filter(name__icontains=query)
    else:
        products = models.Product.objects.all()

    paginator = ProductPagination()
    result_page = paginator.paginate_queryset(products, request)
    serializer = serializers.ProductSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)

@login_required
@api_view(['GET'])
def get_table_orders(request, table_id):
    try:
        table = models.Table.objects.get(id=table_id)
    except models.Table.DoesNotExist:
        return Response({"error": "Mesa no encontrada"}, status=status.HTTP_404_NOT_FOUND)

    orders = models.Order.objects.filter(table=table)
    serializer = serializers.OrderSerializer(orders, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@method_decorator(login_required, name='dispatch')
class BillViewSet(viewsets.ModelViewSet):
    queryset = models.Bill.objects.all()
    serializer_class = serializers.BillSerializer

@method_decorator(login_required, name='dispatch')
class TableViewSet(viewsets.ModelViewSet):
    queryset = models.Table.objects.all()
    serializer_class = serializers.TableSerializer

@method_decorator(login_required, name='dispatch')
class OrderItemViewSet(viewsets.ModelViewSet):
    queryset = models.OrderItem.objects.all()
    serializer_class = serializers.OrderItemSerializer

@method_decorator(login_required, name='dispatch')
class OrderViewSet(viewsets.ModelViewSet):
    queryset = models.Order.objects.all()
    serializer_class = serializers.OrderSerializer

@method_decorator(login_required, name='dispatch')
class ProductViewSet(viewsets.ModelViewSet):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductSerializer
