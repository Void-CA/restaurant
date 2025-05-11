from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'tables', views.TableViewSet)
router.register(r'order-items', views.OrderItemViewSet)
router.register(r'orders', views.OrderViewSet)
router.register(r'products', views.ProductViewSet)
router.register(r'bills', views.BillViewSet)

urlpatterns = [
    # Tables URLs
    path("tables/<int:table_id>/orders/", views.get_table_orders, name="get-table-orders"),
    path("tables/<int:table_id>/status/", views.update_table_status, name="update-table-status"),

    # Products URLs
    path("products/search/", views.search_products, name="search-products"),

    # ViewSets URLs
    path('', include(router.urls)),
]
  