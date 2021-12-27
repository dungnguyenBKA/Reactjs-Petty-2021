import {FC, useState} from "react";
import {
	AppStyle,
	cursorPointer,
	flexCenter,
	flexHori,
	marginStart,
	padding,
	radius,
	weightItem,
	width
} from "../../AppStyle";
import icPetSearch from "../../asset/ic_pet_search.svg";
import {ImageView} from "../../components/ImageView";
import {BaseHTMLProps} from "../../components/Props";
import Rows from "../../components/Row";
import {TextField} from "@mui/material";


interface SearchProp extends BaseHTMLProps {
	onInputListener: (name: string) => void
}

const Search: FC<SearchProp> = (props) => {
	let takeDataFromSearch = () => {
		props.onInputListener(input);
	}
	let [input, setInput] = useState('')

	return (
		<Rows style={AppStyle(flexHori(), flexCenter(), padding(16), width('100%'), props.style)}>
			<TextField
				style={AppStyle(weightItem(1))}
				type="text"
				placeholder="Giống, loài ..."
				value={input}
				onChange={e => {
					setInput(e.currentTarget.value)
				}}
				size="small"
				label='Tìm kiếm Pet'
			/>
			<ImageView onClick={() => takeDataFromSearch()} style={AppStyle(marginStart(16), cursorPointer())}
			           src={icPetSearch}/>
		</Rows>
	)
}

export default Search