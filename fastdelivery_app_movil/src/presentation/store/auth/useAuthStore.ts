import { create } from "zustand"
import { AuthStatus } from "../../../infraestructure/interfaces/auth.status";
import { authCheckStatus, authLogin } from "../../../actions/auth/auth"
import { StorageAdapter } from "../../../config/adapters/storage-adapter"

export interface AuthState {
    status : AuthStatus
    token? : string
    user? : undefined

    login: (email : string, password : string) => Promise<boolean>
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
