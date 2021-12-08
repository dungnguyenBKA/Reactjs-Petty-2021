import { getDownloadURL, ref, uploadBytesResumable } from "@firebase/storage";
import { FC, useState } from "react";
import { ButtonGroup, Dropdown } from "react-bootstrap";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { Colors } from "../../AppColor";
import {
  AppStyle,
  border,
  borderWidth,
  margin,
  marginEnd,
  marginHori,
  marginVertical,
  padding,
  radius,
  regular,
  semiBold,
  shadow,
  textColor,
  weightItem,
} from "../../AppStyle";
import ButtonView from "../../components/ButtonView";
import Column from "../../components/Column";
import { storage } from "../../components/firebase/FirebaseApp";
import Rows from "../../components/Row";
import TextView from "../../components/Text";
import AddImage from "./AddImage";
import "./styles.css";

let genderOptions = ["Đực", "Cái", "Không xác định"];
let typeOptions = ["Dog", "Cat", "Fish"];
let botocOptions = ["SNSD", "BTS", "BIGBANG"];
let fromOptions = ["VN", "USD"];
let statusOptions = ["Triệt sản", "No Triệt sản"];

const AddPetScreen: FC = () => {
  let [listImage, setListImage] = useState<File[]>([]);

  const handleSave = () => {
    uploadImages(listImage);
  };

  const uploadImages = (_listImage: File[]) => {
    let promises: Promise<string>[] = _listImage.map((image) => {
      let refImg = ref(storage, `images/${image.name}`);
      let uploadTask = uploadBytesResumable(refImg, image);
      let promise = new Promise<string>((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          undefined,
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log(`File ${image.name} available at`, downloadURL);
              resolve(downloadURL);
            });
          }
        );
      });
      return promise;
    });

    let uploadAllPromise = Promise.all(promises);

    toast.promise(uploadAllPromise, {
      loading: "Uploading",
      success: "Upload all images, links in console",
      error: "Error when upload image",
    });
  };

  return (
    <Column>
      <Rows style={margin(16)}>
        <TextView style={AppStyle(semiBold(17), weightItem(1))}>
          Báo danh Boss
        </TextView>
        <ButtonView onClick={handleSave}>
          <TextView
            style={AppStyle(semiBold(17), textColor(Colors.color_primary))}
          >
            Lưu
          </TextView>
        </ButtonView>
      </Rows>

      <AddImage listImage={listImage} setListImage={setListImage} />

      <Column style={AppStyle(marginHori(16))}>
        <TextView style={AppStyle(semiBold(17))}>THÔNG TIN CHUNG</TextView>
        <InfoInputFromKeyBoard isNecessary={true} title={"Tên Boss"} />
        <AddDate />
        <InfoInputDropDown
          isNecessary={true}
          title={"Giới tính"}
          listOption={genderOptions}
        />
        <InfoInputDropDown
          isNecessary={true}
          title={"Loài"}
          listOption={typeOptions}
        />
        <InfoInputDropDown
          isNecessary={true}
          title={"Bộ tộc"}
          listOption={botocOptions}
        />
        <InfoInputDropDown
          isNecessary={true}
          title={"Nguồn gốc"}
          listOption={fromOptions}
        />
        <InfoInputDropDown
          isNecessary={false}
          title={"Tình trạng"}
          listOption={statusOptions}
        />
        <TextView style={AppStyle(semiBold(17))}>NƠI Ở HIỆN TẠI</TextView>

        <InfoInputFromKeyBoard
          isNecessary={false}
          title={"Số nhà, đường/phố"}
        />
      </Column>
    </Column>
  );
};

function AddDate() {
  const [startDate, setStartDate] = useState<Date>(new Date());

  return (
    
      <DatePicker
        selected={startDate}
        onChange={(date: Date) => setStartDate(date!)}
        onKeyDown={(e) => {
          e.preventDefault();
        }}
      />
    
  );
}
export default AddPetScreen;

interface InfoInputDropDownProps<T> {
  isNecessary: boolean;
  listOption: T[];
  title: string;
}

const InfoInputDropDown: FC<InfoInputDropDownProps<string>> = (props) => {
  let [value, setValue] = useState<string>("");

  return (
    <Rows
      style={AppStyle(
        borderWidth(1),
        shadow(8),
        border(Colors.color_E5E5E5),
        padding(8),
        marginVertical(12),
        radius(8)
      )}
    >
      <Column style={weightItem(1)}>
        <Rows>
          <TextView
            style={AppStyle(
              textColor(Colors.color_8A8A8F),
              regular(12),
              marginEnd(8)
            )}
          >
            {props.title}
          </TextView>
          {props.isNecessary === true && (
            <TextView style={textColor("red")}>*</TextView>
          )}
        </Rows>
        <TextView>{value}</TextView>
      </Column>
      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle split id="dropdown-split-basic" />

        <Dropdown.Menu>
          {props.listOption.map((item) => (
            <Dropdown.Item
              key={item}
              onClick={() => {
                setValue(item);
              }}
            >
              {item}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </Rows>
  );
};

interface InfoInputProps {
  isNecessary: boolean;
  title: string;
}

const InfoInputFromKeyBoard: FC<InfoInputProps> = (props) => {
  let [inputValue, setValue] = useState("");
  return (
    <Column
      style={AppStyle(
        borderWidth(1),
        shadow(8),
        border(Colors.color_E5E5E5),
        padding(8),
        marginVertical(12),
        radius(8)
      )}
    >
      <Rows>
        <TextView style={AppStyle(textColor(Colors.color_8A8A8F), regular(12))}>
          {props.title}
        </TextView>
        {props.isNecessary === true && (
          <TextView style={textColor("red")}>*</TextView>
        )}
      </Rows>

      <input
        value={inputValue}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        style={AppStyle(borderWidth(0), border("none"))}
      />
    </Column>
  );
};
