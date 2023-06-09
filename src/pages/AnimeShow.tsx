import { ReactElement, useEffect, useState } from "react";
import "./styles/AnimeShow.css";
import { Params, useParams } from "react-router";
import { Anime } from "@tutkli/jikan-ts";
import Col from "react-bootstrap/Col";
import getSynTitleListStr from "../functions/getSynTitleListStr";
import JikanNamedResourceArrToLiElementsWithExtLinks from "../components/JikanNamedResourceArrToLiElementsWithExtLinks";
import getResourceListStr from "../functions/getResourceListStr";
import getLangTitle from "../functions/getLangTitle";
import { Row } from "react-bootstrap";
import useDesktopWidthQuery from "../hooks/useDesktopWidthQuery";
import jikanClient from "../clients/jikanClient";

export default function AnimeShow(): ReactElement {
    // get params
    const params: Params<string> = useParams()
    const malId: number = parseInt(params.malId!);

    // state for whether or not anime is fetched and loaded
    const [anime, setAnime] = useState<Anime | null>(null);

    // use effect for updating anime state
    useEffect(() => {
        async function getAnimeData() {
            setAnime((await jikanClient.anime.getAnimeFullById(malId)).data);
        }
        try {
            getAnimeData();
        } catch (error) {
            console.log(error);
        }
    }, [malId])

    // strings for displaying information
    let defaultTitle: string = "";
    let jpTitle: string = "";
    let enTitle: string = "";
    let imgUrl: string | undefined;
    let imgAlt: string = "";
    let altTitles: string = "";
    let studioList: string = "";
    let producerList: string = "";
    let licensorList: string = "";
    let genreList: string = "";
    let ratingStr: string = "";
    let yearSeasonTypeStr: string = "";
    let synop: string = "";

    // format information when anime is loaded
    if (anime) {
        defaultTitle = anime.titles[0].title;
        jpTitle = getLangTitle(anime.titles, "Japanese");
        enTitle = getLangTitle(anime.titles, "English");
        imgUrl = anime.images.jpg.large_image_url;
        imgAlt = `Poster/thumbnail of ${anime.titles[0]}`;
        altTitles = getSynTitleListStr(anime.titles);
        studioList = getResourceListStr(anime.studios, "Studio");
        producerList = getResourceListStr(anime.producers, "Producer");
        licensorList = getResourceListStr(anime.licensors, "Licensor");
        genreList = getResourceListStr([...anime.genres, ...anime.explicit_genres], "Genre");
        ratingStr = `Rating: ${anime.rating}`;
        yearSeasonTypeStr = `${anime.type} ${anime.season ? anime.season[0].toUpperCase() + anime.season.slice(1) + " " : ""}${anime.year ? anime.year : ""}`;
        synop = anime.synopsis;

    }

    // media query for desktop vs mobile screens
    let desktopScreen = useDesktopWidthQuery();

    // we have two diff versions of this page depending on if user is on desktop or mobile
    if (!desktopScreen) {
        return (
            <div className="anime-show AnimeShow" id="anime-show">
                {anime ?
                    <div className="anime-show-info" id="show-info">
                        <h1 className="jp-title">{jpTitle}</h1>
                        <h3 className="default-title">{defaultTitle}</h3>
                        <h6 className="en-title-translated">{enTitle}</h6>
                        <div className="img-col">
                            <img src={imgUrl} alt={imgAlt} style={{ maxWidth: "100%" }} />
                            <h6 className="alt-titles">{altTitles}</h6>
                            <h6 className="studios">{studioList}</h6>
                            <h6 className="producers">{producerList}</h6>
                            <h6 className="licensors">{licensorList}</h6>
                            <h6 className="genres">{genreList}</h6>
                            <h6 className="aud-rating">{ratingStr}</h6>
                            <h6 className="year-season-type">{yearSeasonTypeStr}</h6>
                        </div>
                        <div className="info-col">
                            <p className="synopsis">{synop}</p>
                            <div className="links-col">
                                {anime.streaming.length ? <>
                                    <ul className="streaming-links">
                                        <h6>Streaming on:</h6>
                                        <JikanNamedResourceArrToLiElementsWithExtLinks resourceList={anime.streaming} />
                                    </ul>
                                </> : ""}
                                {anime.external ?
                                    <>
                                        <ul className="other-ext">
                                            <h6>Other External Links:</h6>
                                            <JikanNamedResourceArrToLiElementsWithExtLinks resourceList={anime.external!} />
                                        </ul>
                                    </> : null}
                            </div>
                        </div>
                    </div>
                    :
                    <h1 id="load-show">Loading...</h1>
                }
            </div>
        )
    } else {
        return (
            <div className="anime-show AnimeShow" id="anime-show">
                {anime ?
                    <div className="anime-show-info" id="show-info">
                        <Row>
                            <Col as={"div"} className="img-col" xs="4">
                                <img src={imgUrl} alt={imgAlt} style={{ maxWidth: "100%" }} />
                                <h6 className="alt-titles">{altTitles}</h6>
                                <h6 className="studios">{studioList}</h6>
                                <h6 className="producers">{producerList}</h6>
                                <h6 className="licensors">{licensorList}</h6>
                                <h6 className="genres">{genreList}</h6>
                                <h6 className="aud-rating">{ratingStr}</h6>
                                <h6 className="year-season-type">{yearSeasonTypeStr}</h6>
                                <div className="links-col">
                                    {anime.streaming.length ? <>
                                        <ul className="streaming-links">
                                            <h6>Streaming on:</h6>
                                            <JikanNamedResourceArrToLiElementsWithExtLinks resourceList={anime.streaming} />
                                        </ul>
                                    </> : ""}
                                    {anime.external ?
                                        <>
                                            <ul className="other-ext">
                                                <h6>Other External Links:</h6>
                                                <JikanNamedResourceArrToLiElementsWithExtLinks resourceList={anime.external!} />
                                            </ul>
                                        </> : ""}
                                </div>
                            </Col>
                            <Col as={"div"} className="info-col">
                                <div className="titles">
                                    <h1 className="jp-title">{jpTitle}</h1>
                                    <h3 className="default-title">{defaultTitle}</h3>
                                    <h6 className="en-title-translated">{enTitle}</h6>
                                    <p className="synopsis">{synop}</p>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    :
                    <h1 id="load-show">
                        Loading...
                    </h1>}
            </div>
        )
    }
}