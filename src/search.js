export default Vue.component("searchEq",{
    props:["goods","filteredGoods"],
    data(){
        return {
            searchLine:""
        }
    },
    template:`
            <form  class="header__search" action="#" method="get" name="search" @submit.prevent="filterGoods">
               <input type="search" value="" placeholder="Товар..." v-model.lazy="searchLine" @change="searchCorrect">
               <button type="submit">&#128269;</button>
            </form>
    `,
    methods:{
        searchCorrect(){
            this.searchLine=this.searchLine.trim().toLowerCase();
        },
        filterGoods(){
            const pattern=new RegExp(this.searchLine,"i");
            const filtered = this.searchLine ? this.goods.filter(item=>pattern.test(item.product_name)) : [...this.goods];
            this.filteredGoods.splice(0,this.filteredGoods.length);
            filtered.forEach(item=>this.filteredGoods.push(item));
        },
    }
})