import mongoose from "mongoose";
import config from "./config";
import app from "./app";

const PORT = process.env.port || 5000;

async function main() {
    try {
        await mongoose.connect(config.db_url!);

        // console.log("Database Connected!");
    } catch (error) {

    }
}

main();

app.listen(PORT, () => {
    // console.log("App is listening on port", PORT);
})