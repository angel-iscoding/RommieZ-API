# Usa una imagen base de Node.js
FROM node:18-slim

# Establece el directorio de trabajo en /app
WORKDIR /app

# Copia los archivos de configuración de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto que tu aplicación usará
EXPOSE 8080

# Comando para ejecutar la aplicación
CMD ["npm", "start"]