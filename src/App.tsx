import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AddPetScreen from './screen/add-pet/AddPetScreen'
import HomeScreen from './screen/home/HomeScreen'
import LoginScreen from './screen/login/LoginScreen'
import PetDetail from './screen/pet-detail/PetDetail'
import TestScreen from './screen/test-screen/TestScreen'
import NotFoundScreen from './screen/not-found/NotFoundScreen'
import { Toaster } from 'react-hot-toast'
import PersonalInfo from './screen/personal-info/PersonalInfo'
import PetMessengerScreen from './screen/messenger/PetMessengerScreen'
import { BaseFullScreen, BaseMobileScreen } from './screen/basescreen/BaseAppScreen'
import React, { useEffect, useState } from 'react'
import User from './models/User'
import { ChatEngineWrapper } from 'react-chat-engine'

interface UserContextInterface {
    currentUser: User | undefined
    setCurrentUser: (user: User | undefined) => void
}

interface ThemeContextInterface {
    theme: 'dark' | 'light'
    setTheme: (theme: 'dark' | 'light') => void
}


interface AppContextInterface extends UserContextInterface, ThemeContextInterface {
    // shared context 
}

const defaultContext: AppContextInterface = {
    currentUser: undefined,
    setCurrentUser: (user: User | undefined) => {
        console.log('change user')
    },
    theme: 'light',
    setTheme: (theme: 'dark' | 'light') => {
        console.log('change theme')
    }
}

export const AppCtx = React.createContext<AppContextInterface>(defaultContext)

export function App() {
    let currentUser: User | undefined = undefined
    let userJson = localStorage.getItem('user')
    if (userJson) {
        try {
            currentUser = JSON.parse(userJson)
        } catch (error) {
            console.error(error)
            currentUser = undefined
        }
    } else {
        currentUser = undefined
    }

    let [user, setUser] = useState<User | undefined>(currentUser)

    defaultContext.currentUser = user

    defaultContext.setCurrentUser = (user: User | undefined) => {
        console.log('set user')
        if (user) {
            // login 
            localStorage.setItem('user', JSON.stringify(user))
        } else {
            // logout
            localStorage.setItem('user', '')
        }
        setUser(user)
    }

    return (
        <AppCtx.Provider value={defaultContext}>
            <ChatEngineWrapper>
                <div>
                    <Router>
                        <Routes>
                            <Route path="/" element={<BaseMobileScreen>
                                <HomeScreen />
                            </BaseMobileScreen>} />


                            <Route path="/login" element={<LoginScreen />} />

                            <Route path="/personal" element={<PersonalInfo />} />


                            <Route path="/add-pet" element={
                                <BaseMobileScreen>
                                    <AddPetScreen />
                                </BaseMobileScreen>} />

                            <Route path="/pet-detail/:petId" element={
                                <BaseMobileScreen>
                                    <PetDetail />
                                </BaseMobileScreen>} />

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
            </ChatEngineWrapper>
        </AppCtx.Provider>
    )
}