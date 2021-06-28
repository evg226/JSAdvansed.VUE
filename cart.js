Vue.component("cart",{
    props:["icon","cartItems","errorBox","queryServer"],
    template: `
            <span v-if="icon" class="header__cart-count">{{cartQuantity}}</span>
            <div v-else="icon" class="header__cart-body" v-show="$parent.isVisibleCart">
                <div class="header__cart-top">
                    <div class="header__cart-header">Корзина</div>
                     <div class="header__cart-close" @click="$parent.isVisibleCart=false">x</div>
                </div>
                <div class="cart__grid cart__grid_top">
                    <div class="cart__name">Товар</div>
                    <div class="cart__price">Цена,&#8381;</div>
                    <div class="cart__quantity">Кол-во</div>
                    <div class="cart__sum">Сумма,&#8381;</div>
                    <div class="cart__remove"></div>
                </div>
                <div id="cart">
                <cartItem v-for="item of cartItems" :item="item" :key="item.id_product"
                            :error-box="errorBox" :query-server="queryServer"
                            @remove-cart="removeFromCart"></cartItem>     
                <div v-if="cartItems.length==0">Корзина пуста. Начните покупки >></div>
                    <div class="cart__total">
                    <div class="cart__total-head">ИТОГО:</div>
                    <div class="cart__total-quantity" id="cart__quantity">{{cartQuantity}}шт.</div>
                    <div class="cart__total-sum" id="cart__total">&#8381;{{cartTotal}}</div>
                    <div class="cart__total-button" @click="buy">Купить</div>
                    </div>
                </div>
            </div>
        `,
    methods:{
        removeFromCart(cartItem){
            this.queryServer("/removeFromToCart",cartItem)
                .then(data=>{
                    if(data.result==1){
                        this.cartItems.forEach((item,index)=> (item.id_product == cartItem.id_product) && this.cartItems.splice(index,1));
                    } else {
                        this.errorBox.push(`Ошибка при удалении товара ${cartItem.product_name} из корзины`);
                    }
                });
        },
        buy(){
            alert('Товары направлены на Ваш адрес');
        }
    },
    computed:{
        cartTotal(){
            return this.cartItems.reduce((accum,item)=>accum+ +item.quantity*item.price,0);
        },
        cartQuantity(){
            return this.cartItems.reduce((accum,item)=>accum+ +item.quantity,0);
        },
    }
});

Vue.component("cartItem",{
    props:["item","errorBox","queryServer"],
    template:`
        <div class="cart__element cart__grid">
            <div class="cart__name">{{item.product_name}}</div>
            <div class="cart__price">{{item.price}}</div>
            <input class="cart__quantity" type="number"
                    @change="e=>{if(e.target.value<=0) {
                                        $emit('remove-cart',item);
                                    } else {
                                        update(item);                                                                                
                                    }
                                }"
                     v-model.lazy="item.quantity">
            <div class="cart__sum">{{item.price*item.quantity}}</div>
            <button class="cart__remove" @click="$emit('remove-cart',item)">X</button>
        </div>
    `,
    methods:{
        update(product){
            this.queryServer ("/addToCart",product)
                .then(data=>{
                    data.result==1||this.errorBox.push(`Ошибка при добавлени/изменении товара ${product.product_name} в корзину`);
                });
        }
    }
});

