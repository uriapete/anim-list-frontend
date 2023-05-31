import { Anime, JikanResponse } from "@tutkli/jikan-ts";

export default interface AnimeShortsMapProps {
    animeList: Anime[] | JikanResponse<Anime[]> | null;
    resultPage?: number;
}