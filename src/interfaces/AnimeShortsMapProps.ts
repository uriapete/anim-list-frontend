import { Anime, JikanResponse } from "@tutkli/jikan-ts";

export default interface AnimeShortsMapProps {
    searchData: Anime[] | JikanResponse<Anime[]> | null;
    resultPage?: number;
}