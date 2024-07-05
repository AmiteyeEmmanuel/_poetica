import { app } from "./app";
import connectDB from "./utils/database";
import cld from 'cloudinary'

//register dotenv
require('dotenv').config();


// import cloudinary details from .env 
const cld_name = process.env.CLOUDINARY_CLOUD_NAME
const cld_api_key = process.env.CLOUDINARY_API_KEY
const cld_api_secret = process.env.CLOUDINARY_API_SECRET

//cloudinary configuration
cld.v2.config({
    cloud_name: cld_name,
    api_key: cld_api_key,
    api_secret: cld_api_secret,
  });

// port configuration.
const port = process.env.PORT || 10000

// create server 
// listen of the defined port number.
const startServer = async () => {
    try {
        connectDB()
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.log(error);
    }
}


startServer();