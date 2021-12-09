import { randomInt } from "crypto"
import { FC } from "react"
import { Route, useNavigate } from "react-router"
import { AppStyle, background, shadow,circle, circleImage, flexCenter, height, margin, padding, paddingHori, paddingVerti, regular, semiBold, singleLine, weightItem, width, radius, marginEnd } from "../../AppStyle"
import Column from "../../components/Column"
import { ImageView } from "../../components/ImageView"
import Rows from "../../components/Row"
import TextView from "../../components/Text"
import User, { getRamdomFakeUser } from "../../models/User"

import './ListMessengerScreen.css'
import MessengerScreen from "./MessengerScreen"

interface ListMessengerScreenProps {

}

let lorem = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi debitis eos sunt veritatis maiores cupiditate optio suscipit quo? Sequi dolorum cum voluptate libero voluptatum quam recusandae eveniet minima consequuntur aliquam!"

let fakeMessageUsers: MessageUser[] = Array.from(Array(10).keys()).map(() => {
    return {
        user: getRamdomFakeUser(),
        lastMessage: lorem, 
        
    }
})

const ListMessengerScreen: FC<ListMessengerScreenProps> = () => {

    return <Column>
        {
            fakeMessageUsers.map((item) => {
                return <MessengerItem user={item.user} lastMessage={item.lastMessage} />
            })
        }
    </Column>
}

interface MessageUser {
    user: User,
    lastMessage: string,
}

const MessengerItem: FC<MessageUser> = (props) => {
    let user = props.user;
    let navigate = useNavigate();


    let handleItemClick = () => {
        navigate('/message/1')
    }

    return <Rows
        style={
            AppStyle(
                paddingVerti(8),
                paddingHori(12),
                flexCenter(),
                width('100%'), shadow(8)
            )
        }
        onClick={ handleItemClick} >
    
            
        
    
        <div style={
            AppStyle(width(60), height(60), margin(15))
        }>
            <ImageView
                style={
                    AppStyle(circleImage(60))
                }
                src={user.avatar}
            />
        </div>


        <Column
            style={
                AppStyle(
                    background('#FFFFFF'),
                    width('85%'), height(60)
                )
            }>
            <TextView style={
                AppStyle(
                    semiBold(17)
                )
            }>{user.name}</TextView>

            <TextView
            className="single-line-text"
            style={
                AppStyle(
                    regular(14)
                )
            }>{props.lastMessage}</TextView>
        </Column>

    </Rows>
}

export default ListMessengerScreen