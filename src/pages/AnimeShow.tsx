import { ReactElement } from "react";
import "./styles/AnimeShow.css";
import { Params, useParams } from "react-router";
import { AnimeClient,Anime,JikanResponse } from "@tutkli/jikan-ts";

const animeClient:AnimeClient=new AnimeClient();

export default function AnimeShow():ReactElement{
    const params:Params<string> = useParams()
    const malId:number=parseInt(params.malId!);
    return(
        <h1>Test</h1>
    )
}