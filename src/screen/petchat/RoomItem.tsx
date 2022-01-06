import {RoomModel} from "./model/RoomModel";
import {FC, useContext, useEffect, useState} from "react";
import Rows from "../../components/Row";
import {Avatar, Button, Typography} from "@mui/material";
import {AppStyle, height, width} from "../../AppStyle";
import User from "../../models/User";
import Column from "../../components/Column";
import {collection, onSnapshot, query, where} from "firebase/firestore";
import {database} from "../../components/firebase/FirebaseApp";
import TextView from "../../components/Text";
import {MessageCtx} from "./Messenger";

interface RoomItemProps {
	room: RoomModel
}

const RoomItem: FC<RoomItemProps> = (props) => {
	const room = props.room
	const [members, setMembers] = useState<User[]>([])
	const msgContext = useContext(MessageCtx)
	const setRoomCurrent = msgContext.setCurrentRoom

	useEffect(() => {
		let unsub = onSnapshot(
			query(collection(database, 'users'), where("id", "in", room.memberIds)),
			(snapshot) => {
				setMembers(snapshot.docs.map((doc) => {
					let data = doc.data()
					return {
						id: parseInt(doc.id),
						name: data.name,
						avatar: data.avatar,
						pwd: data.pwd,
						email: data.email,
						createdAt: data.createdAt,
						updatedAt: data.updatedAt,
						phone: data.phone,
					}
				}))
			})

		return () => {
			unsub()
		}
	}, [room.memberIds])

	const getRoomName = () => {
		if (room.isDirectChat) {
			if (members) {
				try {
					return members.filter((user) => {
						return user.id === 0
					})[0].name
				} catch (e) {
					return 'Funny Chat'
				}
			} else {
				return 'Funny Chat'
			}
		} else {
			return room.roomName
		}
	}

	return <Button
		onClick={() => {
			setRoomCurrent(room)
		}
		}
	>
		<Rows
			style={{
				alignSelf: 'flex-start'
			}}>
			<Avatar style={
				AppStyle(
					height(56),
					width(56)
				)
			}>
				{room.isDirectChat ? "M" : room.roomName.charAt(0)}
			</Avatar>

			<Column>
				<Typography>{getRoomName()}</Typography>
				<TextView>{room.description}</TextView>
			</Column>
		</Rows>
	</Button>
}

export default RoomItem
