import React, {FC, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {AppCtx} from "../../App";
import {
	AppStyle,
	background,
	borderWidth,
	cursorPointer,
	flexCenterInParent,
	flexHori,
	flexVerti,
	height,
	marginBottom,
	marginEnd,
	minHeight,
	paddingVerti,
	radius,
	regular,
	textColor,
	width
} from "../../AppStyle";
import {ImageView} from "../../components/ImageView";
import {Props} from "../../components/Props";
import {getRandomFakeUser} from "../../models/User";

export default function LoginScreen() {


	const navigate = useNavigate()

	const appContext = React.useContext(AppCtx)

	useEffect(() => {
		if (appContext.currentUser) {
			navigate(-1)
		}
	})

	const handleLogin = () => {
		appContext.setCurrentUser(getRandomFakeUser())
		navigate(-1)
	}

	return <div style={AppStyle(flexHori(), flexCenterInParent(),
		minHeight("100vh"), background("linear-gradient(180deg, #00C181 0%, #1F00C181 100%)"))}>
		<div style={AppStyle(flexVerti(), flexCenterInParent())}>
			<div>
				<LoginButton
					onClick={handleLogin}
					imgurl="https://weeboo.vn/icons/login/icon-facebook.svg"
					text="Đăng nhập bằng Facebook"
					backgroundcolor="rgb(51 87 149)"
					textcolor="#FFFFFF"/>

				<LoginButton
					onClick={handleLogin}
					textcolor="#000000"
					imgurl="https://weeboo.vn/icons/login/icon-google.svg"
					text="Đăng nhập bằng Google"
					backgroundcolor="#FFFFFF"/>
			</div>

		</div>
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