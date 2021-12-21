import React, { FC, useState } from 'react'

import { ChatEngine, getOrCreateChat } from 'react-chat-engine'
import NewChatHeader from './ChatHeader'
import ChatList from './ChatList'
import Message from './Message'

import ChatHeader from './ChatHeader'

const DirectChatPage = (props) => {
	const [username, setUsername] = useState('')

	function createDirectChat(creds) {
		getOrCreateChat(
			creds,
			{ is_direct_chat: true, usernames: [username] },
			() => setUsername('')
		)
	}

	return (
		<ChatEngine
			height='100vh'
			userName={props.userName}
			userSecret={props.userSecret}
			projectID='d06a766f-700c-462b-a6a0-b4e698b90315'
            renderChatList={(chatEngineState) => <ChatList {...chatEngineState} />}
			renderChatHeader={(chat) => {}}
		/>
	)
}

export default DirectChatPage;