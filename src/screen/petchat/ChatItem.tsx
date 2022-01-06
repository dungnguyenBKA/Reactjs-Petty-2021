import {MessageModel} from "./model/MessageModel";
import {FC} from "react";
import Column from "../../components/Column";

interface ChatItemProps {
	message: MessageModel
}

const ChatItem: FC<ChatItemProps> = (props) => {
	const {message} = props

	return <Column key={message.id}>
		<p>{message.text}</p>
	</Column>
};


export default ChatItem
