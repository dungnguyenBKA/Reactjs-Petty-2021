import {FC, useContext, useEffect, useRef, useState} from "react";
import {RoomModel} from "./model/RoomModel";
import ScrollView from "../../components/ScrollView";
import {MessageModel} from "./model/MessageModel";
import ChatItem from "./ChatItem";
import {AppStyle, width} from "../../AppStyle";
import {collection, onSnapshot, query, where} from "firebase/firestore";
import {database} from "../../components/firebase/FirebaseApp";
import {MessageCtx} from "./Messenger";

interface MessengerListProps {

}

const MessengerList: FC<MessengerListProps> = (props) => {
	const currentRoom = useContext(MessageCtx).currentRoom
	const [messages, setMessages] = useState<MessageModel[]>([])
	const messageListEnd = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!currentRoom) {
			return
		}

		console.log('id', currentRoom.id)

		onSnapshot(
			query(
				collection(database, "messages"),
				where("roomId", "==", currentRoom.id)
			),
			(snapshot => {
				setMessages(
					snapshot.docs.map(doc => {
						let data = doc.data()
						console.log({data})
						return {
							id: doc.id,
							createAt: data.createAt,
							imageUrls: data.imageUrls,
							videoUrls: data.videoUrls,
							text: data.text,
							userId: data.userId,
							roomId: data.roomId
						}
					})
				)
			}))
	}, [currentRoom])

	useEffect(() => {
		// scroll to bottom after message changed
		if (messageListEnd?.current) {
			messageListEnd.current?.scrollIntoView()
		}
	}, [messages]);

	return <ScrollView
		direction="vertical"
		style={
			AppStyle(
				width('100%')
			)
		}
	>
		{
			messages.map((message) => {
				return <ChatItem key={message.id} message={message}/>
			})
		}
		<div style={{float: "left", clear: "both"}}
		     ref={messageListEnd}>
		</div>
	</ScrollView>
}

export default MessengerList
