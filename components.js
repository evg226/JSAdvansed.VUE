Vue.component("goods-list",{
    props:["goods"],
    template:`
       <div class="product-box" >
            <goods-item v-for="product of goods" :product="product" :key="product.id_product"></goods-item>
            <div class="product-none" v-if="goods.length==0">Не найдено!</div>
       </div>
    `,
});

Vue.component("goods-item",{
    props:["product"],
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
                <div class="product-button-buy buy-btn" @click="$parent.$emit('add-cart',product)">
                    <img src="img/cart.png">
                    Купить
                </div>
            </div>
        </div>
    `,
});

Vue.component("cart",{
    props:["cartItems"],
    template: `
            <div class="header__cart-body" v-show="$parent.isVisibleCart">
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
                <cartItem v-for="item of cartItems" :item="item" :key="item.id_product"></cartItem>     
                <div v-if="cartItems.length==0">Корзина пуста. Начните покупки >></div>
                    <div class="cart__total">
                    <div class="cart__total-head">ИТОГО:</div>
                    <div class="cart__total-quantity" id="cart__quantity">{{$parent.cartQuantity}}шт.</div>
                    <div class="cart__total-sum" id="cart__total">&#8381;{{$parent.cartTotal}}</div>
                    <div class="cart__total-button">Купить</div>
                    </div>
                </div>
            </div>
        `,
    methods:{
        test:()=>{
            console.log(111);
            visibility=false;
        }
    }

});

Vue.component("cartItem",{
    props:["item"],
    template:`
        <div class="cart__element cart__grid">
            <div class="cart__name">{{item.product_name}}</div>
            <div class="cart__price">{{item.price}}</div>
            <input class="cart__quantity" type="number" @change="e=>{if(e.target.value<=0) $parent.$emit('remove-cart',item);}" v-model.lazy="item.quantity">
            <div class="cart__sum">{{item.price*item.quantity}}</div>
            <button class="cart__remove" @click="$parent.$emit('remove-cart',item)">X</button>
        </div>
    `
});

Vue.component("searchEq",{
    data(){
      return {
          searchLine:""
      }
    },
    template:`
            <form  class="header__search" action="#" method="get" name="search" @submit.prevent="$emit('search-submit',searchLine)">
               <input type="search" value="" placeholder="Товар..." v-model.lazy="searchLine" @change="searchCorrect">
               <button type="submit">&#128269;</button>
            </form>
            
    `,
    methods:{
        searchCorrect(){
            this.searchLine=this.searchLine.trim().toLowerCase();
        }
    }
})

Vue.component("errorComp",{
    props:["errorMessages"],
    template:`
        <div v-if="errorMessages.length" class="errors"  @click="$emit('close')">
            <div class="errors__caption">Ошибки</div>    
            <div  class="errors__text" v-for="err of errorMessages">{{err}}</div>
        </div>
    `
})

