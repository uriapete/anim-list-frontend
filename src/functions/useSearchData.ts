import { useState,useEffect } from "react";
import { Anime,AnimeClient,JikanResponse } from "@tutkli/jikan-ts";
import animeClient from "../clients/animeClient";

// const animeClient:AnimeClient=new AnimeClient();

export default function useAnimeSearch(q:string,page?:number) {

    // init search result data state
    const [searchDataComplete, setSearchDataComplete] = useState<JikanResponse<Anime[]>|null>(null);
    const [searchData, setSearchData] = useState<Anime[]|null>(null);
    const [numPages, setNumPages] = useState<number>(0);
    
    // fn for fetching search data
    async function getAnimSearch() {
    
        setSearchData([])
    
        // using our anime client, fetch a search with our search term
        const searchData: JikanResponse<Anime[]> = await animeClient.getAnimeSearch({
            q,
            page
        })
    
        // make search data available to this component
        setSearchData(searchData.data);
        setSearchDataComplete(searchData);
    }
    
    // using effect for enabling dynamic loading of search results
    useEffect(() => {
        // try/catch, log err if err is caught
        try {
            // if there's a search term set, api call for search
            if (q) {
                getAnimSearch();
            }
        } catch (error) {
            console.log(error)
        }
    }, [q])
    // ^do it again if search changes

    return {searchData,numPages,searchDataComplete};
}
