import {
	AppStyle,
	background,
	border, cursorPointer, fitContain,
	flexCenter,
	flexHori,
	flexVerti,
	height,
	margin,
	marginHori,
	marginStart,
	marginTop, marginVertical, maxHeight, maxWidth,
	padding,
	paddingEnd, paddingHori,
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
import {Avatar, ImageList} from "@mui/material";
import Column from "../../components/Column";
import ButtonView from "../../components/ButtonView";
import DateHelper from "../../helper/DateHelper";
import Rows from "../../components/Row";
import ApiHelper, {NetworkErrorHandler} from "../../api/ApiHelper";
import {AxiosError} from "axios";

export default function MyPet() {
	const [pets, setPets] = useState<Pet[]>([]);
	let appContext = useContext(AppCtx);
	let appApi = appContext.appApi;
	let user = appContext.currentUser
	const setLoading = appContext.setLoading

	let navigate = useNavigate()
	const addPet = () => {
		navigate('../add-pet')
	}

	useEffect(() => {
		let controller = new AbortController()
		const fetchMyPets = async () => {
			if(!user) {
				return
			}
			setLoading(true)
			try {
				let res = await appApi.ensureAuthorize(user.email, user.pwd, () => {
					return appApi.getMyPets(controller)
				});
				let resData = res.data;
				if (resData.statusCode === 200) {
					setPets(resData.data);
				}
			} catch (e) {
				ApiHelper.handleCallApiError(e, new class implements NetworkErrorHandler {
					onNetworkError(e: AxiosError): void {
						if(e.response?.data.message) {
							Logger.errorToast(e.response?.data.message)
						} else {
							Logger.errorToast()
						}
					}

					onOtherError(e: unknown): void {
						Logger.errorToast()
					}
				}())
			} finally {
				setLoading(false)
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

		<Column style={paddingHori(20)} >
			<p style={AppStyle(weightItem(1), textWeight(700))}>Pet của tui ({pets.length})</p>

				{
					pets.map(function (pet) {
						return <MyPetItem key={pet.id} pet={pet}/>
					})
				}


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
	if (pet.gender === "Đực") {
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
	            style={AppStyle(flexHori(),flexCenter(),marginVertical(12), height('auto'),width('100%'), paddingVerti(16), paddingStart(16), paddingEnd(54), flexCenter(), border("#EEEFF4"),
		            radius(8), shadow(8), cursorPointer())}>

		<Avatar src={avatar} style={AppStyle(
			width(42), height(42),
		)}>

		</Avatar>

		<Column style={AppStyle(marginStart(12))}>
			<Rows style={AppStyle( margin(0))}>
				<p style={AppStyle(margin(0), semiBold(14))}>{pet.name}</p>
				<ImageView style={AppStyle(marginStart(5), width(12),
					height(17), maxHeight('100%'), maxWidth('100%'), fitContain())} src={genderImg}/>



			</Rows>
			<p style={AppStyle(marginTop(2), regular(12),
				textColor('#969BAB'))}>{new Date(pet?.dob as string).toDateString()}</p>


		</Column>

	</div>
}

interface CreatePetButtonProps {
	eventClick: () => void
}

const CreatePetButton: FC<CreatePetButtonProps> = (props) => {
	return <div onClick={props.eventClick}
	            style={AppStyle(flexHori(),marginVertical(12),flexCenter(), padding(16), flexCenter(), border("#EEEFF4"), radius(8), shadow(8))}>
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
