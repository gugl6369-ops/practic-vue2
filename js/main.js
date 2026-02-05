let eventBus = new Vue()

Vue.component('form', {
    template: `
                 <div>
                    <form class="form">
                        <label for="name">Name
                            <input type="text" class="form__input">
                        </label>
                        <div>
                            <ladel @click="form__label">
                                <input type="text" v-model="name" class="form__input">
                            </ladel>    
                        </div>
                        <button type="button">Добавить чекпоинт</button>
                        <input>
                    </form>
                 </div>
              `,
    data(){
        return{
            form:{

            }
        }
    },
    mounted(){
        eventBus.$on('add-cart', this.addCart);
    }
})

Vue.component('cart', {
    props: {
        cart:{
            type: Array,
            required: true
        }
    },
    template: `
                <article class="cart">
                    <div class="cart_header">
                        <img class="icon" src="../assets/icon.png"> 
                        <p> {{cart.name}} </p>
                        <p>{{cart.status}}</p>
                    </div> 
                    <div>
                        <div class="task">
                            <p>{{4}} of {{5}}</p> 
                            <label>
                                <progress :value="progress" max="100"></progress>
                            </label>
                            <p> {{progress}}% </p>
                        </div>
                        <div class="cart__list">
                            <template v-for="(i, index) in cart.point" :key="i.id">
                                <label> 
                                    {{i.name}}
                                    <input v-model="i.done" type="checkbox">
                                </label>                                   
                            </template>
                        </div> 
                    </div>
                    <div>
                        
                    </div>  
                </article>
              `,
    data() {
        return {
            name: 'name',
        }
    },
    computed: {
        progress(){
            if (this.cart.point.filter((i) => i.done === true ).length / this.cart.point.length  * 100 < 50) {
                this.cart.status = 1;
            }
            else if (this.cart.point.filter((i) => i.done === true ).length / this.cart.point.length  * 100 > 49 && this.cart.point.filter((i) => i.done === true ).length /this.cart.point.length  * 100 !== 100) {
                this.cart.status = 2;
            }
            else {
                this.cart.status = 3;
            }
            return (this.cart.point.filter((i) => i.done === true ).length / this.cart.point.length  * 100).toFixed(0)
        }
    }

})

Vue.component('board', {
    props: {
        cart:{
            type: Array
        },
        index:{
            type: Number,
        }
    },
    template: `
                <div class="board">
                     <template v-if="cart.length">
                     <p>{{index}}</p>
                        <div>
                            <template v-for="item in getCart()">
                                <cart :cart="item"></cart>
                            </template>
                        </div>
                     </template>
                     <template v-else>
                        <p>нет ничего</p>
                     </template>
                </div>
              `,
    data() {

    },
    methods: {
        getCart(){
            return this.cart.filter(item=> item.status == this.index );
        }
    }
})

let app = new Vue({
    el: '#app',
    data: {
        cart: [
            {
                name: 'имя',
                point: [
                    {
                        id: 1,
                        name: '11',
                        done: false,
                    },
                    {
                        id: 2,
                        name: '12',
                        done: true,
                    },
                    {
                        id: 3,
                        name: '13',
                        done: false,
                    },
                    {
                        id: 4,
                        name: '14',
                        done: false,
                    }
                ],
                status: 1,
                check: 2,
            },
            {
                name: 'имя2',
                point: [
                    {
                        id: 1,
                        name: '21',
                        done: false,
                    },
                    {
                        id: 2,
                        name: '22',
                        done: true,
                    },
                    {
                        id: 3,
                        name: '23',
                        done: false,
                    },
                    {
                        id: 4,
                        name: '24',
                        done: false,
                    }
                ],
                status: 2,
            },
            {
                name: 'имя3',
                point: [
                    {
                        id: 1,
                        name: '31',
                        done: false,
                    },
                    {
                        id: 2,
                        name: '32',
                        done: true,
                    },
                    {
                        id: 3,
                        name: '33',
                        done: false,
                    },
                    {
                        id: 4,
                        name: '34',
                        done: false,
                    }
                ],
                status: 3,
            },
        ],
        boards: {
            1: [],
            2: [],
            3: [],
        },
    },
    methods: {
        addCart(cart){
            this.cart.push(cart);
        },


    },
})
//new Date() + Math.random() * 100


