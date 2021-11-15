import { ButtonGroup, ButtonToolbar, Card, Col, Container, Image } from "react-bootstrap";
import { AppStyle, background, borderWidth, flexCenter, flexCenterInParent, flexHori, flexVerti, height, margin, marginBottom, marginStart, marginTop, marginVertical, radius, regular, semiBold, shadow, textColor, weightItem, width } from "../../AppStyle";
import { Colors } from "../../AppColor";
import Button from "@restart/ui/esm/Button";
import { link } from "fs";
import TextView from "../../components/Text";
import Row from "../../components/Row";
import Column from "../../components/Column";
import icHotLike from "../../asset/ic_hot_like.svg";
import icComment from "../../asset/ic_comment.svg";
import icMessagefrom from "../../asset/ic_message.svg";





interface PostProp {
    petName: string,
    content: string,
    avatarURL: string,
    imgURL: string

}

export default function Post(prop: PostProp) {
    return <Card style={AppStyle(width(502), marginVertical(20), radius(8), shadow(2))}>
        <Card.Body>
            <div style={AppStyle(flexHori(), flexCenter())}>
                <Image src={prop.avatarURL} style={AppStyle(width(41), height(41))} roundedCircle />
                <p style={AppStyle(marginBottom(0), marginStart(8))}>{prop.petName}</p>
            </div>

            <Card.Text style={AppStyle(marginTop(12))}>
                {prop.content}
            </Card.Text>
        </Card.Body>

        <Card.Img variant="top" src={prop.imgURL} />

        <Card.Body>

        <Column>
        <hr style={marginVertical(12)}/>
        <Row >
            <Reaction name={"Like"} />
            <Reaction name={"Comment"} />
            <Reaction name={"Message"} />
        </Row>
        <hr style={marginVertical(12)}/>
        </Column>

        </Card.Body>
        
        

    </Card>
}

interface HeaderProp {
    avatarUrl: string,
    petName: string,
    time: number
}

function Header(props: HeaderProp) {
    return <Row>
        <Image src={props.avatarUrl} style={AppStyle(width(41), height(41))} roundedCircle />

        <Col >
            <p style={AppStyle(textColor(Colors.color_black), semiBold(16))}>{props.petName}</p>
            <p style={AppStyle(textColor(Colors.color_black), regular(13))}>{props.petName}</p>
        </Col>
    </Row>
}
interface ReactionProp {
    name: string

}
function Reaction(props: ReactionProp) {
    return(
    <button style={AppStyle(weightItem(1),borderWidth(0), flexHori(), flexCenterInParent(),
         background(Colors.color_white))}>
        <TextView style={AppStyle(semiBold(15))}>{props.name}</TextView>
    </button>
    )
}