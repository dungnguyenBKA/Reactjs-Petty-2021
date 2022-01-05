import {
	AppStyle,
	bold,
	circleImage,
	flexCenter,
	flexHori,
	flexVerti,
	margin,
	marginHori,
	marginStart,
	padding,
	regular,
	textColor,
	weightItem
} from "../../AppStyle"
import bgHome from '../../asset/bg_home.png'
import {ImageView} from "../../components/ImageView"
import {AppCtx} from "../../App";
import React from "react";
import ButtonView from "../../components/ButtonView"
import {useNavigate} from "react-router-dom"
import Rows from "../../components/Row";
import {Avatar, Button, IconButton} from "@mui/material";
import {deepPurple} from "@mui/material/colors";
import {Logout, Message, MessageOutlined} from "@mui/icons-material";

export default function Header() {
	const appContext = React.useContext(AppCtx)
	let [currentUser, setCurrentUser] = [appContext.currentUser, appContext.setCurrentUser]

	// const avatarHandler = () => {
	// 	if(currentUser?.avatar === 'null'){
	// 		return <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
	// 	}else return
	// }

	const navigate = useNavigate()

	if (currentUser) {
		console.log({currentUser})
	} else {
		console.log('no user')
	}

	if (currentUser) {
		return <div style={
			AppStyle({backgroundImage: `url(${bgHome})`},
				padding(20))
		}>
			<div style={AppStyle(flexHori(), flexCenter(), marginHori(15))}>
				<ButtonView
					onClick={() => {
						navigate('../personal')
					}}

					style={AppStyle(weightItem(1))}
				>
					<Rows>

						{/*<ImageView style={AppStyle(circleImage(42))} src={currentUser?.avatar}/>*/}
						{currentUser.avatar === null && <Avatar sx={{ bgcolor: deepPurple[500] }}>{currentUser.name.slice(0, 2).toUpperCase()}</Avatar>}
						{currentUser.avatar !== null && <Avatar style={AppStyle(circleImage(42))} src={currentUser?.avatar}/>}

						<div style={AppStyle(flexVerti(), marginStart(15))}>
							<p style={AppStyle(margin(0), bold(17), textColor("#007B52"), {textAlign: 'left'})}>{currentUser?.name}</p>
							<p style={AppStyle(margin(0), regular(15), textColor("#474A57"))}>Thông tin tài khoản</p>
						</div>
					</Rows>
				</ButtonView>


				<IconButton color='inherit'
					onClick={
						() => {
							setCurrentUser(undefined)
							navigate('../login')
						}
					}>
					<Logout/>

				</IconButton>

				<IconButton color='inherit'
					onClick={
						() => {
							navigate('../messenger')
						}
					}>
					<Message/>
				</IconButton>
			</div>
		</div>
	} else {
		return <div style={
			AppStyle({backgroundImage: `url(${bgHome})`},
				padding(20))
		}>
			<div style={AppStyle(flexHori(), flexCenter(), marginHori(15))}>
				<ButtonView
					onClick={
						() => {
							navigate('../login')
						}
					}>
					Login
				</ButtonView>
			</div>
		</div>
	}
}
