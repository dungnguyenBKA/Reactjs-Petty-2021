import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AddPetScreen from './screen/add-pet/AddPetScreen'
import DiscoveryScreen from './screen/community/DiscoveryScreen'
import MessengerScreen from './screen/messenger/MessengerScreen'
import HomeScreen from './screen/home/HomeScreen'
import Screen from './screen/login/Screen'
import PetDetail from './screen/pet-detail/PetDetail'
import TestScreen from './screen/test-screen/TestScreen'
import NotFoundScreen from './screen/not-found/NotFoundScreen'
import { Toaster } from 'react-hot-toast'
import ListMessengerScreen from './screen/messenger/ListMessengerScreen'

export default function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<HomeScreen />} />
                    <Route path="/login" element={<Screen />} />



                    <Route path="/add-pet" element={<AddPetScreen />} />
                    <Route path="/pet-detail/:petId" element={<PetDetail />} />

                    <Route path="/message/:userId" element={<MessengerScreen />} />

                    <Route path="/test" element={<TestScreen />} />
                    {/* ! Not found route, alway in the end, do not change order */}
                    <Route path="*" element={<NotFoundScreen />} />
                </Routes>
            </Router>

            <Toaster />
        </div>
    )
}