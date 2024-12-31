import { useEffect,useState } from "react";
import { useContentStore } from "../store/content";
import axios from "axios";


const useGetTrendingContent = () => {
 
    const [trendingContent, setTrendingContent] = useState(null);

    const {contentType} = useContentStore();

    useEffect(() => {
        const getTrendingContent = async () => {
            try {
                const response = await axios.get(`/api/v1/${contentType}/trending`);
                setTrendingContent(response.data.content);
            } catch (error) {
                console.error(error);
            }
        }
        getTrendingContent();
    },[contentType])

    return {trendingContent};
}

export { useGetTrendingContent };