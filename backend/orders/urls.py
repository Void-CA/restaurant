from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'tables', views.TableViewSet)
router.register(r'order-items', views.OrderItemViewSet)
router.register(r'orders', views.OrderViewSet)
router.register(r'products', views.ProductViewSet)
router.register(r'waiters', views.WaiterViewSet)
router.register(r'bills', views.BillViewSet)

urlpatterns = [
    # Authentication URLs
    path('api/login/', views.login_view),
    path('api/logout/', views.logout_view),

    # Tables URLs
    path("tables/<int:table_id>/orders/", views.get_table_orders, name="get-table-orders"),
    path("tables/<int:table_id>/status/", views.update_table_status, name="update-table-status"),
    
    # Waiters URLs
    path("waiters/by-phone/<str:phone_number>", views.get_waiter_by_phone, name="get-waiter-by-phone"),

    # Products URLs
    path("products/search/", views.search_products, name="search-products"),

    # ViewSets URLs
    path('', include(router.urls)),
]
  