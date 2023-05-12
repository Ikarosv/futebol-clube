import * as bcrypt from 'bcryptjs';
import { sign } from 'jsonwebtoken';

const secret = process.env.SECRET || 'secret';

export const mockṔostLogin = {
    "email": "ikaro@example.com",
    "password": "123456"
}

export const mockṔostEncrypted = {
    ...mockṔostLogin,
    password: bcrypt.hashSync(mockṔostLogin.password, 8)
}

export const mockPostLoginWithoutEmail = {
    ...mockṔostLogin,
    email: undefined
}

export const mockPostLoginWithoutPassword = {
    ...mockṔostLogin,
    password: undefined
}

export const mockṔostUserResponse = {
    token: sign(mockṔostEncrypted, secret, {
        expiresIn: 86400
    })
}

export const errorAllFieldsMustBeFilled = {
    message: 'All fields must be filled'
}
