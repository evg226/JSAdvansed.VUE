
const app = new Vue({
    el: "#page",
    data:{
        // подготовка страницы
        pages:[
            {name:"Главная",active:true},
            {name:"Каталог",active:false},
        ],
        bradcrumb:"",
        isVisibleCart:false,
        isVisibleHambIcon:false,
        isMenuVisible:true,
        // menuIconClasses:"header__hamb",
        // Работа с каталогом товаров
        // API: 'https://evg226.github.io/JSAdvansed.VUE/data/',
        goods:[],
        // searchLine:"",
        filteredGoods:[],
        cart:[],
        errors:[] //ошибки при загрузке данных
    },
    methods:{
        clearErrors(){
            this.errors=[];
        },
        openPage(item){
            this.bradcrumb = item.name=="Главная"? "" : " / " + item.name;
            this.pages.forEach(page=>{page.active=(page.name==item.name)?page.active=true: page.active=false});
            switch (item.name){
                case "Каталог":
                    // загрузка каталога
                    //изменен API для каталога на сервер nodeJS
                    this.getJSON("/catalog")
                        .then(data => {
                            this.goods=[...data];
                            this.filteredGoods=[...this.goods];
                        })
                        .catch(error=> {
                                this.errors.push("Ошибка при загрузке каталога товаров");
                            }
                        );
                    break;
            }
            if(this.isVisibleHambIcon) this.isMenuVisible=false;
        },
        // изменен метод для запроса на сервер nodeJS (Добавлена опция для POST запроса
        getJSON(url,data){
            let post=data?{
                method:"POST",
                headers:{"Content-Type":"application/json;charset=utf-8"},
                body: JSON.stringify(data)}:null;
            return fetch(url,post)
                .then(result=>result.json())
                .catch(error=>{
                    console.log(error);
                });
        },

        filterGoods(searchLine){
            if (!this.pages[1].active) return;
            const pattern=new RegExp(searchLine,"i");
            this.filteredGoods = searchLine ? this.goods.filter(item=>pattern.test(item.product_name)) : this.filteredGoods=[...this.goods];
        },
//изменены методы для добавления/изменения и удаления корзины
        addToCart(product){
            this.getJSON("/addToCart",product)
                .then(data=>{
                    if(data.result==1){
                        this.renderCart();
                    } else {
                        this.errors.push(`Ошибка при добавлении товара ${product.product_name} в корзину`);
                    }
                });
        },

        removeFromCart(cartItem){
            this.getJSON("/removeFromToCart",cartItem)
                .then(data=>{
                    if(data.result==1){
                        this.renderCart();
                    } else {
                        this.errors.push(`Ошибка при удалении товара ${cartItem.product_name} из корзины`);
                    }
                });
            // this.cart.splice(this.cart.indexOf(cartItem),1);
        },
//изменен API для корзины на сервер nodeJS
        renderCart(){
            this.getJSON("/cart")
                .then(data => {
                    this.cart=[...data];
                })
                .catch(error=> {
                    this.errors.push("Ошибка при загрузке корзины");
                });
        },
    },
    computed:{
        cartQuantity(){
            return this.cart.reduce((accum,item)=>accum+ +item.quantity,0);
        },
        cartTotal(){
            return this.cart.reduce((accum,item)=>accum+ +item.quantity*item.price,0);
        }
    },

    mounted(){
        this.renderCart();
    }
});

function setMenuVisible() {
    if (window.innerWidth <= 768) {
        app.isVisibleHambIcon = true;
        app.isMenuVisible = false;
    } else {
        app.isVisibleHambIcon = false;
        app.isMenuVisible = true;
    }
}
window.addEventListener("resize",setMenuVisible);
setMenuVisible();