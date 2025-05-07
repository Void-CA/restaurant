# Entrar a la carpeta frontend y ejecutar el servidor de desarrollo de npm
cd frontend
npm run dev &
cd .. # Volver al directorio raíz

# Entrar a la carpeta backend y ejecutar el servidor de Django
cd backend
python manage.py runserver &
cd .. # Volver al directorio raíz

# Esperar a que ambos procesos terminen (opcional)
wait