import {FC, useContext, useEffect, useState} from "react";
import {
	AppStyle,
	border,
	borderWidth,
	circleImage,
	flexCenter,
	margin,
	marginHori,
	marginTop,
	maxHeight,
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

interface PetDetailProp {

}

interface HeaderProps {
	pet: Pet | undefined
}

const Header: FC<HeaderProps> = (props) => {
	return <Column style={AppStyle(flexCenter())}>
		<ImageView style={AppStyle(width('100%'), maxHeight(300), radius(8))} src={''}/>
		<Rows>

			<Column style={AppStyle(marginTop(-100), flexCenter())}>
				<ImageView style={AppStyle(circleImage(200))} src={''}/>
				<TextView style={semiBold(20)}>Binz The Love</TextView>
			</Column>
		</Rows>
	</Column>

}

const PetDetail: FC<PetDetailProp> = () => {
	const params = useParams()
	let [pet, setPet] = useState<Pet>()
	let [user, setUser] = useState<User>()
	let petId = params.petId ? params.petId : ''
	const appContext = useContext(AppCtx)
	const appApi = appContext.appApi
	const setLoading = appContext.setLoading

	if (!petId) {
		// err
	}

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
					Logger.successToast("OK")
					let pet = resData.data
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


	return <Column style={AppStyle(border(Colors.color_E5E5E5))}>
		<Header pet={pet}/>
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
	let user = props.user
	return <Rows style={AppStyle(margin(16))}>
		<ImageView src={user?.avatar} style={AppStyle(circleImage(36))}/>
		<Column style={AppStyle(weightItem(1), marginHori(16))}>
			<TextView style={regular(13)}>Liên hệ với Chủ</TextView>
			<TextView style={semiBold(15)}>{user?.name}</TextView>
		</Column>
		<ButtonImageView src={icMessageToOwner}
		                 onClick={() => {
			                 console.log("Click")
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
