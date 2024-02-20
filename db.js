import mongoose from "mongoose"

export function databaseConnection(){

    mongoose.set('strictQuery', false);

    const params={
        useNewUrlParser:true,useUnifiedTopology:true,
    }
    try {
        mongoose.connect(process.env.MongoDBUrl,params);
        console.log(" Your Application MongoDb Database Connection Successful");
    } catch (error) {
        console.log("Error in DB Connection");
        
    }

}