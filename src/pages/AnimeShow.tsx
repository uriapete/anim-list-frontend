import { ReactElement, useEffect, useState } from "react";
import "./styles/AnimeShow.css";
import { Params, useParams } from "react-router";
import { AnimeClient,Anime } from "@tutkli/jikan-ts";
import Col from "react-bootstrap/Col";
import getJpTitle from "../functions/getJpTitle";
import getStudioListStr from "../functions/getStudioListStr";
import getLicensorListStr from "../functions/getLicensorListStr";
import getGenreListStr from "../functions/getGenreListStr";
import getSynTitleListStr from "../functions/getSynTitleListStr";
import getProducerListStr from "../functions/getProducerListStr";
import getEnTitle from "../functions/getEnTitle";
import JikanNamedResourceArrToLiElementsWithExtLinks from "../components/JikanNamedResourceArrToLiElementsWithExtLinks";
import getResourceListStr from "../functions/getResourceListStr";

const animeClient:AnimeClient=new AnimeClient();

export default function AnimeShow():ReactElement{
    const params:Params<string> = useParams()
    const malId:number=parseInt(params.malId!);

    const [anime, setAnime] = useState<Anime|null>(null);

    useEffect(()=>{
        async function getAnimeData() {
            setAnime((await animeClient.getAnimeFullById(malId)).data);
        }
        try {
            getAnimeData();  
        } catch (error) {
            console.log(error);
        }
    },[malId])

    // console.log(anime)

    let defaultTitle:string="";
    let jpTitle:string="";
    let enTitle:string="";
    let imgUrl:string|undefined;
    let imgAlt:string="";
    let altTitles:string="";
    let studioList:string="";
    let producerList:string="";
    let licensorList:string="";
    let genreList:string="";
    let ratingStr:string="";
    let yearSeasonTypeStr:string="";
    let synop:string="";

    if(anime){
        defaultTitle = anime.titles[0].title;
        jpTitle = getJpTitle(anime.titles);
        enTitle = getEnTitle(anime.titles);
        imgUrl = anime.images.jpg.large_image_url;
        imgAlt = `Poster/thumbnail of ${anime.titles[0]}`;
        altTitles = getSynTitleListStr(anime.titles);
        studioList = getResourceListStr(anime.studios,"Studio");
        producerList = getResourceListStr(anime.producers,"Producer");
        licensorList = getResourceListStr(anime.licensors,"Licensor");
        genreList = getResourceListStr([...anime.genres, ...anime.explicit_genres],"Genre");
        ratingStr = `Rating: ${anime.rating}`;
        yearSeasonTypeStr =`${anime.type} ${anime.season ? anime.season[0].toUpperCase() + anime.season.slice(1)+" ":false}${anime.year}`;
        synop=anime.synopsis;

    }

    return(
        <div className="anime-show AnimeShow" id="anime-show">
            {anime?
            <>
                    <h1 className="jp-title">{jpTitle}</h1>
                    <h3 className="default-title">{defaultTitle}</h3>
                    <h6 className="en-title-translated">{enTitle}</h6>
                    <Col as={"div"} className="img-col">
                        <img src={imgUrl} alt={imgAlt} style={{maxWidth:"100%"}} />
                        <h6 className="alt-titles">{altTitles}</h6>
                        <h6 className="studios">{studioList}</h6>
                        <h6 className="producers">{producerList}</h6>
                        <h6 className="licensors">{licensorList}</h6>
                        <h6 className="genres">{genreList}</h6>
                        <h6 className="aud-rating">{ratingStr}</h6>
                        <h6 className="year-season-type">{yearSeasonTypeStr}</h6>
                    </Col>
                    <Col as={"div"} className="info-col">
                        <p className="synopsis">{synop}</p>
                        <Col as={"div"} className="links-col">
                            <ul className="streaming-links">
                                <h6>Streaming on:</h6>
                                <JikanNamedResourceArrToLiElementsWithExtLinks resourceList={anime.streaming}/>
                            </ul>
                            {anime.external?
                            <>
                                <ul className="other-ext">
                                    <h6>Other External Links:</h6>
                                    <JikanNamedResourceArrToLiElementsWithExtLinks resourceList={anime.external!} />
                                </ul>
                            </>:null}
                        </Col>
                    </Col>
            </>
            :
            <h1>Loading...</h1>
            }
        </div>
    )
}