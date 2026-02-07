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
        },
        check:{
            type: Boolean,
            required: true
        },
        block:{
            type: Boolean,
        },
        last:{
            type: Boolean,
        }
    },
    template: `
                <article class="cart">
                    <div class="cart_header">
                        <img class="icon" src="../assets/icon.png"> 
                        <p> {{cart.name}} </p>
                    </div> 
                    <div class="cart__content">
                        <div class="task">
                            <p>{{cart.point.filter((i) => i.done === true ).length}} of {{cart.point.length}}</p> 
                            <label>
                                <progress :value="progress" max="100"></progress>
                            </label>
                            <p> {{progress}}% </p>
                        </div>
                        <div class="cart__list">
                            <template v-for="(i, index) in cart.point" :key="index">
                                <label> 
                                    {{i.name}}
                                    {{last}}
                                    {{block}}
                                    {{check}}
                                    {{(cart.point.filter((i) => i === true).length/cart.point.length * 100 >= 50)}}
                                    <input v-model="i.done" type="checkbox" :disabled="check || block" >
<!--                                   условие оющие чеки у карточки соединить и проверить, проходят ли они в слудующую доску и проверить, возможный переход на предыдущую   -->
<!--            - информация о картах/досках, (либо создать пропсы next и last для отслеживания перемещения), относительно
           прошлых переменных проверить карточку и ее check на возможности                  -->
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
        },
    }
})

Vue.component('board', {
    props: {
        cart:{
            type: Array
        },
        index:{
            type: Number,
        },
        board: {
            type: Array,
        },
        block:{
            type: Boolean,
        }
    },
    template: `
                <div class="board">
                {{check}} 
                     <div class="board__header">
                        <h1>Доска {{index}}</h1>
                        <p>{{getCart().length}}</p>
                     </div>
                     <template v-if="getCart().length">
                        <div class="board__list">
                            <template v-for="item in getCart()">
                                <cart :cart="item" :check="check" :last="last" :block="block"></cart>
                            </template>
                        </div>
                     </template>
                     <template v-else>
                        <p>нет ничего</p>
                     </template>
                    <div v-show="!(board.max == getCart().length) && board.id == 1">
                        <button class="board__button">Добавить задачу</button>
                    </div>
                </div>
              `,
    data() {
    },
    methods: {
        getCart(){
            return this.cart.filter(item=> item.status == this.board.id );
        }
    },
    computed:{
        check(){
            return (this.cart.filter(item=> item.status == this.board.id + 1).length >= 5 && this.index === 0);
        },
        last(){
            if (this.index === 2){
                if (this.cart.filter(item=> item.status == this.board.id - 1).length >= 5){
                    return false;
                }
                else {
                    return true;
                }
            }
            else {
                return true;
            }

        },

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
                        max: 3,
                    },
                    {
                        id: 2,
                        name: '12',
                        done: true,
                        max: 5,
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
                name: 'имя',
                point: [
                    {
                        id: 1,
                        name: '11',
                        done: false,
                        max: 3,
                    },
                    {
                        id: 2,
                        name: '12',
                        done: true,
                        max: 5,
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
                name: 'имя',
                point: [
                    {
                        id: 1,
                        name: '11',
                        done: false,
                        max: 3,
                    },
                    {
                        id: 2,
                        name: '12',
                        done: true,
                        max: 5,
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
                name: 'имя',
                point: [
                    {
                        id: 1,
                        name: '11',
                        done: false,
                        max: 3,
                    },
                    {
                        id: 2,
                        name: '12',
                        done: true,
                        max: 5,
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
        boards: [
            {
                id: 1,
                name: 'Первая',
                done: false,
                max: 3,
                block: false,
            },
            {
                id: 2,
                name: 'Вторая',
                done: false,
                max: 5,
                block: false,
            },
            {
                id: 3,
                name: 'Третья',
                done: false,
                max: 1000000,
                block: true,
            },
        ],
    },
    methods: {
        addCart(cart){
            this.cart.push(cart);
        },


    },
})
//new Date() + Math.random() * 100


