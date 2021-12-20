import { AppStyle, background, bold, circleImage, fitContain, flexCenter, flexHori, flexVerti, height, margin, marginEnd, marginHori, marginStart, marginVertical, padding, paddingBottom, paddingTop, radius, regular, shadow, textColor, weightItem, width } from "../../AppStyle"

import icScan from '../../asset/ic_qr_scan.png'
import icAddFriend from '../../asset/ic_add_friend.png'
import icPetAdd from '../../asset/ic_pet_add.png'
import icPetCard from '../../asset/ic_pet_card.png'
import icCoin from '../../asset/ic_coin.svg'
import bgHome from '../../asset/bg_home.png'
import { ImageView } from "../../components/ImageView"


import { AppCtx } from "../../App";
import React from "react";
import { getRamdomFakeUser } from "../../models/User";
import ButtonView from "../../components/ButtonView"

export default function Header() {
    const appContext = React.useContext(AppCtx)
    let [currentUser, setCurrentUser] = [appContext.currentUser, appContext.setCurrentUser]

    return <div style={
        AppStyle({ backgroundImage: `url(${bgHome})` }, 
        padding(20))
        }>
        <div style={AppStyle(flexHori(), flexCenter(), marginHori(15))}>
            <ImageView style={AppStyle(circleImage(42))} src={currentUser?.avatar} />

            <div style={AppStyle(flexVerti(), weightItem(1), marginStart(15))}>
                <p style={AppStyle(margin(0), bold(15), textColor("#007B52"))}>{currentUser?.name}</p>
                <p style={AppStyle(margin(0), regular(13), textColor("#474A57"))}>Thong tin tai khoan chu</p>
            </div>

            <ButtonView
                onClick={
                    () => {
                    setCurrentUser(getRamdomFakeUser())
                }
                }>
                Random User
            </ButtonView>
        </div>
    </div>
}