import { create } from "zustand"
import { AuthStatus } from "../../../infraestructure/interfaces/auth.status";
import { authCheckStatus, authLogin, authSignin } from "../../../actions/auth/auth"
import { StorageAdapter } from "../../../config/adapters/storage-adapter"

export interface AuthState {
    status : AuthStatus
    token? : string

    login: (email : string, password : string) => Promise<boolean>
    signin: (name : string, email : string, password : string, passwordConfirmation : string) => Promise<boolean>
    checkStatus: () => Promise<void>
    logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>()((set, get) => ({
    status: 'checking',
    token: undefined,

    login: async (email : string, password : string) => {
        const resp = await authLogin(email, password)

        if (!resp) {
            set({
                status: 'unauthenticated',
                token: undefined,
            })
            return false
        }
 
        await StorageAdapter.setItem('token', resp.data);

        set({
            status: 'authenticated',
            token: resp,
        })
        return true
    },
    signin: async (name : string, email : string, password : string, passwordConfirmation : string) => {
        const resp = await authSignin(name, email, password, passwordConfirmation);
        if (!resp) {
            set({
                status: 'unauthenticated',
                token: undefined,
            })
            return false
        }
 
        await StorageAdapter.setItem('token', resp.data);

        set({
            status: 'authenticated',
            token: resp,
        })
        return true;
    },
    checkStatus: async () => {
        const resp = await authCheckStatus()
        if (!resp) {
            set({
                status: 'unauthenticated',
                token: undefined,
            })
            return
        }

        await StorageAdapter.setItem('token', resp.data);

        set({
            status: 'authenticated',
            token: resp,
        })
    },
    logout: async () => {
        await StorageAdapter.removeItem('token')

        set({
            status: 'unauthenticated',
            token: undefined,
        })
    }
}))
