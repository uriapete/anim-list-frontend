import { FormEvent, ReactElement, useEffect, useState } from "react";
import { AnimeClient, JikanResponse, Anime } from "@tutkli/jikan-ts";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button"
import "./styles/AnimIndex.css"
import { NavigateFunction, useLocation, useNavigate } from "react-router";
import SearchResult from "../components/SearchResult";

// initting our client for api calls
// deals with anime only
const animeClient = new AnimeClient();

export default function AnimIndex(): ReactElement {
    // get the current url as an object
    const loc: string = useLocation().search;

    // get the value of query param "s"
    const search: string | null = new URLSearchParams(loc).get("s");

    // set up navigate function for redirecting
    const navigate: NavigateFunction = useNavigate();

    // fn for handling when search query is submitted
    function handleSearchSubmit(e: FormEvent) {
        // prevent page from reloading
        e.preventDefault();

        // get form data
        const form = e.target;

        // format form data into FormData
        const formData: FormData = new FormData(form as HTMLFormElement);

        // grab "search" value from formData, redirect to search page using value
        navigate(`/?s=${formData.get("search")}`)
    }

    // for initting search data state
    const initSearchData: Anime[] = [];

    // init search result data state
    const [searchData, setSearchData] = useState(initSearchData);

    // fn for fetching search data
    async function getAnimSearch(searchTerm: string) {
        // using our anime client, fetch a search with our search term
        const searchData: JikanResponse<Anime[]> = await animeClient.getAnimeSearch({
            q: searchTerm
        })

        // make search data available to this component
        setSearchData(searchData.data);
    }

    // using effect for enabling dynamic loading of search results
    useEffect(() => {
        // try/catch, log err if err is caught
        try {
            // if there's a search term set, api call for search
            if (search) {
                getAnimSearch(search);
            }
        } catch (error) {
            console.log(error)
        }
    }, [search])
    // ^do it again if search changes

    // now here's the actual tsx element
    return (
        <div className="AnimIndex" id="AnimIndex">
            {/* form for search: contains an input "search" and submit button */}
            {/* using rows, cols, and container from Bootstrap-React for styling */}
            <Container className="search-container">
                <Form className="search" onSubmit={handleSearchSubmit}>
                    <Form.Group className="" as={Row} controlId="search-bar">
                        <Form.Label column xs="auto" sm="2">
                            Search:
                        </Form.Label>
                        <Col>
                            <Form.Control type="text" size="sm" name="search" />
                        </Col>
                        <Col xs="auto" sm="2">
                            <Button type="submit">Search</Button>
                        </Col>
                    </Form.Group>
                </Form>
            </Container>
            {/* now here's the part that'll render the search results */}
            {/* if we have a search, render the results (using map loop) */}
            {search ? searchData.map((anime, idx) => {
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
                    case searchData.length - 1:
                        positionClass += " last-search-result"
                        break;

                    // else, do nothing
                    default:
                        break;
                }
                return(
                    <SearchResult anime={anime} positionClass={positionClass} idx={idx} />
                )

                // if there was no search (aka on default home page), render case for no search
                // i plan for having recommended and random section here, that's for later
            }) : <h1>No search uwu</h1>}
        </div>
    );
}