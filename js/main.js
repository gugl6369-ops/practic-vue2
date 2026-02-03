Vue.component('product-details', {
    props: {
        details: {
            required: true
        }
    },
    template: `
    <ul>
        <li v-for="detail in details">{{ detail }}</li>
    </ul>
 `,
})


Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
   <div class="product">
        <div class="product-image">
            <img alt="#" src="" :src="image" :alt="altText"/>
        </div>
        <!-- <a :href="link">More products like this.</a>   ЗАДАНИЕ 2 -->
        <div class="product-info">
            <p>User is premium: {{ premium }}</p>
            <h1>{{ title }}</h1>
<!--            <p>{{sale}}</p>   ЗАДАНИЕ 5 -->
            <p :style="inStock ? '' : 'text-decoration: line-through' " > <!-- ЗАДАНИЕ 6 -->
                {{ inStock ? 'In stock' : 'Out of Stock' }}
            </p>
            
            
            <product-details :details="details"></product-details>
            
            
            <p>Shipping: {{ shipping }}</p>
            <div
                    class="color-box"
                    v-for="(variant, index) in variants"
                    :key="variant.variantId"
                    :style="{ backgroundColor:variant.variantColor }"
                    @mouseover="updateProduct(index)"
            >
            </div>
            <!--
            <div v-for="size in sizes" :key="sizes.size">   ЗАДАНИЕ 4
                <p>{{ size }}</p>
            </div>
            -->
            <button v-on:click="addToCart"
                    :disabled="!inStock"
                    :class="{ disabledButton: !inStock }"
            >
                Add to cart
            </button>
            <div class="cart">
                <p>Cart({{ cart }})</p>
            </div>
<!--        <button v-show="cart > 0" v-on:click="removeFromCart">Remove from cart</button>  ЗАДАНИЕ 5-->
        </div>

        <!-- <span v-show="onSale"> On Sale </span> ЗАДАНИЕ 3 -->
    </div>
    `,
    data() {
        return {
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
        }
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
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        },
        // sale() { ЗАДАНИЕ 7
        //     return (this.onSale ? 'skidka net ' : 'skidka est ') + ' this ' + this.product + ' for brand: ' + this.brand;
        // },
        shipping() {
            if (this.premium) {
                return "Free";
            } else {
                return 2.99
            }
        }

    }
})


let app = new Vue({
    el: '#app',
    data: {
        premium: true
    },
})



