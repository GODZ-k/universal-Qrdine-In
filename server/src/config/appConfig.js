import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Export the credentials
const MongoConnectionString = process.env.MongodbUrl;
const DatabaseName = process.env.DatabaseName; // Make sure this name is correct
const corsOrigin = process.env.CORS_ORIGIN;
const port = process.env.PORT;
const redis_port = process.env.REDIS_PORT;
const redis_host = process.env.REDIS_HOST;
const redis_password = process.env.REDIS_PASSWORD;
const redis_cache_expiry = process.env.REDIS_CACHE_EXPIRY;

export {
    MongoConnectionString,
    DatabaseName,
    corsOrigin,
    port,
    redis_port,
    redis_host,
    redis_password,
    redis_cache_expiry
};
