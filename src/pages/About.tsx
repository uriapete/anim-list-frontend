import { ReactElement } from "react";

export default function About():ReactElement{
    return(
        <div className="about">
            <h1>Hi! This is MoeList!</h1>
            <p>Feeling bored? New to the medium? You can search up random anime here.</p>
            <h2>This project was built with...</h2>
            <ul>
                <li>TypeScript - basically JavaScript but with types.</li>
                <li>React - front end</li>
                <li>React Router - allows for a dynamic app without page reloading</li>
                <li>Bootstrap-React - Some CSS styling done for me</li>
                <li>Node.js - Deployment + installing dependencies</li>
                <li>Jikan - Unofficial MAL API for fetching anime data</li>
                <li>Jikan-TS - Wrapper for Jikan-TS built with and for TypeScript</li>
            </ul>
        </div>
    )
}