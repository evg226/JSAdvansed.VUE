const express=require("express");
const app=express();
const bodyParser=require("body-parser")
const moment=require("moment");

app.listen(8080,()=>console.log("Интернет магазин VUE запущен"));
app.use(express.static("."));
app.use(bodyParser.json());

class Stats{
    constructor(path="./data/stats.json"){
        this.path=path;
        this.stats=[];
        this.openFile();
    }
    openFile(){
        fs.readFile(this.path,"utf-8",(err,result)=>{
            if(!err){
                let data=JSON.parse(result);
                this.stats=[...data];

            } else{
                console.log(`Ошибка при открытии лог-файла: ${err}`);
            }
        });
    }
    writeStat(action,cartItem){
        const now=moment().format("YYYY-MM-DD hh:mm:ss");
        this.stats.push({action,id:cartItem.id_product,name:cartItem.product_name,time:now});
        fs.writeFile(this.path,JSON.stringify(this.stats),err=>{
            err&&console.log(err);
        });
        console.log(action+": "+cartItem.product_name);
    }
}

const fs=require("fs");
const stats=new Stats();

app.get("/catalog",(req,res)=>{
    fs.readFile("./data/catalog.json","utf-8",(err,result)=>{
        res.send(result);
    })
});
app.get("/cart",(req,res)=>{
    fs.readFile("./data/cart.json","utf-8",(err,result)=>{
        res.send(result);
    })
});
app.post("/addToCart",(req,res)=>{
    fs.readFile("./data/cart.json","utf-8",(err,result)=>{
        if(err){
            res.send('{"result": 0}');
        } else {
            const product=req.body;
            const cart=JSON.parse(result);
            let findItem=cart.find(cartItem=>product.id_product == cartItem.id_product);
            let currentAction="";
            if(findItem){
                findItem.quantity=product.hasOwnProperty("quantity")?product.quantity:+findItem.quantity+1;
                currentAction="Изменение";
            } else {
                cart.push({...product, quantity:1});
                currentAction="Добавление";
            }
            fs.writeFile("./data/cart.json",JSON.stringify(cart),err=>{
                if (err){
                    res.send('{"result": 0}');
                } else {
                    res.send('{"result": 1}');
                    stats.writeStat(currentAction,product);
                }
            });
        }
    })
});
app.post("/removeFromToCart",(req,res)=>{
    fs.readFile("./data/cart.json","utf-8",(err,result)=>{
        if(err){
            res.send('{"result": 0}');
        } else {
            const cartItem=req.body;
            const cart=JSON.parse(result);
            cart.splice(cart.indexOf(cartItem),1);
            fs.writeFile("./data/cart.json",JSON.stringify(cart),err=>{
                if (err){
                    res.send('{"result": 0}');
                } else {
                    res.send('{"result": 1}');
                    stats.writeStat("Удаление",cartItem);
                }
            });
        }
    })
});






