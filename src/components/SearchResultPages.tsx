import { ReactElement } from "react";
import SearchResultPagesProps from "../interfaces/SearchResultPagesProps";
import { useLocation } from "react-router";
import { Button } from "react-bootstrap";
import AnimeShortsMap from "./AnimeShortsMap";
import './styles/SearchResultPages.css'
import { Link } from "react-router-dom";

// function for displaying search results with buttons for naving thru pages of results
export default function SearchResultPages(props: SearchResultPagesProps): ReactElement {
    // get vars from props
    const { searchData } = props;
    let { numPages } = props;

    // getting current url path and search query params
    // path ex: moelist.moe/pathname(anime, perhaps?)
    const path = useLocation().pathname;

    // var for searching thru query params (?q=???)
    const locSearch = useLocation().search

    // s = search term
    const s = new URLSearchParams(locSearch).get('s');

    // page = page of search result
    const page = new URLSearchParams(locSearch).get("page") || "1";

    // arr of search result page buttons
    let pageBtns: ReactElement[] = [];

    // if searchData is null, it's probs still loading
    if (searchData === null) {
        return (
            <h1>Loading...</h1>
        )
    }

    // if number of pages was not defined, calculate it from total items / items per page
    if (typeof numPages === "undefined") {
        if (typeof searchData.pagination?.items !== "undefined") {
            const countPerPage = searchData.pagination!.items!.per_page;
            const total = searchData.pagination!.items!.total;
            numPages = Math.ceil(total / countPerPage);
        } else {
            // if total/per_page vars are not available, fall back on 1 page
            numPages = 1;
        }
    }

    // for every page button, create a page button and add to array
    for (let i = 1; i <= numPages; i++) {
        pageBtns.push((
            <span key={i} className="page-btn-span">
                {i !== parseInt(page) ?
                    <Link to={`${path}?s=${s}&page=${i}`}>
                        <Button as={"button"} key={i}>{i}</Button>
                    </Link>
                    :
                    <Button key={i} disabled>{i}</Button>
                }
            </span>
        ))
    }

    // return the results in a clean page component, complete with nav buttons
    return (
        <div className="search-results-pages">
            <div className="page-buttons page-buttons-top">{pageBtns}</div>
            <AnimeShortsMap animeList={searchData.data} />
            <div className="page-buttons page-buttons-bottom">{pageBtns}</div>
        </div>
    )
}