import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {accountService} from "@/utilites/API/account.service.js";
import {productService} from "@/utilites/API/content.service.js";

export const useProductStore = defineStore('product', () => {

    const list = ref([])

    const productsList = async () => {
        list.value = await productService.products()
    }



    return {list, productsList};
})