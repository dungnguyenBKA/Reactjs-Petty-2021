import { FC } from "react";
import { AppStyle, background, borderWidth } from "../AppStyle";
import { Props } from "./Props";


const ButtonView: FC<Props<HTMLButtonElement>> = (props) => {
    return <button {...props} style={AppStyle(props.style, background('none'), borderWidth(0))} >
        {props.children}
    </button>
}

export default ButtonView