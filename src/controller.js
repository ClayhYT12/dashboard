import { QueryTypes } from 'sequelize';
import db from './db.js'

let users =  async function ListUsers(res){
    let usuarios = [];
    const users = await db.query("SELECT * FROM `users`", { type: QueryTypes.SELECT });
    JSON.stringify(users);
    for (let index = 0; index < users.length; index++) {
        usuarios.push(users[index]);
        
    }
    res.render("gerenciador",{usuarios:usuarios});
}

let user = async function user(res,user_name){
    let user = []
    const userdb = await db.query("SELECT * FROM users WHERE user_name = '"+user_name+"'")
    for (let index = 0; index < userdb.length; index++) {
        user = userdb[index];
        
    }
    return user;
}

let userfaturelist = async function user(res,cpf){
    let userfaturelist = []
    let fatureUser = await db.query("SELECT * FROM users WHERE cpf = '"+cpf+"'");
    const userdb = await db.query("SELECT * FROM user_fature WHERE user_name = '"+fatureUser.user_name+"'")
    for (let index = 0; index < userdb.length; index++) {
        userfaturelist = userdb[index];     
    }
    return userfaturelist;
}

let userfature = async function UserFature(res,user_name,amount,date,link){
    const clientfaturedb = await db.query("INSERT INTO user_fature(user_name,amount,date,link) VALUES ('"+user_name+"','"+amount+"','"+date+"','"+link+"')")
    return clientfaturedb;
}
let cadastrarusuario = async function UserFature(res,user_name,user_password,email,cpf,telefone,date){
    const clientfaturedb = await db.query(`INSERT INTO users(user_name, user_password, email, cpf, telefone, user_plano, user_mensalidade, date) VALUES ('${user_name}','${user_password}','${email}','${cpf}','${telefone}','pro','${100}','${date}')`)
    res.render("index");
}

let listFatures = async function ListFatures(usuario){
    const user = await db.query(`SELECT * FROM users WHERE cpf = '${usuario}'`)
    console.log('%c usuario', 'color: red; font-weight: bold')
    let userbanco = []
    for (let index = 0; index < user.length; index++) {
        userbanco = user[index];       
    }
    const userfatures = await db.query(`SELECT * FROM user_fature WHERE user_name = '${userbanco[0].user_name}'`)
    let faturabanco = []
    for (let index = 0; index < userfature.length; index++) {
        faturabanco = userfature[index];       
    }
    return userfatures;
}

let userlogin = async function user(res,cpf,user_password){
    let userlogin = []
    const userdb = await db.query("SELECT * FROM users WHERE cpf = '"+cpf+"' AND user_password = '"+user_password+"'")
    for (let index = 0; index < userdb.length; index++) {
        userlogin = userdb[index];       
    }
    return userlogin;
}

let postagem = async function user(){
    let posts = []
    const post = await db.query("SELECT * FROM postagens")
    for (let index = 0; index < post.length; index++) {
        posts = post[index];       
    }
    return posts;
}

let postar = async function user(title,body,img,footer){
    let posts = []
    try {
        const post = await db.query(`INSERT INTO postagens(title,body,footer,img) VALUES('${title}','${body}','${footer}','${img}')`)
    } catch (error) {
        console.log(error)
    }
   
    for (let index = 0; index < post.length; index++) {
        posts = post[index];       
    }
    return posts;
}

export default {users, user,userfature,userlogin,listFatures,userfaturelist,cadastrarusuario,postagem,postar};