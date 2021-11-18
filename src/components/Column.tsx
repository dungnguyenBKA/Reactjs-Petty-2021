import { FC } from "react";
import { AppStyle, flexHori, flexVerti } from "../AppStyle";
import { ElementProps } from "./Props";


const Column:FC<ElementProps> = (props) => {
    return <div style={AppStyle(flexVerti(), props.style)}>
        {props.children}
    </div>
}

export default Column