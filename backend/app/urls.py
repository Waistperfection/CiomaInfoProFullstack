from django.urls import path, include

urlpatterns = [
    path("api/", include("data_app.urls", namespace="data_app")),
]
