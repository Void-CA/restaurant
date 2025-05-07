from rest_framework import viewsets
from .models import Table, OrderItem, Order, Product, Waiter
from . import serializers
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

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