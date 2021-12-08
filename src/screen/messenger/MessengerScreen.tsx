import { useParams } from "react-router";
import {
  AppStyle,
  regular,
  height,
  background,
  flexHori,
  radius,
  textColor,
  weightItem,
  shadow,
  borderWidth,
  flexVerti,
  marginHori,
  flexCenterInParent,
  marginStart,
  semiBold,
  marginVertical,
} from "../../AppStyle";
import icBack from "../../asset/ic_back.svg";
import icSend from "../../asset/ic_send.png";
import ButtonView from "../../components/ButtonView";
import Column from "../../components/Column";
import { ButtonImageView } from "../../components/ImageView";
import TextView from "../../components/Text";

interface MessageProp {
  name?: string;
}

const MessengerScreen = (props: MessageProp) => {
  let params = useParams()

  let userId = params.userId

  let today = new Date(),
    date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

  const sendHandler = () => { };

  const backHandler = () => { };

  return (
    <Column style={AppStyle(
      height('100vh'),
    )}>
      <header
        style={AppStyle(
          flexHori(),
          background(
            " linear-gradient(0deg, #FFFFDB 36%, #FBFEDB 47.5%, #EDFCDD 60.02%, #D8F7DF 73.04%, #B9F2E1 86.39%, #92EAE5 99.87%, #92EAE5 100%)"
          ),
        )}
      >
        <div
          style={AppStyle(
            flexVerti(),
            flexCenterInParent(),
            weightItem(1),
            marginVertical(20),
            textColor("#262A41")
          )}
        >
          <p style={AppStyle(semiBold(20))}>{userId}</p>
          <p style={AppStyle(regular(15))}>{date}</p>
        </div>
      </header>

      <div style={weightItem(1)}>
        <TextView></TextView>
      </div>

      <footer style={AppStyle(flexHori(), shadow(30))}>
        <input
          style={AppStyle(
            radius(12),
            weightItem(1),
            borderWidth(1),
            marginHori(5)
          )}
        />

        <ButtonView>
          <img alt="" src={icSend} width="50px" height="50px" />
        </ButtonView>


      </footer>
    </Column>
  );
};

export default MessengerScreen;
