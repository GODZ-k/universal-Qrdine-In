import mongoose from 'mongoose'
import { DatabaseName, MongoConnectionString } from './appConfig.js'

// mongooose database connection ----


const connectMongo = async ()=>{
    await mongoose.connect(`${MongoConnectionString}/${DatabaseName}`).then((res)=>{
        console.log(`database has been connected on host ${res.connection.host}`)
    }).catch((error)=>{
        console.log(`Error connecting the database ${error}`)
    })
}




// postgresql database connection -----


export {
    connectMongo
}
