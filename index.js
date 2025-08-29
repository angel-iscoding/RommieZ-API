import server from "./src/server.js";
import { PORT, VERSION } from "./src/config/dotenv.js";


const appInit = async () => {
    try {
        server.listen(PORT, () => {
            console.log(`Server listering on Endpoint: localhost:${PORT}/api/${VERSION}`);
        });
    } catch (err) {
        console.error('Error initializing application:', err.message);
    }
    
    
}

appInit();


