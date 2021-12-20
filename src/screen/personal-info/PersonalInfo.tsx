import { FC } from "react";
import { Row } from "react-bootstrap";
import {
  AppStyle,
  circleImage,
  flexHori,
  flexCenter,
  marginHori,
  flexVerti,
  paddingHori,
  margin,
  weightItem,
  marginStart,
  radius,
  width,
  marginEnd,
  height,
  fitContain,
  padding,
  borderWidth,
  background,
  flexShrink,
  textColor,
  bold,
  regular,
  paddingBottom
} from "../../AppStyle";
import ButtonView from "../../components/ButtonView";
import Column from "../../components/Column";
import { ImageView } from "../../components/ImageView";
import TextView from "../../components/Text";
import BackIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import { Colors } from "../../AppColor";
import bgHome from "../../asset/bg_home.png";



interface PersonalInfoProps {}

const PersonalInfo: FC<PersonalInfoProps> = (props) => {
  let navigate = useNavigate();

  return (
    <div>
      <header style={AppStyle({ backgroundImage: `url(${bgHome})` }, paddingBottom(20))}>
        <div style = {AppStyle(flexHori(), margin(20))}>
          <ButtonView
            
            onClick={() => {
              navigate(-1);
            }}
          >
            <BackIcon />
          </ButtonView>

          <TextView style={AppStyle(weightItem(7), margin(40))}>Cá nhân</TextView>
          <ButtonView style={AppStyle(weightItem(1), textColor(Colors.color_primary))} >Sửa</ButtonView>
        </div>

        <div style={AppStyle(flexHori(),flexCenter(), marginStart(40), marginEnd(40))}>
          <ImageView
            style={AppStyle(width(42), height(42), radius(21), padding(0))} src="https://lh3.googleusercontent.com/proxy/ZOwrvNtJI1G9uq96CA7_kfOqgHAXdC-g_-bcu6pEePUmx6ZJzIZT8lHv5vGJzp1qvfZ1Kp1w4mH3E7UMzvYYR0B56g5E7Gw9WKu_z8nn8NvmBZMWXDvt0UJSkgU"
          />
          <Column style={AppStyle(flexVerti(), weightItem(1), marginStart(15))}>
            <TextView style={AppStyle(margin(0), width('auto'), bold(15))}>Nguyễn Minh Dũng</TextView>
            <TextView style={AppStyle(margin(0), width('auto'), regular(13))}>Đổi ảnh đại diện</TextView>
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
        />
      </Column>
    </div>
  );
};

export default PersonalInfo;
