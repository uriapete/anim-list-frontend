import { ReactElement } from "react";
import { NavigateFunction, useNavigate } from "react-router";
import useRandomAnime from "../functions/useRandomAnime";

export default function AnimeRandom(): ReactElement {
    // navigation function - for redirects
    const navigate: NavigateFunction = useNavigate();

    const randomAnime = useRandomAnime();

    if (randomAnime !== null) {
        navigate(`/anime/${randomAnime.data.mal_id}`)
    }

    // while fetching, display loading thing
    return (
        <h1>Loading...</h1>
    )
}