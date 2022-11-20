export const appConfig ={
    apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333/api/category',
    logInUrl: process.env.NEXT_PUBLIC_LOGIN_URL || 'http://localhost:3333/api/auth/login',
    registerUrl: process.env.NEXT_PUBLIC_REGISTER_URL || 'http://localhost:3333/api/auth/register'
}