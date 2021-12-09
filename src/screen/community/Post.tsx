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
import { ImageView } from "../../components/ImageView";

interface PostProp {
  petName: string;
  content: string;
  avatarURL: string;
  imgURL: string;
}

export default function Post(props: PostProp) {
  let navigate = useNavigate()
  let [showCommentForm, setShowCommentForm] = useState(false)
  let [isLikeThisPost, setLikeThisPost] = useState(false)

  let handleLikeClick = () => {
    setLikeThisPost(!isLikeThisPost)
  }

  let handleCommentClick = () => {
    setShowCommentForm(!showCommentForm)
  }

  let handleMessageClick = () => {
    navigate('../message/123456')
  }

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
            <ReactionItem title={isLikeThisPost ? "Liked" : "Like"} onClick={handleLikeClick} icon={isLikeThisPost ? icLiked : icLike}/>
            <ReactionItem title="Comment" onClick={handleCommentClick} icon={icComment}/>
            <ReactionItem title="Message" onClick={handleMessageClick} icon={icMessenger}/>
          </Rows>
          {showCommentForm && <CommentForm />}
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
  title: string
  icon: string
  onClick: () => void
}

const ReactionItem: FC<ReactionProp> = (props) => {
  return (
    <ButtonView
      style={AppStyle(
        flexHori(),
        background("#FFFFFF"),
        borderWidth(0)
      )}
      onClick={props.onClick}
    >
      <ImageView src={props.icon}/>
      <TextView style={AppStyle(marginStart(15))}>
        {props.title}
      </TextView>
    </ButtonView>
  )
}