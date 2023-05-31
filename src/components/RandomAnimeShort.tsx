import { ReactElement } from "react";
import useRandomAnime from "../functions/useRandomAnime";
import AnimeShort from "./AnimeShort";

export default function RandomAnimeShort():ReactElement{
    const randAnimeData=useRandomAnime();
    return(
        <AnimeShort anime={randAnimeData} additionalClassNames="random-anime-short" />
    )
}