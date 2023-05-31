import { Anime } from "@tutkli/jikan-ts";

export default interface AnimeShortProps {
    anime: Anime|null;
    idx?: number;
    additionalClassNames?: string;
}