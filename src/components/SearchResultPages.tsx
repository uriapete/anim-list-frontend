import { ReactElement } from "react";
import SearchResultPagesProps from "../interfaces/SearchResultPagesProps";
import { useLocation } from "react-router";
import { Button } from "react-bootstrap";
import ListSearchResults from "./ListSearchResults";
import './styles/SearchResultPages.css'

export default function SearchResultPages(props:SearchResultPagesProps):ReactElement {
    const{searchData}=props;
    const path = useLocation().pathname;
    const locSearch = useLocation().search
    const s = new URLSearchParams(locSearch).get('s');
    const page = new URLSearchParams(locSearch).get("page")||"1";

    if (searchData === null) {
        return (
            <h1>Loading...</h1>
        )
    }

    // const hasNextPage=searchData.pagination?.has_next_page;
    let numPages:number=1;
    if(typeof searchData.pagination?.items !== "undefined"){
        const countPerPage=searchData.pagination!.items!.per_page;
        const total=searchData.pagination!.items!.total;
        numPages=Math.ceil(total/countPerPage);
    }
    let pageBtns:ReactElement[]=[];
    for (let i = 1; i <= numPages; i++) {
        pageBtns.push((
            <span key={i} className="page-btn-span">
                {/* <Col key={i} as={"div"} className="page-btn" xs={numPages}> */}
                    {i!==parseInt(page)?
                    <Button key={i} href={`${path}?s=${s}&page=${i}`}>{i}</Button>
                    :
                    <Button key={i} disabled>{i}</Button>
                    }
                {/* </Col> */}
            </span>
        ))
    }
    return(
        <div className="search-results-pages">
            {/* <Row className="page-buttons" as={"div"}>{pageBtns}</Row> */}
            <div className="page-buttons page-buttons-top">{pageBtns}</div>
            <ListSearchResults searchData={searchData} />
            <div className="page-buttons page-buttons-bottom">{pageBtns}</div>
        </div>
    )
}