import {Card} from "react-bootstrap";

import {
	AppStyle,
	circleImage,
	cursorPointer,
	height,
	margin,
	marginBottom,
	padding,
	radius,
	regular,
	width,
} from "../../AppStyle";
import TextView from "../../components/Text";
import Column from "../../components/Column";
import {ImageListItem, Paper} from "@mui/material";

interface PostProp {
	petName: string;
	avatarURL: string;
	imgURL: string;
}


export default function PostItem(props: PostProp) {
	return (
		<Paper style={AppStyle(
			radius(8),
			margin(8),
			cursorPointer()
		)} elevation={1}>
			<ImageListItem key={props.avatarURL} style={{
				width: '100%',
				height: 'auto'
			}}>
				<Column style={AppStyle(marginBottom(20), width('100%'))}>
					<div>
						<Card.Img style={AppStyle({position: 'relative'}, width('100%'))} src={props.imgURL}/>
						<Card.Img style={AppStyle(width(48), height(48), circleImage(48),
							{position: 'absolute', top: 10, left: 10, borderWidth: 2, borderColor: 'white'})}
						          src={props.avatarURL}/>
					</div>

					<Column style={
						AppStyle(
							padding(20)
						)
					}>
						<TextView style={AppStyle(regular(20))}>{props.petName}</TextView>
					</Column>

				</Column>
			</ImageListItem>
		</Paper>
	)
}