import {FC, useContext} from "react";
import {RoomModel} from "./model/RoomModel";
import Column from "../../components/Column";
import RoomItem from "./RoomItem";
import {AppStyle, maxHeight} from "../../AppStyle";
import {MessageCtx} from "./Messenger";

interface RoomListProps {
	rooms: RoomModel[]
}

const RoomList: FC<RoomListProps> = (props) => {
	const rooms = props.rooms


	return <Column style={
		AppStyle(
			maxHeight(400)
		)
	}>
		{
			rooms.map((room) => {
				return <RoomItem
					key={room.id}
					room={room}/>
			})
		}
	</Column>
}

export default RoomList
