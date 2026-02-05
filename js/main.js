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
                <article class="board">
                    <div>
                        <img :src="assets/icon.png"> 
                        <p> {{name}} </p>
                    </div> 
                    <div>
                        <div class="task">
                            <img src="assets/icon.png">
                            <p>{{4}} of {{5}}</p> 
                            <label>
                                <progress value="progress" max="100"></progress>
                            </label>
                            <p> {{progress}}% </p>
                        </div>
                        <div>
                            <input type="checkbox"></input>
                        </div> 
                    </div>
                    <div>
                        
                    </div>  
                </article>
              `,
    data() {
        return {
            progress: 10,
            name: 'name',
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
                                <p>{{item}}</p>
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
                point: 'пункт',
                status: 1,
            },
            {
                name: 'имя2',
                point: 'пункт',
                status: 2,
            },
            {
                name: 'имя3',
                point: 'пункт',
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
        addCart(){

        }
    }
})



