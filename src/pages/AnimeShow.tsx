import { ReactElement, useEffect, useState } from "react";
import "./styles/AnimeShow.css";
import { Params, useParams } from "react-router";
import { AnimeClient,Anime,JikanResponse } from "@tutkli/jikan-ts";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import getJpTitle from "../functions/getJpTitle";

const animeClient:AnimeClient=new AnimeClient();

export default function AnimeShow():ReactElement{
    const params:Params<string> = useParams()
    const malId:number=parseInt(params.malId!);

    const [anime, setAnime] = useState<Anime|null>(null);

    async function getAnimeData() {
        setAnime((await animeClient.getAnimeById(malId)).data);
    }
    
    useEffect(()=>{
        try {
            getAnimeData();  
        } catch (error) {
            console.log(error);
        }
    },[])

    return(
        <div className="anime-show AnimeShow" id="anime-show">
            {anime?
            <>
                    <h1>{anime.titles[0].title}</h1>
                    <h5>{getJpTitle(anime.titles)}</h5>
                    <Col as={"div"} className="img-col">
                        <img src={anime.images.jpg.large_image_url} alt={`Image/Poster of ${anime.title_english ? anime.title_english : anime.title_japanese}`} style={{maxWidth:"100%"}} />
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