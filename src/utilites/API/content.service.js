import {api} from "@/utilites/API/API.js";

export const accountService = {
    products: (data) =>
        api.get('products', data).then(response => response.data),
}