from django.urls import path 
from .views import RegisterAccount

urlpatterns = [
    path('register/',RegisterAccount.as_view(),name="register_account"),
    path('login/',LoginAccount.as_view(),name="login_account"),
    path('logout/',LogoutAccount.as_view(),name="logout_account"),
]