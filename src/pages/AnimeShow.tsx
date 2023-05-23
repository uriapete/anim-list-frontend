import { ReactElement } from "react";
import "./styles/AnimeShow.css";
import { useParams } from "react-router";

export default function AnimeShow():ReactElement{
    const {malId} = useParams()
    return(
        <h1>Test</h1>
    )
}