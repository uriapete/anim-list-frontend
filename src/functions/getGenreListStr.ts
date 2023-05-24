import { JikanResource } from "@tutkli/jikan-ts";
import resourceArrToNameListStr from "./resourceArrToNameListStr";

export default function getGenreListStr(genres:JikanResource[],explicitGenres:JikanResource[]):string {
    const genreList: string = resourceArrToNameListStr([...genres,...explicitGenres]);
    let genreDisp: string = "";
    switch (genres.length) {
        case 1:
            genreDisp = `Genre: ${genreList}`
            break;

        case 0:
            break;

        default:
            genreDisp = `Genres: ${genreList}`
            break;
    }
    return genreDisp;
}