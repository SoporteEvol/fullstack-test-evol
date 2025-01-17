# Todo App

## Descripción
Este proyecto es una aplicación de lista de tareas (Todo App) que permite a los usuarios agregar, editar y eliminar tareas. La aplicación está dividida en varios servicios que se ejecutan en contenedores Docker.

## Estructura del Proyecto
El proyecto está compuesto por los siguientes servicios:

1. **Frontend**: Una aplicación React que proporciona la interfaz de usuario.
2. **Backend**: Una API RESTful construida con NestJS que maneja la lógica de negocio.
3. **Base de Datos**: Un contenedor de Postgres que almacena las tareas.

### 1. Estructura del Repositorio - Frontend

frontend/
├── src/
│   ├── App.tsx
│   ├── index.tsx
│   ├── features/
│   │   ├── tasks
│   │   │   ├── tasksList.tsx
│   │   │   ├── tasksForm.tsx
│   │   │   └── slices
│   │   │       └── tasksSlice.ts
│   ├── pages/
│   │   ├── home.tsx
│   │   └── notFound.tsx
│   ├── services/
│   │   └── api.ts
│   ├── store/
│   │   ├── index.ts
│   │   └── tasksSlice.ts
│   ├── styles/
│   │   └── main.css


### 2. Estructura del Repositorio - Backend
backend/
├── src/
│   ├── app.module.ts
│   ├── main.ts
│   ├── controllers/
│   │   ├── tasks.controller.ts
│   │   └── tasks.controller.spec.ts
│   ├── services/
│   │   ├── tasks.service.ts
│   │   └── tasks.service.spec.ts
│   ├── models/
│   │   └── task.model.ts
│   ├── repositories/
│   │   ├── tasks.repository.ts
│   │   └── tasks.repository.spec.ts
│   ├── config/
│   │   └── database.config.ts
│   └── utils/
│       └── axiosClient.ts

## Scripts
Cada servicio tiene sus propios scripts para facilitar el desarrollo y la ejecución.

*Nota: Tener en consideración instalar la versión 8 de pnpm
- `npm install -g pnpm:8.15.7`: instala pnpm para la ejecución de los scripts

### Frontend
- `pnpm start`: Inicia la aplicación React en modo de desarrollo.
- `pnpm build`: Construye la aplicación para producción en la carpeta `dist`.

### Backend
- `pnpm start`: Inicia el servidor Nestjs.
- `pnpm run dev`: Inicia el servidor en modo de desarrollo.
- `pnpm build`: Construye la aplicación para producción en la carpeta `dist`.

### Base de Datos
- No requiere scripts adicionales, se maneja a través de Docker.

## Docker Compose
El proyecto utiliza Docker Compose para orquestar los contenedores. El archivo `docker-compose.yml` incluye la configuración para cada servicio.

### Ejecución de Docker Compose
Para iniciar todos los servicios, ejecuta el siguiente comando en la raíz del proyecto:

```sh
docker-compose up --build
```

Para detener y eliminar los contenedores, ejecuta:

```sh
docker-compose down
```

## Componentes de Cada Proyecto
### Frontend
- **React**: Biblioteca de JavaScript para construir interfaces de usuario.
- **Axios**: Cliente HTTP para realizar solicitudes a la API.

### Backend
- **NestJS**: Framework para construir aplicaciones escalables y eficientes del lado del servidor.
- **Sequelize**: ORM para manejar la base de datos.

### Base de Datos
- **Postgres**: Base de datos SQL para almacenar las tareas.


## Licencia
Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.