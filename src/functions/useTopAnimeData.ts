import { Anime, JikanResponse, TopAnimeFilter } from "@tutkli/jikan-ts";
import jikanClient from "../clients/jikanClient";
import { useEffect, useState } from "react";
import getNumPages from "./getNumPages";

// hook for getting top anime
export default function useTopAnimeData(filter:TopAnimeFilter,limit:number=5,page:number=1){
    // init data state
    const [topData, setTopData] = useState<JikanResponse<Anime[]>|null>(null);
    let numPages:number=0;
    
    useEffect(() => {
        async function getTopAnimeData() {
            const fetchTopData: JikanResponse<Anime[]> = await jikanClient.top.getTopAnime({ filter, limit, page })

            setTopData(fetchTopData);

            numPages=getNumPages(fetchTopData);
        }
        try {
            getTopAnimeData();
        } catch (error) {
            console.log(error);
        }
    }, [filter,limit,page])
    return{topData,numPages};
}