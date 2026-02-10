let eventBus = new Vue()
Vue.component('count-board', {
    props: {
        cart:{
            type: Array,
            required: true
        },
        boards:{
            type: Array,
            required: true
        }
    },
    template: `
                <div class="boardBlock">
                    <div class="okno" v-for="(board, index) in boards">                    
                        <p> доска {{ board.name }} {{ index+1 }} </p>
                    <template v-if="countet()[index] > 1">
                        <p> Cреднее количество заданий:  {{ countet()[index].toFixed(1) }} </p>
                    </template>
                    <template v-else>
                        <p>Нет заданий</p>
                    </template>
                    </div>
                </div>
                `,
    data(){
        return{

        }
    },
    methods:{
        countet(){
            awg = [0, 0, 0]
            for(let board of this.boards){
                for(let item of this.cart.filter((i) => i.status == (board.id))){
                    awg[board.id-1] += item.point.length
                }
                awg[board.id-1] /= this.cart.filter((i) => i.status == (board.id)).length
            }
            return awg
        }
    },
    computed:{

    }
})


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
                        <label class="from__header">Название
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
            eventBus.$emit('add-cart', this.formData);
            eventBus.$emit('close-modal');
            this.formData ={
                name: '',
                    point:['', '', ''],
                    status: 1,
                    date: '',
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
        block:{
            type: Array,
        },
    },
    template: `
                <article class="cart">
                    <div class="cart_header">
                        <img class="icon" src="../assets/icon.png" alt="оконка"> 
                        <p> {{cart.name}} </p>
                        <p class="cart__date" v-show="cart.date">{{cart.date}}</p>
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
                                    <input v-model="i.done" type="checkbox" :disabled="blocked(i.done)" @change="eventBus.$emit('save')" >
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
    methods: {
        blocked(i){
            if (this.cart.status === 1 && this.block[1] === false && i === false) {
                return true
            }
            else if (this.cart.status === 2 && this.block[0] === false && i === true) {
                return true
            }
            else if (this.cart.status === 3) {
                return true
            }
        }
    },
    computed: {
        progress(){
            if (this.cart.point.filter((i) => i.done === true ).length / this.cart.point.length  * 100 < 50) {
                this.cart.status = 1;
                eventBus.$emit('save')
            }
            else if (this.cart.point.filter((i) => i.done === true ).length / this.cart.point.length  * 100 > 49 && this.cart.point.filter((i) => i.done === true ).length /this.cart.point.length  * 100 !== 100) {
                this.cart.status = 2;
                eventBus.$emit('save')
            }
            else {
                this.cart.date = new Date().toString().substr(0, 15);
                this.cart.status = 3;
                eventBus.$emit('save')
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
        },
        board: {
            type: Array,
        },
        block:{
            type: Array,
        }
    },
    template: `
                <div class="board">
                     <div class="board__header">
                        <h1>Доска {{index}}</h1>
                        <p>{{getCart().length}}</p>
                     </div>
                     <template v-if="getCart().length">
                        <div class="board__list">
                            <template v-for="item in getCart()">
                                <cart :cart="item" :block="block"></cart>
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
                date: '',
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
                date: '',
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
            this.save();
        },
        save(){
            localStorage.setItem('cart', JSON.stringify(this.cart));
        }


    },
    mounted(){
        const localStor = JSON.parse(localStorage.getItem('cart'));
        if (localStor) {
            this.cart = localStor;
        }
        eventBus.$on('add-cart', this.addCart);
        eventBus.$on('close-modal', () => this.forms = !this.forms);
        eventBus.$on('save', this.save);
    },
    computed:{
        block(){
            close = [
                (this.boards[0].max > this.cart.filter((i) => i.status === 1).length),
                (this.boards[1].max > this.cart.filter((i) => i.status === 2).length),
                (this.boards[2].max > this.cart.filter((i) => i.status === 3).length)]
            return close;
        },
        countCart(){
            console.log(this.cart.length)
            return this.cart.length >= 5
        }

    },
})
//new Date() + Math.random() * 100


