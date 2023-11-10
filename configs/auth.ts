import type { AuthOptions, User } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import Credentials from "next-auth/providers/credentials";
import users from "@/data/users.json"

export const authConfig: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_SECRET!
        }),
        Credentials({
            credentials: {
                name: {
                    label: 'Логин', 
                    type: 'text',
                    required: true
                },
                password: {
                    label: 'Пароль', 
                    type: 'password',
                    required: true
                },
            },
            async authorize(credentials) {
                // Тут берем пользователей из базы

                // Если не ввели логин или пароль
                if (!credentials?.name || !credentials.password) {
                    return null;
                }

                const currentUser = users.users.find(user => user.name === credentials.name)
                if (currentUser && currentUser.password === credentials.password) {
                    const {password, ...userWithoutPass} = currentUser;

                    return userWithoutPass as User;
                }

                return null;
            }
        })
    ],
    pages: {
        signIn: '/signin'
    }
}