import {FC} from "react";
import Rows from "./Row";
import Column from "./Column";
import {AppStyle} from "../AppStyle";
import {Props} from "./Props";

interface ScrollViewProps extends Props<HTMLDivElement> {
	direction: 'horizontal' | 'vertical'
}

const ScrollView: FC<ScrollViewProps> = (props) => {
	const {direction} = props
	if (direction === 'horizontal') {
		return <Rows
			{...props}
			style={
				AppStyle(
					props.style,
					{
						overflowX: 'auto'
					}
				)
			}
		>
			{props.children}
		</Rows>
	} else {
		return <Column
			{...props}
			style={
				AppStyle(
					props.style,
					{
						overflowY: 'auto'
					}
				)
			}
		>
			{props.children}
		</Column>
	}
}

export default ScrollView
