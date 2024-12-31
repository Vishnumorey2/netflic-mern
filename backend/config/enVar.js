import dotenv from "dotenv";

dotenv.config();
const netflix = "netflix";
export const ENV_VAR={
    JWT_SECRET:netflix,
    NODE_ENV:process.env.NODE_ENV
}