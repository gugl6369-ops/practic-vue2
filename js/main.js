let eventBus = new Vue()

Vue.component('custom-form', {
    props: {
        forms:{
            type: Boolean,
            required: true
        },

    },
    template: `
                 <div class="addCart">
                    <div @click="modal" class="overlay"></div>
                    <form class="form" @submit.prevent="handleSubmit">
                        <p>СОЗАДНИЕ КАРТОЧКИ</p>
                        <label>
                        Название
                            <input type="text" class="form__input" v-model="formData.name" required>
                        </label>
                        <label>
                        Описание
                            <input type="text" class="form__input" v-model="formData.subtitle" required>
                        </label>
                        <label>
                        deadline:
                            <input type="date" class="form__input" v-model="formData.deadline" required>
                        </label>
                        <button type="submit" class="form__button">Сохранить</button>
                    </form>
                 </div>
              `,
    data(){
        return{
            model: 10,
            formData: {
                id: new Date().toISOString() + Math.random() * 1000,
                name: '',
                subtitle: '',
                date: new Date(),
                deadline: '',
                status: 1,
                check: false,
                message: '',
                redact: false,
                messageAdd: false,
            }
        }
    },
    methods:{
        handleSubmit() {
            eventBus.$emit('add-cart', this.formData);
            eventBus.$emit('close-modal');
            this.formData ={
                id: new Date().toISOString() + Math.random() * 1000,
                name: '',
                subtitle: '',
                deadline: '',
                status: 1,
                date: new Date(),
                message: '',
            }
        },
        modal() {
            eventBus.$emit('close-modal');
        },


    },
    computed:{

    },
})

Vue.component('cart', {
    props: {
        cart:{
            type: Array,
            required: true
        },
    },
    template: `
                <article>
                    <div class="cart" v-if="!cart.redact">
                        <div class="moov">
                            <button v-if="cart.status === 3" class="arrow" @click="mooveCart(-1)">
                                <img class="icon" style="transform: rotate(-180deg)" src="./assets/arrow.png">
                            </button>
                            <button v-if="cart.status < 4" class="arrow" @click="mooveCart(1)">
                                <img class="icon" src="./assets/arrow.png">
                            </button>
                        </div>
                        <div class="cart_header">
                            <p class="cart__date">{{ String(new Date(this.cart.date)).substr(4, 11) }} </p>    
                            <button v-show="cart.status !== 4" class="icon_btn icon_btn--pen" @click="cart.redact = !cart.redact">
                                <img class="icon" src="/assets/pen.png" >
                            </button>
                        </div> 
                         <p class="cart__name"> {{cart.name}} </p>
                        <div class="cart__content">
                            <p class="cart__subtitle">{{cart.subtitle}}</p>
                            <p v-show="cart.message && cart.status !== 4">Сообщение от тестера:</p>
                            <p v-show="cart.message && cart.status !== 4" class="cart__subtitle cart__subtitle--test">  
                                {{cart.message}}
                            </p>
                            <div class="cart__list">
                                <div class="cart__listBlock">
                                    <img src="/assets/flag.png" class="cart__deadflag">
                                    <p>{{ (( new Date(this.cart.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60)).toFixed(0) }} ч. осталось</p>
                                </div>
                                <button class="icon_btn icon_btn--delete" @click="deleteCart">
                                    <img class="icon" src="/assets/delete.png">
                                </button>
                                
                            </div> 
                        </div> 
                    </div>
                    <div v-else>
                         <form @submit.prevent="redacted()" class="form">
                            <p>Редактирование</p>
                            <label>
                            Название
                                <input type="text" class="form__input" v-model="formData.name" :disabled="cart.messageAdd">
                            </label>
                            <label>
                            Описание
                                <input type="text" class="form__input" v-model="formData.subtitle" :disabled="cart.messageAdd">
                            </label>
                            <label>
                            Последний срок
                                <input type="date" class="form__input" v-model="formData.deadline" :disabled="cart.messageAdd">
                            </label>
                            <label v-show="cart.messageAdd">
                            Комментарий о причине
                                <textarea class="form__input area" v-model="formData.message" :required="cart.messageAdd" ></textarea>
                            </label>
                            <button type="submit"  class="form__button">СОХРАНИТЬ ДАННЫЕ</button>
                         </form>
                    </div>
                </article>
              `,
    data() {
        return {
            name: 'name',
            formData:{
                name: this.cart.name,
                subtitle: this.cart.subtitle,
                deadline: this.cart.deadline,
                message: this.cart.message,
            }
        }
    },
    methods:{
        redacted(){
            this.cart.redact = false;
            this.cart.messageAdd = false;
            eventBus.$emit('redact-cart', this.cart, this.formData);
            console.log('submit')
        },
        deleteCart() {
            eventBus.$emit('delete-cart', this.cart);
        },
        messageAdd(){
            this.cart.redact = true;
            this.cart.messageAdd = true;
            this.cart.status -= 1;
        },
        mooveCart(i) {
            if (this.cart.status === 3 && i === -1) {
                this.messageAdd();
            }
            else {
                this.cart.status += i;
            }
            eventBus.$emit('save');
        },
    },
    computed:{

    }
})

Vue.component('board', {
    props: {
        cart:{type: Array},
        index:{ type: Number},
        board:{type: Array},
    },
    template: `
                <div class="board">
                     <div class="board__header">
                        <h1>{{board.name}}</h1>
                     </div>
                     <button v-if="board.id === 1" @click="modal" class="board__button">Добавить задачу</button>
                     <template v-if="getCart().length">
                        <div class="board__list">
                            <template v-for="item in getCart()">
                                <cart :cart="item"></cart>
                            </template>
                        </div>
                     </template>
                     <template v-else>
                        <p class="board__sub">нет ничего</p>
                     </template>
                </div>
              `,
    data() {
    },
    methods: {
        getCart(){
            return this.cart.filter(item=> item.status == this.board.id );
        },
        modal() {
            eventBus.$emit('open-modal');
        }
    },
    computed:{


    }
})

let app = new Vue({
    el: '#app',
    data: {
        forms: false,
        // ++ Карточка должна содержать: дату создания, заголовок, описание задачи, дэдлайн.
        cart: [
            {
                id: 1,
                name: 'имя',
                subtitle: 'Карточка должна содержать: дату создания, заголовок, описание задачи, дэдлайн.',
                deadline: new Date(2026, 1, 11),
                date: new Date(2026, 1, 9),
                status: 1,
                message: '',
                redact: false,
                messageAdd: false,
            },
            {
                id: 2,
                name: 'имя',
                subtitle: 'Карточка должна содержать: дату создания, заголовок, описание задачи, дэдлайн.',
                deadline: new Date(2026, 1, 11),
                date: new Date(2026, 1, 9),
                status: 1,
                message: '',
                redact: false,
                messageAdd: false,
            },
            {
                id: 3,
                name: 'имя',
                subtitle: 'Карточка должна содержать: дату создания, заголовок, описание задачи, дэдлайн.',
                deadline: new Date(2026, 1, 11),
                date: new Date(2026, 1, 9),
                status: 1,
                message: '',
                redact: false,
                messageAdd: false,
            },
        ],
        boards: [
            { id: 1, name: 'Запланированные задачи',},
            { id: 2, name: 'Задачи в работе', },
            { id: 3, name: 'Тестирование', },
            { id: 4, name: 'Выполненные задачи',},
        ],
    },
    methods: {
        addCart(cart){
            this.cart.push(cart);
            this.save();
        },
        deleteCart(cart){
            this.cart = this.cart.filter(item => item.id !== cart.id);
            this.save();
        },
        save(){
            localStorage.setItem('cart', JSON.stringify(this.cart));
        },
        redactCart(cart, data){
            Object.keys(cart).forEach(item => {
                if (data[item]){
                    cart[item] = data[item];
                }
            });
            this.save();
            console.log(cart)
        }


    },
    mounted(){
        const localStor = JSON.parse(localStorage.getItem('cart'));
        if (localStor) {
            this.cart = localStor;
        }
        eventBus.$on('add-cart', this.addCart);
        eventBus.$on('close-modal', () => this.forms = false);
        eventBus.$on('open-modal', () => this.forms = true);
        eventBus.$on('save', this.save);
        eventBus.$on('delete-cart', this.deleteCart);
        eventBus.$on('redact-cart', this.redactCart);
    },
})
/*
    карта:
 редактирование (сохрание даты редактиврования)
 создание
 удаление
 перемещение
 */
/*
    первая доска:
 создание --
 удаление --
 редактирование --
 перемещение > 2
 */
/*
    вторая доска:
 редактирование --
 удаление --
 перемещение > 3
 */
/*
    третья доска:
 редактирование --
 перемещение > 4
 перемещение > 2 (комментарий)
 */
/*
    четвертая доска:
 отметка делайна / в срок
 перемещение > 4
 перемещение > 2 (комментарий)
 */