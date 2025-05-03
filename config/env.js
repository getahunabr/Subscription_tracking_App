import {config} from "dotenv"
import dotenv from 'dotenv';
// Correct usage of dotenv.config() with path option
dotenv.config({
    path: `.env.${process.env.NODE_ENV || 'development'}.local`
});
export const {PORT,NODE_ENV,DB_URI,JWT_EXPIRES_IN,JWT_SECRET,ARCJET_ENV,ARCJET_KEY,QSTASH_URL,QSTASH_TOKEN,SERVER_URL,EMAIL_PASSWORD}=process.env