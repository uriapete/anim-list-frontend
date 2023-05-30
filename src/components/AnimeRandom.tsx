import { ReactElement, useEffect } from "react";
import { Anime, JikanResponse } from "@tutkli/jikan-ts";
import { NavigateFunction, useNavigate } from "react-router";

export default function AnimeRandom():ReactElement {
    const url: string = "https://api.jikan.moe/v4/random/anime";
    console.log(url);

    const navigate:NavigateFunction=useNavigate();
    
    useEffect(() => {
        async function fetchRandAnime() {
            try {
                const response=await fetch(url);
                const respData:JikanResponse<Anime>=await response.json();
                const animeData:Anime=respData.data;
                navigate(`/anime/${animeData.mal_id}`)
            } catch (error) {
                console.log(error);
            }
        }
        fetchRandAnime();
    }, [navigate])

    return(
        <h1>Loading...</h1>
    )
}