import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AddPetScreen from './screen/add-pet/AddPetScreen'
import DiscoveryScreen from './screen/community/DiscoveryScreen'
import MessengerScreen from './screen/messenger/MessengerScreen'
import HomeScreen from './screen/home/HomeScreen'
import LoginScreen from './screen/login/LoginScreen'
import PetDetail from './screen/pet-detail/PetDetail'
import TestScreen from './screen/test-screen/TestScreen'
import NotFoundScreen from './screen/not-found/NotFoundScreen'
import { Toaster } from 'react-hot-toast'
import ListMessengerScreen from './screen/messenger/ListMessengerScreen'
import PetMessengerScreen from './screen/messenger/PetMessengerScreen'
import { BaseFullScreen, BaseMobileScreen } from './screen/basescreen/BaseAppScreen'
import User, { getRamdomFakeUser } from './models/User'
import React, { useState } from 'react'

interface UserContextInterface {
    currentUser: User | undefined
    setCurrentUser : (user: User) => void
}

interface ThemeContextInterface {
    theme: 'dark' | 'light'
    setTheme : (theme: 'dark' | 'light') => void 
}


interface AppContextInterface extends UserContextInterface, ThemeContextInterface {
    // shared context 
}

const defaultContext: AppContextInterface = {
    currentUser: undefined,
    setCurrentUser : (user: User) => {
        console.log('change user')
    },
    theme: 'light',
    setTheme : (theme: 'dark' | 'light') => {
        console.log('change theme')
    } 
}

export const AppCtx = React.createContext<AppContextInterface>(defaultContext)

export function App() {
    let [user, setUser] = useState<User|undefined>(undefined)
    defaultContext.setCurrentUser = (user: User) => {
        setUser(user)
    }

    defaultContext.currentUser = getRamdomFakeUser()

    return (
        <AppCtx.Provider value={defaultContext}>
            <div>
                <Router>
                    <Routes>
                        <Route path="/" element={<BaseMobileScreen>
                            <HomeScreen />
                        </BaseMobileScreen>} />


                        <Route path="/login" element={<LoginScreen />} />



                        <Route path="/add-pet" element={
                            <BaseMobileScreen>
                                <AddPetScreen />
                            </BaseMobileScreen>} />

                        <Route path="/pet-detail/:petId" element={
                            <BaseMobileScreen>
                                <PetDetail />
                            </BaseMobileScreen>} />

                        <Route path="/message/:userId" element={<MessengerScreen />} />

                        <Route path="/messenger" element={<BaseFullScreen>
                            <PetMessengerScreen />
                        </BaseFullScreen>} />

                        <Route path="/test" element={<TestScreen />} />

                        {/* ! Not found route, alway in the end, do not change order */}
                        <Route path="*" element={<NotFoundScreen />} />
                    </Routes>
                </Router>

                <Toaster />
            </div>
        </AppCtx.Provider>

    )
}