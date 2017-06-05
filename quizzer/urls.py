from django.conf.urls import url
from . import views

app_name = 'quizzer'

urlpatterns = [
    url(r'^$', views.QuizzerView.as_view(), name='quiz_home'),
]