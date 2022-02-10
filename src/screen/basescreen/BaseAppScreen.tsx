import {FC} from "react";
import {Colors} from "../../AppColor";
import {AppStyle, borderWidth} from "../../AppStyle";
import {Props} from "../../components/Props";
import Rows from "../../components/Row";
import BaseScreen from "./BaseScreen";
import {ImageView} from "../../components/ImageView";

export const BaseMobileScreen: FC<Props<HTMLDivElement>> = (props) => {
	return <Rows>
		<ImageAds urlImage={'https://vcdn-vnexpress.vnecdn.net/2020/08/04/VinFast-President-1-9915-1596526753.jpg'}/>

		<BaseScreen
			{...props}

			style={
				AppStyle(
					{...props.style},
					borderWidth(1),
					{width: '50%', margin: 'auto', minHeight: "100vh", background: Colors.color_white}
				)
			}

		>
			{
				props.children
			}
		</BaseScreen>

		<ImageAds urlImage={'https://cellphones.com.vn/sforum/wp-content/uploads/2022/01/Samsung-Galaxy-S22-Ultra-S-Pen.jpg'}/>
	</Rows>
}

interface ImageAdsProps {
	urlImage: string
}

const ImageAds : FC<ImageAdsProps> = ({urlImage}) => {
	return <ImageView
		src={urlImage}
		style={{
		height: '100vh',
			width: '25%'
	}}/>
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
