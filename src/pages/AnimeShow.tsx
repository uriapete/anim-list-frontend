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

const animeClient:AnimeClient=new AnimeClient();

export default function AnimeShow():ReactElement{
    const params:Params<string> = useParams()
    const malId:number=parseInt(params.malId!);

    const [anime, setAnime] = useState<Anime|null>(null);

    async function getAnimeData() {
        setAnime((await animeClient.getAnimeFullById(malId)).data);
    }
    
    useEffect(()=>{
        try {
            getAnimeData();  
        } catch (error) {
            console.log(error);
        }
    },[])

    // console.log(anime)

    return(
        <div className="anime-show AnimeShow" id="anime-show">
            {anime?
            <>
                    <h1>{anime.titles[0].title}</h1>
                    <h5>{getJpTitle(anime.titles)}</h5>
                    <Col as={"div"} className="img-col">
                        <img src={anime.images.jpg.large_image_url} alt={`Poster/thumbnail of ${anime.title_english ? anime.title_english : anime.title_japanese}`} style={{maxWidth:"100%"}} />
                        <h6 className="alt-titles">{getSynTitleListStr(anime.titles)}</h6>
                        <h6 className="studios">{getStudioListStr(anime.studios)}</h6>
                        <h6 className="licensors">{getLicensorListStr(anime.licensors)}</h6>
                        <h6 className="genres">{getGenreListStr(anime.genres,anime.explicit_genres)}</h6>
                        {/* <h6 className="anime-type">{anime.type}</h6>
                        {anime.source ? <h6 className="source-type">Adapted from: {anime.source}</h6>:null} */}
                    </Col>
                    <Col as={"div"} className="info-col">
                        <p>{anime.synopsis}</p>
                    </Col>
            </>
            :
            <h1>Loading...</h1>
            }
        </div>
    )
}