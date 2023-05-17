import { ReactElement } from "react";
import { AnimeClient,JikanClient,JikanResource,Anime } from "@tutkli/jikan-ts";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./styles/AnimIndex.css"

export default function AnimIndex():ReactElement {
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
        
        </div>
    );
}