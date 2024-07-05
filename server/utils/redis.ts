import { Redis } from "ioredis";
require('dotenv').config();

const redisURL = process.env.REDIS_URL || ''


const radisClient = () => {
    if(redisURL) {
        console.log('redis successfully connected!')
        return redisURL;
    } else {
        console.log('Connection failed!, please configure your redis url.')
    }
}

export const redis = new Redis(radisClient());