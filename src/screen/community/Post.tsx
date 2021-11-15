import { ButtonGroup, ButtonToolbar, Card, Col, Container, Image } from "react-bootstrap";
import { AppStyle, background, borderWidth, flexCenter, flexCenterInParent, flexHori, flexVerti, height, margin, marginBottom, marginEnd, marginStart, marginTop, marginVertical, radius, regular, semiBold, shadow, textColor, weightItem, width } from "../../AppStyle";
import { Colors } from "../../AppColor";
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

export default function Post(props: PostProp) {
    return <Card style={AppStyle(width(500), marginVertical(20), radius(8), shadow(2))}>
        <Card.Body>
            <Header avatarUrl={props.avatarURL} petName={props.petName} />

            <Card.Text style={AppStyle(marginTop(12))}>
                {props.content}
            </Card.Text>
        </Card.Body>

        <Card.Img variant="top" src={props.imgURL} />

        <Card.Body>

            <Column>
                <hr style={marginVertical(12)} />
                <Row >
                    <Reaction name={"Like"} />
                    <Reaction name={"Comment"} />
                    <Reaction name={"Message"} />
                </Row>
                <hr style={marginVertical(12)} />
            </Column>

        </Card.Body>
    </Card>
}

interface HeaderProp {
    avatarUrl: string,
    petName: string
}

function Header(props: HeaderProp) {
    return (
        <div style={AppStyle(flexHori(), flexCenter())}>
            <Image src={props.avatarUrl} style={AppStyle(width(41), height(41), marginEnd(12))} roundedCircle />
            <TextView style={AppStyle(semiBold(20))}>{props.petName}</TextView>
        </div>
    )
}

interface ReactionProp {
    name: string
}

function Reaction(props: ReactionProp) {
    return (
        <button style={AppStyle(weightItem(1), borderWidth(0), flexHori(), flexCenterInParent(),
            background(Colors.color_white))}>
            <TextView style={AppStyle(semiBold(15))}>{props.name}</TextView>
        </button>
    )
}