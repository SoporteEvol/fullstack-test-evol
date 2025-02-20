# Usa la imagen de Node.js con Alpine para un entorno ligero
FROM node:20-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el package.json y package-lock.json (para instalar solo dependencias necesarias)
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto en el que corre Vite por defecto
EXPOSE 5173

# Comando para iniciar la aplicación
CMD ["npm", "run", "dev", "--", "--host"]
