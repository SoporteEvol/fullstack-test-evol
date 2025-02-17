# Proyecto Fullstack con NestJS, React y Docker

Este es un proyecto fullstack que utiliza **NestJS** para el backend, **React** con **Vite** para el frontend, y **PostgreSQL** como base de datos. Todo el proyecto está configurado para ejecutarse en contenedores Docker.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas:

### 1. Docker

**Docker** se utiliza para contenerizar tanto el backend como el frontend, así como la base de datos PostgreSQL.

- [Instalar Docker](https://docs.docker.com/get-docker/)

Verifica la instalación de Docker ejecutando el siguiente comando:

```bash
docker --version
```

### 2. Nodejs

**Node.js** es necesario para ejecutar el backend de NestJS y el frontend de React con Vite.

- [Instalar Nodejs](https://nodejs.org/es)

Verifica la instalación de Docker ejecutando el siguiente comando:

```bash
node --version
```

### 3. Instalar sequelize cli
```bash
npm install -g sequelize-cli
```



### 3. Configuración del proyecto

```bash
git clone <URL_DEL_REPOSITORIO>
cd <nombre_del_repositorio>

```
___

### 4. Instalar dependencias en backend

```bash
cd backend
npm install
```


### 5. Instalar dependencias en Frontend




## FrontEnd .env
**En la carpeta FRONTEND - Crea el archivo .env**
```bash
VITE_API_URL=http://localhost:3000/api/v1
VITE_APP_NAME=TodoApp
```


___

### 6. Levantar contenedores Docker
En la raiz del proyecto, donde esta el archivo docker-compose.yml

Para iniciar todos los servicios (backend, frontend, base de datos, migraciones y seeder), ejecuta el siguiente comando:

```bash
docker-compose up --build
```

___



### verificar que todo este corriendo

**Front-end**
- [http://localhost:5173/](http://localhost:5173/)

**Backend / swagger**
- [http://localhost:3000/api](http://localhost:3000/api)



# comandos útiles

Detener los contenedores:
```bash
docker-compose down
```

Ver los logs de un contenedor específico:
```bash
docker logs <nombre_del_contenedor>
```



**NOTAS**
Si encuentras algún problema con las dependencias de NPM, puedes intentar usar el flag --legacy-peer-deps para forzar la instalación:

```bash
npm install --legacy-peer-deps
```

Asegúrate de que las variables de entorno en los archivos .env estén configuradas correctamente antes de levantar los servicios.


**Licencia**
Este proyecto es de uso personal y no tiene licencia específica.


