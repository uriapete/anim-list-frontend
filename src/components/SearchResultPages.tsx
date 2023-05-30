import { ReactElement, useEffect, useState } from "react";
import SearchResultPagesProps from "../interfaces/SearchResultPagesProps";
import { useLocation } from "react-router";
import { Button } from "react-bootstrap";
import ListSearchResults from "./ListSearchResults";
import './styles/SearchResultPages.css'
import { Link } from "react-router-dom";
import { Anime } from "@tutkli/jikan-ts";

export default function SearchResultPages(props:SearchResultPagesProps):ReactElement {
    const{searchData}=props;
    let{numPages}=props;

    const path = useLocation().pathname;
    const locSearch = useLocation().search
    const s = new URLSearchParams(locSearch).get('s');
    const page = new URLSearchParams(locSearch).get("page")||"1";

    let pageBtns:ReactElement[]=[];

    // const [searchTerm, setSearchTerm] = useState<string|null>(null);
    
    // let animeSearchResults:Anime[]|null=searchData!==null?searchData.data:null;
        
    // const [resultList, setResultList] = useState<ReactElement>(<></>)

    // useEffect(() => {
    //   const getResultList= () => {
    //     try {
    //         if(searchData!==null){
    //             setResultList(ListSearchResults({searchData:animeSearchResults}))
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    //   }
    //   getResultList();
    // }, [searchData,animeSearchResults])
    
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
        
    function resetResults() {
        // console.log("reset")
        // animeSearchResults=null;
        // setResultList(ListSearchResults({searchData:null}));
        // console.log(animeSearchResults)
        // setAnimeSearchResults(null)
    }

    // const hasNextPage=searchData.pagination?.has_next_page;
    for (let i = 1; i <= numPages; i++) {
        pageBtns.push((
            <span key={i} className="page-btn-span">
                {/* <Col key={i} as={"div"} className="page-btn" xs={numPages}> */}
                    {i!==parseInt(page)?
                    <Link to={`${path}?s=${s}&page=${i}`}>
                        <Button as={"button"} key={i}>{i}</Button>
                    </Link>
                    :
                    <Button key={i} disabled>{i}</Button>
                    }
                {/* </Col> */}
            </span>
        ))
    }
    // setAnimeSearchResults(searchData.data);
    // console.log(animeSearchResults)
    return(
        <div className="search-results-pages">
            {/* <Row className="page-buttons" as={"div"}>{pageBtns}</Row> */}
            <div className="page-buttons page-buttons-top">{pageBtns}</div>
            <ListSearchResults searchData={searchData.data} />
            {/* {resultList} */}
            <div className="page-buttons page-buttons-bottom">{pageBtns}</div>
        </div>
    )
}