import {FC, useState} from "react";
import {
	AppStyle,
	background,
	cursorPointer,
	flexCenter,
	flexHori,
	marginStart,
	padding,
	weightItem,
	width
} from "../../AppStyle";
import icPetSearch from "../../asset/ic_pet_search.svg";
import {ImageView} from "../../components/ImageView";
import {BaseHTMLProps} from "../../components/Props";
import Rows from "../../components/Row";
import {TextField} from "@mui/material";
import bgHome from '../../asset/bg_home.png'

interface SearchProp extends BaseHTMLProps {
	onInputListener: (name: string) => void
}

const Search: FC<SearchProp> = (props) => {
	let takeDataFromSearch = () => {
		props.onInputListener(input);
	}
	let [input, setInput] = useState('')

	return (
		<Rows style={AppStyle(flexHori(), flexCenter(), padding(16), width('100%'), props.style, {backgroundImage: `url(${bgHome}) repeat 0 0;`}) }>
			<TextField
				style={AppStyle(weightItem(1))}
				type="text"
				placeholder="Nhập tên hoặc loài ..."
				value={input}
				onChange={e => {
					setInput(e.currentTarget.value)
				}}
				size="small"
				label='Tìm kiếm Pet'
				onSubmit={takeDataFromSearch}
			/>

			<ImageView
				onClick={takeDataFromSearch}
				style={AppStyle(marginStart(16), cursorPointer())}
				src={icPetSearch}
			/>
		</Rows>
	)
}

export default Search
