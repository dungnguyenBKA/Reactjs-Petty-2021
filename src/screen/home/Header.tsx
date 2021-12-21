import { AppStyle, bold, circleImage, flexCenter, flexHori, flexVerti, margin, marginHori, marginStart, padding, regular, textColor, weightItem } from "../../AppStyle"
import bgHome from '../../asset/bg_home.png'
import { ImageView } from "../../components/ImageView"
import { AppCtx } from "../../App";
import React from "react";
import ButtonView from "../../components/ButtonView"
import { useNavigate } from "react-router-dom"
import Rows from "../../components/Row";

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
        <ButtonView
        onClick={() => {
          navigate('../personal')
        }}

        style={AppStyle(weightItem(1))}
        >
          <Rows>
            <ImageView style={AppStyle(circleImage(42))} src={currentUser?.avatar} />

            <div style={AppStyle(flexVerti(), marginStart(15))}>
              <p style={AppStyle(margin(0), bold(17), textColor("#007B52"), { textAlign: 'left'})}>{currentUser?.name}</p>
              <p style={AppStyle(margin(0), regular(15), textColor("#474A57"))}>Thông tin tài khoản</p>
            </div>
          </Rows>
        </ButtonView>


        <ButtonView
          onClick={
            () => {
              setCurrentUser(undefined)
              navigate('../login')
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
