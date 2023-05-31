import { Anime, JikanResponse } from "@tutkli/jikan-ts";

export default interface AnimeShortProps {
    anime: JikanResponse<Anime>|Anime|null;
    idx?: number;
    additionalClassNames?: string;
}