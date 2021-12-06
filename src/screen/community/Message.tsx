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
  width,
  marginVertical,
} from "../../AppStyle";
import TextView from "../../components/Text";
import icBack from "../../asset/ic_back.svg";
import icSend from "../../asset/ic_send.png";
import { time } from "console";

interface MessageProp {
  name: string;
}

const Message = (props: MessageProp) => {
  let today = new Date(),
    date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

  const sendHandler = () => {};

  const backHandler = () => {};

  return (
    <div>
      <header
        style={AppStyle(
          flexHori(),
          background(
            " linear-gradient(0deg, #FFFFDB 36%, #FBFEDB 47.5%, #EDFCDD 60.02%, #D8F7DF 73.04%, #B9F2E1 86.39%, #92EAE5 99.87%, #92EAE5 100%)"
          ),

          height(88)
        )}
      >
        <button
          style={AppStyle(
            marginStart(23),
            background(
              " linear-gradient(0deg, #FFFFDB 36%, #FBFEDB 47.5%, #EDFCDD 60.02%, #D8F7DF 73.04%, #B9F2E1 86.39%, #92EAE5 99.87%, #92EAE5 100%)"
            ),

            borderWidth(0)
          )}
          onClick={backHandler}
        >
          <img src={icBack} alt="Quay lại " />
        </button>
        <div
          style={AppStyle(
            flexVerti(),
            flexCenterInParent(),

            weightItem(1),
            marginVertical(40),
            textColor("#262A41")
          )}
        >
          <p style={AppStyle(semiBold(20))}>Dat</p>
          <p style={AppStyle(regular(15))}>{date}</p>
        </div>
      </header>
      <body></body>

      <footer style={AppStyle(flexHori(), height(50), shadow(30))}>
        <input
          style={AppStyle(
            radius(12),
            weightItem(1),
            borderWidth(1),
            marginHori(5)
          )}
        />
     
         <img alt= "" src = {icSend} width = "50px" height = "50px"/>
      </footer>
    </div>
  );
};

export default Message;
