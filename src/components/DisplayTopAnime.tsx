import { ReactElement } from "react";
import DisplayTopAnimeProps from "../interfaces/DisplayTopAnimeProps";
import useTopAnimeData from "../functions/useTopAnimeData";
import AnimeShortsMap from "./AnimeShortsMap";

// generic component for getting top anime - can be used to get most popular anime, top upcoming, top currently airing, etc
export default function DisplayTopAnime(props: DisplayTopAnimeProps): ReactElement {
    const { filter, limit, page } = props;
    const { topData } = useTopAnimeData(filter, limit, page);
    return (
        <div className={`display-top-anime list-top-${filter}`}>
            <AnimeShortsMap animeList={topData} />
        </div>
    )
}