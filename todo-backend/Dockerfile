# Usar imagen de Node.js
FROM node:22

# Definir directorio de trabajo
WORKDIR /app

# Copiar archivos del proyecto
COPY package.json package-lock.json ./
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto de NestJS
EXPOSE 3000

# Comando para correr la app
CMD ["npm", "run", "start"]
