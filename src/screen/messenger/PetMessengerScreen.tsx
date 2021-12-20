import React from "react";
import { FC } from "react"
import { ChatEngine } from 'react-chat-engine'
import { AppCtx } from "../../App";

const PetMessengerScreen : FC = () => {
	const appContext = React.useContext(AppCtx);
	
    return (
		<ChatEngine
			height='100vh'
			userName='dungdemo'
			userSecret='123'
			projectID='d06a766f-700c-462b-a6a0-b4e698b90315'
		/>
	);
}
export default PetMessengerScreen