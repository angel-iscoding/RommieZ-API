import server from "./src/server.js";
import { PORT, VERSION, DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT } from "./src/config/dotenv.js";


const appInit = async () => {
    try {
        server.listen(PORT,'0.0.0.0', () => {
            console.log(`Environment loaded:
                PORT: ${PORT}
                VERSION: ${VERSION}
                
                Database environment variables:

                DB_HOST: ${DB_HOST}
                DB_USER: ${DB_USER}
                DB_PASSWORD: ${DB_PASSWORD}
                DB_DATABASE: ${DB_DATABASE}
                DB_PORT: ${DB_PORT}

                Google Cloud SQL Configuration:

                NODE_ENV: ${NODE_ENV}
                DB_INSTANCE_CONNECTION_NAME: ${DB_INSTANCE_CONNECTION_NAME}
                GOOGLE_APPLICATION_CREDENTIALS: ${GOOGLE_APPLICATION_CREDENTIALS}
                `);

            console.log(`Server listening on endpoint: http://0.0.0.0:${PORT}/api/${VERSION}`);
        });
    } catch (err) {
        console.error('Error initializing application:', err.message);
    }
}

appInit();


