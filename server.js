const express=require("express");
const app=express();
const bodyParser=require("body-parser")

app.listen(8080,()=>console.log("Интернет магазин VUE запущен"));
app.use(express.static("."));
app.use(bodyParser.json());

const fs=require("fs");

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
            if(findItem){
                findItem.quantity=product.hasOwnProperty("quantity")?product.quantity:+findItem.quantity+1;
                console.log(`Изменение позиции: ${product.product_name}`);
            } else {
                cart.push({...product, quantity:1});
                console.log(`Добавление позиции: ${product.product_name}`);
            }
            fs.writeFile("./data/cart.json",JSON.stringify(cart),err=>{
                if (err){
                    res.send('{"result": 0}');
                } else {
                    res.send('{"result": 1}');
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
            console.log(`Удаление: ${cartItem.product_name}`);
            const cart=JSON.parse(result);
            cart.splice(cart.indexOf(cartItem),1);
            fs.writeFile("./data/cart.json",JSON.stringify(cart),err=>{
                if (err){
                    res.send('{"result": 0}');
                } else {
                    res.send('{"result": 1}');
                }
            });
        }
    })
});

