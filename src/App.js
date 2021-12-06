import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AddPetScreen from './screen/add-pet/AddPetScreen'
import DiscoveryScreen from './screen/community/DiscoveryScreen'
import Message from './screen/community/Message'
import HomeScreen from './screen/home/HomeScreen'
import LoginScreen from './screen/login/LoginScreen'
import PetDetail from './screen/pet-detail/PetDetail'
import TestScreen from './screen/test-screen/TestScreen'

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginScreen/>} />
                <Route path="/home" element={<HomeScreen/>} />
                <Route path="/community" element={<DiscoveryScreen/>} />
                <Route path="/add-pet" element={<AddPetScreen/>} />
                <Route path="/pet-detail/:petId" element={<PetDetail />}/>
                <Route path="/test" element={<TestScreen/>} />
                <Route path="/message" element={<Message/>} />
            </Routes>
        </Router>
    )
}