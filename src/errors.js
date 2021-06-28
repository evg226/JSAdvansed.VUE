export default Vue.component("errorComp",{
    props:["errorMessages"],
    data(){
        return{
            isVisibleErrors:true
        }
    },
    template:`
        <div v-if="this.errorMessages.length&&isVisibleErrors" class="errors"  @click="unShowErrors">
            <div class="errors__caption">Ошибки</div>    
            <div  class="errors__text" v-for="err of errorMessages">{{err}}</div>
        </div>
    `,
    methods: {
        unShowErrors(){
            this.isVisibleErrors=false;
        },
    }
})
