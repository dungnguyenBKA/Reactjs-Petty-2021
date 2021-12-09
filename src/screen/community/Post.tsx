import { Card, Image, Row } from "react-bootstrap";
import { FC, useState } from "react";
import icLike from "../../asset/ic_like.svg";
import icLiked from "../../asset/ic_liked.svg";
import icComment from "../../asset/ic_comment.svg";
import icMessenger from "../../asset/ic_messenger.svg";

import {
  AppStyle,
  background,
  borderWidth,
  flexCenter,
  flexCenterInParent,
  flexHori,
  flexVerti,
  height,
  marginEnd,
  marginStart,
  marginTop,
  marginVertical,
  radius,
  semiBold,
  shadow,
  textColor,
  weightItem,
  width,
} from "../../AppStyle";
import { Colors } from "../../AppColor";
import TextView from "../../components/Text";
import Rows from "../../components/Row";
import Column from "../../components/Column";
import MessengerScreen from "../messenger/MessengerScreen";
import { useNavigate } from "react-router";
import ButtonView from "../../components/ButtonView";
import CommentForm from "./CommentForm";

interface PostProp {
  petName: string;
  content: string;
  avatarURL: string;
  imgURL: string;
}

export default function Post(props: PostProp) {
  return (
    <Card style={AppStyle(marginVertical(20), radius(8), shadow(2))}>
      <Card.Body>
        <Header avatarUrl={props.avatarURL} petName={props.petName} />

        <Card.Text style={AppStyle(marginTop(12))}>{props.content}</Card.Text>
      </Card.Body>

      <Card.Img variant="top" src={props.imgURL} />

      <Card.Body>
        <Column>
          <hr style={marginVertical(12)} />
          <Rows>
            <Reaction name="Like" />
            <Reaction name="Comment" />
            <Reaction name="Message" />
          </Rows>
          <CommentForm/>

        </Column>
        
      </Card.Body>
    </Card>
  );
}

interface HeaderProp {
  avatarUrl: string;
  petName: string;
}

function Header(props: HeaderProp) {
  return (
    <div style={AppStyle(flexHori(), flexCenter())}>
      <Image
        src={props.avatarUrl}
        style={AppStyle(width(41), height(41), marginEnd(12))}
        roundedCircle
      />
      <TextView style={AppStyle(semiBold(20))}>{props.petName}</TextView>
    </div>
  );
}

interface ReactionProp {
  name: string;
}

function Reaction(props: ReactionProp) {
  const [isLike, setIsLike] = useState(false);
  const [showComment, setShowComment] = useState(false);
  let navigate = useNavigate();

  const messageHandler = () => {
    navigate("../message");
  };

  const clickHandler = () => {
    if (isLike === true) {
      setIsLike(false);
    } else setIsLike(true);
  };
  return (
    <div>
      {props.name === "Like" && (
        <div style={AppStyle(weightItem(1))}>
          {!isLike && (
            <ButtonView
              style={AppStyle(
                flexHori(),
                background("#FFFFFF"),
                borderWidth(0)
              )}
              onClick={clickHandler}
            >
              <img src={icLike} alt="" />
              <TextView style={AppStyle(marginStart(15))}>
                {props.name}
              </TextView>
            </ButtonView>
          )}
          {isLike && (
            <ButtonView
              style={AppStyle(
                flexHori(),
                textColor("red"),
                background("#FFFFFF"),
                borderWidth(0)
              )}
              onClick={clickHandler}
            >
              <img src={icLiked} alt="" />
              <TextView style={AppStyle(marginStart(15))}>Liked</TextView>
            </ButtonView>
          )}
        </div>
      )}

      {props.name === "Comment" && (
        <Column style = {AppStyle(flexVerti())}>
          <ButtonView
            style={AppStyle(
              background("#FFFFFF"),
              flexHori(),
              borderWidth(0),
              weightItem(1)
            )}
            onClick={() => {
              setShowComment(!showComment);
            }}
          >
            <img src={icComment} alt="" />
            <TextView style={AppStyle(marginStart(15))}>{props.name}</TextView>
          </ButtonView>
          {/* {showComment && <CommentForm />} */}
        </Column>
      )}

      {props.name === "Message" && (
        <ButtonView
          style={AppStyle(
            background("#FFFFFF"),
            flexHori(),
            borderWidth(0),
            weightItem(1)
          )}
          onClick={messageHandler}
        >
          <img src={icMessenger} alt="" />
          <TextView style={AppStyle(marginStart(15))}> {props.name}</TextView>
        </ButtonView>
      )}
    </div>
  );
}
// interface LikeProp {}

// const Like: FC<LikeProp> = () => {

//   return (

//   );
// };

// interface CommentProp {}

// const Comment = (props: CommentProp) => {

//   return (

//   );
// };

// interface MessageProp {}

// const Message = (props: MessageProp) => {

//   return (

//   );
// };
