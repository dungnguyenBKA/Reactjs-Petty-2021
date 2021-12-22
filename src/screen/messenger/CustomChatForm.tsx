import React, {FC, useContext, useState} from "react";
import {getOrCreateChat} from "react-chat-engine";
import {Avatar, Stack, TextField} from "@mui/material";
import {AppStyle, bold, margin, marginStart, padding, width} from "../../AppStyle";
import Column from "../../components/Column";
import ButtonView from "../../components/ButtonView";
import {ArrowBack} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {AppCtx} from "../../App";
import Text from "../../components/Text";

interface CustomChatFormProps {
	creds: any
}

const CustomChatForm: FC<CustomChatFormProps> = (props) => {
	const {creds} = props
	const navigate = useNavigate()
	const appContext = useContext(AppCtx)

	const handleCreateChat = () => {
		getOrCreateChat(
			creds,
			{is_direct_chat: true, usernames: [username]},
			() => setUsername('')
		)
	}

	const [username, setUsername] = useState('')
	return <Column>
		<Stack style={
			AppStyle(
				width('100%'),
				padding(12)
			)
		} direction="row" spacing={2} justifyContent="flex-start"
		       alignItems="center">
			<ButtonView
				onClick={() => {
					navigate(-1)
				}
				}>
				<ArrowBack/>
			</ButtonView>

			<Avatar alt="" src={appContext.currentUser?.avatar}/>

			<Text
				style={
					AppStyle(
						bold(24),
						marginStart(16)
					)
				}
			>Messenger</Text>
		</Stack>

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
	</Column>
}

export default CustomChatForm