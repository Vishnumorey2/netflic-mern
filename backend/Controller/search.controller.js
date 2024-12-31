import { User } from "../models/user.models.js";
import { fetchFromTMDB } from "../services/tmdb.services.js";

export async function searchPerson(req, res) {
    const {query} = req.params;
   
    try{
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`);
        if(response.results.length === 0){
            res.status(404).json({success:false,message:"Person not found"});
        }

        await User.findByIdAndUpdate(req.user._id,{
            $push:{
                searchHistory:{
                    id:response.results[0].id,
                    image:response.results[0].profile_path,
                    title:response.results[0].name,
                    searchtype:"person",
                    createdAt: new Date(),
                },
            }
        })

        res.status(200).json({success:true,content:response.results});
    }catch(error){
        console.log("error in person", error);
        res.status(500).json({sucess:false,message:"Internal server error"});
    }
}
export async function searchMovie(req, res) {
    const {query} = req.params;
    try{
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);
        if(response.results.length === 0){
            res.status(404).json({success:false,message:"Movie not found"});
        }
        await User.findByIdAndUpdate(req.user._id,{
            $push:{
                searchHistory:{
                    id:response.results[0].id,
                    image:response.results[0].poster_path,
                    title:response.results[0].title,
                    searchtype:"Movie",
                    createdAt: new Date(),
                },
            }
        });

        res.status(200).json({success:true,content:response.results});
    }catch(error){
        console.log(error);
        res.status(500).json({sucess:false,message:"Internal server error"});
    }
}
export async function searchTv(req, res) {
    const {query} = req.params;

    try{
        const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);
        if(response.results.length === 0){
            res.status(404).json({success:false,message:"Movie not found"});
        }

        await User.findByIdAndUpdate(req.user._id,{
            $push:{
                searchHistory:{
                    id:response.results[0].id,
                    image:response.results[0].poster_path,
                    title:response.results[0].title,
                    searchtype:"tv",
                    createdAt: new Date(),
                },
            }
        });

        res.status(200).json({success:true,content:response.results});
    }catch(error){
        console.log(error);
        res.status(500).json({sucess:false,message:"Internal server error"});
    }
}

export async function getSearchHistory(req, res) {
    try{
        res.status(200).json({success:true,content:req.user.searchHistory});
    }catch(error){
        res.status(500).json({sucess:false,message:"Internal server error"});
    }
}

export async function removeItemfromSeachHistory(req, res) {
    let {id} = req.params;
   id = parseInt(id);

    try{
        await User.findByIdAndUpdate(req.user._id,{$pull:{searchHistory:{_id:id}}});
        res.status(200).json({success:true,message:"Item removed from search history"});
    }catch(error){
        console.log("error in removeItemfromSeachHistory",error.message);
        res.status(500).json({sucess:false,message:"Internal server error"});
    }
}