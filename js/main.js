let eventBus = new Vue()

Vue.component('basket', {
    props: {
        cart:{
            type: Array,
            required: true,
        },
    },
    template: `
                <div 
                    style="width: 500px; max-height: 500px; background-color: #c2e4ea; 
                    position: absolute; padding: 20px; border-radius: 20px; flex-direction: column;
                    overflow: auto">
                    <h3>Корзина</h3>
                    <div style="display: flex; flex-direction: column">
                    <template v-for="item in cart" :key="item.variant.variantId">
                        <basket-cart :cart="item"></basket-cart>
                    </template>
                    </div>
                    
                </div>
              `
})


Vue.component('basket-cart', {
    props: {
        cart:{
            type: Object,
            required: true,
        },
    },
    template: `
                <article style="display: flex">
                    <div>
                        <img style="width: 100px; height: auto" :src="cart.variant.variantImage" alt="photo product"/>
                    </div>
                    <div>
                        <p>{{ cart.product }}</p>
                        <p>Доставка: {{ cart.shipping }} рублей</p>
                    </div>
                    <div></div>
                </article>
              `
})

Vue.component('product-tabs', {
    props: {
        shipping: {
            type: String,
            required: true,
        },
        details: {
            type: Array,
            required: true,
        },
        reviews: {
            type: Array,
            required: true,
        }
    },
    template: `
         <div>   
           <ul>
             <span class="tab"
                   :class="{ activeTab: selectedTab === tab }"
                   v-for="(tab, index) in tabs"
                   @click="selectedTab = tab"
             >
                    {{ tab }}
             </span>
           </ul>
           <div v-show="selectedTab === 'Reviews'">
             <p v-if="!reviews.length">
                There are no reviews yet.
             </p>
             <ul>
               <li v-for="review in reviews">
               <p>{{ review.name }}</p>
               <p>Rating: {{ review.rating }}</p>
               <p>{{ review.review }}</p>
               </li>
             </ul>
           </div>
           <div v-show="selectedTab === 'Make a Review'">
             <product-review></product-review>
           </div>
           <div v-show="selectedTab === 'Shipping'">
                  <p>Shipping: {{ shipping ? shipping : 'Free' }}</p>  
           </div>
           <div v-show="selectedTab === 'Details'">
                  <product-details :details="details"></product-details> 
           </div>
         </div>
    `,
    data() {
        return {
            tabs: ['Reviews', 'Make a Review', 'Shipping', 'Details'],
            selectedTab: 'Reviews'
        }
    }
})


Vue.component('product-review', {
    props: {
        review: {
            required: true
        }
    },
    template:
        `
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
            <label>
                <input v-model="recommend" type="radio" name="1" value="yes" :disabled="rating < 4 || rating == null">
                yes
            </label>
            <label >
                <input v-model="recommend" type="radio" name="1" value="no" :disabled="rating > 3 || rating == null">
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
            recommend: null,
        }
    },
    methods:{
        onSubmit() {
            if(this.name && this.review && this.rating && this.recommend) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating,
                    recommend: this.recommend,
                }
                eventBus.$emit('review-submitted', productReview)
                this.name = null
                this.review = null
                this.rating = null
                this.recommend = null
            } else {
                if(!this.name) this.errors.push("Name required.")
                if(!this.review) this.errors.push("Review required.")
                if(!this.rating) this.errors.push("Rating required.")
                if(!this.recommend) this.errors.push("Recomend required.")
            }
        },
        data() {
            return {
                name: null,
                review: null,
                rating: null,
                errors: [],
                recommend: null,
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
    template:
        `
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
    template:
        `
       <div class="product">
            <div class="product-image">
                <img alt="#" src="" :src="image" :alt="altText"/>
            </div>
            <div class="product-info">
                <p>User is premium: {{ premium }}</p>
                <h1>{{ title }}</h1>
                <p :style="inStock ? '' : 'text-decoration: line-through' " >
                    {{ inStock ? 'In stock' : 'Out of Stock' }}
                </p>
                <div
                    class="color-box"
                    v-for="(variant, index) in variants"
                    :key="variant.variantId"
                    :style="{ backgroundColor:variant.variantColor }"
                    @mouseover="updateProduct(index)"
                >
                </div>
                <button v-on:click="addToCart"
                        :disabled="!inStock"
                        :class="{ disabledButton: !inStock }"
                >
                    Add to cart
                </button>
         
            <product-tabs :shipping="shipping" :reviews="reviews" :details="details"></product-tabs>
            </div>
        </div>
        `,
    data() {
        return {
            product: "Socks",
            brand: 'Vue Mastery',
            description: 'A pair of warm, fuzzy socks',
            selectedVariant: 0,
            altText: "A pair of socks",
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
                    variantQuantity: 5,
                }
            ],
        }
    },
    methods: {
        addToCart() {
            this.variantQuantity
            this.$emit('add-to-cart', {
                product: this.product,
                shipping: this.shipping,
                variant: this.variants[this.selectedVariant],
            });
        },
        remoteCart() {
            this.$emit('delete-to-cart', this.variants[this.selectedVariant]);
        },
        updateProduct(index) {
            this.selectedVariant = index;
            console.log(index);
        },
    },
    mounted() {
        eventBus.$on('review-submitted', productReview => {
            this.reviews.push(productReview)
        })
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
        shipping() {
            if (this.premium) {
                return 0;
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
        modal: false,
    },
    methods: {
        updateCart(carts) {
            this.cart.push(carts);
            console.log(this.cart);
        },
        openCart() {
            this.modal = !this.modal;
            console.log(this.modal);
        },
    }
})



