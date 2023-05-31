import { Anime, JikanResponse, TopAnimeFilter } from "@tutkli/jikan-ts";
import jikanClient from "../clients/jikanClient";
import { useEffect, useState } from "react";
import getNumPages from "./getNumPages";

// hook for getting top anime
export default function useTopAnimeData(filter: TopAnimeFilter, limit: number = 5, page: number = 1) {
    // init data states
    const [topData, setTopData] = useState<JikanResponse<Anime[]> | null>(null);
    const [numPages, setNumPages] = useState<number>(0)

    useEffect(() => {
        async function getTopAnimeData() {
            // fetch top anime using supplied filter, limit, and page params
            const fetchedTopData: JikanResponse<Anime[]> = await jikanClient.top.getTopAnime({ filter, limit, page })

            setTopData(fetchedTopData);

            // calculate numpages
            setNumPages(getNumPages(fetchedTopData))
        }
        try {
            getTopAnimeData();
        } catch (error) {
            console.log(error);
        }
    }, [filter, limit, page])
    return { topData, numPages };
}