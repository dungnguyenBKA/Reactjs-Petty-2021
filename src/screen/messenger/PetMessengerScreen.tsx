import React, { useEffect } from "react";
import { FC } from "react"
import { useNavigate } from "react-router-dom";
import { AppCtx } from "../../App";
import DirectChatPage from "./DirectChatPage";

const PetMessengerScreen: FC = () => {
	const appContext = React.useContext(AppCtx)
	const navigate = useNavigate()

	useEffect(() => {
		if (!appContext.currentUser) {
			navigate('../login')
		}
	}, [])

	let { currentUser } = appContext

	if (currentUser) {
		return <DirectChatPage
			userName={currentUser.name}
			userSecret={currentUser.pwd}
		/>
	} else {
		return <></>
	}
}
export default PetMessengerScreen