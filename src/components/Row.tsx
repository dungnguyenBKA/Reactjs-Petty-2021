import { FC } from "react";
import { AppStyle, flexHori } from "../AppStyle";
import { ElementProps } from "./Props";

const Rows:FC<ElementProps> = (props) => {
    return <div style={AppStyle(flexHori(), props.style)}>
        {props.children}
    </div>
}

export default Rows