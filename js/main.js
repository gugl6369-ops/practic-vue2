

let app = new Vue({
    el: '#app',
    data: {
        product: "Socks",
        brand: 'Vue Mastery',
        description: 'A pair of warm, fuzzy socks',
        selectedVariant: 0,
        altText: "A pair of socks",
        // link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",  ЗАДАНИЕ 2
        inStock: true,
        // onSale: true,    ЗАДАНИЕ 3, 5
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [
            {
                variantId: 2234,
                variantColor: 'green',
                variantImage: "./assets/vmSocks-green-onWhite.jpg",
                variantQuantity: 10

            },
            {
                variantId: 2235,
                variantColor: 'blue',
                variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                variantQuantity: 0,
            }
        ],
        cart: 0,
        // sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'], ЗАДАНИЕ 4

    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        // removeFromCart(){
        //     if (this.cart > 0) this.cart -= 1; ЗАДАНИЕ 5
        // },
        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product;
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        // sale() { ЗАДАНИЕ 7
        //     return (this.onSale ? 'skidka net ' : 'skidka est ') + ' this ' + this.product + ' for brand: ' + this.brand;
        // },
    }
})
