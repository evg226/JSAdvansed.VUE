export default Vue.component("cartItem", {
    props: ["item", "errorBox", "queryServer"],
    template: `
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
    methods: {
        update(product) {
            this.queryServer("/addToCart", product)
                .then(data => {
                    data.result == 1 || this.errorBox.push(`Ошибка при добавлени/изменении товара ${product.product_name} в корзину`);
                });
        },
    },
});

