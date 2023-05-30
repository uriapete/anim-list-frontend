import { ReactElement } from "react";
import AnimeShortsMapProps from "../interfaces/AnimeShortsMapProps";
import AnimeShort from "./AnimeShort";
import { Anime, JikanResponse } from "@tutkli/jikan-ts";
import "./styles/AnimeShortsMap.css"

// one of our props could either be Anime[] or JikanResponse<Anime[]>
// this is bc the supplied data used to just be Anime[], but changed to JikanResponse<Anime[]>
// just for support purposes and nothing breaks but will probs remove the type union later

// checks if supplied data is Anime[]
function isAnimeArr(data: Anime[] | JikanResponse<Anime[]>): data is Anime[] {
    return "length" in data;
}

// checks if supplied data is JikanResponse<Anime[]>
function isJkResp(data: Anime[] | JikanResponse<Anime[]>): data is JikanResponse<Anime[]> {
    return "pagination" in data;
}

export default function AnimeShortsMap(props: AnimeShortsMapProps): ReactElement {
    // destructuring object for easy access
    const { searchData } = props;

    if (searchData === null) {
        // if searchData is null, it's still loading
        return (
            <h1>Loading...</h1>
        )
    } else if (isAnimeArr(searchData)) {
        // if supplied data is Anime[]... (not null)

        // if length of data is 0, there were no results.
        if (searchData.length <= 0) {
            return (
                <h1>No results.</h1>
            )
        } else {
            // else, we map thru the data
            return (
                <div className="anime-list">
                    {searchData.map((anime, idx) => {
                        // adding class to first and last results
                        // these classes have slightly diff. margins

                        // var for holding the string that holds the class
                        let positionClass: string = "";

                        // switch statement: check the idx of the result
                        switch (idx) {
                            // case for first result
                            case 0:
                                positionClass += " first-search-result"
                                break;

                            // case for last result
                            case searchData!.length - 1:
                                positionClass += " last-search-result"
                                break;

                            // else, do nothing
                            default:
                                break;
                        }
                        // each anime will desplay their own short form summary
                        return (
                            <AnimeShort anime={anime} additionalClassNames={positionClass} key={idx} idx={idx} />
                        )
                    })}
                </div>
            )
        }
    } else if (isJkResp(searchData)) {
        // if supplied data is a JikanResponse<Anime[]>...(not null)

        // if the length of the data is 0, no results.
        if (searchData.data.length <= 0) {
            return (
                <h1>No results.</h1>
            )
        } else {
            // else, map thru the data
            return (
                <div className="anime-list">
                    {searchData.data.map((anime, idx, data) => {
                        // adding class to first and last results
                        // these classes have slightly diff. margins

                        // var for holding the string that holds the class
                        let positionClass: string = "";

                        // switch statement: check the idx of the result
                        switch (idx) {
                            // case for first result
                            case 0:
                                positionClass += " first-search-result"
                                break;

                            // case for last result
                            case data.length - 1:
                                positionClass += " last-search-result"
                                break;

                            // else, do nothing
                            default:
                                break;
                        }
                        // each anime will desplay their own short form summary
                        return (
                            <AnimeShort anime={anime} additionalClassNames={positionClass} key={idx} idx={idx} />
                        )
                    })}
                </div>
            )
        }
    } else {
        // else, no idea what happened
        return (
            <h1>Unknown Error has occurred!</h1>
        )
    }
}