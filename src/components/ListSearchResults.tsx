import { ReactElement } from "react";
import ListSearchResultsProps from "../interfaces/ListSearchResultsProps";
import AnimeShort from "./AnimeShort";
import { Anime,JikanResponse } from "@tutkli/jikan-ts";

function isAnimeArr(data:Anime[]|JikanResponse<Anime[]>):data is Anime[] {
    return "length" in data;
}

function isJkResp(data:Anime[]|JikanResponse<Anime[]>):data is JikanResponse<Anime[]> {
    return "pagination" in data;
}

export default function ListSearchResults(props:ListSearchResultsProps):ReactElement{
    // destructuring object for easy access
    const{searchData}=props;

    if (searchData === null) {
        return (
            <h1>Loading...</h1>
        )
    } else if (isAnimeArr(searchData)){
        if (searchData.length <= 0) {
            return (
                <h1>No results.</h1>
            )
        } else {
            return (
                <>
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
                        return (
                            <AnimeShort anime={anime} additionalClassNames={positionClass} key={idx} idx={idx} />
                        )
                    })}
                </>
            )
        }
    } else if(isJkResp(searchData)){
        if(searchData.data.length<=0){
            return (
                <h1>No results.</h1>
            )
        }else{
            return(
                <>
                    {searchData.data.map((anime, idx,data) => {
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
                        return (
                            <AnimeShort anime={anime} additionalClassNames={positionClass} key={idx} idx={idx} />
                        )
                    })}
                </>
            )
        }
    }else{
        return(
            <h1>Unknown Error has occurred!</h1>
        )
    }
}