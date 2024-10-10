import app from "./src/app.js";
import { port } from "./src/config/appConfig.js";
import { connectMongo } from "./src/config/database.js";

connectMongo().then(()=>{
  app.listen(port,()=>{
        console.log(`server is listning on port ${port}`)
    })
}).catch((error)=>{
    console.log(`Error connecting the database ${error}`)
})  