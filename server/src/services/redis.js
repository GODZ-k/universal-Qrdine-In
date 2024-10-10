

import {Redis} from "ioredis";



const client = new Redis()

export class Cache {

    constructor(expiredAt = 1000) {
        this.expiredAt = expiredAt; // Default expiration is 600 seconds (can be overridden)
      }
    
    async setCachedData(key,value){
        try {
            await client.set(key,JSON.stringify(value))
        } catch (error) {
            console.error("Error setting expiration:", error);
            return null
        }
    }

    async expireData(key){
        try {
            await client.expire(key,this.expiredAt)
        } catch (error) {
            console.error("Error setting expiration:", error);
            return null
        }
    }
    
    async setAndExpire(key,value,expirationTime=this.expiredAt){
        try {
            await client.set(key,JSON.stringify(value))
            await client.expire(key,expirationTime)
        } catch (error) {
            console.error("Error setting expiration:", error);
            return null
        }
    }
    async getCachedData(key){
        try {
            const cachedData = await client.get(key)
            return cachedData ? JSON.parse(cachedData) : null;
        } catch (error) {
            console.error("Error setting expiration:", error);
            return null
        }
    }
}

client.on('connect', () => {
    console.log('Connected to Redis successfully!');
});

client.on('error', (err) => {
    console.error('Redis connection error:', err);
});

export const cache = new Cache()
