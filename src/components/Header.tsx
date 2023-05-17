import { ReactElement } from "react";
import { Nav } from "react-bootstrap";

export default function Header():ReactElement {
    return(
        <header>
            <h1>MoeList!</h1>
            <Nav variant="pills">
                <Nav.Item>
                    <Nav.Link href="/home" >Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/random" >Random</Nav.Link>
                </Nav.Item>
            </Nav>
        </header>
    )
}