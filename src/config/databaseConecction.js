import mysql2 from 'mysql2/promise';
import { Connector } from '@google-cloud/cloud-sql-connector';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER, DB_INSTANCE_CONNECTION_NAME } from './dotenv.js';

let pool;

// Función para crear la conexión con Google Cloud SQL
const createCloudSQLConnection = async () => {
    const connector = new Connector();
    
    // Obtener la conexión TCP al Cloud SQL
    const clientOpts = {
        instanceConnectionName: DB_INSTANCE_CONNECTION_NAME,
        ipType: 'PUBLIC', // o 'PRIVATE' si usas VPC
    };
    
    const { ip, port } = await connector.getConnector(clientOpts);
    
    // Crear el pool de conexiones
    pool = mysql2.createPool({
        host: ip,
        port: port,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_DATABASE,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        ssl: {
            rejectUnauthorized: false
        }
    });
    
    return pool;
};

// Función para crear conexión local (desarrollo)
const createLocalConnection = () => {
    return mysql2.createPool({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_DATABASE,
        port: DB_PORT,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });
};

// Inicializar la conexión según el entorno
const initializeConnection = async () => {
    if (process.env.NODE_ENV === 'production' || DB_INSTANCE_CONNECTION_NAME) {
        // Usar Google Cloud SQL en producción
        pool = await createCloudSQLConnection();
        console.log('✅ Conectado a Google Cloud SQL');
    } else {
        // Usar conexión local en desarrollo
        pool = createLocalConnection();
        console.log('✅ Conectado a base de datos local');
    }
};

// Inicializar la conexión
initializeConnection().catch(console.error);

export default pool;