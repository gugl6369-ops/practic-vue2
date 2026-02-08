let eventBus = new Vue()

Vue.component('custom-form', {
    props: {
        forms:{
            type: Boolean,
            required: true
        }
    },
    template: `
                 <div class="addCart">
                    <div @click="modal" class="overlay"></div>
                    <form class="form" @submit.prevent="handleSubmit">
                        <p>СОЗАДНИЕ КАРТОЧКИ</p>
                        <label class="from__header" for="name">Название
                            <input type="text" v-model="formData.name" class="form__input" required>
                        </label>
                        <div class="form__block">
                            <label v-for="(item, index) in countPoint">
                                {{index+1}}
                                <input type="text" v-model="formData.point[index]"  class="form__input"  required>
                            </label>    
                            <button v-show="countPoint<5" @click="pointAdd+=1" type="button">Добавить задание</button>
                        </div>
                        <button type="submit">Сохранить</button>
                    </form>
                 </div>
              `,
    data(){
        return{
            pointAdd: 0,
            model: 10,
            formData: {
                name: '',
                point:['', '', ''],
                status: 1,
                check: false
            }
        }
    },
    methods:{
        handleSubmit() {
            console.log(this.formData.name);
            eventBus.$emit('add-cart', this.formData);
            eventBus.$emit('close-modal');
            this.formData ={
                name: '',
                    point:['', '', ''],
                    status: 1,
                    check: false
            }
            this.pointAdd = 0
        },
        modal() {
            eventBus.$emit('close-modal');
        }

    },
    computed:{
        countPoint(){
            return 3 + this.pointAdd;
        }
    },
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
                                    <input v-model="i.done" type="checkbox" :disabled="check || block" >
                                    {{i.name}}
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
                    <div v-show="!(board.max <= getCart().length) && board.id == 1">
                        <button @click="modal" class="board__button">Добавить задачу</button>
                    </div>
                </div>
              `,
    data() {
    },
    methods: {
        getCart(){
            return this.cart.filter(item=> item.status == this.board.id );
        },
        modal() {
            eventBus.$emit('close-modal');
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
        forms: true,
        cart: [
            {
                name: 'имя',
                point: [
                    { id: 1, name: '11', done: false },
                    { id: 2, name: '12', done: false  },
                    { id: 3, name: '13', done: false },
                    { id: 4, name: '14', done: false }
                ],
                status: 1,
                check: 2,
            },
            {
                name: 'имя2',
                point: [
                    { id: 1, name: '21', done: false },
                    { id: 2, name: '22', done: false },
                    { id: 3, name: '23', done: false },
                    { id: 4, name: '24', done: false }
                ],
                status: 2,
            }
        ],
        boards: [
            { id: 1, name: 'Первая', done: false, max: 3, block: false },
            { id: 2, name: 'Вторая', done: false, max: 5, block: false },
            { id: 3, name: 'Третья', done: false, max: 1000000, block: true },
        ],
    },
    methods: {
        addCart(cart){
            cart.point = cart.point.map((item, index)=>({
              id: index,
              name: item,
              done: false
            }))
            this.cart.push(cart);
            console.log(cart);
        },


    },
    mounted(){
        eventBus.$on('add-cart', this.addCart);
        eventBus.$on('close-modal', () => this.forms = !this.forms);
    }
})
//new Date() + Math.random() * 100


