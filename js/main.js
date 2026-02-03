Vue.component('product-review', {
    props: {
        review: {
            required: true
        }
    },
    template: `
    <form class="review-form" @submit.prevent="onSubmit">
     <p>
       <label for="name">Name:</label>
       <input id="name" v-model="name" placeholder="name">
     </p>
    
     <p>
       <label for="review">Review:</label>
       <textarea id="review" v-model="review"></textarea>
     </p>
    
     <p>
       <label for="rating">Rating:</label>
       <select id="rating" v-model.number="rating">
         <option>5</option>
         <option>4</option>
         <option>3</option>
         <option>2</option>
         <option>1</option>
       </select>
     </p>
    
    <div>
        <p> Would you recommend this product?</p>
        <label >
            <input v-model="recomend" type="radio" name="1" value="yes">
            yes
        </label>
        <label >
            <input v-model="recomend" type="radio" name="1" value="no">
            no
        </label>
    </div>
     <p>
       <input type="submit" value="Submit"> 
     </p>
    <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
           <li v-for="error in errors">{{ error }}</li>
        </ul>
    </p>
    
    
    </form>

 `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: [],
            recomend: null,
        }
    },
    methods:{
        onSubmit() {
            if(this.name && this.review && this.rating && this.recomend) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recomend: this.recomend,
                }
                this.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
                this.recomend = null
            } else {
                if(!this.name) this.errors.push("Name required.")
                if(!this.review) this.errors.push("Review required.")
                if(!this.rating) this.errors.push("Rating required.")
                if(!this.recomend) this.errors.push("Recomend required.")
            }
        },
        data() {
            return {
                name: null,
                review: null,
                rating: null,
                errors: [],
                recomend: null,

            }
        },

    },
})


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
        <button v-on:click="remoteCart">Remove from cart</button>  
        </div>

        <!-- <span v-show="onSale"> On Sale </span> ЗАДАНИЕ 3 -->
        <div>
            <h2>Reviews</h2>
            <p v-if="!reviews.length">There are no reviews yet.</p>
            <ul>
              <li v-for="review in reviews">
                  <p>{{ review.name }}</p>
                  <p>Rating: {{ review.rating }}</p>
                  <p>{{ review.review }}</p>
                  <p>{{ review.recomend }}</p>
              </li>
            </ul>
        </div>
        <product-review @review-submitted="addReview"></product-review>

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
            reviews: [],
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
            // sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'], ЗАДАНИЕ 4
        }
    },
    methods: {
        // removeFromCart(){
        //     if (this.cart > 0) this.cart -= 1; ЗАДАНИЕ 5
        // },
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
        },
        remoteCart() {
            this.$emit('delete-to-cart', this.variants[this.selectedVariant].variantId);
        },
        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
        },
        addReview(productReview) {
            this.reviews.push(productReview)
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
        premium: true,
        cart: [],
    },
    methods: {
        updateCart(id) {
            this.cart.push(id);
        },
        // remoteCart() {
        //     this.cart.pop();      ЗАДАНИЕ 9
        // },
    }
})



