import {FC, useState} from "react";
import {
	AppStyle,
	background,
	bold,
	borderWidth,
	flexCenter,
	flexHori,
	flexVerti,
	height,
	margin,
	marginEnd,
	marginStart,
	padding,
	paddingBottom,
	paddingHori,
	radius,
	regular,
	textColor,
	weightItem,
	width,
} from "../../AppStyle";
import ButtonView from "../../components/ButtonView";
import Column from "../../components/Column";
import {ImageView} from "../../components/ImageView";
import TextView from "../../components/Text";
import BackIcon from "@mui/icons-material/ArrowBackIosNew";
import {useNavigate} from "react-router-dom";
import {Colors} from "../../AppColor";
import bgHome from "../../asset/bg_home.png";
import {BaseMobileScreen} from "../basescreen/BaseAppScreen";

interface PersonalInfoProps {
}

const PersonalInfo: FC<PersonalInfoProps> = () => {
	const [disabled, setDisabled] = useState(false);


	let navigate = useNavigate();
	const editHandler = () => {
		setDisabled(!disabled);
	};

	const update = () => {
		if (disabled) {
			return <ButtonView
				style={AppStyle(weightItem(1), textColor(Colors.color_primary))}
				onClick={editHandler}
			>
				Sửa
			</ButtonView>

		} else {
			return <ButtonView
				style={AppStyle(weightItem(1), textColor(Colors.color_primary))}
				onClick={editHandler}
			>
				Lưu
			</ButtonView>
		}
	}

	return (
		<BaseMobileScreen>
		<div>
			<header
				style={AppStyle(
					{backgroundImage: `url(${bgHome})`},
					paddingBottom(20)
				)}
			>
				<div style={AppStyle(flexHori(), marginStart(40))}>
					<ButtonView style={{padding: 0}}
						onClick={() => {
							navigate(-1);
						}}
					>
						<BackIcon/>
					</ButtonView>

					<TextView style={AppStyle(weightItem(7), margin(40))}>
						Cá nhân
					</TextView>
					{/* <ButtonView
            style={AppStyle(weightItem(1), textColor(Colors.color_primary))}
            onClick={editHandler}
          >
            Sửa
          </ButtonView> */}
					{disabled && <ButtonView
                        style={AppStyle(weightItem(1), textColor(Colors.color_primary))}
                        onClick={editHandler}
                    >
                        Sửa
                    </ButtonView>}
					{!disabled && <ButtonView
                        style={AppStyle(weightItem(1), textColor(Colors.color_primary))}
                        onClick={editHandler}
                    >
                        Lưu
                    </ButtonView>}
				</div>

				<div
					style={AppStyle(
						flexHori(),
						flexCenter(),
						marginStart(40),
						marginEnd(40)
					)}
				>
					<ImageView
						style={AppStyle(width(42), height(42), radius(21), padding(0))}
						src="https://lh3.googleusercontent.com/proxy/ZOwrvNtJI1G9uq96CA7_kfOqgHAXdC-g_-bcu6pEePUmx6ZJzIZT8lHv5vGJzp1qvfZ1Kp1w4mH3E7UMzvYYR0B56g5E7Gw9WKu_z8nn8NvmBZMWXDvt0UJSkgU"
					/>
					<Column style={AppStyle(flexVerti(), marginStart(15))}>
						<TextView style={AppStyle(margin(0), width("auto"), bold(15))}>
							Nguyễn Minh Dũng
						</TextView>
						<ButtonView style={AppStyle(margin(0), padding(0), width("auto"), regular(13), textColor('rgb(0, 193, 129)'))}>
							Đổi ảnh đại diện
						</ButtonView>
					</Column>
					{/* <ButtonView>Lưu</ButtonView> */}
				</div>
			</header>
			<Column style={AppStyle(margin(20))}>
				<input
					style={AppStyle(
						margin(20),
						width("auto"),
						height(50),
						radius(15),
						paddingHori(15),

						borderWidth(0),
						background("#f4f4f8")
					)}
					type="text"
					placeholder="Tên hiển thị"
					disabled={disabled}
				/>
				<input
					style={AppStyle(
						margin(20),
						width("auto"),
						height(50),
						radius(15),
						paddingHori(15),

						borderWidth(0),
						background("#f4f4f8")
					)}
					type="email"
					placeholder="Email"
					disabled={disabled}
				/>
				<input
					style={AppStyle(
						margin(20),
						width("auto"),
						height(50),
						radius(15),
						paddingHori(15),

						borderWidth(0),
						background("#f4f4f8")
					)}
					type="text"
					placeholder="Số điện thoại"
					disabled={disabled}
				/>
				<input
					style={AppStyle(
						margin(20),
						width("auto"),
						height(50),
						radius(15),
						paddingHori(15),

						borderWidth(0),
						background("#f4f4f8")
					)}
					type="text"
					placeholder="Địa chỉ"
					disabled={disabled}
				/>
			</Column>
		</div>
		</BaseMobileScreen>
	);
};

export default PersonalInfo;
