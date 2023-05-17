import { ReactElement } from "react";
import { AnimeClient,JikanClient,JikanResponse,Anime } from "@tutkli/jikan-ts";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./styles/AnimIndex.css"
import { useLocation } from "react-router";


export default function AnimIndex():ReactElement {
    const search:string= useLocation().search;
    const searchStr:string|null = new URLSearchParams(search).get("s");
    return(
        <div className="AnimIndex">
            <Container className="search-container">
                <Form className="search">
                    <Form.Group className="" as={Row} controlId="search-bar">
                        <Form.Label column xs="auto" sm="2">
                            Search: 
                        </Form.Label>
                        <Col>
                            <Form.Control type="text" size="sm"/>
                        </Col>
                    </Form.Group>
                </Form>
            </Container>
            {searchStr ? <h1>Hello owo</h1> : <h1>No search uwu</h1>}
        </div>
    );
}