import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AppCtx} from "../../App";
import {
	AppStyle,
	background,
	flexCenter,
	flexCenterInParent,
	flexHori,
	height,
	marginStart,
	marginTop,
	minHeight,
	padding,
	paddingHori,
	paddingVerti,
	radius,
	semiBold,
	textColor,
	weightItem,
	width
} from "../../AppStyle";
import {ImageView} from "../../components/ImageView";
import Rows from "../../components/Row";
import Column from "../../components/Column";
import pettyIcon from "../../asset/petty_icon.png"
import TextView from "../../components/Text";
import {Paper, TextField} from "@mui/material";
import ButtonView from "../../components/ButtonView";
import {Colors} from "../../AppColor";

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export default function LoginScreen() {
	const navigate = useNavigate()
	const appContext = React.useContext(AppCtx)

	const appApi = appContext.appApi
	const logger = appContext.logger

	useEffect(() => {
		if (appContext.currentUser) {
			navigate(-1)
		}
	})

	let [userName, setUserName] = useState('')
	let [pwd, setPwd] = useState('')

	const handleLogin = async () => {
		try {
			let res = await appApi.login(userName, pwd)
			let data = res.data
			if (data.statusCode === 200) {
				// success
				appApi.setToken(data.token)
				appContext.setCurrentUser(data.user)
				logger.successToast()
				navigate(-1)
			} else {
				logger.errorToast()
				appContext.setCurrentUser(undefined)
			}
		} catch (e) {
			logger.errorToast()
			appContext.setCurrentUser(undefined)
		}
	}

	const handleRegister = () => {

	}

	return <div style={
		AppStyle(
			flexHori(),
			flexCenterInParent(),
			minHeight("100vh"),
			background("linear-gradient(180deg, #00C181 0%, #1F00C181 100%)")
		)}>

		<Rows style={
			AppStyle(
				flexCenterInParent()
			)
		}>
			<Column style={
				AppStyle(
					flexCenter(),
					weightItem(1)
				)
			}>
				<ImageView src={pettyIcon} style={
					AppStyle(
						width(200),
						height(200)
					)
				}/>

				<TextView style={
					AppStyle(
						semiBold(24)
					)
				}>PETTY</TextView>
			</Column>

			<Paper elevation={1} style={
				AppStyle(
					width(350),
					padding(16),
					marginStart(100)
				)
			}>
				<Column>
					<TextField
						style={AppStyle(weightItem(1))}
						type="text"
						placeholder="Username"
						value={userName}
						onChange={e => {
							setUserName(e.currentTarget.value)
						}}
						label='Username'
					/>

					<TextField
						style={AppStyle(weightItem(1), marginTop(16))}
						type="password"
						placeholder="Password"
						value={pwd}
						onChange={e => {
							setPwd(e.currentTarget.value)
						}}
						label='Password'
					/>

					<ButtonView>
						<div style={
							AppStyle(
								background(Colors.color_primary),
								marginTop(16),
								paddingHori(0),
								paddingVerti(10),
								radius(8)
							)
						} onClick={
							handleLogin
						}>
							<TextView style={
								AppStyle(
									textColor(Colors.color_white)
								)
							}>
								Log In
							</TextView>
						</div>
					</ButtonView>

					<PopUpSignUp/>
				</Column>
			</Paper>
		</Rows>

	</div>
}

const PopUpSignUp = () => {
	return <Popup trigger={<button style={{
		marginTop: 16,
		border: 'none',
		background: 'none',
	}}>
		Sign Up
	</button>} modal>
		{(close: any) => (
			<Column style={
				AppStyle(
					padding(16)
				)
			}>
				Content here
				<button
					className="close" onClick={close}>
					Close
				</button>
			</Column>
		)}
	</Popup>
}