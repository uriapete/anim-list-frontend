import { FormEvent, ReactElement, useEffect, useState } from "react";
import { AnimeClient, JikanResponse, Anime } from "@tutkli/jikan-ts";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button"
import "./styles/AnimIndex.css"
import { NavigateFunction, useLocation, useNavigate } from "react-router";

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

                // part for handling synopsis

                // var for synopsis
                let synop: string = "";

                // if synopsis exists:
                if (anime.synopsis !== null && anime.synopsis !== "" && typeof anime.synopsis !== "undefined") {
                    // defining at what amt of chars we'll break the synopsis
                    // mobile size first:
                    let breakLength: number = 250;

                    // if desktop, bigger breaklength
                    if (window.innerWidth >= 500) {
                        breakLength = 700
                    }

                    // if synopsis length exceeds breaklength...
                    if (anime.synopsis.length > breakLength) {
                        // var for index of where to break/slice string
                        let breakCharIdx: number = breakLength + 1;

                        // var for holding whether or not a space " " char was found
                        let spaceFound: boolean = false

                        // start loop at breaklength, and work back down
                        for (let i = breakLength + 1; i > 0; i--) {
                            // defining char
                            const char = anime.synopsis[i];

                            // if space was not found...
                            if (!spaceFound) {
                                // if char is a space, indicate so and go to next iteration
                                if (char === " ") {
                                    spaceFound = true;
                                    continue;
                                } else {
                                    // else, go to next iteration
                                    continue;
                                }
                            } else {
                                // this code only runs if a space has been found before
                                if (char !== " ") {
                                    // if char is not a space, set the breaking index to the char after it
                                    // which should be a space and therefore not included in the split string
                                    breakCharIdx = i + 1;

                                    // then break
                                    break;
                                } else {
                                    // if char is still a space, continue to next iteration
                                    continue;
                                }
                            }
                        }
                        // set synop var to split string, add "..."
                        synop = anime.synopsis.slice(0, breakCharIdx) + "...";
                    } else {
                        // if synopsis is short and length does not exceed breaklength
                        // just set it as is
                        synop = anime.synopsis
                    }
                }

                // now for the actual display
                return (
                    // article which contains anime img, titles, studios
                    <article key={idx} className={"anime-search-result" + positionClass}>

                        {/* div that contains the picture */}
                        <div className="anime-img search-img result-item">
                            <img src={anime.images.jpg.large_image_url} width={"250vw"} alt={`${anime.title_english} poster`} className="anime-img" />
                        </div>

                        {/* div that contains the text */}
                        <div className="anime-text result-item">

                            {/* displaying title */}
                            {/* if an english title exists: */}
                            {anime.title_english ? (
                                // display english in big and jp below it in small
                                <>
                                    <h3 className="anime-title anime-title-en">{anime.title_english}</h3>
                                    <h6 className="anime-title anime-title-jp">{anime.title_japanese}</h6>
                                </>
                                // else, if an english title doesn't exist:
                            ) : (
                                // only display jp in big
                                <h3 className="anime-title anime-title-jp anime-title-jp-big">{anime.title_japanese}</h3>
                            )}

                            {/* displaying studios */}
                            {/* begin looping thru studios */}
                            <h6 className="studios">Studios: {anime.studios.map((studio, idx) => {
                                // start map loop, studio (no s, individual) refers to current studio in our arr of studios

                                // setting string var for individual studio
                                let studStr: string = studio.name;

                                // if our curr studio is not the first on our list...
                                // add a space " " before the studio name
                                if (idx > 0) {
                                    studStr = " " + studStr;
                                }

                                // map gives an array of returned vars, so we'll add our studio strings to the list
                                return studStr;

                                // and then join the array together for the final display
                            }).join()}</h6>
                            {/* the join() func will add the commas for us, but not add them when there's only one, which is nice */}

                            {/* displaying synopsis */}
                            {/* 
                                the synopsis has already been proccessed above
                                if there is a synopsis, it would've been assigned to synop and cut if it was too long
                                if there wasn't a synopsis, synop would be "", which is falsy
                            */}
                            {/* therefore: if synop is defined, display it */}
                            {/* if not, display "none available" message */}
                            {synop ? (<p className="anime-synop">{synop}</p>) : (<p>No synopsis available.</p>)}
                        </div>
                    </article>
                )

                // if there was no search (aka on default home page), render case for no search
                // i plan for having recommended and random section here, that's for later
            }) : <h1>No search uwu</h1>}
        </div>
    );
}