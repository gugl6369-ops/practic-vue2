import {api} from "@/utilites/API/API.js";

export const productService = {
    products: (data) =>
        api.get('products', data).then(response => response.data.data),
}