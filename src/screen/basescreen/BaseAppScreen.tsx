import {FC} from "react";
import {Colors} from "../../AppColor";
import {AppStyle, borderWidth} from "../../AppStyle";
import {Props} from "../../components/Props";
import BaseScreen from "./BaseScreen";

export const BaseMobileScreen: FC<Props<HTMLDivElement>> = (props) => {
	return <BaseScreen
		{...props}

		style={
			AppStyle(
				{...props.style},
				borderWidth(1),
				{maxWidth: '768px', margin: 'auto', minHeight: "100vh", background: Colors.color_white}
			)
		}

	>
		{
			props.children
		}
	</BaseScreen>
}

export const BaseFullScreen: FC<Props<HTMLDivElement>> = (props) => {
	return <BaseScreen
		{...props}

		style={
			AppStyle(
				{...props.style}
			)
		}

	>
		{
			props.children
		}
	</BaseScreen>
}