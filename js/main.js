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
                        
                        <button type="submit">Сохранить</button>
                    </form>
                 </div>
              `,
    data(){
        return{
            model: 10,
            formData: {
                name: '',
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
                status: 1,
                date: '',
            }

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
                    <div class="cart_header">
                        <p class="cart__date">{{ Math.floor((Date.now() - cart.date) / (1000 * 60 * 60)) }} ч. назад</p>    
                        <button class="icon_btn icon_btn--pen">
                            <img class="icon" src="/assets/pen.png" >
                        </button>
                    </div> 
                     <p> {{cart.name}} </p>
                    <div class="cart__content">
                        <p class="cart__subtitle">{{cart.subtitle}}</p>
                        <div class="cart__list">
                            <div class="cart__listBlock">
                                <img src="/assets/flag.png" class="cart__deadflag">
                                <p>{{ Math.floor((cart.deadline - Date.now()) / (1000 * 60 * 60)) }} ч. осталось</p>
                            </div>
                            <button class="icon_btn icon_btn--delete">
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
// {
//     id: 1,
//         name: 'имя',
//     subtitle: '',
//     deadline: '',
//     date: new Date().toString().substr(0, 15),
//     status: 1,
// },
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
            },
            {
                id: 2,
                name: 'имя',
                subtitle: 'Карточка должна содержать: дату создания, заголовок, описание задачи, дэдлайн.',
                deadline: new Date(2026, 1, 11),
                date: new Date(2026, 1, 9),
                status: 1,
            },
            {
                id: 3,
                name: 'имя',
                subtitle: 'Карточка должна содержать: дату создания, заголовок, описание задачи, дэдлайн.',
                deadline: new Date(2026, 1, 11),
                date: new Date(2026, 1, 9),
                status: 1,
            },
        ],
        boards: [
            //Функционал первого столбца.
            //Должна быть возможность создания, удаления и редактирования карточки с сохранением временного штампа последнего времени редактирования.
            //Должна быть возможность перемещать карточку во второй столбец (“В работе”).
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