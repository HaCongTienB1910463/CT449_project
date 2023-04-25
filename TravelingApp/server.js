const app = require("./app");
const config = require("./app/config");
const mongoDB = require("./app/utils/mongodb.util");

async function starServer(){
    try{
        await mongoDB.connnet(config.db.uri);
        console.log("Connected to the database");

        const PORT = config.app.port;
        app.listen(PORT,()=>{
            console.log(`Server is running on port ${PORT}`);
        });
    } catch(e){
        console.log("Can't connect to the database",error);
        process.exit();
    }
}

starServer();