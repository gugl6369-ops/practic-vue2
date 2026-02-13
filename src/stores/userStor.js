import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {accountService} from "@/utilites/API/account.service.js";

export const useUsersStore = defineStore('user', () => {

    const userToken = localStorage.getItem('token')



    return {userToken};
})