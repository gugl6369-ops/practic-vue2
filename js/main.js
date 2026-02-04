let eventBus = new Vue()

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
    template: `
                <div class="board">
                    
                </div>
              `,
    data() {}
})

let app = new Vue({
    el: '#app',
    data: {
        cart: [],
        boards: {
            todo: [],
            progress: [],
            done: [],
        },
    }
})



