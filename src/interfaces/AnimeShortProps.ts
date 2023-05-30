import { Anime } from "@tutkli/jikan-ts";

export default interface AnimeShortProps {
    anime: Anime;
    idx?: number;
    additionalClassNames?: string;
}