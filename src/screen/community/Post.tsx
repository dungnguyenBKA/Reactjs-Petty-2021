import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { AppStyle, height, regular, semiBold, textColor, width } from "../../AppStyle";
import {Colors} from "../../AppColor";

interface PostProp{

}

export default function Post(prop: PostProp) {
    return <Card>
        <Container fluid>
            <Col>
                {/* <Header /> */}
            </Col>
        </Container>
    </Card>
}

interface HeaderProp{
    avatarUrl: string,
    petName: string,
    time: number 
}

function Header(props: HeaderProp){
    return <Row>
        <Image src={props.avatarUrl} style={AppStyle(width(41), height(41))} roundedCircle/>

        <Col >
            <p style={AppStyle(textColor(Colors.color_black), semiBold(16))}>{props.petName}</p>
            <p style={AppStyle(textColor(Colors.color_black), regular(13))}>{props.petName}</p>
        </Col>
    </Row>
}