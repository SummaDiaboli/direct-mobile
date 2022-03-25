const HOME = 'Home'
const LOGIN = 'Login'
const SIGNUP = 'Sign Up'
const MAGIC = 'Magic Code'
const SETTINGS = 'Settings'

type LoginResponse = {
    username: string
    email: string
    id: string
}

type RootStackParamList = {
    Home: { data: LoginResponse }
    Login: undefined
    'Sign Up': undefined
    'Magic Code': { id: string }
    Settings: { data: LoginResponse }
}

type BottomTabParamList = {
    HomeTab: undefined
    HistoryTab: undefined
    QRTab: undefined
}

export {
    HOME,
    LOGIN,
    SIGNUP,
    MAGIC,
    SETTINGS,
    type RootStackParamList,
    type LoginResponse,
    type BottomTabParamList,
}
