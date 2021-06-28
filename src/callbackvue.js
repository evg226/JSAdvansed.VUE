import PageCallBack from "./callback"; //для страницы "callback" - которая является не VUE компонентой

export default Vue.component("callBack",{
    props:["query","errorBox"],
    template:`
            <div class="call-back"></div>
    `,
    mounted(){
        let pageCallBack = new PageCallBack(".call-back",this.query);
    }
});