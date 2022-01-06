import React, {FC, useContext, useEffect, useState} from "react";
import {
	AppStyle,
	bold,
	border,
	borderWidth,
	circleImage,
	flexCenter,
	height,
	margin,
	marginHori,
	marginTop,
	padding,
	radius,
	regular,
	semiBold,
	shadow,
	textColor,
	weightItem,
	width
} from "../../AppStyle";
import Column from "../../components/Column";
import {ButtonImageView, ImageView} from "../../components/ImageView";
import Rows from "../../components/Row";
import TextView from "../../components/Text";

import icMessageToOwner from '../../asset/ic_message_to_owner.svg'
import {Colors} from "../../AppColor";
import {BaseHTMLProps} from "../../components/Props";
import {useParams} from "react-router";
import User from "../../models/User";
import Pet from "../../models/Pet";
import {AppCtx} from "../../App";
import Logger from "../../api/Logger";
import {useNavigate} from "react-router-dom";
import Constants from "../../api/Constants";
import axios from "axios";
import {Avatar, Typography} from "@mui/material";
import {deepPurple} from "@mui/material/colors";
import DateHelper from "../../helper/DateHelper";

interface PetDetailProp {

}

const PetDetail: FC<PetDetailProp> = () => {
	const params = useParams()
	let [pet, setPet] = useState<Pet>()
	let [user, setUser] = useState<User>()
	let petId = params.petId ? params.petId : ''
	const appContext = useContext(AppCtx)
	const appApi = appContext.appApi
	const setLoading = appContext.setLoading

	const [avatar, setAvatar] = useState('')

	useEffect(() => {
		let controller = new AbortController()

		const fetchUserData = async (userId: number) => {
			setLoading(true)
			try {
				let res = await appApi.getUserById(userId, controller)
				let resData = res.data
				if (resData.statusCode === 200) {
					setUser(resData.data)
				} else {

				}
			} catch (e) {
				Logger.error(e)
			} finally {
				setLoading(false)
			}
		}

		const fetchPetDetail = async () => {
			setLoading(true)
			try {
				let res = await appApi.getPetById(petId, controller)
				let resData = res.data
				if (resData.statusCode === 200) {
					let pet = resData.data

					try {
						let images: string[] = JSON.parse(pet.images)
						setAvatar(images[0])
					} catch (e) {
						setAvatar('')
					}

					let userId = pet.userId
					setPet(resData.data)
					await fetchUserData(userId)
				} else {

				}
			} catch (e) {
				Logger.error(e)
			} finally {
				setLoading(false)
			}
		}
		fetchPetDetail().then(
			() => Logger.log('fetched data pet')
		)
		return () => {
			controller.abort()
		}
	}, [])


	if (!petId) {
		Logger.errorToast()
		return null
	}

	return <Column style={AppStyle(border(Colors.color_E5E5E5))}>
		<Column style={AppStyle(flexCenter())}>
			<ImageView style={AppStyle(width('100%'), height(300))} src={avatar}/>
			<Rows>
				<Column style={AppStyle(marginTop(-100), flexCenter())}>
					<Avatar src={avatar} style={AppStyle(circleImage(200))}/>
					<Typography style={AppStyle(bold(24), flexCenter())}>{pet?.name}</Typography>
				</Column>
			</Rows>
		</Column>


		<Rows>

			<InfoBox>
				<Column>
					<TextView style={AppStyle(regular(12), textColor(Colors.color_8A8A8F))}>Ngày sinh</TextView>
					<TextView style={AppStyle(semiBold(14))}>{pet?.dob}</TextView>
				</Column>
			</InfoBox>

			<InfoBox>
				<Column>
					<TextView style={AppStyle(regular(12), textColor(Colors.color_8A8A8F))}>Bộ tộc</TextView>
					<TextView style={AppStyle(semiBold(14))}>{pet?.class}</TextView>
				</Column>
			</InfoBox>
		</Rows>


		<InfoBox>
			<Column>
				<TextView style={AppStyle(regular(12), textColor(Colors.color_8A8A8F))}>Nguồn gốc</TextView>
				<TextView style={AppStyle(semiBold(14))}>{pet?.resource}</TextView>
			</Column>
		</InfoBox>

		<InfoBox>
			<Column>
				<TextView style={AppStyle(regular(12), textColor(Colors.color_8A8A8F))}>Nơi cư trú</TextView>
				<TextView style={AppStyle(semiBold(14))}>{pet?.address}</TextView>
			</Column>
		</InfoBox>


		<InfoBox>
			<Column>
				<TextView style={AppStyle(regular(12), textColor(Colors.color_8A8A8F))}>Pet ID</TextView>
				<TextView
					style={AppStyle(semiBold(14), textColor(Colors.color_primary))}>Hello {pet?.name}</TextView>
			</Column>
		</InfoBox>
		<ContactBox user={user}/>
	</Column>
}

interface ContactBoxProp extends BaseHTMLProps {
	user: User | undefined
}

const ContactBox: FC<ContactBoxProp> = (props) => {
	const toUser = props.user
	const context = useContext(AppCtx)
	const chatApi = context.chatApi
	const me = context.currentUser
	const navigate = useNavigate()

	const getOrCreateChatWithThisUser = async () => {
		if (!me || !toUser) {
			return
		}
		try {
			const config = {
				headers: {
					'user-name': me.email,
					'user-secret': me.pwd,
					'public-key': Constants.MESSENGER_PROJECT_ID
				}
			}

			let bodyData = {
				'usernames': [toUser.email],
				'is_direct_chat': true
			}

			let res = await axios.create({
				baseURL: "https://api.chatengine.io/"
			}).put<any>(
				Constants.chatEndPoint.CHATS, bodyData, config
			)

			if (res.status === 200) {
				Logger.successToast("Đã tạo tin nhắn thành công, vào messenger để chat nhé!")
			} else {
				Logger.errorToast()
			}
		} catch (e) {
			Logger.errorToast()
		}
	}

	useEffect(() => {
		if (!me) {
			navigate('../login')
		}
	}, [])

	return <Rows
		style={AppStyle(margin(12), shadow(8), padding(12), radius(8), borderWidth(1), border(Colors.color_E5E5E5))}>

		{toUser?.avatar === null &&
            <Avatar sx={{bgcolor: deepPurple[500]}}>{toUser.name.slice(0, 2).toUpperCase()}</Avatar>}
		{toUser?.avatar !== null && <Avatar style={AppStyle(circleImage(36))} src={toUser?.avatar}/>}


		{/*<ImageView src={user?.avatar} style={AppStyle(circleImage(36))}/>*/}
		<Column style={AppStyle(weightItem(1), marginHori(16))}>
			<TextView style={regular(13)}>Liên hệ với Chủ</TextView>
			<TextView style={semiBold(15)}>{toUser?.name}</TextView>
		</Column>
		<ButtonImageView
			src={icMessageToOwner}
			onClick={
				() => {
					getOrCreateChatWithThisUser().then(() => {
						Logger.log('getOrCreateChatWithThisUser done')
					}).catch(e => {
						Logger.error(e)
					})
				}
			}
		/>

	</Rows>
}


const InfoBox: FC<BaseHTMLProps> = (props) => {
	return <div
		style={AppStyle(weightItem(1), margin(12), radius(8), borderWidth(1), border(Colors.color_E5E5E5), padding(12), shadow(8))}>
		{props.children}
	</div>
}

export default PetDetail
