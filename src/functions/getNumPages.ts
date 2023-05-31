import { Anime, JikanResponse } from "@tutkli/jikan-ts";

// function for getting number of pages from JikanResponse of []
export default function getNumPages(data: JikanResponse<Anime[]>): number {
    let numPages:number=0
    // calculating amt. of search pages using total items / items per page
    if (data.pagination?.items) {
        const countPerPage = data.pagination!.items!.per_page;
        const total = data.pagination!.items!.total;
        numPages = Math.ceil(total / countPerPage);
    } else if (data.data.length > 0) {
        // if required pagination data is not available or supplied, then fall back on 1 as long as there is at least some result
        numPages = 1;
    }
    return numPages;
}