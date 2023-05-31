import { ReactElement } from "react";
import useRandomAnime from "../hooks/useRandomAnime";
import AnimeShort from "./AnimeShort";

// component for displaying a short for a random anime
export default function RandomAnimeShort(): ReactElement {
    const randAnimeData = useRandomAnime();
    return (
        <AnimeShort anime={randAnimeData} additionalClassNames="random-anime-short" />
    )
}