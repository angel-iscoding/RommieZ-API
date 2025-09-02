import dotenv from 'dotenv';

dotenv.config();

// Server port
export const PORT = process.env.PORT || 3010;

// API Version
export const VERSION = "V1";

// Database Credentials
export const DB_HOST = process.env.DB_HOST || "localhost";
export const DB_USER = process.env.DB_USER || "root";
export const DB_PASSWORD = process.env.DB_PASSWORD || "32Ge42664dDy-";
export const DB_DATABASE = process.env.DB_DATABASE || "RoomieZ";
export const DB_PORT = process.env.DB_PORT || 33061;

// Google Cloud SQL Configuration
export const DB_INSTANCE_CONNECTION_NAME = process.env.DB_INSTANCE_CONNECTION_NAME || null;

// Función para verificar la configuración de Google Cloud SQL
export const verifyGoogleCloudSQLConfig = () => {
  if (!DB_INSTANCE_CONNECTION_NAME) {
    console.warn('⚠️  DB_INSTANCE_CONNECTION_NAME no está configurado');
    return false;
  }
  
  // Verificar formato del nombre de conexión (proyecto:region:instancia)
  const connectionParts = DB_INSTANCE_CONNECTION_NAME.split(':');
  if (connectionParts.length !== 3) {
    console.error('❌ Formato incorrecto de DB_INSTANCE_CONNECTION_NAME. Debe ser: proyecto:region:instancia');
    return false;
  }
  
  console.log('✅ Configuración de Google Cloud SQL correcta');
  console.log(`   Proyecto: ${connectionParts[0]}`);
  console.log(`   Región: ${connectionParts[1]}`);
  console.log(`   Instancia: ${connectionParts[2]}`);
  return true;
};

// Función para verificar toda la configuración de Google Cloud
export const verifyGoogleCloudConfig = () => {
  console.log('🔍 Verificando configuración de Google Cloud...');
  
  const credentialsOk = verifyGoogleCredentials();
  const sqlConfigOk = verifyGoogleCloudSQLConfig();
  
  if (credentialsOk && sqlConfigOk) {
    console.log('🎉 Configuración de Google Cloud completa y correcta');
    return true;
  } else {
    console.log('❌ Configuración de Google Cloud incompleta');
    return false;
  }
};