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

    let defaultTitle:string;
    let jpTitle:string;
    let enTitle:string;
    let imgUrl:string;
    let imgAlt:string;
    let altTitles:string;
    let studioList:string;
    let producerList:string;
    let licensorList:string;
    let genreList:string;
    let rating:string;
    let yearSeasonTypeStr:string;
    let synop:string;

    if(anime){
        defaultTitle = anime.titles[0].title;
        jpTitle = getJpTitle(anime.titles);
    }

    return(
        <div className="anime-show AnimeShow" id="anime-show">
            {anime?
            <>
                    <h1>{defaultTitle!}</h1>
                    <h3>{jpTitle!}</h3>
                    <h6>{getEnTitle(anime.titles)}</h6>
                    <Col as={"div"} className="img-col">
                        <img src={anime.images.jpg.large_image_url} alt={`Poster/thumbnail of ${anime.title_english ? anime.title_english : anime.title_japanese}`} style={{maxWidth:"100%"}} />
                        <h6 className="alt-titles">{getSynTitleListStr(anime.titles)}</h6>
                        <h6 className="studios">{getStudioListStr(anime.studios)}</h6>
                        <h6 className="producers">{getProducerListStr(anime.producers)}</h6>
                        <h6 className="licensors">{getLicensorListStr(anime.licensors)}</h6>
                        <h6 className="genres">{getGenreListStr(anime.genres,anime.explicit_genres)}</h6><h6 className="aud-rating">Rating: {anime.rating}</h6>
                        <h6 className="year-season-type">{anime.type} {anime.season ? anime.season[0].toUpperCase() + anime.season.slice(1)+" ":false}{anime.year}</h6>
                    </Col>
                    <Col as={"div"} className="info-col">
                        <p className="synopsis">{anime.synopsis}</p>
                    </Col>
            </>
            :
            <h1>Loading...</h1>
            }
        </div>
    )
}