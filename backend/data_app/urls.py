from django.urls import path
from . import views

app_name = "data_app"
    
urlpatterns = [
    path("upload/", views.file_handler, name="file_handler"),  # type: ignore
]
