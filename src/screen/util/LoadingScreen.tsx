import {FC} from "react";
import Popup from "reactjs-popup";
import {CircularProgress} from "@mui/material";
import 'reactjs-popup/dist/index.css';
import './loading.css'

interface LoadingScreenProps {
	isLoading: boolean,
}

const LoadingScreen: FC<LoadingScreenProps> = (props) => {
	let {isLoading} = props
	return <Popup className="loading" closeOnEscape={false} closeOnDocumentClick={false} modal open={isLoading}>
		<CircularProgress color="success"/>
	</Popup>
}

export default LoadingScreen