import jwt from "jsonwebtoken";

interface UserPayload {
    id : string
}

export const generateJWT = (payload : UserPayload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
}

export const verifyJWT = (token : string) => {
    return jwt.verify(token, process.env.JWT_SECRET);
}