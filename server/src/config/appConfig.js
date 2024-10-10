import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Export the credentials
const MongoConnectionString = process.env.MongodbUrl;
const DatabaseName = process.env.DatabaseName; // Make sure this name is correct
const corsOrigin = process.env.CORS_ORIGIN;
const port = process.env.PORT;
const redis_url = process.env.REDIS_URL;

export {
    MongoConnectionString,
    DatabaseName,
    corsOrigin,
    port,
    redis_url
};
