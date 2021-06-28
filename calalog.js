Vue.component("goods-list",{
    props:["goods","cartItems","errorBox","queryServer"],
    template:`
       <div class="product-box" >
            <goods-item v-for="product of goods" :product="product" :key="product.id_product" 
                            :cart-items="cartItems" :error-box="errorBox" :query-server="queryServer">
            </goods-item>
            <div class="product-none" v-if="goods.length==0">Не найдено!</div>
       </div>
    `,
});
Vue.component("goods-item",{
    props:["product","cartItems","errorBox","queryServer"],
    template: `
        <div class="product-item">
            <div class="product-item-in">
                <h3 class="product-header">{{product.product_name}}</h3>
                <div class="product-img">
                    <img :src="'img/'+product.id_product+'.png'">
                </div>
                <p class="product-price">&#8381;{{product.price}}</p>
            </div>
            <div class="product-button">
                <div class="product-button-buy buy-btn" @click="addcart(product)">
                    <img src="img/cart.png">
                    Купить
                </div>
            </div>
        </div>
    `,
    methods:{
        addcart(product){
            this.queryServer ("/addToCart",product)
                .then(data=>{
                    if(data.result==1){
                        let findItem=this.cartItems.find(item=>product.id_product == item.id_product);
                        if(findItem){
                            findItem.quantity=+findItem.quantity+1;
                        } else {
                            this.cartItems.push({...product, quantity:1});
                        }
                    } else {
                        this.errorBox.push(`Ошибка при добавлени товара ${product.product_name} в корзину`);
                    }
                });
        },
    }
});
