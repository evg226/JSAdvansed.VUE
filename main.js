const app = new Vue({
    el: "#page",
    data:{
        pages:[
            {name:"Главная",active:true},
            {name:"Каталог",active:false},
        ],
        isVisibleCart:false,
        isMobile: {menuIcon:false,menuVisible:true},
        goods:[],
        filteredGoods:[],
        cart:[],
        errors:[] //ошибки при загрузке данных
    },
    methods:{

        getJSON(url,data){
            let post=data?{
                method:"POST",
                headers:{"Content-Type":"application/json;charset=utf-8"},
                body: JSON.stringify(data)}:null;
            return fetch(url,post)
                        .then(result=>result.json())
                        .catch(error=>this.errors.push("Ошибка при загрузке данных"));
        },
        loadData(path){
            this.getJSON(path)
                .then(data => {
                    if (path=="/cart"){
                        this.cart=[...data];
                    } else if (path=="/catalog"){
                        this.goods=[...data];
                        this.filteredGoods=[...this.goods];
                    }
                })
                .catch(error=>this.errors.push("Ошибка при загрузке "+ path));
        },
        setMenu(){
            this.isMobile.menuVisible=window.innerWidth > 768;
            this.isMobile.menuIcon=window.innerWidth <= 768;

        },

    },
    mounted(){
        this.loadData("/cart");
        this.setMenu();
        window.addEventListener("resize",this.setMenu);

    }
});

