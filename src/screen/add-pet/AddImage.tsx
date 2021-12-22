import {FC} from "react";
import {Colors} from "../../AppColor";
import {
	AppStyle,
	border,
	borderWidth,
	cursorPointer,
	flexCenterInParent,
	flexHori,
	flexShrink,
	height,
	margin,
	padding,
	radius,
	setOverFlowX,
	width,
} from "../../AppStyle";
import {ButtonImageView, ImageView} from "../../components/ImageView";
import Rows from "../../components/Row";
import TextView from "../../components/Text";

import "./AddImage.css";

import icCancle from "../../asset/ic_cancle.svg";
import toast from "react-hot-toast";

interface AddImageProps {
	listImage: File[],
	setListImage: (list: File[]) => void
}

const AddImage: FC<AddImageProps> = (props) => {
	let {listImage, setListImage} = props

	const pushIfNotDuplicate = (file: File) => {
		let isDup = false;
		for (let index = 0; index < listImage.length; index++) {
			const element = listImage[index];
			if (element.name === file.name) {
				isDup = true;
				break;
			}
		}
		if (!isDup) {
			let newList = [...listImage];
			newList.push(file)
			setListImage(newList);
			toast.success("Thành công")
		} else {
			toast.error("Trùng file!!")
		}
	}

	return (
		<div>
			<Rows style={AppStyle(setOverFlowX())}>
				<AddImageItem
					onChangeEvent={(event) => {
						let files = event.target.files;
						if (files && files[0]) {
							pushIfNotDuplicate(files[0])
						} else {
							toast.error("Đã có lỗi xảy ra, vui lòng thử lại")
						}
					}}
				/>

				<Rows>
					{listImage.map((imageItem, index) => (
						<ImageItem
							key={imageItem.name}
							position={0}
							item={imageItem}
							onItemDelete={() => {
								let _newList = [...listImage];
								_newList.splice(index, 1);
								setListImage(_newList);
							}}
						/>
					))}
				</Rows>
			</Rows>
		</div>
	);
}

interface AddImageItemProps {
	onChangeEvent: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddImageItem: FC<AddImageItemProps> = (props) => {
	return (
		<div>
			<input
				id="file"
				style={{display: "none"}}
				type="file"
				accept="image/*"

				onChange={(e) => {
					props.onChangeEvent(e)

					// reset value https://stackoverflow.com/questions/39484895/how-to-allow-input-type-file-to-select-the-same-file-in-react-component
					e.target.value = ''
				}}
			/>
			<label
				htmlFor="file"
				style={AppStyle(
					flexHori(),
					flexShrink(0),
					width(150),
					cursorPointer(),
					height(200),
					radius(10),
					border(Colors.color_8A8A8F),
					borderWidth(1),
					margin(12),
					flexCenterInParent()
				)}
			>
				<TextView>Thêm ảnh</TextView>
			</label>
		</div>
	);
};

interface ImageItemProps {
	item: File;
	position: number;
	onItemDelete: (position: number) => void;
}

const ImageItem: FC<ImageItemProps> = (props) => {
	return (
		<div
			className="container"

			style={AppStyle(width(150), height(200), margin(12), padding(0), radius(8), borderWidth(1), border(Colors.color_E5E5E5))}

			onClick={() => {
			}}>
			<ImageView className="background-img" src={URL.createObjectURL(props.item)}/>
			<ButtonImageView
				className="ic-delete"
				src={icCancle}
				onClick={() => props.onItemDelete(props.position)}
			/>
		</div>
	);
};

export default AddImage