import mongoose from "mongoose";

let cached = global.mongoose || {
    conn: null,
    promise: null
}

export default async function connectDB() {
    if (cached.conn) cached.conn

    if (!cached.promise) {
        cached.promise = mongoose.connect(process.env.MONGODB)
            .then(mongoose => mongoose)
    }
    try {
        cached.conn = await cached.promise;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error)
    }

    return cached.conn
}