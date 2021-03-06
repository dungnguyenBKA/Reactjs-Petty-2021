import React, {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AppCtx} from "../../App";
import {
	AppStyle,
	background,
	bold,
	borderColor,
	borderWidth,
	flexCenter,
	flexCenterInParent,
	flexHori,
	height,
	marginBottom,
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
import firebaseHelperInstance from "../../helper/FirebaseHelper";
import Logger from "../../api/Logger";
import {AxiosError} from "axios";
import {NetworkErrorHandler} from "../../api/AppApi";
import ValidateTextInput from "../../components/ValidatorInput";
import ApiHelper from "../../api/ApiHelper";
import User from "../../models/User";

export default function LoginScreen() {
	const navigate = useNavigate()
	const appContext = React.useContext(AppCtx)

	const appApi = appContext.appApi
	const setLoading = appContext.setLoading

	useEffect(() => {
		if (appContext.currentUser) {
			navigate('../')
		}
	})

	let [userName, setUserName] = useState('')
	let [pwd, setPwd] = useState('')

	const handleLogin = async () => {
		setLoading(true)
		try {
			let res = await appApi.login(userName, pwd)
			let resData = res.data
			if (resData.statusCode === 200) {
				// success
				appApi.setToken(resData.data.token)
				Logger.log('app token: ', resData.data.token)
				// save pwd data in client
				let currentUser = resData.data.user
				currentUser.pwd = pwd
				appContext.setCurrentUser(currentUser)
				Logger.successToast()

				// navigate home
				navigate('../')
			} else {
				let errMsg = resData.message ? resData.message : undefined
				Logger.errorToast(errMsg)
				appContext.setCurrentUser(undefined)
			}
		} catch (e) {
			ApiHelper.handleCallApiError(e, new class implements NetworkErrorHandler {
				onNetworkError(e: AxiosError): void {
					Logger.errorToast(e.response?.data.message)
				}

				onOtherError(e: unknown): void {
					Logger.errorToast()
				}
			}())

			appContext.setCurrentUser(undefined)
		} finally {
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
						placeholder="Email"
						value={userName}
						onChange={e => {
							setUserName(e.currentTarget.value)
						}}
						label='Email'
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
	let appContext = useContext(AppCtx)
	let appApi = appContext.appApi
	let chatAppApi = appContext.chatApi
	let setLoading = appContext.setLoading
	let navigate = useNavigate();
	let [isValid, setValid] = useState(false)

	let [name, setName] = useState('')
	let [isNameValid, setNameValid] = useState(false)

	let [userName, setUserName] = useState('')
	let [isUserNameValid, setUserNameValid] = useState(false)

	let [pwd, setPwd] = useState('')
	let [isPwdValid, setPwdValid] = useState(false)

	let [confirmPwd, setConfirmPwd] = useState('')
	let [isRePwdValid, setRePwdValid] = useState(false)


	let [phone, setPhone] = useState('')

	let [avatarUrl, setAvatarUrl] = useState('');
	let [avatarFile, setAvatarFile] = useState<File>()
	let [imgData, setImgData] = useState<string | undefined>(undefined);

	let [showPassword, setShowPassword] = useState(false)


	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	}

	let checkIsNameLenValid = (text: string): [boolean, string?] => {
		return [text.length > 0, 'T??n kh??ng ???????c ng???n qu??'];
	}

	let checkIsLenValid = (text: string): [boolean, string?] => {
		return [text.length >= 3, 'Email ch??a ????? ????? d??i'];
	}

	let checkIsContainValid = (text: string): [boolean, string?] => {
		return [text.includes('@'), 'Email ch??a ????ng ?????nh d???ng ( thi???u @)'];
	}

	let checkIsPwdValid = (text: string): [boolean, string?] => {
		return [text.length >= 8, 'Password c???n t??? 8 k?? t??? tr??? l??n']
	}

	const isPassWordMatch = (text: string): [boolean, string?] => {
		return [pwd === confirmPwd, 'Password kh??ng tr??ng kh???p nhau']
	}

	useEffect(() => {
		if (isNameValid && isUserNameValid && isPwdValid && isRePwdValid) {
			setValid(true)
		} else {
			setValid(false)
		}
	}, [isNameValid, isUserNameValid, isPwdValid, isRePwdValid])

	const handleRegister = async () => {
		setLoading(true)
		// upload images
		if (avatarFile) {
			try {
				let imageUrl = await firebaseHelperInstance.uploadImageFile(avatarFile)
				if (imageUrl) {
					setAvatarUrl(imageUrl)
				} else {
					setAvatarUrl('')
				}
			} catch (e) {
				Logger.error(e)
				setAvatarUrl('')
			}
		}

		// register
		try {
			let res = await appApi.register(
				name, userName, pwd, avatarUrl, phone
			)
			let resData = res.data
			if (resData.statusCode === 200) {
				let user = resData.data.user
				appApi.setToken(resData.data.token)
				user.pwd = pwd
				appContext.setCurrentUser(user)

				try {
					await getOrCreateChatUser(user)
				} catch (e) {
					Logger.error(e)
				}

				Logger.successToast()
				// navigate home
				navigate('../')
			} else {
				let errMsg = resData.message ? resData.message : undefined
				Logger.errorToast(errMsg)
				appContext.setCurrentUser(undefined)
			}
		} catch (e) {
			Logger.error(e)
			appContext.setCurrentUser(undefined)
		} finally {
			setLoading(false)
		}
	}

	const getOrCreateChatUser = async (user: User) => {
		try {
			let chatRes = await chatAppApi.getOrCreateChatUser(user)
			if (chatRes.status === 200) {
				Logger.log('created chat users')
			}
		} catch (e) {
			ApiHelper.handleCallApiError(e, new class implements NetworkErrorHandler {
				onNetworkError(): void {
					Logger.errorToast()
					navigate(-1)
				}

				onOtherError(): void {
					navigate(-1)
				}
			}())
		}
	}


	return <Popup trigger={<button style={{
		marginTop: 16,
		border: 'none',
		background: 'none'
	}}>
		Sign Up
	</button>} modal>
		{(close: any) => (
			<Column style={
				AppStyle(
					padding(16),
					background('white'),
					radius(8),
					width(430)
				)
			}>
				<Rows style={AppStyle({justifyContent: 'space-between'})}>
					<Column>
						<TextView style={AppStyle(bold(32))}>????ng k??</TextView>
						<TextView style={AppStyle(regular(15))}>Nhanh ch??ng v?? d??? d??ng</TextView>
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


				<ValidateTextInput
					style={AppStyle(weightItem(1), marginTop(16), radius(8))}
					check_valid_functions={[checkIsNameLenValid]}
					type="text"
					placeholder="T??n"
					set_value={setName}
					set_valid={setNameValid}
					label='T??n'
				/>

				<ValidateTextInput
					style={AppStyle(weightItem(1), marginTop(16), radius(8))}
					check_valid_functions={[checkIsLenValid, checkIsContainValid]}
					type="email"
					placeholder="Email : abc@gmail.com"
					set_value={setUserName}
					set_valid={setUserNameValid}
					label='Email'
				/>

				<TextField
					style={AppStyle(weightItem(1), marginTop(16), radius(8))}
					type="phone"
					placeholder="Phone number"
					value={phone}
					onChange={e => {
						setPhone(e.currentTarget.value)
					}}
					label='Phone number'
				/>


				<ValidateTextInput
					style={AppStyle(weightItem(1), radius(8), marginTop(16))}
					check_valid_functions={[checkIsPwdValid, isPassWordMatch]}
					type={showPassword ? 'text' : 'password'}
					placeholder="Password"
					set_value={setPwd}
					set_valid={isValid => {
						setPwdValid(isValid)
						setRePwdValid(isValid)
					}}
					label='Password'

					InputProps={{
						endAdornment: <InputAdornment position='end'>
							<IconButton onClick={handleShowPassword} edge='end'>
								{showPassword ? <VisibilityOff/> : <Visibility/>}
							</IconButton>
						</InputAdornment>
					}}

				/>
				<ValidateTextInput
					style={AppStyle(weightItem(1), radius(10), marginTop(16))}
					check_valid_functions={[checkIsPwdValid, isPassWordMatch]}
					type={showPassword ? 'text' : 'password'}
					placeholder="Nh???p l???i Password"
					set_value={setConfirmPwd}
					set_valid={isValid => {
						setPwdValid(isValid)
						setRePwdValid(isValid)
					}}
					label='Nh???p l???i Password'
					InputProps={{
						endAdornment: <InputAdornment position='end'>
							<IconButton onClick={handleShowPassword} edge='end'>
								{showPassword ? <VisibilityOff/> : <Visibility/>}
							</IconButton>
						</InputAdornment>
					}}
				/>
				<Rows style={AppStyle(marginTop(16),
					radius(8), borderWidth(1), background('#FFFFFF'), borderColor('rgb(0, 193, 129)'))}>
					<label style={AppStyle(marginTop('auto'), marginBottom('auto'),
						textColor('rgb(0, 193, 129)'),
						borderWidth(0), height(40))}>
						Upload Avatar
						<input
							id="file"
							type="file"
							accept="image/*"
							hidden
							onChange={(event) => {
								let files = event.target.files;
								if (files && files[0]) {
									setAvatarFile(files[0])
									const reader = new FileReader()
									reader.onloadend = () => {
										setImgData(reader.result as string)
									}
									reader.readAsDataURL(files && files[0])


								} else {
									setImgData(undefined)
									Logger.error("???? c?? l???i x???y ra, vui l??ng th??? l???i")
								}
							}}
						/>
					</label>
					<img width='42px' height='42px' style={AppStyle(marginStart(16), radius(4))} src={imgData}/>
				</Rows>

				<Rows style={AppStyle(marginTop(16), flexCenterInParent())}>
					<button
						style={AppStyle(
							radius(8),
							textColor('#FFFFFF'),
							borderWidth(0), width('100%'), height(40),
							{background: isValid ? '#00C181' : 'grey'})}

						onClick={handleRegister} disabled={!isValid}>
						Sign Up
					</button>
				</Rows>
			</Column>
		)}
	</Popup>
}
