import { ReactElement } from "react";
import SearchResultPagesProps from "../interfaces/SearchResultPagesProps";
import { useLocation } from "react-router";
import { Button } from "react-bootstrap";
import ListSearchResults from "./ListSearchResults";
import './styles/SearchResultPages.css'
import { Link } from "react-router-dom";

export default function SearchResultPages(props:SearchResultPagesProps):ReactElement {
    const{searchData}=props;
    let{numPages}=props;

    const path = useLocation().pathname;
    const locSearch = useLocation().search
    const s = new URLSearchParams(locSearch).get('s');
    const page = new URLSearchParams(locSearch).get("page")||"1";

    let pageBtns:ReactElement[]=[];
    
    if (searchData === null) {
        return (
            <h1>Loading...</h1>
        )
    }

    if (typeof numPages === "undefined") {
        if (typeof searchData.pagination?.items !== "undefined") {
            const countPerPage = searchData.pagination!.items!.per_page;
            const total = searchData.pagination!.items!.total;
            numPages = Math.ceil(total / countPerPage);
        } else {
            numPages = 1;
        }
    }

    for (let i = 1; i <= numPages; i++) {
        pageBtns.push((
            <span key={i} className="page-btn-span">
                    {i!==parseInt(page)?
                    <Link to={`${path}?s=${s}&page=${i}`}>
                        <Button as={"button"} key={i}>{i}</Button>
                    </Link>
                    :
                    <Button key={i} disabled>{i}</Button>
                    }
            </span>
        ))
    }
    
    return(
        <div className="search-results-pages">
            <div className="page-buttons page-buttons-top">{pageBtns}</div>
            <ListSearchResults searchData={searchData.data} />
            <div className="page-buttons page-buttons-bottom">{pageBtns}</div>
        </div>
    )
}