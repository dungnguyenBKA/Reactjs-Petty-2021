import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AppCtx} from "../../App";
import {
	AppStyle,
	background,
	bold,
	borderWidth,
	flexCenter,
	flexCenterInParent,
	flexHori,
	height,
	marginStart,
	marginTop,
	minHeight,
	minWidth,
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
import Rows from "../../components/Row";
import Column from "../../components/Column";
import pettyIcon from "../../asset/petty_icon.png"
import TextView from "../../components/Text";
import {IconButton, InputAdornment, Paper, TextField} from "@mui/material";
import ButtonView from "../../components/ButtonView";
import {Colors} from "../../AppColor";

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

import {Visibility, VisibilityOff} from "@mui/icons-material";

export default function LoginScreen() {
	const navigate = useNavigate()
	const appContext = React.useContext(AppCtx)

	const appApi = appContext.appApi
	const logger = appContext.logger
	const setLoading = appContext.setLoading

	useEffect(() => {
		if (appContext.currentUser) {
			navigate(-1)
		}
	})

	let [userName, setUserName] = useState('')
	let [pwd, setPwd] = useState('')

	const handleLogin = async () => {
		setLoading(true)
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
				setLoading(false)
			}
		} catch (e) {
			logger.errorToast()
			appContext.setCurrentUser(undefined)
			setLoading(false)
		}
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
						semiBold(24),
						textColor('white')
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
	let logger = useContext(AppCtx).logger
	let [name, setName] = useState('')
	let [userName, setUserName] = useState('')
	let [pwd, setPwd] = useState('')
	let [confirmPwd, setConfirmPwd] = useState('')
	let [showPassword, setShowPassword] = useState(false)
	let [phone, setPhone] = useState('')

	const handlePasswordChange = (event: any) => {
		setPwd(event.target.value);
	};

	let [isValid, setValid] = useState(false)

	const isEmailTrue = (): boolean => {
		return userName.includes('@')
	}

	let isFirstTime: boolean
	isFirstTime = false

	useEffect(() => {
		isFirstTime = true
	}, [])

	const isPassWordMatch = (): boolean => {
		return pwd === confirmPwd
	}

	const isPassWordEnoughLength = (): boolean => {
		return pwd.length >= 8
	}
	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	}

	const checkValid = () => {
		setValid(isPassWordEnoughLength() && isPassWordMatch() && isEmailTrue())
	}

	const handleRegister = async () => {
		if (!isValid) {
			logger.errorToast('No valid')
			return
		}

		logger.successToast('valid')
	}

	useEffect(() => {
		checkValid()
	}, [pwd, confirmPwd, userName])

	let handleHelpEmail = (): string | undefined => {
		if (isFirstTime) return undefined
		if (!isEmailTrue()) {
			return 'Email không đúng định dạng'
		} else {
			return undefined
		}
	};


	let handleHelpPassword = (): string | undefined => {
		if (!isPassWordEnoughLength()) {
			return 'Password không đủ 8 kí tự'
		} else if (!isPassWordMatch()) {
			return 'Nhập sai password'
		} else {
			return undefined
		}
	};

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
				<Rows style={AppStyle({justifyContent: 'space-between'})}>
					<Column>
						<TextView style={AppStyle(bold(32))}>Đăng kí</TextView>
						<TextView style={AppStyle(regular(15))}>Nhanh chóng và dễ dàng</TextView>
					</Column>
					<button style={AppStyle(
						background('#FFFFFF'),
						{position: 'absolute', right: 10, top: 16, zIndex: 2},

						padding(0),


						radius(8),


						borderWidth(0))}
					        onClick={close}>
						<img style={{position: 'absolute', right: 10, top: 12, zIndex: 2}}
						     src='https://static.xx.fbcdn.net/rsrc.php/v3/y2/r/__geKiQnSG-.png' alt='' width='24'
						     height='24'/>
					</button>

				</Rows>


				<TextField
					style={AppStyle(weightItem(1), marginTop(16), radius(8))}


					type="text"
					placeholder="Tên"
					value={name}
					onChange={e => {
						setName(e.currentTarget.value)
					}}
					label='Tên'
				/>

				<TextField
					style={AppStyle(weightItem(1), marginTop(16), radius(8))}
					type="email"
					placeholder="Email : abc@gmail.com"
					value={userName}
					onChange={e => {
						setUserName(e.currentTarget.value)
					}}
					label='Email'
					error={handleHelpEmail() !== undefined}
					helperText={<p>{handleHelpEmail()}</p>}
				/>


				<TextField
					style={AppStyle(weightItem(1), radius(8))}
					type={showPassword ? 'text' : 'password'}
					placeholder="Password"
					value={pwd}
					onChange={e => {
						setPwd(e.target.value)
					}}
					label='Password'
					error={handleHelpPassword() !== undefined}
					helperText={<p>{handleHelpPassword()}</p>}
					InputProps={{
						endAdornment: <InputAdornment position='end'>
							<IconButton onClick={handleShowPassword} edge='end'>
								{showPassword ? <VisibilityOff/> : <Visibility/>}
							</IconButton>
						</InputAdornment>
					}}

				/>
				<TextField
					style={AppStyle(weightItem(1), radius(10), marginTop(0))}
					type={showPassword ? 'text' : 'password'}

					placeholder="Nhập lại Password"
					value={confirmPwd}
					onChange={e => {
						setConfirmPwd(e.target.value)
					}}
					label='Nhập lại Password'
					InputProps={{
						endAdornment: <InputAdornment position='end'>
							<IconButton onClick={handleShowPassword} edge='end'>
								{showPassword ? <VisibilityOff/> : <Visibility/>}
							</IconButton>
						</InputAdornment>
					}}
				/>
				<Rows style={AppStyle(marginTop(16), flexCenterInParent())}>


					<button
						style={AppStyle(background('rgb(0, 193, 129'),
							radius(8),
							textColor('#FFFFFF'),
							borderWidth(0), minWidth('45%'), height(40))}

						onClick={handleRegister} disabled={!isValid}>
						Sign Up
					</button>

				</Rows>


			</Column>
		)}
	</Popup>
}