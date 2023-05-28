import { FormEvent, ReactElement, useEffect, useState } from "react";
import { AnimeClient, JikanResponse, Anime } from "@tutkli/jikan-ts";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button"
import "./styles/AnimeIndex.css"
import { NavigateFunction, useLocation, useNavigate } from "react-router";
import ListSearchResults from "../components/ListSearchResults";

// initting our client for api calls
// deals with anime only
const animeClient = new AnimeClient();

export default function AnimeIndex(): ReactElement {
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
    // const initSearchData: Anime[] = [];

    // init search result data state
    const [searchData, setSearchData] = useState<Anime[]|null>(null);
    const [numPages, setNumPages] = useState<number>(0);

    // fn for fetching search data
    async function getAnimSearch(searchTerm: string) {

        setSearchData(null)

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
        <div className="AnimeIndex anime-index" id="anime-index">
            {search ? null :
                <h1>Welcome to MoeList!</h1>}
            {/* form for search: contains an input "search" and submit button */}
            {/* using rows, cols, and container from Bootstrap-React for styling */}
            <Container className="search-container" fluid>
                <Form className="search" onSubmit={handleSearchSubmit}>
                    <Form.Group className="search-form-group" as={Row} controlId="search-bar">
                        <Col xs="2" sm="auto">
                            <Form.Label>
                                Search Anime:
                            </Form.Label>
                        </Col>
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
            {search ? <ListSearchResults searchData={searchData}/> :
            <div className="home-page">
                
            </div>}
            {/* // if there was no search (aka on default home page), render case for no search
            // i plan for having recommended and random section here, that's for later */}
        </div>
    );
}