import {useContext, useEffect, useState} from "react";
import TabPanel from "../../components/TabLayout";
import Header from "./Header";
import MyPet from "./MyPet";
import Column from "../../components/Column";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import CommunityIcon from '@mui/icons-material/Group';
import {AppStyle, background, height} from "../../AppStyle";
import DiscoveryScreen from "../community/DiscoveryScreen";
import {Paper} from "@mui/material";
import {AppCtx} from "../../App";
import {useNavigate} from "react-router-dom";

export default function HomeScreen() {
	const [value, setValue] = useState(0);
	const navigate = useNavigate()
	const appContext = useContext(AppCtx)
	const currentUser = appContext.currentUser
	const setLoading = appContext.setLoading

	useEffect(() => {
		if(!currentUser) {
			navigate('/login')
		}
	})

	return <Column
		style={
			AppStyle(
				height('100vh')
			)
		}
	>
		<TabPanel index={0} value={value}>
			<PersonalScreen/>
		</TabPanel>

		<TabPanel index={1} value={value}>
			<DiscoveryScreen/>
		</TabPanel>

		<Paper
			elevation={3}>
			<BottomNavigation
				style={
					AppStyle(
						background('transparent'),
						height('8vh')
					)
				}
				showLabels
				value={value}
				onChange={(event, newValue) => {
					setValue(newValue);
				}}
			>
				<BottomNavigationAction label="Home" icon={<HomeIcon/>}/>
				<BottomNavigationAction label="Cộng đồng" icon={<CommunityIcon/>}/>
			</BottomNavigation> </Paper>


	</Column>

}


function PersonalScreen() {
	return <div>
		<Header/>
		<MyPet/>
	</div>
}

