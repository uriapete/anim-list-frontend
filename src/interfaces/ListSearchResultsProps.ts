import { Anime, JikanResponse } from "@tutkli/jikan-ts";

export default interface ListSearchResultsProps{
    searchData:Anime[]|JikanResponse<Anime[]>|null;
    resultPage?:number;
}