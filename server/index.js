import app from "./src/app.js";
import { port } from "./src/config/appConfig.js";
import { connectMongo } from "./src/config/database.js";
import os from 'os'
import cluster from "cluster";

const cpu = os.cpus() 

if(cluster.isMaster){
    console.log(`Master process is running with PID: ${process.pid}`);

    for(let i=0; i<=cpu.length; i++){
        cluster.fork()
    }

    cluster.on('exit',(worker,code,signal)=>{
        cluster.fork()
    })

    process.on('SIGTERM', () => {
        for (const id in cluster.workers) {
            cluster.workers[id].kill();
        }
        setTimeout(() => {
            process.exit(0);
        }, 5000); 
    });
}else{
    
    connectMongo().then(()=>{
      app.listen(port,()=>{
            console.log(`server is listning on port ${port}`)
        })
        process.on('SIGTERM', () => {
            server.close(() => {
                process.exit();
            });
        });

         // Allow worker to listen for shutdown message from master
         process.on('message', (msg) => {
            if (msg === 'shutdown') {
                server.close(() => process.exit());
            }
        });
        
    }).catch((error)=>{
        console.log(`Error connecting the database ${error}`)
    })  
}
