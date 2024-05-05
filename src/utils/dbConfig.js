import mongoose from "mongoose";

let isConnected = false;

const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log("DB is already connected");
        return;
    }

    try {
        await mongoose.connect("mongodb+srv://jyotirmoybaidya:jyoti123@cluster0.t3gwkk5.mongodb.net/", {
            dbName: "otpLogin",
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        const connection = mongoose.connection;

        connection.on('connected', () => {
            isConnected = true;
            console.log("MongoDb Connected");
        })

        connection.on('error', (err) => {
            console.log("MongoDB connection error. Please make sure MongoDB is running");
            process.exit();
        })


    } catch (error) {
        console.log(`Error connecting to DB : ${error}`);
    }
}

export default connectToDB;