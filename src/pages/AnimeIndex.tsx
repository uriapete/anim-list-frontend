import { FormEvent, ReactElement, useEffect, useState } from "react";
// import { AnimeClient, JikanResponse, Anime } from "@tutkli/jikan-ts";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button"
import "./styles/AnimeIndex.css"
import { NavigateFunction, useLocation, useNavigate } from "react-router";
import ListSearchResults from "../components/ListSearchResults";
import useAnimeSearchData from "../functions/useAnimeSearchData";
import SearchResultPages from "../components/SearchResultPages";
import { Anime, JikanResponse } from "@tutkli/jikan-ts";
import animeClient from "../clients/animeClient";

// initting our client for api calls
// deals with anime only
// const animeClient = new AnimeClient();

export default function AnimeIndex(): ReactElement {
    // get the current url as an object
    const loc: string = useLocation().search;

    // get the value of query param "s"
    const search: string | undefined = new URLSearchParams(loc).get("s")||undefined;

    // get the value of query param "s"
    const page: string = new URLSearchParams(loc).get("page")||"1";

    // set up navigate function for redirecting
    const navigate: NavigateFunction = useNavigate();

    const {searchData,numPages,searchDataComplete}=useAnimeSearchData(search!,parseInt(page));

    // fn for handling when search query is submitted
    function handleSearchSubmit(e: FormEvent) {
        // prevent page from reloading
        e.preventDefault();

        // get form data
        const form = e.target;

        // format form data into FormData
        const formData: FormData = new FormData(form as HTMLFormElement);

        // grab "search" value from formData, redirect to search page using value
        navigate(`/?s=${formData.get("search")}`);
    }

    // now here's the actual tsx element
    return (
        <div className="AnimeIndex anime-index" id="anime-index">
            {search ? null : <h1>Welcome to MoeList!</h1>}
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
            {/* <ListSearchResults searchData={searchDataComplete}/> */}
            {/* console.log(searchDataComplete); */}
            {search !== null ? <SearchResultPages searchData={searchDataComplete} numPages={numPages} /> :
            <div className="home-page">

            </div>}
            {/* // if there was no search (aka on default home page), render case for no search
            // i plan for having recommended and random section here, that's for later */}
        </div>
    );
}