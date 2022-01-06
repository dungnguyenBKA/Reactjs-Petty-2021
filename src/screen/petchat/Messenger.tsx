import React, {FC, useContext, useEffect, useState} from "react";
import Rows from "../../components/Row";
import {RoomModel} from "./model/RoomModel";
import RoomList from "./RoomList";
import Column from "../../components/Column";
import ChatForm from "./ChatForm";
import ScrollView from "../../components/ScrollView";
import MessengerList from "./MessageList";
import {AppStyle, background, height, width} from "../../AppStyle";
import ChatInput from "./ChatInput";
import {addDoc, collection, onSnapshot, query, where} from "firebase/firestore";
import {database} from "../../components/firebase/FirebaseApp";
import {AppCtx} from "../../App";
import Logger from "../../api/Logger";

interface MessengerProps {

}

interface MessageContext {
	currentRoom: RoomModel | undefined
	setCurrentRoom: (currentRoom: RoomModel) => void
}

const defaultMessageCtxValue: MessageContext = {
	currentRoom: undefined,
	setCurrentRoom: (currentRoom: RoomModel | undefined) => {

	}
}

export const MessageCtx = React.createContext<MessageContext>(defaultMessageCtxValue)

const Messenger: FC<MessengerProps> = () => {
	const [currentRoom, setCurrentRoom] = useState<RoomModel | undefined>(undefined)
	const [rooms, setRooms] = useState<RoomModel[]>([])
	const user = useContext(AppCtx).currentUser


	defaultMessageCtxValue.currentRoom = currentRoom
	defaultMessageCtxValue.setCurrentRoom = (currentRoom: RoomModel) => {
		setCurrentRoom(currentRoom)
		console.log('set room', {currentRoom})
	}

	const handleSubmit = async (text: string) => {
		if (!user || !currentRoom) {
			Logger.errorToast()
			return
		}

		await addDoc(collection(database, "messages"), {
			createAt: new Date().getTime(),
			imageUrls: [],
			text: text,
			userId: user.id,
			videoUrls: [],
			roomId: currentRoom.id
		})
	}

	useEffect(() => {
		if(!user) {
			return
		}
		const unsub = onSnapshot(
			query(
				collection(database, "rooms"),
				where("memberIds", "array-contains", user.id)
			)
			,
			(snapshot) => {
				setRooms(snapshot.docs.map(doc => {
					let data = doc.data()
					return {
						id: doc.id,
						description: data.description,
						isDirectChat: data.isDirectChat,
						memberIds: data.memberIds,
						roomName: data.roomName
					}
				}))
			})

		return () => {
			unsub()
		}
	})

	return <MessageCtx.Provider value={defaultMessageCtxValue}>
		<Rows style={
			AppStyle(
				background('white'),
				height('100vh'),
				width('100%'),
				{}
			)
		}>
			<Column style={
				{
					maxHeight: 300
				}
			}>
				<ChatForm/>
				<ScrollView direction='vertical'>
					<RoomList rooms={rooms}/>
				</ScrollView>
			</Column>

			<Column style={{
				flexGrow: 1
			}}>
				<MessengerList/>
				<ChatInput handleSubmit={handleSubmit}/>
			</Column>
		</Rows>
	</MessageCtx.Provider>
}

export default Messenger
