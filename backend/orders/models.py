from django.db import models

class Table(models.Model):
    class StatusChoices(models.TextChoices):
        AVAILABLE = 'available', 'Available'
        OCCUPIED = 'occupied', 'Occupied'
        RESERVED = 'reserved', 'Reserved'
        CLEANING = 'cleaning', 'Cleaning'

    table_number = models.IntegerField(unique=True)
    status = models.CharField(max_length=20, choices=StatusChoices.choices, default=StatusChoices.AVAILABLE)

    def __str__(self):
        return f"Table {self.table_number} - {self.status}"


class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name

from django.contrib.auth.models import User

    
class Bill(models.Model):
    class StatusChoices(models.TextChoices):
        OPEN = 'open', 'Open'
        CLOSED = 'closed', 'Closed'

    table = models.ForeignKey(Table, on_delete=models.CASCADE)
    status = models.CharField(max_length=10, choices=StatusChoices.choices, default=StatusChoices.OPEN)
    created_at = models.DateTimeField(auto_now_add=True)
    closed_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f"Bill {self.id} - Table {self.table.table_number} - {self.status}"

class Order(models.Model):
    class StatusChoices(models.TextChoices):
        PENDING = 'pending', 'Pending'
        COMPLETED = 'completed', 'Completed'

    table = models.ForeignKey(Table, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=StatusChoices.choices, default=StatusChoices.PENDING)
    bill = models.ForeignKey('Bill', on_delete=models.CASCADE, related_name='orders')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Order {self.id} - Table {self.table.table_number}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    note = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.quantity} x {self.product.name} for Order {self.order.id}"
