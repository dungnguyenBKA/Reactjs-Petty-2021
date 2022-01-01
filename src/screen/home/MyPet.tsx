import {
	AppStyle,
	background,
	border,
	flexCenter,
	flexHori,
	flexVerti,
	height,
	margin,
	marginHori,
	marginStart,
	marginTop,
	padding,
	paddingEnd,
	paddingStart,
	paddingVerti,
	radius,
	regular,
	semiBold,
	shadow,
	textColor,
	textWeight,
	weightItem,
	width
} from '../../AppStyle'

import maleLogo from '../../asset/ic_male.svg'
import femaleLogo from '../../asset/ic_female.svg'
import ic_add from '../../asset/ic_add.png'
import React, {FC, useContext, useEffect, useState} from 'react'
import {useNavigate} from 'react-router'
import Pet from '../../models/Pet'

import {BaseHTMLProps} from '../../components/Props';
import {ImageView} from '../../components/ImageView'
import {AppCtx} from "../../App";
import Logger from "../../api/Logger";
import {ImageList} from "@mui/material";
import Column from "../../components/Column";
import ButtonView from "../../components/ButtonView";
import DateHelper from "../../helper/DateHelper";

export default function MyPet() {
	const [pets, setPets] = useState<Pet[]>([]);
	let appContext = useContext(AppCtx);
	let appApi = appContext.appApi;


	let navigate = useNavigate()
	const addPet = () => {
		navigate('../add-pet')
	}

	useEffect(() => {
		let controller = new AbortController()
		const fetchMyPets = async () => {
			try {
				let res = await appApi.getMyPets(controller);
				let resData = res.data;
				if (resData.statusCode === 200) {
					setPets(resData.data);
				}
			} catch (e) {
				//
			}
		}

		fetchMyPets().then(() => {
			Logger.log('fetch done')
		})

		return () => {
			controller.abort()
		}
	}, [])

	return <div style={AppStyle(margin(20), padding(0))}>
		<div style={AppStyle(flexHori(), flexCenter())}>
			<p style={AppStyle(weightItem(1), textWeight(700))}>Pet của tui ({pets.length})</p>
			<ButtonView style={AppStyle(textColor('#00C181'))}>Xem tất cả</ButtonView>
		</div>

		<Column>
			<ImageList variant="masonry" cols={2} gap={0}>
				{
					pets.map(function (pet) {
						return <MyPetItem key={pet.id} pet={pet}/>
					})
				}

			</ImageList>
			<CreatePetButton eventClick={addPet}/>

		</Column>


	</div>
}

interface MyPetItemProps extends BaseHTMLProps {
	pet: Pet
}

const MyPetItem: FC<MyPetItemProps> = (props) => {
	let genderImg;
	let pet = props.pet
	if (pet.gender === "Male") {
		genderImg = maleLogo
	} else {
		genderImg = femaleLogo
	}

	let images: string[] = JSON.parse(pet.images)
	let avatar = ''
	if (!images) {
		//
	} else {
		avatar = images[0]
	}

	const navigate = useNavigate()

	return <div onClick={
		() => navigate(`../pet-detail/${pet.id}`)
	}
	            style={AppStyle(flexHori(), marginHori(6), paddingVerti(16), paddingStart(16), paddingEnd(54), flexCenter(), border("#EEEFF4"),
		            radius(8), shadow(8))}>
		<ImageView style={AppStyle(
			width(42), height(42), radius(21), background('#000000')
		)} src={avatar}/>

		<div style={AppStyle(flexVerti(), marginStart(12))}>
			<div style={AppStyle(flexHori(), margin(0))}>
				<p style={AppStyle(margin(0), semiBold(14))}>{pet.name}</p>
				<ImageView style={AppStyle(marginStart(3), width(18), height(18))} src={genderImg}/>
			</div>
			<p style={AppStyle(marginTop(2), regular(12), textColor('#969BAB'))}>{DateHelper.formatStringToDate(pet.dob)?.toDateString()}</p>
		</div>
	</div>
}

interface CreatePetButtonProps {
	eventClick: () => void
}

const CreatePetButton: FC<CreatePetButtonProps> = (props) => {
	return <div onClick={props.eventClick}
	            style={AppStyle(flexHori(), padding(16), flexCenter(), border("#EEEFF4"), radius(8), shadow())}>
		<ImageView style={AppStyle(
			width(42), height(42), radius(21)
		)} src={ic_add}/>

		<div style={AppStyle(flexVerti(), marginStart(12))}>
			<div style={AppStyle(marginTop(2), semiBold(14), textColor('#969BAB'))}>
				<p>Thêm mới Pet</p>
			</div>
		</div>
	</div>

}
