import { Anime, JikanResponse } from "@tutkli/jikan-ts";

export default interface SearchResultPagesProps {
    searchData: JikanResponse<Anime[]> | null;
    numPages?: number;
}