from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    role = models.CharField(
        max_length=20,
        choices=[("waiter", "Mesero"), ("admin", "Administrador"), ("chef", "Chef")]
    )
    phone = models.CharField(max_length=20, blank=True, null=True)
    access_code = models.CharField(
        max_length=10,
        unique=True,
        blank=True,
        null=True,
        help_text="Código de acceso rápido, como un PIN o código corto"
    )

    def __str__(self):
        return self.username
