import { ReactElement, useEffect } from "react";
import { Anime, JikanResponse } from "@tutkli/jikan-ts";
import { NavigateFunction, useNavigate } from "react-router";

export default function AnimeRandom(): ReactElement {
    // there's no getRandomAnime function in jikanClient or animeClient, so we'll do it the old fashioned way

    const url: string = "https://api.jikan.moe/v4/random/anime";

    // navigation function - for redirects
    const navigate: NavigateFunction = useNavigate();

    // useEffect - executes as soon as page loads
    useEffect(() => {
        // function that fetches random anime
        async function fetchRandAnime() {
            try {
                const response = await fetch(url);
                const respData: JikanResponse<Anime> = await response.json();
                const animeData: Anime = respData.data;
                navigate(`/anime/${animeData.mal_id}`)
            } catch (error) {
                console.log(error);
            }
        }
        fetchRandAnime();
    }, [navigate])

    // while fetching, display loading thing
    return (
        <h1>Loading...</h1>
    )
}