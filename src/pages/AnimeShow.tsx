import { ReactElement } from "react";
import "./styles/AnimeShow.css";
import { Params, useParams } from "react-router";

export default function AnimeShow():ReactElement{
    const params:Params<string> = useParams()
    const malId:number=parseInt(params.malId!);
    return(
        <h1>Test</h1>
    )
}