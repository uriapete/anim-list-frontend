import { ReactElement } from "react";
import ListSearchResultsProps from "../interfaces/ListSearchResultsProps";
import SearchResult from "./SearchResult";

export default function ListSearchResults(props:ListSearchResultsProps):ReactElement{
    // destructuring object for easy access
    const{searchData}=props;

    if (searchData === null) {
        return (
            <h1>Loading...</h1>
        )
    } else if (searchData.length === 0) {
        return (
            <h1>No results.</h1>
        )
    } else {
        return (
            <>
                {searchData!.map((anime, idx) => {
                    // adding class to first and last results
                    // unused classes for now, but could be useful later

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
                        <SearchResult anime={anime} positionClass={positionClass} idx={idx} />
                    )
                })}
            </>
        )
    }

}