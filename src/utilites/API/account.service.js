import { api } from './api'


export const accountService = {
    login: (data) =>
        api.post('login', data).then(response => response.data).then( (data) => { localStorage.setItem('token', JSON.stringify(data.data.user_token)) } ),

    register: (data) =>
        api.post('signup', data).then(response => response.data).then( (data) => { localStorage.setItem('token', JSON.stringify(data.data.user_token)) } ),

    logout: (data) =>
        api.get('logout'),

    cart: (data) =>
        api.get('cart', data).then(response => response.data),
}