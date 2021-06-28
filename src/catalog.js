import goodsItem from "./goodsitem";
export default Vue.component("goodsList", {
        props: ["goods", "cartItems", "errorBox", "queryServer"],
        template: `
       <div class="product-box" >
            <goods-item v-for="product of goods" :product="product" :key="product.id_product" 
                            :cart-items="cartItems" :error-box="errorBox" :query-server="queryServer">
            </goods-item>
            <div class="product-none" v-if="goods.length==0">Не найдено!</div>
       </div>
    `,
    });