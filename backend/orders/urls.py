from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'tables', views.TableViewSet)
router.register(r'order-items', views.OrderItemViewSet)
router.register(r'orders', views.OrderViewSet)
router.register(r'products', views.ProductViewSet)
router.register(r'waiters', views.WaiterViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path("tables/<int:table_id>/status/", views.update_table_status, name="update-table-status"),
]
