import server from "./src/server.js";
import { PORT, VERSION, DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT } from "./src/config/dotenv.js";


const appInit = async () => {
    try {
        server.listen(PORT,'0.0.0.0', () => {
            console.log(`Dotenv chargered:
                PORT: ${PORT}
                VERSION: ${VERSION}
                
                Database envs:

                DB_HOST: ${DB_HOST}
                DB_USER: ${DB_USER}
                DB_PASSWORD: ${DB_PASSWORD}
                DB_DATABASE: ${DB_DATABASE}
                DB_PORT: ${DB_PORT}
                `);

            console.log(`Server listening on Endpoint: http://0.0.0.0:${PORT}/api/${VERSION}`);
        });
    } catch (err) {
        console.error('Error initializing application:', err.message);
    }
}

appInit();


