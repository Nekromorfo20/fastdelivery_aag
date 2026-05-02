/* Generación de interface o DTO para retornar resultados del usuario */
export interface User {
    data:       string;
    email:    string;
    name:     string;
    isActive: boolean;
    roles:    string[];
}