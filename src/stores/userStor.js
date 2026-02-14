import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {accountService} from "@/utilites/API/account.service.js";
import {productService} from "@/utilites/API/content.service.js";

export const useUsersStore = defineStore('user', () => {

    const userToken = localStorage.getItem('token')

    const list = ref([])

    const cartList = async () => {
        list.value = await accountService.cart()
    }

    return {userToken, list, cartList};
})