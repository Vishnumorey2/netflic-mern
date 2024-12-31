import express from "express";
import authRoutes from "./route/auth.route.js";
import moviesRoutes from "./route/movies.route.js";
import tvRoutes from "./route/tv.route.js";
import searchRoutes from "./route/search.route.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import protectRoute from "./middleware/protectRoute.js";
import cors from "cors";
import path from "path";
import { ENV_VAR } from "./Config/enVar.js";


const app = express();
app.use(cors({
  origin: 'http://localhost:5173', // Allow your frontend origin.
  credentials: true, // Allow cookies/credentials.
}));
app.use(express.json());
app.use(cookieParser());

const __dirname = path.resolve();
dotenv.config();


const MONGO_URI = "mongodb+srv://moreyvishnu192004:Kqj8Cj6I5919rPWa@cluster0.hc4vj.mongodb.net/netflix_db?retryWrites=true&w=majority&appName=Cluster0"
try{
    const conn =  mongoose.connect(MONGO_URI);
    console.log("Database connected");
}catch(error){
    console.log(error);
}



app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movies",protectRoute,moviesRoutes);
app.use("/api/v1/tv",protectRoute,tvRoutes);
app.use("/api/v1/search",protectRoute,searchRoutes);

console.log(ENV_VAR.NODE_ENV);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"./frontend/dist")));

    app.get("*",(req,res) => {
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
    })
}

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});

//Kqj8Cj6I5919rPWa

