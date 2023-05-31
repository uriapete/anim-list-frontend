import { TopAnimeFilter } from "@tutkli/jikan-ts";

export default interface DisplayTopAnimeProps{
    filter: TopAnimeFilter;
    limit?: number;
    page?: number;
}