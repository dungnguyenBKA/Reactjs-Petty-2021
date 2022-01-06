import {FC, useState} from "react";
import {Button, TextField} from "@mui/material";
import Rows from "../../components/Row";

interface ChatInputProps {
	handleSubmit: (text: string) => void
}

const ChatInput: FC<ChatInputProps> = (props) => {
	const {handleSubmit} = props

	const onSubmit = () => {
		handleSubmit(text)
		setText('')
	}

	const [text, setText] = useState('')

	return (
		<Rows>
			<TextField
				value={text}
				onChange={e => {
					setText(e.target.value)
				}}
				onSubmit={() => {
					handleSubmit(text)
					setText('')
				}}
			/>
			<Button onClick={onSubmit}>Send</Button>
		</Rows>

	)
}

export default ChatInput
