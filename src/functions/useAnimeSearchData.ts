import { useState, useEffect } from "react";
import { Anime, JikanResponse } from "@tutkli/jikan-ts";
import jikanClient from "../clients/jikanClient";

// hook for searching anime and using data of results
export default function useAnimeSearchData(q: string, page?: number) {

    // init search result data state
    const [searchDataComplete, setSearchDataComplete] = useState<JikanResponse<Anime[]> | null>(null);
    const [searchData, setSearchData] = useState<Anime[] | null>(null);
    const [numPages, setNumPages] = useState<number>(0);

    // using effect for enabling dynamic loading of search results
    useEffect(() => {
        // fn for fetching search data
        async function getAnimSearch() {

            setSearchData(null);
            setSearchDataComplete(null);

            // using our anime client, fetch a search with our search term
            const searchData: JikanResponse<Anime[]> = await jikanClient.anime.getAnimeSearch({
                q,
                page,
                limit:10,
            })

            // make search data available to this component
            setSearchData(searchData.data);
            setSearchDataComplete(searchData);

            // calculating amt. of search pages using total items / items per page
            if (searchData.pagination?.items) {
                const countPerPage = searchData.pagination!.items!.per_page;
                const total = searchData.pagination!.items!.total;
                setNumPages(Math.ceil(total / countPerPage));
            } else if (searchData.data.length > 0) {
                // if required pagination data is not available or supplied, then fall back on 1 as long as there is at least some result
                setNumPages(1);
            }
        }

        // try/catch, log err if err is caught
        try {
            // if there's a search term set, api call for search
            if (q) {
                getAnimSearch();
            }
        } catch (error) {
            console.log(error)
        }
    }, [q, page])
    // ^do it again if search changes

    // return vars
    return { searchData, numPages, searchDataComplete };
}
