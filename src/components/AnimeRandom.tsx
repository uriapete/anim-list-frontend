import { ReactElement, useEffect } from "react";
import { Anime, JikanResponse } from "@tutkli/jikan-ts";
import { NavigateFunction, useNavigate } from "react-router";
import useRandomAnime from "../functions/useRandomAnime";

export default function AnimeRandom(): ReactElement {
    // there's no getRandomAnime function in jikanClient or animeClient, so we'll do it the old fashioned way

    const url: string = "https://api.jikan.moe/v4/random/anime";

    // navigation function - for redirects
    const navigate: NavigateFunction = useNavigate();

    const randomAnime = useRandomAnime();

    if (randomAnime!==null){
        navigate(`/anime/${randomAnime.data.mal_id}`)
    }

    // while fetching, display loading thing
    return (
        <h1>Loading...</h1>
    )
}