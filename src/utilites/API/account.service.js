import { api } from './API.js'
import router from "@/router/index.js";


export const accountService = {
    register: (data) =>
        api.post('signup', data).then(response => {
            response.data
            router.push('/auth/login')
        }).catch(error => {
            alert('Ошибки валидации полей!')
        }),

    login: (data) =>
        api.post('login', data).then(response => response.data).then( (data) => {
            localStorage.setItem('token', JSON.stringify(data.data.user_token))
            router.push('/')
            return data.data
        }).catch(error => {
            alert('Неправильные логин или пароль!')
        }),

    logout: (data) =>
        api.get('logout'),

    cart: (data) =>
        api.get('cart', data).then(response => response.data.data),

    cartDelete: (id) =>
        api.delete(`cart/${id}`).then(response => response.data),

    cartAdd: (id) =>
        api.post(`cart/${id}`).then(response => response.data),
}