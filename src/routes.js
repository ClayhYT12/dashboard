import { Router } from "express";
import Junotoken from "../src/juno.js";
import Juno from "juno-api";
import controller from './controller.js'
import bodyParser from "body-parser";
import GenerateFature from '../src/GenerateFatureClient.js';
import multer from 'multer';
import path from "path";


const storage = multer.diskStorage({
    destination:async function(req,file,cb){
         cb(null,"materiais/");
    },
    filename:async function(req,file,cb){
        cb(null,file.originalname + Date.now() + path.extname(file.originalname));
    }
})


const arquives = multer({storage})

const imgarquive = multer({"storage":multer.diskStorage({
    destination:async function(req,file,cb){
         cb(null,"public/img/");
    },
    filename:async function(req,file,cb){
        cb(null,file.originalname);
    }
})})
const routes = new Router();

routes.post('/upload',arquives.single("file"),(req,res)=>{
    const users = controller.users(res);
})

routes.get('/',(req,res)=>{
    res.render("index");
})

routes.get('/painel/:usuario', async(req,res)=>{
    console.log(req.params.usuario);
    let fatures = await controller.listFatures(req.params.usuario)
    console.table(fatures[0]);
    res.render("painel",{fatures:fatures[0],usuario:req.params.usuario});
})


routes.get('/download/:cpf',async(req,res)=>{
    let materiais = await controller.userfaturelist(res,req.params.cpf)
    console.table(materiais)
    res.render("download",{materiais:materiais,usuario:req.params.cpf});
})

routes.get('/inicio/:response',(req,res)=>{
    console.table(req.params.response)
    res.render("inicio",{usuario:req.params.response})
})

routes.get('/gerenciador',(req,res)=>{  
    const users = controller.users(res);
})

routes.get('/post/:usuario', async(req,res)=>{
    try {
        let posts = await controller.postagem()
        res.render("post",{usuario:req.params.response,posts});
    } catch (error) {
        res.render("post",{usuario:req.params.response});
    }

})

routes.post('/postimg',imgarquive.single("file-post"),async(req,res)=>{
    try {
       res.redirect("/gerenciador")
    } catch (error) {
       
    }

})

routes.post('/post',imgarquive.single("file-post"),async(req,res)=>{
    try {
        let posts = await controller.postar(req.body.title,req.body.body,req.body.img,req.body.footer);
        res.render("gerenciador");
    } catch (error) {
       
    }

})


routes.post('/generate',async(req,res)=>{
    const {user,amount,date} = req.body;
    let amountFature = amount.replace(",",".");
    parseFloat(amountFature)
    let usuario = await controller.user(res,user);
    let dataset = JSON.stringify({
        "charge": {
        "description": "Cobrança Teste",
    
        "references": [
            "Parcela1"
        ],
        "amount": amountFature,
        "dueDate": date,
        "installments": 1,
        "maxOverdueDays": 10,
        "fine": "1.00",
        "interest": "2.00",
        "discountAmount": "1.00",
        "discountDays": 10,
        "paymentTypes": [
            "BOLETO"
        ],
        "paymentAdvance": false
        },
        "billing": {
            "name": user,
            "document": usuario[0].cpf,
            "email": usuario[0].email,
            "birthDate": usuario[0].date,
            "notify": false
        }
    })
    const fature = GenerateFature(res,dataset);
})


routes.post('/clientfature',async(req,res)=>{
    const {user,amount,date,link} = req.body;
    let amountFature = amount.replace(",",".");
    parseFloat(amountFature)
    let userfature = await controller.userfature(res,user,amountFature,date,link)
    if (userfature != undefined) {
        res.status(200);
    }
})

routes.post('/login',async(req,res)=>{
    try {
        let {cpf, user_password} = req.body;
        let userlogin = await controller.userlogin(res,cpf,user_password)
        if (userlogin[0].cpf == cpf && userlogin[0].user_password == user_password) {
            if (userlogin[0].cpf == "04412739120") {
                res.render("gerenciador");
            }else{
                res.status(200).json(userlogin);
            }
            
        }else{
            res.redirect("/")
        }
    } catch (error) {
        res.redirect("/")
    }

})
routes.get('/cadastro',(req,res)=>{
    res.render("cadastro")
})
routes.get('/cadastrar/:email/:senha/:nome/:cpf/:date/:telefone',(req,res)=>{
    console.log(req.params)
    controller.cadastrarusuario(res,req.params.nome,req.params.senha,req.params.email,req.params.cpf,req.params.telefone,req.params.date)
})
export default routes;