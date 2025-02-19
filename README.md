 Estructura del Proyecto

 proyecto-prueba-fullstack
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── main.ts
│   │   ├── app.module.ts
│   ├── config/
│   ├── .env
│   ├── nest-cli.json
│   ├── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── redux/
│   │   ├── routes/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   ├── package.json
│
├── docker-compose.yml
├── README.md


 Instalación y Configuración

Configurar el backend:

    cd backend
    cp .env.example .env  # Configurar variables de entorno
    npm install
    npm run start:dev

Configurar el frontend:

    cd ../frontend
    npm install
    npm run dev


Usar Docker (opcional)

Si prefieres correr todo con Docker, ejecuta:

    docker-compose up --build




 Funcionalidades

    CRUD de tareas
    Filtros por estado y fecha
    Ordenamiento básico
    Sistema de etiquetas
    Diseño responsive con Tailwind CSS
    Feedback visual y manejo de errores
    Pruebas unitarias con mínimo 50% de cobertura