import {getDownloadURL, ref, uploadBytesResumable} from "@firebase/storage";
import React, {FC, useContext, useState} from "react";
import {ButtonGroup, Dropdown} from "react-bootstrap";
import DatePicker from "react-datepicker";


import "react-datepicker/dist/react-datepicker.css";
import {Colors} from "../../AppColor";
import {
	AppStyle, background,
	border,
	borderWidth,
	flexCenter,
	margin,
	marginEnd,
	marginHori,
	marginStart,
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
import {storage} from "../../components/firebase/FirebaseApp";
import Rows from "../../components/Row";
import TextView from "../../components/Text";
import AddImage from "./AddImage";
import "./styles.css";

import BackIcon from '@mui/icons-material/ArrowBackIosNew'
import {useNavigate} from "react-router-dom";
import Pet from "../../models/Pet";
import DateHelper from "../../helper/DateHelper";
import Logger from "../../api/Logger";
import {AppCtx} from "../../App";
import AppApi, {NetworkErrorHandler} from "../../api/AppApi";
import {BaseResponse} from "../../api/ApiJsonFormat";
import {AxiosError} from "axios";
import ValidateTextInput from "../../components/ValidatorInput";
import {TextField} from "@mui/material";
import {useForm} from "react-hook-form";
import BaseValidateTextInput from "../../components/BaseValidateTextInput";

let genderOptions = ["Đực", "Cái", "Không xác định"];
let typeOptions = ["Dog", "Cat", "Fish"];
let botocOptions = ["SNSD", "BTS", "BIGBANG"];
let fromOptions = ["VN", "USD"];
let statusOptions = ["Triệt sản", "No Triệt sản"];


const AddPetScreen: FC = () => {
	let navigate = useNavigate()
	let [listImage, setListImage] = useState<File[]>([])
	let [listImageJson, setListImageJson] = useState('')
	let [name, setName] = useState('')
	let [dob, setDob] = useState('')
	let [petType, setType] = useState('')
	let [petClass, setClass] = useState('')
	let [petAddress, setAddress] = useState('')
	let [gender, setGender] = useState('')
	let [resource, setResource] = useState('')
	let [status, setStatus] = useState('')
	let [isValid, setIsValid] = useState(false)
	const { register } = useForm();



	let appContext = useContext(AppCtx)
	let setLoading = appContext.setLoading
	let appApi = appContext.appApi
	let user = appContext.currentUser

	let checkIsLenValid = (text: string): [boolean, string?] => {
		return [text.length >= 0, 'field is invalid'];
	}

	const buttonSave = () => {
		if(isValid){
			return <ButtonView onClick={handleSave}>
				<input type='Submit' value='Lưu'
					   style={AppStyle(semiBold(17), textColor(Colors.color_primary), borderWidth(0), background('#FFFFFF'))} disabled={!isValid}
				/>
			</ButtonView>
		} else {
			return <ButtonView onClick={handleSave}>
			<input type='Submit' value='Lưu'
				   style={AppStyle(semiBold(17), textColor('grey'), borderWidth(0), background('#FFFFFF'))} disabled={isValid}
			/>
		</ButtonView>}
	}














	const handleSave = async () => {
		if (!user) {
			return
		}
		// upload to get urls of pet's images
		await uploadImages(listImage);

		// call api
		setLoading(true)
		try {
			let newPet = new Pet()
			newPet.name = name
			newPet.dob = dob
			newPet.gender = gender
			newPet.type = petType
			newPet.class = petClass
			newPet.address = petAddress
			newPet.resource = resource
			newPet.status = status
			newPet.images = listImageJson

			let res = await appApi.ensureAuthorize(user.email, user.pwd, () => {
				return appApi.addPet(newPet)
			})
			if (res.data.statusCode === 200) {
				Logger.successToast()
				navigate('../')
				setIsValid(!isValid)
			} else {
				Logger.errorToast()
			}
		} catch (e) {
			AppApi.handleCallApiError(e, new class implements NetworkErrorHandler {
				onNetworkError(e: AxiosError<BaseResponse<any>>): void {
					Logger.errorToast(e.response?.data.message)
				}

				onOtherError(e: unknown): void {
					Logger.errorToast()
				}
			}())
		} finally {
			setLoading(false)
		}
	};

	const uploadImages = async (_listImage: File[]) => {
		let promises: Promise<string>[] = _listImage.map((image) => {
			let refImg = ref(storage, `images/${image.name}`);
			let uploadTask = uploadBytesResumable(refImg, image);
			return new Promise<string>((resolve, reject) => {
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
		});

		setLoading(true)
		try {
			let urls = await Promise.all(promises)
			setListImageJson(JSON.stringify(urls))
		} catch (e) {
			Logger.error(e)
			Logger.errorToast()
		} finally {
			setLoading(false)
		}
	};

	return (
		<Column>
			<Rows style={AppStyle(margin(16), flexCenter())}>
				<ButtonView
					style={
						AppStyle(
							padding(0)
						)
					}
					onClick={() => {
						navigate(-1)
					}
					}
				>
					<BackIcon/>
				</ButtonView>
				<TextView style={AppStyle(semiBold(17), weightItem(1), marginStart(13))}>
					Báo danh Boss
				</TextView>
				{buttonSave()}
				{/*<ButtonView onClick={handleSave}>*/}
				{/*	<input type='Submit' value='Lưu' onChange={()=>setIsValid(!isValid)}*/}
				{/*		style={AppStyle(semiBold(17), borderWidth(0), background('#FFFFFF'))} disabled={isValid}*/}
				{/*	/>*/}
				{/*</ButtonView>*/}
			</Rows>

			<AddImage setListImage={setListImage}/>

			<Column style={AppStyle(marginHori(16))}>
				<TextView style={AppStyle(semiBold(17))}>THÔNG TIN CHUNG</TextView>


				<BaseValidateTextInput checkValidFunctions={[checkIsLenValid]} setValue={setName} value={name} type="text"
									   placeholder="Báo danh Boss" />
				<AddDate validCheck = {checkIsLenValid}
						 setDate={(date) => {setDob(DateHelper.dateToFormatString(date))}}/>
				<BaseValidateTextInput
					checkValidFunctions={[checkIsLenValid]} setValue={setType} value={petType} type="text"
					placeholder="Loài" />
				<BaseValidateTextInput
				checkValidFunctions={[checkIsLenValid]} setValue={setClass} value={petClass} type="text"
				placeholder="Bộ tộc" />





				{/*<InfoInputFromKeyBoard*/}
				{/*	isNecessary={true}*/}
				{/*	title={"Tên Boss"}*/}
				{/*	onChangeValue={setName}*/}
				{/*	onBlur={validNameCheck}*/}



				{/*/>*/}
				<InfoInputDropDown
					isNecessary={true}
				title={"Giới tính"}
				listOption={genderOptions}
				onChangeValue={setGender}/>
				{/*<InfoInputDropDown*/}
				{/*	isNecessary={true}*/}
				{/*	title={"Loài"}*/}
				{/*	listOption={typeOptions}*/}
				{/*	onChangeValue={setType}*/}

				{/*	onBlur={validNameCheck}*/}

				{/*	// required = {handleValid}*/}
				{/*/>*/}
				{/*<InfoInputDropDown*/}
				{/*	isNecessary={true}*/}
				{/*	title={"Bộ tộc"}*/}
				{/*	listOption={botocOptions}*/}
				{/*	onChangeValue={setClass}*/}

				{/*	onBlur={validNameCheck}*/}

				{/*	// required = {handleValid}*/}
				{/*/>*/}
				<InfoInputDropDown
					isNecessary={true}
					title={"Nguồn gốc"}
					listOption={fromOptions}
					onChangeValue={setResource}
				/>
				<InfoInputDropDown
					isNecessary={false}
					title={"Tình trạng"}
					listOption={statusOptions}
					onChangeValue={setStatus}
				/>
				<TextView style={AppStyle(semiBold(17))}>NƠI Ở HIỆN TẠI</TextView>

				<InfoInputFromKeyBoard
					isNecessary={false}
					title={"Số nhà, đường/phố"}
					onChangeValue={setAddress}
				/>
			</Column>
		</Column>
	);
};

interface AddDateProps {
	validCheck: any;
	setDate: (date: Date) => void
}

const AddDate: FC<AddDateProps> = (props) => {
	const [startDate, setStartDate] = useState<Date | undefined>(undefined);

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
				<TextView
					style={AppStyle(
						textColor(Colors.color_8A8A8F),
						regular(12),
						marginEnd(8)
					)}
				>
					Sinh thần
				</TextView>
				<TextView style={textColor("red")}>*</TextView>

			</Rows>
			<DatePicker
				selected={startDate}
				onChange={
					(date: Date) => {
						setStartDate(date)
						props.setDate(date)
					}
				}
				dateFormat="dd.MM.yyyy"

				onKeyDown={(e) => {
					e.preventDefault();
				}}

				onChangeRaw={(e) => {
					e.preventDefault();
				}}

				required
				showYearDropdown
				scrollableYearDropdown

				customInput={<input

					style={AppStyle(
						semiBold(17),
						textColor(Colors.color_primary),
						borderWidth(0)
					)}>

				</input>}
			/>
		</Column>
	);
}

export default AddPetScreen;

interface InfoInputDropDownProps<T> extends InfoInputProps<T> {
	listOption: T[];
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
					{props.isNecessary && (
						<TextView style={textColor("red")}>*</TextView>
					)}
				</Rows>
				<TextView>{value}</TextView>
			</Column>
			<Dropdown as={ButtonGroup}>
				<Dropdown.Toggle split id="dropdown-split-basic"/>

				<Dropdown.Menu>
					{props.listOption.map((item) => (
						<Dropdown.Item
							key={item}
							onClick={() => {
								setValue(item);
								props.onChangeValue(item)
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

interface InfoInputProps<T> {
	isNecessary: boolean;
	title: string;
	onChangeValue: (t: T) => void;
	onBlur?: any;

}

const InfoInputFromKeyBoard: FC<InfoInputProps<string>> = (props) => {
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
				{props.isNecessary && (
					<TextView style={textColor("red")}>*</TextView>
				)}
			</Rows>

			<input

				value={inputValue}
				onChange={(event) => {
					let value = event.target.value
					setValue(value);
					props.onChangeValue(value);

				}}
				onBlur={props.onBlur}
				style={AppStyle(borderWidth(0), border('none'))}



			/>
		</Column>
	);
};
