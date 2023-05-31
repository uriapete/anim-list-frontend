import { Anime, JikanResponse } from "@tutkli/jikan-ts";
import { useEffect, useState } from "react";

// hook for using random anime
export default function useRandomAnime() {
    // there's no getRandomAnime function in jikanClient or animeClient, so we'll do it the old fashioned way

    // here's the url...
    const url: string = "https://api.jikan.moe/v4/random/anime";

    // now let's init state
    const [randAnimeData, setRandAnimeData] = useState<JikanResponse<Anime>|null>(null);

    // now, the effect which will get and set the data;
    useEffect(() => {
        async function getRandAnime() {
            const response=await fetch(url);
            const respData:JikanResponse<Anime>=await response.json();
            setRandAnimeData(respData);
        }
        try {
            getRandAnime();
        } catch (error) {
            console.log(error);
        }
    }, [])
    return randAnimeData;
}