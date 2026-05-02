/* Generación de interface para tipar respuesta de endpoint POST /api/auth/login */
export interface AuthResponse {
    id:       string;
    email:    string;
    fullName: string;
    isActive: boolean;
    roles:    string[];
    token:    string;
}
