import React, {FC, useContext, useState} from "react";
import {Avatar, Button, TextField} from "@mui/material";
import {AppStyle, bold, margin, marginEnd, padding, width} from "../../AppStyle";
import Column from "../../components/Column";
import {AppCtx} from "../../App";
import Text from "../../components/Text";
import Rows from "../../components/Row";
import Logger from "../../api/Logger";
import {addDoc, collection, doc, getDocs, query, setDoc, where} from "firebase/firestore";
import {database} from "../../components/firebase/FirebaseApp";
import FirebaseHelper from "../../helper/FirebaseHelper";
import User from "../../models/User";

interface ChatFormProps {

}

const ChatForm: FC<ChatFormProps> = (props) => {
	const appContext = useContext(AppCtx)
	const [username, setUsername] = useState('')
	const currentUser = appContext.currentUser

	const [allUser, setAllUser] = useState<User[]>([])

	const handleCreateChat = async () => {
		if(!currentUser) {
			return
		}

		let res = (await getDocs(
			query(
				collection(database, "users"),
				where("email", "==", username)
			)
		)).docs.map(doc => { return parseInt(doc.id) })

		console.log({res})

		let toUserId = -1
		if(res.length === 0) {
			Logger.errorToast("Không tìm thấy user")
			return
		} else {
			toUserId = res[0]
		}


		if(currentUser.id === toUserId) {
			Logger.errorToast("Không thể chat với chính mình được")
			return
		}
		try {
			let queryMyDMs = await getDocs(
				query(
					collection(database, "rooms"),
					where("memberIds", "array-contains", currentUser?.id),
					where("isDirectChat", "==", true),
				)
			)

			let myDMs = queryMyDMs.docs.map((dm => {
				return dm.id
			}))

			console.log('oh',{myDMs})

			const allToUserDMs = await getDocs(
				query(
				collection(database, "rooms"),
				where("memberIds", "array-contains", toUserId),
				where("isDirectChat", "==", true),
			))

			let toUserDMs = allToUserDMs.docs.map((dm => {
				return dm.id
			}))

			console.log('oh',{toUserDMs})

			const filteredArray = myDMs.filter(value => toUserDMs.includes(value));

			if (filteredArray.length === 0) {
				// create
				let newChatRoom = await addDoc(collection(database, "rooms"), {
					description: "Cùng chia sẻ niềm FUN",
					isDirectChat: true,
					memberIds: [currentUser?.id, toUserId],
					roomName: "",
					isNewChatRoom: true,
					lastMessageTime: new Date().getTime()
				})

				Logger.normalToast("Đã tạo phòng chat của 2 bạn" + newChatRoom.id)
			} else {
				Logger.normalToast("Bạn đã từng chat với người này rồi")
			}
		} catch (e) {
			Logger.error(e)
			Logger.errorToast()
		}
	}


	return <Column>
		<Rows style={
			AppStyle(
				width('100%'),
				padding(12)
			)
		}>
			<Avatar alt="" src={appContext.currentUser?.avatar} style={marginEnd(16)}/>

			<Text
				style={
					AppStyle(
						bold(24)
					)
				}
			>Chat</Text>
		</Rows>

		<Rows>
			<TextField
				style={
					AppStyle(
						margin(8)
					)
				}
				helperText="Nhập vào tên User"
				label="Chat"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				onSubmit={handleCreateChat}
			/>
			<Button onClick={handleCreateChat}>
				Chat!!
			</Button>
		</Rows>

	</Column>
}

export default ChatForm
