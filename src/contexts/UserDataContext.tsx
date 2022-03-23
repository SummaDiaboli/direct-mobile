import { createContext, useState } from 'react'
import { LoginResponse } from '../utils/routes'

type UserData = {
    username: string
    email: string
    id: string
}

export const UserDataContext = createContext<UserData>({
    username: '',
    email: '',
    id: '',
})
