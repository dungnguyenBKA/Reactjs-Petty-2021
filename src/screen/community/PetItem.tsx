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
import Pet from "../../models/Pet";
import {FC, useContext} from "react";
import {AppCtx} from "../../App";
import {useNavigate} from "react-router-dom";

interface PetItemProp {
	pet: Pet
}


const PetItem: FC<PetItemProp> = (props) => {
	let navigate = useNavigate()
	let pet = props.pet
	const logger = useContext(AppCtx).logger

	let listImages : string[]
	try {
		listImages = JSON.parse(pet.images)
	} catch (e) {
		logger.error(e)
		listImages = []
	}

	let avatar: string
	if(!listImages) {
		avatar = ''
	} else {
		avatar = listImages[0]
	}

	const navigateToPetDetail = () => {
		navigate(`/pet-detail/${pet.id}`)
	}

	return (
		<Paper style={AppStyle(
			radius(8),
			margin(8),
			cursorPointer()
		)} elevation={1} onClick={navigateToPetDetail}>
			<ImageListItem key={pet.id} style={{
				width: '100%',
				height: 'auto'
			}}>
				<Column style={AppStyle(marginBottom(20), width('100%'))}>
					<div>
						<Card.Img style={AppStyle({position: 'relative'}, width('100%'))} src={avatar}/>
						<Card.Img style={AppStyle(width(48), height(48), circleImage(48),
							{position: 'absolute', top: 10, left: 10, borderWidth: 2, borderColor: 'white'})}
						          src={avatar}/>
					</div>

					<Column style={
						AppStyle(
							padding(20)
						)
					}>
						<TextView style={AppStyle(regular(20))}>{pet.name}</TextView>
					</Column>

				</Column>
			</ImageListItem>
		</Paper>
	)
}

export default PetItem
