import cartItem from "./cartitem";

export default Vue.component("cart", {
        props: ["icon", "cartItems", "errorBox", "queryServer"],
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
                <cart-item v-for="item of cartItems" :item="item" :key="item.id_product"
                            :error-box="errorBox" :query-server="queryServer"
                            @remove-cart="removeFromCart"></cart-item>     
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
        methods: {
            removeFromCart(cartItem) {
                this.queryServer("/removeFromToCart", cartItem)
                    .then(data => {
                        if (data.result == 1) {
                            this.cartItems.forEach((item, index) => (item.id_product == cartItem.id_product) && this.cartItems.splice(index, 1));
                        } else {
                            this.errorBox.push(`Ошибка при удалении товара ${cartItem.product_name} из корзины`);
                        }
                    });
            },
            buy() {
                alert('Товары направлены на Ваш адрес');
            }
        },
        computed: {
            cartTotal() {
                return this.cartItems.reduce((accum, item) => accum + +item.quantity * item.price, 0);
            },
            cartQuantity() {
                return this.cartItems.reduce((accum, item) => accum + +item.quantity, 0);
            },
        }
    });

