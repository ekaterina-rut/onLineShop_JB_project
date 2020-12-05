import { connect, model } from 'mongoose';
import { Musician } from './collections/musician';
import { Data } from './collections/data'

const MONGODB_URL = "mongodb+srv://katya:katya123@cluster0.bfp2s.mongodb.net/inventory?retryWrites=true&w=majority";
const DB_NAME = 'katya';


export const collections = {
    Musician,
    Data
    // Products,
    // Clients
}


// run this when the server is starting
export async function connectDb() {
    await connect(MONGODB_URL, {
        useUnifiedTopology: true ,
        dbName: DB_NAME,
        useNewUrlParser: true
    });
}