from django.urls import path 
from .views import RegisterAccount,LoginAccount,LogoutAccount,RefreshTokenView,GetUserProfile

urlpatterns = [
    # Authentication
    path('register/',RegisterAccount.as_view(),name="register_account"),
    path('login/',LoginAccount.as_view(),name="login_account"),
    path('logout/',LogoutAccount.as_view(),name="logout_account"),

    # After authentication
    path('get-user-profile/',GetUserProfile.as_view(),name="get_user_profile"),
  
    # Refresh token view
    path('token/refresh/',RefreshTokenView.as_view(),name="token_refresh_cookie"),
]