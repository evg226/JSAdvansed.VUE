let eventBus = new Vue();

Vue.component("NavMenu",{
    props:["type","pages","loadData"],
    template:`
            <ul v-if="type=='top-menu'" class="header__menu" v-show="isMenuVisible">
                <li class="header__menu-item render-main"
                     v-for="item of pages" @click="openPage(item)" :key="item.name">{{ item.name }}</li>
            </ul>
            
            <div v-else-if="type=='bradcrumb'" class="bradcrumb">
                <div class="bradcrumb__container container">
                    <div class="bradcrumb__desc">
                        Интернет-магазин&nbsp;VUE
                    </div>
                    <div class="bradcrumb__map"><span class="render-main" @click="openPage(pages[0])">{{ pages[0].name}}</span><span
                        class="bradcrumb__map_changable">{{ bradcrumb }}</span>
                    </div>
                </div>
            </div>
            
            <div v-else-if="type=='hamburger-icon'" class="header__hamb" :class="{header__hamb_click:isMenuVisible}"
                        v-show="isVisibleHambIcon" @click="changeMenuVisible">
                <span></span><span></span><span></span>
            </div>
    `,

    data(){
        return {
            isMenuVisible:true,
            isVisibleHambIcon:false,
        }
    },
    methods:{
        openPage(item){
            // this.bradcrumb = item.name=="Главная"? "" : " / " + item.name;
            this.pages.forEach(page=>{page.active=(page.name==item.name)?page.active=true: page.active=false});
            item.name=="Каталог"&&this.loadData("/catalog");
        },
        setMenu(){
            this.isMenuVisible=window.innerWidth > 768;
            this.isVisibleHambIcon=window.innerWidth <= 768;

        },
        changeMenuVisible: function (){
            console.log(this.isMenuVisible);
            // this.isMenuVisible=!this.isMenuVisible;
            eventBus.$emit("menuVisible",!this.isMenuVisible);
            // // eventBus.$emit("isVisibleHambIcon",window.innerWidth <= 768);
            eventBus.$on("menuVisible",(result)=>this.isMenuVisible=result);
        }
    },
    computed:{
        bradcrumb: function ()  {
            let findActive=this.pages.find(item=>item.active).name;
            return (findActive!="Главная")? " / "+findActive: null;
        },
    },
    mounted(){
        this.setMenu();
        window.addEventListener("resize",this.setMenu);
    }
});
