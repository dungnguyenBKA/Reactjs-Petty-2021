import React, {FC, useEffect, useMemo, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AppCtx} from "../../App";
import {
	AppStyle,
	background,
	borderWidth,
	cursorPointer,
	flexCenter,
	flexCenterInParent,
	flexHori,
	height,
	marginBottom,
	marginEnd,
	marginStart,
	marginTop,
	minHeight,
	padding,
	paddingHori,
	paddingVerti,
	radius,
	regular,
	semiBold,
	textColor,
	weightItem,
	width
} from "../../AppStyle";
import {ImageView} from "../../components/ImageView";
import {Props} from "../../components/Props";
import Rows from "../../components/Row";
import Column from "../../components/Column";
import pettyIcon from "../../asset/petty_icon.png"
import TextView from "../../components/Text";
import {Paper, TextField} from "@mui/material";
import ButtonView from "../../components/ButtonView";
import {Colors} from "../../AppColor";
import toast from "react-hot-toast";

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
			if(data.statusCode === 200) {
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

					<ButtonView
						style={
							AppStyle(
								background(Colors.color_primary),
								marginTop(16)
							)
						}
						onClick={
							handleRegister
						}>
						Sign Up
					</ButtonView>
				</Column>
			</Paper>
		</Rows>

	</div>
}


interface LoginButtonProps extends Props<HTMLButtonElement> {
	imgurl: string
	text: string
	textcolor: string
	backgroundcolor: string
}

const LoginButton: FC<LoginButtonProps> = (props) => {
	return <button
		{...props}

		style={AppStyle(cursorPointer(), flexHori(), marginBottom(20), width(300),
			paddingVerti(12), flexCenterInParent(), radius(24), borderWidth(0), background(props.backgroundcolor))}>
		<ImageView src={props.imgurl} style={AppStyle(width(24), height(24), marginEnd(10))}/>
		<span style={AppStyle(regular(15), textColor(props.textcolor))}>{props.text}</span>
	</button>
}