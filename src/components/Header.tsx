import { ReactElement } from "react";
import Nav from "react-bootstrap/Nav";
import "./styles/Header.css"
import { Link } from "react-router-dom";

export default function Header():ReactElement {
    return(
        <header>
            <Link to={"/"}>
                <h1>MoeList!</h1>
            </Link>
            <h6>A place to look at random anime!</h6>
            <Nav as={"nav"} variant="pills">
                <Nav.Item>
                    <Nav.Link as={Link} to="/" >Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/about" >About</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} to="/anime/random" >Random</Nav.Link>
                </Nav.Item>
            </Nav>
        </header>
    )
}