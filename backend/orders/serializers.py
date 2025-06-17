from rest_framework import serializers
from . import models

class BillSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Bill
        fields = '__all__'
class TableSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Table
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.OrderItem
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True)

    class Meta:
        model = models.Order
        fields = '__all__'

    def create(self, validated_data):
        items_data = validated_data.pop('items')
        order = models.Order.objects.create(**validated_data)
        for item in items_data:
            models.OrderItem.objects.create(order=order, **item)
        return order

class ProductSerializer(serializers.ModelSerializer):
    price = serializers.FloatField()
    class Meta:
        model = models.Product
        fields = '__all__'
