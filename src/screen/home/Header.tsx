import { AppStyle, bold, circleImage, flexCenter, flexHori, flexVerti, margin, marginHori, marginStart, padding, regular, textColor, weightItem } from "../../AppStyle"
import bgHome from '../../asset/bg_home.png'
import { ImageView } from "../../components/ImageView"


import { AppCtx } from "../../App";
import React from "react";
import ButtonView from "../../components/ButtonView"
import { useNavigate } from "react-router-dom"

export default function Header() {
    const appContext = React.useContext(AppCtx)
    let [currentUser, setCurrentUser] = [appContext.currentUser, appContext.setCurrentUser]

    const navigate = useNavigate()
    console.log("re-render")

    if (currentUser) {
        console.log({ currentUser })
    } else {
        console.log('no user')
    }

    if (currentUser) {
        return <div style={
            AppStyle({ backgroundImage: `url(${bgHome})` },
                padding(20))
        }>
            <div style={AppStyle(flexHori(), flexCenter(), marginHori(15))}>
                <ImageView style={AppStyle(circleImage(42))} src={currentUser?.avatar} />

                <div style={AppStyle(flexVerti(), weightItem(1), marginStart(15))}>
                    <p style={AppStyle(margin(0), bold(15), textColor("#007B52"))}>{currentUser?.name}</p>
                    <p style={AppStyle(margin(0), regular(13), textColor("#474A57"))}>Thông tin tài khoản</p>
                </div>

                <ButtonView
                    onClick={
                        () => {
                            setCurrentUser(undefined)
                        }
                    }>
                    Logout
                </ButtonView>

                <ButtonView
                    onClick={
                        () => {
                            navigate('../messenger')
                        }
                    }>
                    Messenger
                </ButtonView>
            </div>
        </div>
    } else {
        return <div style={
            AppStyle({ backgroundImage: `url(${bgHome})` },
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