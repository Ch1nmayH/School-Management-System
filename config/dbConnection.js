import mongoose from "mongoose";

const dbConnection =  async ()=>{

    try {
        const con = await mongoose.connect(process.env.MONGODB_URI, {});
        console.log(`MongoDB connected: ${con.connection.host}`)
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit(1);
    }
}


export default dbConnection;  