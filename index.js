import server from "./src/server.js";

const appInit = () => {
    server.listen(3000, () => {
        console.log("Server running");
    });
}

appInit();


