import {getDownloadURL, ref, uploadBytesResumable} from "@firebase/storage";
import React, {FC, useContext, useEffect, useState} from "react";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
	AppStyle,
	flexCenter,
	margin,
	marginBottom,
	marginHori,
	marginStart,
	marginTop,
	padding,
	semiBold,
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
import {NetworkErrorHandler} from "../../api/AppApi";
import {AxiosError} from "axios";
import ValidateTextInput from "../../components/ValidatorInput";
import {Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";

import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import ApiHelper from "../../api/ApiHelper";
import DatePicker from '@mui/lab/DatePicker';

let genderOptions = ["Đực", "Cái", "Chưa xác định"];
let fromOptions = ["Việt Nam", "Ngoại nhập"];
let statusOptions = ["Triệt sản", "Chưa Triệt sản"];


const AddPetScreen: FC = () => {
	let navigate = useNavigate()
	let [listImage, setListImage] = useState<File[]>([])
	let [name, setName] = useState('')
	let [isNameValid, setNameValid] = useState(false)
	let [dob, setDob] = useState('')
	let [petType, setType] = useState('')
	let [isTypeValid, setTypeValid] = useState(false)
	let [petClass, setClass] = useState('')
	let [isClassValid, setClassValid] = useState(false)
	let [petAddress, setAddress] = useState('')
	let [gender, setGender] = useState('')
	let [resource, setResource] = useState('')
	let [status, setStatus] = useState('')
	let [isValid, setValid] = useState(false)


	useEffect(() => {
		if (isNameValid && isTypeValid && isClassValid && dob) {
			setValid(true)
		} else {
			setValid(false)
		}
	}, [isNameValid, isTypeValid, isClassValid, dob])


	let appContext = useContext(AppCtx)
	let setLoading = appContext.setLoading
	let appApi = appContext.appApi
	let user = appContext.currentUser

	let checkIsLenValid = (text: string): [boolean, string?] => {
		return [text.length > 0, 'Không được để trống'];
	}

	const handleSave = async () => {
		if (!user) {
			return
		}
		// upload to get urls of pet's images
		let urls = await uploadImages(listImage);

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
			newPet.images = JSON.stringify(urls)

			let res = await appApi.ensureAuthorize(user.email, user.pwd, () => {
				return appApi.addPet(newPet)
			})
			if (res.data.statusCode === 200) {
				Logger.successToast()
				navigate('../')

			} else {
				Logger.errorToast()
			}
		} catch (e) {
			ApiHelper.handleCallApiError(e, new class implements NetworkErrorHandler {
				onNetworkError(e: AxiosError): void {
					Logger.errorToast()
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

		let urls: string[] = []

		try {
			urls = await Promise.all(promises)
		} catch (e) {
			Logger.error(e)
			Logger.errorToast()
			urls = []
		} finally {
			setLoading(false)
		}

		return urls
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
				<Button variant={'text'} onClick={handleSave} color='inherit' disabled={!isValid}>
					Lưu
				</Button>
			</Rows>

			<AddImage setListImage={setListImage}/>

			<Column style={AppStyle(marginHori(16))}>
				<TextView style={AppStyle(semiBold(17))}>THÔNG TIN CHUNG</TextView>


				<ValidateTextInput
					label="Báo danh Boss*"
					style={AppStyle(marginTop(24), marginBottom(24))}
					check_valid_functions={[checkIsLenValid]}
					set_value={setName}
					value={name}
					type="text"
					set_valid={setNameValid}
					placeholder=''/>
				<AddDate
					placeholder='Sinh thần*'
					setDate={(date) => {
						setDob(DateHelper.dateToStringJson(date))
					}}/>
				<ValidateTextInput
					style={AppStyle(marginTop(24))}
					check_valid_functions={[checkIsLenValid]} set_value={setType} value={petType}
					type="text"
					label="Loài*" set_valid={setTypeValid}/>
				<ValidateTextInput
					style={AppStyle(marginTop(24), marginBottom(8))}
					check_valid_functions={[checkIsLenValid]} set_value={setClass} value={petClass}
					type="text"
					label="Bộ tộc*" set_valid={setClassValid}/>

				<InfoInputDropDown
					listOption={genderOptions}
					label='Giới tính' onChangeValue={setGender}/>

				<InfoInputDropDown
					listOption={fromOptions}
					label='Nguồn gốc' onChangeValue={setResource}/>

				<InfoInputDropDown
					listOption={statusOptions}
					label='Tình trạng' onChangeValue={setStatus}/>
				<div style={AppStyle(marginTop(20))}>
					<TextView style={AppStyle(semiBold(17), marginTop(20))}>NƠI Ở HIỆN TẠI</TextView>

				</div>
				<TextField
					style={AppStyle(marginTop(18), marginBottom(24))}

					label='Số nhà, đường phố' onChange={e => setAddress(e.target.value)}
				/>
			</Column>
		</Column>
	);
};

interface AddDateProps {
	setDate: (date: Date) => void;
	placeholder: string;
}

const AddDate: FC<AddDateProps> = (props) => {
	const [startDate, setStartDate] = useState<Date | undefined>(undefined);

	useEffect(() => {
		props.setDate(new Date())
	}, [])

	useEffect(() => {
		if (startDate) {
			props.setDate(startDate)
		}
	}, [startDate])

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<DatePicker
				label={props.placeholder}
				value={startDate}
				onChange={(date: any) => {
					try {
						setStartDate(date)
					} catch (e) {
						Logger.error(e)
					}
				}}
				renderInput={(params) => <TextField disabled {...params} />}
			/>
		</LocalizationProvider>
	);
}

export default AddPetScreen;

interface InfoInputDropDownProps<T> {
	onChangeValue: any;
	listOption: T[];
	label: string;
}

const InfoInputDropDown: FC<InfoInputDropDownProps<string>> = (props) => {
	let [value, setValue] = useState<string>("");
	const handleChange = (event: SelectChangeEvent) => {
		setValue(event.target.value);
	};

	return (<FormControl required sx={{width: '100%', marginTop: 3}}>
			<InputLabel id="demo-simple-select-required-label">{props.label}</InputLabel>
			<Select

				value={value}
				label={props.label}

			> {props.listOption.map((item) => (
				<MenuItem
					value={item}
					key={item}
					onClick={() => {
						setValue(item);
						props.onChangeValue(item)
					}}>
					{item}
				</MenuItem>))}


			</Select>

		</FormControl>
		// <Rows
		// 	style={AppStyle(
		// 		borderWidth(1),
		// 		shadow(8),
		// 		border(Colors.color_E5E5E5),
		// 		padding(8),
		// 		marginVertical(12),
		// 		radius(8)
		// 	)}
		// >
		// 	<Column style={weightItem(1)}>
		// 		<Rows>
		// 			<TextView
		// 				style={AppStyle(
		// 					textColor(Colors.color_8A8A8F),
		// 					regular(12),
		// 					marginEnd(8)
		// 				)}
		// 			>
		// 				{props.title}
		// 			</TextView>
		// 			{props.isNecessary && (
		// 				<TextView style={textColor("red")}>*</TextView>
		// 			)}
		// 		</Rows>
		// 		<TextView>{value}</TextView>
		// 	</Column>
		// 	<Dropdown as={ButtonGroup}>
		// 		<Dropdown.Toggle split id="dropdown-split-basic"/>
		//
		// 		<Dropdown.Menu>
		// 			{props.listOption.map((item) => (
		// 				<Dropdown.Item
		// 					key={item}
		// 					onClick={() => {
		// 						setValue(item);
		// 						props.onChangeValue(item)
		// 					}}
		// 				>
		// 					{item}
		// 				</Dropdown.Item>
		// 			))}
		// 		</Dropdown.Menu>
		// 	</Dropdown>
		// </Rows>
	);
};

// interface InfoInputProps<T> {
// 	isNecessary: boolean;
// 	title: string;
// 	onChangeValue: (t: T) => void;
// 	onBlur?: any;
//
// }

// const InfoInputFromKeyBoard: FC<InfoInputProps<string>> = (props) => {
// 	let [inputValue, setValue] = useState("");
//
// 	return (
// 		<Column
// 			style={AppStyle(
// 				borderWidth(1),
// 				shadow(8),
// 				border(Colors.color_E5E5E5),
// 				padding(8),
// 				marginVertical(12),
// 				radius(8)
// 			)}
// 		>
// 			<Rows>
// 				<TextView style={AppStyle(textColor(Colors.color_8A8A8F), regular(12))}>
// 					{props.title}
// 				</TextView>
// 				{props.isNecessary && (
// 					<TextView style={textColor("red")}>*</TextView>
// 				)}
// 			</Rows>
//
// 			<input
//
// 				value={inputValue}
// 				onChange={(event) => {
// 					let value = event.target.value
// 					setValue(value);
// 					props.onChangeValue(value);
//
// 				}}
// 				onBlur={props.onBlur}
// 				style={AppStyle(borderWidth(0), {borderBottom: 'none'})}
//
//
//
// 			/>
// 		</Column>
// 	);
// };
