let eventBus = new Vue()

Vue.component('cart', {
    props: {
        data: [

        ],
    },
    template: `
                <article>
                    <div>
                        <img :src="icon">
                    </div>
                    <div>
                        <p>{{name}}</p>    
                    </div>
                    <div>
                        <label>
                            Прогресс:
                            <progress value="progress" max="100"></progress>
                        </label>
                    </div>  
                </article>
              `
})

let app = new Vue({
    el: '#app',
    data: {
        cart: [],
    }
})



