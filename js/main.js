

let app = new Vue({
    el: '#app',
    data: {
        product: "Socks",
        description: 'A pair of warm, fuzzy socks',
        image: "./assets/vmSocks-green-onWhite.jpg",
        altText: "A pair of socks",
        // link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",  ЗАДАНИЕ 2
        inStock: true,
        // onSale: true, ЗАДАНИЕ 3
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [
            {
                variantId: 2234,
                variantColor: 'green',
                variantImage: "./assets/vmSocks-green-onWhite.jpg",
            },
            {
                variantId: 2235,
                variantColor: 'blue',
                variantImage: "./assets/vmSocks-blue-onWhite.jpg",
            }
        ],
        cart: 0,
        methods: {
            addToCart() {
                this.cart += 1
            },
            // removeFromCart(){
            //     if (cart > 0) this.cart -= 1;      ЗАДАНИЕ 5
            // }
        },
        updateProduct(variantImage) {
            this.image = variantImage
        }
        // sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'], ЗАДАНИЕ 4

    }
})
