import { useState } from "react";
import TabPanel from "../../components/TabLayout";
import Header from "./Header";
import MyPet from "./MyPet";
import Column from "../../components/Column";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import CommunityIcon from '@mui/icons-material/Group';
import ChatIcon from '@mui/icons-material/Chat';
import { AppStyle, background, height, maxHeight, weightItem, width } from "../../AppStyle";
import { Props } from "../../components/Props";
import DiscoveryScreen from "../community/DiscoveryScreen";
import ListMessengerScreen from "../messenger/ListMessengerScreen";


export default function HomeScreen() {
    const [value, setValue] = useState(0);

    return <Column
      style={
        AppStyle(
          height('100vh')
        )
      }
    >

    <div style={
      AppStyle(
        height('92vh'),
        {
          overflowY: 'scroll'
        }
      )
    }>
      <TabPanel index={0} value={value}>
          <PersonalScreen />
      </TabPanel>

      <TabPanel index={1} value={value}>
          <DiscoveryScreen />
      </TabPanel>

      <TabPanel index={2} value={value} style={
        AppStyle(background('transparent'))
      }>
          <ListMessengerScreen />
      </TabPanel>
    </div>
    

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
      <BottomNavigationAction label="Home" icon={<HomeIcon />} />
      <BottomNavigationAction label="Cộng đồng" icon={<CommunityIcon />} />
      <BottomNavigationAction label="Hộp thư" icon={<ChatIcon />} />
    </BottomNavigation>
  </Column>
   
}

function PersonalScreen() {
    return <div>
    <Header/>
    <MyPet/>
</div> 
}

