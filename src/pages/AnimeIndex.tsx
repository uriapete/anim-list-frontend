import { FormEvent, ReactElement } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button"
import "./styles/AnimeIndex.css"
import { NavigateFunction, useLocation, useNavigate } from "react-router";
import useAnimeSearchData from "../functions/useAnimeSearchData";
import SearchResultPages from "../components/SearchResultPages";
import DisplayTopAnime from "../components/DisplayTopAnime";
import { TopAnimeFilter } from "@tutkli/jikan-ts";
import RandomAnimeShort from "../components/RandomAnimeShort";

// home/index page
export default function AnimeIndex(): ReactElement {
    // get the current url as an object
    const loc: string = useLocation().search;

    // get the value of query param "s"
    const search: string | null = new URLSearchParams(loc).get("s");

    // get the value of query param "s"
    const page: string = new URLSearchParams(loc).get("page") || "1";

    // set up navigate function for redirecting
    const navigate: NavigateFunction = useNavigate();

    // getting number of pages and complete search data from search data hook
    const { numPages, searchDataComplete } = useAnimeSearchData(search!, parseInt(page));

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
            {search ? null :
                <div className="welcome">
                    <h1 className="welcome-message">Welcome to MoeList!</h1>
                    <h3>You can search for anime:</h3>
                </div>
            }
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
            {/* if we have a search, render the results */}
            {search !== null ? <SearchResultPages searchData={searchDataComplete} numPages={numPages} /> :
                <div className="home-page">
                    <h3>Or you can look at stuff we've found:</h3>
                    <div className="home-feat rand-anime">
                        <h4>Here's some random anime:</h4>
                        <RandomAnimeShort />
                        <RandomAnimeShort />
                    </div>
                    <div className="home-feat top-airing">
                        <h4>Here's some of the top anime currently airing, according to MAL:</h4>
                        <DisplayTopAnime filter={TopAnimeFilter.airing} limit={3} />
                    </div>
                    <div className="home-feat top-upcoming">
                        <h4>Here's some of the top upcoming anime, according to MAL:</h4>
                        <DisplayTopAnime filter={TopAnimeFilter.upcoming} limit={3} />
                    </div>
                    <div className="home-feat top-popularity">
                        <h4>Here's some of the most popular anime, according to MAL:</h4>
                        <DisplayTopAnime filter={TopAnimeFilter.bypopularity} limit={3} />
                    </div>
                </div>}
            {/* // if there was no search (aka on default home page), render case for no search
            // i plan for having recommended and random section here, that's for later */}
        </div>
    );
}