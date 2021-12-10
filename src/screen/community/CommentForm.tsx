import { FC, useState } from "react";
import { useNavigate } from "react-router";
import {
  AppStyle,
  background,
  circleImage,
  flexCenter,
  height,
  margin,
  overFlow,
  paddingHori,
  paddingVerti,
  regular,
  semiBold,
  shadow,
  borderWidth,
  radius,
  weightItem,
  width,
  marginVertical,
  maxWidth,
  fitContain,
  minWidth,
  flexShrink,
  maxHeight,
  marginStart,
  marginEnd,
  marginHori,
  minHeight,
} from "../../AppStyle";
import ButtonView from "../../components/ButtonView";
import Column from "../../components/Column";
import { ImageView } from "../../components/ImageView";
import Rows from "../../components/Row";
import TextView from "../../components/Text";
import User, { getRamdomFakeUser } from "../../models/User";
import "../messenger/ListMessengerScreen.css";
interface CommentFormProp {
  count?: any
}

const CommentForm = (props: CommentFormProp) => {
  let lorem =
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi debitis eos sunt veritatis maiores cupiditate optio suscipit quo? Sequi dolorum cum voluptate libero voluptatum quam recusandae eveniet minima consequuntur aliquam!";

  let fakeCommentUsers: CommentItemProp[] = Array.from(Array(10).keys()).map(
    () => {
      return {
        user: getRamdomFakeUser(),
        lastComment: lorem,
      };
    }
  );

  props.count(fakeCommentUsers.length);


  return (
    <div style={AppStyle(weightItem(1))}>
      {fakeCommentUsers.map((item) => {
        return <CommentItem user={item.user} lastComment={item.lastComment} />;
      })}
      <input
        type="text"
        id="comment"
        placeholder="Bình luận..."
        style={AppStyle(
          width("auto"),
          borderWidth(0),
          paddingHori(15),
          radius(20),
          minHeight(40),
          background("#F1F2F5"),
          width("100%"),
          maxWidth("100%")
        )}
      />
    </div>
  );
};

export default CommentForm;

interface CommentItemProp {
  user: User;
  lastComment: string;
}

const CommentItem: FC<CommentItemProp> = (props) => {
  let user = props.user;
  let navigate = useNavigate();


  let handleItemClick = () => {
      navigate('/pet-detail/1')
  }

  return (
    <Rows
      style={AppStyle(
        paddingVerti(8),
        paddingHori(12),
        marginVertical(12),
        flexCenter(),
        maxWidth("100%"),
        radius(30),
        background("#F1F2F5"),
        maxHeight("auto")
      )}
    >
      <ButtonView style={AppStyle(width(60), height(60), marginEnd(20))} onClick = {handleItemClick}>
        <ImageView style={AppStyle(circleImage(60))} src={user.avatar} />
      </ButtonView>

      <Column
        style={AppStyle(background("#F1F2F5"), height("100%"), flexShrink())}
      >
      <TextView style={AppStyle(semiBold(17))}>{user.name}</TextView>

        <TextView style={AppStyle(overFlow())}>{props.lastComment}</TextView>
      </Column>
    </Rows>
  );
};

// className="single-line-text"
