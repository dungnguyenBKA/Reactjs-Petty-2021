import { FC } from "react";
import { AppStyle, margin } from "../AppStyle";
import { Props } from "./Props";

const TextView:FC<Props<HTMLParagraphElement>> = (props) => {
    return <p {...props} style={AppStyle(margin(0), props.style , {
        userSelect: 'none'
    })}>{props.children}</p>
}

export default TextView
