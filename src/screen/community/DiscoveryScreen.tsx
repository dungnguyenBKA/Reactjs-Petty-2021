import { Col, Container, Row } from "react-bootstrap"

interface DiscoveryScreenProp{
    
}

export default function DiscoveryScreen(prop: DiscoveryScreenProp) {
    return <Container fluid>
        <Row>
            <Col>1 of 1</Col>
            <Col>2 of 1</Col>
            <Col>3 of 1</Col>
            <Col>4 of 1</Col>
        </Row>
    </Container>
}