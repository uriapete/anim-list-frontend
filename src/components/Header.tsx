import { ReactElement } from "react";
import Nav from "react-bootstrap/Nav";
import "./styles/Header.css"

export default function Header():ReactElement {
    return(
        <header>
            <h1>MoeList!</h1>
            <h6>Note: Still under construction!</h6>
            <Nav as={"nav"} variant="pills">
                <Nav.Item>
                    <Nav.Link href="/" >Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/random" >Random</Nav.Link>
                </Nav.Item>
            </Nav>
        </header>
    )
}