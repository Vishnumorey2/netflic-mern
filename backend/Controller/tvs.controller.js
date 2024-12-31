import { fetchFromTMDB } from "../services/tmdb.services.js";

export async function getTrendingTv(req, res) {
    try{
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc");
       const randommovie = data.results[Math.floor(Math.random() * data.results?.length)];
       res.json({success:true,content:randommovie});
    }catch(error){
        console.log(error);
        res.send(500).json({success:false,message:"Internal server error"});
    }
}

export async function getTvTrailers(req, res) {
    const {id} = req.params;
    try{
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos`);
        res.json({success:true,trailers:data.results});
    }catch(error){

        if(res.message.includes("404")){res.status(404).json({success:false,message:"Movie not found"})};
    res.send(500).json({success:false,message:"Internal server error"});
    }
}

export async function getTvdetails(req, res) {
    const {id} = req.params;
    try{
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
        res.status(200).json({success:true,movie:data});
    }catch(error){
        if(res.message.includes("404")){res.status(404).json({success:false,message:"Movie Details not found"})};
    res.send(500).json({success:false,message:"Internal server error"});
 }
}

export async function getSimilarTv(req,res){
    const {id} = req.params;
    try{
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`);
        res.status(200).json({success:true,similar:data.results});
    }catch(error){
        res.send(500).json({success:false,message:"Internal server error"});
    }

}

export async function getTvsbyCategory(req,res) {
    const {category} = req.params;
    try{
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`);
        res.status(200).json({success:true,movies:data.results});
    }catch(error){
        res.status(500).json({success:false,message:"Internal server error"});
    }
}