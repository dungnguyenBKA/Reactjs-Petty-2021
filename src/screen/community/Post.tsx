import {Card, Image} from "react-bootstrap";
import {FC, useState} from "react";
import icLike from "../../asset/ic_like.svg";
import icLiked from "../../asset/ic_liked.svg";
import icComment from "../../asset/ic_comment.svg";
import icMessenger from "../../asset/ic_messenger.svg";

import {
	AppStyle,
	background, bold,
	borderWidth, circleImage,
	flexCenter,
	flexCenterInParent,
	flexHori,
	flexShrink,
	height,
	margin,
	marginBottom,
	marginEnd,
	marginStart,
	marginTop,
	marginVertical, maxWidth,
	minWidth,
	radius,
	semiBold,
	shadow,
	weightItem,
	width,
} from "../../AppStyle";
import TextView from "../../components/Text";
import Rows from "../../components/Row";
import Column from "../../components/Column";
import {useNavigate} from "react-router";
import ButtonView from "../../components/ButtonView";
import CommentForm from "./CommentForm";
import {ImageView} from "../../components/ImageView";
import { ImageList, ImageListItem, Paper } from "@mui/material";

interface PostProp {
	petName: string;
	// content: string;
	avatarURL: string;
	imgURL: string;
}


export default function PostItem(props: PostProp) {
	let navigate = useNavigate();
	let [showCommentForm, setShowCommentForm] = useState(false);
	let [isLikeThisPost, setLikeThisPost] = useState(false);
	let [countLike, setCountLike] = useState(100);
	let [countComment, setCountComment] = useState(100);

	let handleLikeClick = () => {
		if (!isLikeThisPost) {
			setLikeThisPost(true);
			setCountLike(countLike + 1);
		} else {
			setLikeThisPost(false);
			setCountLike(100);
		}
	};

	let handleCommentClick = () => {
		setShowCommentForm(!showCommentForm);
	};

	let handleMessageClick = () => {
		navigate("../message/123456");
	};


	return (
		// <Card style={AppStyle(margin(20), radius(8), shadow(2),
		// 	maxWidth('100%'),  weightItem(1), flexShrink(0), {flexBasic: '30%'})}>
        //
        //
        //
		// 	<Card.Img style ={AppStyle({position: 'relative'})} src={props.imgURL}/>
		// 	<Card.Img style={AppStyle(width(48),height(48), circleImage(48),
		// 		{position: 'absolute', top: 10, left: 10, borderWidth: 2, borderColor: 'white'})}
		// 			  src={props.avatarURL}/>
        //     <div style ={{margin: 20}}>
        //         <Header petName={props.petName} />
        //
        //     </div>
        //
        //
		// </Card>
		<Paper style={AppStyle(
			radius(4),
			margin(16),
		)} elevation={1}>
            <ImageListItem key={props.avatarURL} style={{
                width: '100%',
                height: 'auto'
            }}>
                <Column style={AppStyle(marginBottom(20), width('100%'))}>
                    {/*<ImageView*/}
                    {/*    style={*/}
                    {/*        AppStyle(*/}
                    {/*            width('100%')*/}
                    {/*        )*/}
                    {/*    }*/}
                    {/*    src={props.imgURL}*/}
                    {/*/>*/}
                    <Card.Img style ={AppStyle({position: 'relative'}, width('100%'))} src={props.imgURL}/>
                    <Card.Img style={AppStyle(width(48),height(48), circleImage(48),
                    		{position: 'absolute', top: 10, left: 10, borderWidth: 2, borderColor: 'white'})}
                    			  src={props.avatarURL}/>
                   <TextView style={AppStyle(margin(20), bold(20))}>{props.petName}</TextView>

                </Column>

            </ImageListItem>
		</Paper>
    // <ImageList variant="masonry" cols={3} gap={8}>
    //     {itemData.map((item) => (
    //         <ImageListItem key={item.img}>
    //             <img
    //                 src={`${item.img}?w=248&fit=crop&auto=format`}
    //                 srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
    //                 alt={item.title}
    //                 loading="lazy"
    //             />
    //         </ImageListItem>
    //     ))}
    // </ImageList>



    )

		{/*	<Card.Body>*/}
		{/*		<Column>*/}
		{/*			<hr style={marginVertical(12)}/>*/}
		{/*			<Rows>*/}
		{/*	*/}
		{/*				<ReactionItem*/}
		{/*					title={*/}
		{/*						isLikeThisPost*/}
		{/*							? `You and ${countLike - 1} people Liked`*/}
		{/*							: `${countLike} people like`*/}
		{/*					}*/}
		{/*					onClick={handleLikeClick}*/}
		{/*					icon={isLikeThisPost ? icLiked : icLike}*/}
		{/*				/>*/}
		{/*				<ReactionItem*/}
		{/*					title={`${countComment} people commented`}*/}
		{/*					onClick={handleCommentClick}*/}
		{/*					icon={icComment}*/}
		{/*				/>*/}
		{/*				<ReactionItem*/}
		{/*					title="Message"*/}
		{/*					onClick={handleMessageClick}*/}
		{/*					icon={icMessenger}*/}
		{/*				/>*/}
		{/*			</Rows>*/}
		{/*			{showCommentForm && <CommentForm/>}*/}
		{/*		</Column>*/}
		{/*	</Card.Body>*/}

}

interface HeaderProp {
	// avatarUrl: string;
	petName: string;
}

function Header(props: HeaderProp) {
	return (
		<div style={AppStyle(flexHori(), flexCenter())}>
			{/*<Image*/}
			{/*	src={props.avatarUrl}*/}
			{/*	style={AppStyle(width(41), height(41), marginEnd(12))}*/}
			{/*	roundedCircle*/}
			{/*/>*/}
			<TextView style={AppStyle(semiBold(20))}>{props.petName}</TextView>
		</div>
	);
}

interface ReactionProp {

	title: any;
	icon: string;
	onClick: () => void;
}

const ReactionItem: FC<ReactionProp> = (props) => {
	return (
		<ButtonView
			style={AppStyle(
				flexHori(),
				background("#FFFFFF"),
				borderWidth(0),
				weightItem(1),
				flexCenterInParent()
			)}
			onClick={props.onClick}
		>
			<ImageView src={props.icon}/>
			<TextView style={AppStyle(marginStart(15))}>{props.title}</TextView>
		</ButtonView>
	);
};
