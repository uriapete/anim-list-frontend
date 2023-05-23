import { ReactElement, useEffect, useState } from "react";
import "./styles/AnimeShow.css";
import { Params, useParams } from "react-router";
import { AnimeClient,Anime,JikanResponse } from "@tutkli/jikan-ts";

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
                <h1>{anime.title_english}</h1>
            </>
            :
            <h1>Loading...</h1>
            }
        </div>
    )
}