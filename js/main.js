let eventBus = new Vue()

Vue.component('custom-form', {
    props: {
        forms:{
            type: Boolean,
            required: true
        },
        cart:{
            type: Boolean,
        }
    },
    template: `
                 <div class="addCart">
                    <div @click="modal" class="overlay"></div>
                    <form class="form" @submit.prevent="handleSubmit">
                        <p>СОЗАДНИЕ КАРТОЧКИ</p>
                        <label>
                        Название
                            <input type="text" v-model="formData.name" required>
                        </label>
                        <label>
                        Описание
                            <input type="text" v-model="formData.subtitle" required>
                        </label>
                        <label>
                        deadline:
                            <input type="date" v-model="formData.deadline" required>
                        </label>
                        <button type="submit">Сохранить</button>
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
            console.log(this.formData);

        },
        modal() {
            eventBus.$emit('close-modal');
        }

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
                <article class="cart">
                    <div class="moov">
                        <button v-if="cart.status === 3" class="arrow" @click="mooveCart(-1)">
                            <img class="icon" style="transform: rotate(-180deg)" src="./assets/arrow.png">
                        </button>
                        <button v-if="cart.status < 4" class="arrow" @click="mooveCart(1)">
                            <img class="icon" src="./assets/arrow.png">
                        </button>
                    </div>
                    <div class="cart_header">
                        <p class="cart__date">{{ ( (new Date().getTime() - new Date(this.cart.date).getTime() ) / (1000 * 60 * 60)).toFixed(0) }} ч. назад</p>    
                        <button class="icon_btn icon_btn--pen">
                            <img class="icon" src="/assets/pen.png" >
                        </button>
                    </div> 
                     <p> {{cart.name}} </p>
                    <div class="cart__content">
                        <p class="cart__subtitle">{{cart.subtitle}}</p>
                        <p v-show="cart.message" class="cart__subtitle">
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
                    <div>
                    </div>  
                </article>
              `,
    data() {
        return {
            name: 'name',
        }
    },
    methods:{
        deleteCart() {
            eventBus.$emit('delete-cart', this.cart);
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
                        <p>{{getCart().length}}</p>
                     </div>
                     <template v-if="getCart().length">
                        <div class="board__list">
                            <template v-for="item in getCart()">
                                <cart :cart="item"></cart>
                            </template>
                        </div>
                     </template>
                     <template v-else>
                        <p>нет ничего</p>
                     </template>
                    <div v-if="board.id === 1">
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


    }
})

let app = new Vue({
    el: '#app',
    data: {
        forms: true,
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
            },
            {
                id: 2,
                name: 'имя',
                subtitle: 'Карточка должна содержать: дату создания, заголовок, описание задачи, дэдлайн.',
                deadline: new Date(2026, 1, 11),
                date: new Date(2026, 1, 9),
                status: 1,
                message: '',
            },
            {
                id: 3,
                name: 'имя',
                subtitle: 'Карточка должна содержать: дату создания, заголовок, описание задачи, дэдлайн.',
                deadline: new Date(2026, 1, 11),
                date: new Date(2026, 1, 9),
                status: 1,
                message: '',
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
        moove(cart, stat){
            this.cart = this.cart.map(item => {
                if (item.id == cart.id){
                    item.status = stat
                }
            });
            this.save();
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
        eventBus.$on('delete-cart', this.deleteCart);
        eventBus.$on('moove-cart', this.moove);
    },
    computed:{


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