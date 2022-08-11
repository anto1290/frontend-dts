import { Navbar, Container, Nav } from 'react-bootstrap';
const HeaderComponent = () => {
    return (
        <Navbar bg="dark" variant="dark" sticky="top">
            <Container>
                <Navbar.Brand href="/">Muhammad Nurwibawanto</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link>Home</Nav.Link>

                </Nav>
            </Container>
        </Navbar>
    )
}

export default HeaderComponent