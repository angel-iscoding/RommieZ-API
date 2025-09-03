import server from "./src/server.js";
import { PORT, VERSION, DB_USER, DB_PASSWORD, DB_DATABASE, socketPath } from "./src/config/dotenv.js";


const appInit = async () => {
    try {
        server.listen(PORT,'0.0.0.0', () => {
            console.log(`Environment loaded:
                PORT: ${PORT}
                VERSION: ${VERSION}
                
                Database environment variables:

                DB_USER: ${DB_USER}
                DB_PASSWORD: ${DB_PASSWORD}
                DB_DATABASE: ${DB_DATABASE}

                Google Cloud SQL Configuration:

                SocketPath: ${socketPath}
                `);

            console.log(`Server listening on endpoint: /api/${VERSION}`);
        });
    } catch (err) {
        console.error('Error initializing application:', err.message);
    }
}

appInit();


