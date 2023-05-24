import { ReactElement, useEffect, useState } from "react";
import "./styles/AnimeShow.css";
import { Params, useParams } from "react-router";
import { AnimeClient,Anime,JikanResponse } from "@tutkli/jikan-ts";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

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
                    {anime.title_english ? (
                        // display english in big and jp below it in small
                        <>
                            <h1 className="anime-title anime-title-en">{anime.title_english}</h1>
                            <h6 className="anime-title anime-title-jp">{anime.title_japanese}</h6>
                        </>
                        // else, if an english title doesn't exist:
                    ) : (
                        // only display jp in big
                        <h1 className="anime-title anime-title-jp anime-title-jp-big">{anime.title_japanese}</h1>
                    )}
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