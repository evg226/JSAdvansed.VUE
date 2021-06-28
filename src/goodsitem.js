export default Vue.component("goodsItem", {
    props: ["product", "cartItems", "errorBox", "queryServer"],
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
    methods: {
        addcart(product) {
            this.queryServer("/addToCart", product)
                .then(data => {
                    if (data.result == 1) {
                        let findItem = this.cartItems.find(item => product.id_product == item.id_product);
                        if (findItem) {
                            findItem.quantity = +findItem.quantity + 1;
                        } else {
                            this.cartItems.push({...product, quantity: 1});
                        }
                        alert(`Товар:\n${product.product_name.toUpperCase()}\nдобавлен в корзину`);
                    } else {
                        this.errorBox.push(`Ошибка при добавлени товара ${product.product_name} в корзину`);
                    }
                });
        },
    }
});
