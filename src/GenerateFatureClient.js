import Juno from "../src/juno.js";
import fetch from 'node-fetch';

const token = 'Bearer ' + Juno.access_token;
const URL = "https://api.juno.com.br/charges"
let generate = function GenerationFature(res,data){
    if (token == "") {
         token = Juno;
    }else{
        fetch(URL,{
            headers: {              
                "Content-Type": "application/json",
                "X-Api-Version": "2",
                "X-Resource-Token": "596D0D001A15026CD028F9C37A925B5218F933F6F89DE71DE2A9173C33C917AC",
                "Authorization":token
            },
              method: "POST",
              body:data
            
        }).then(response => response.json())
            .then((response)=>{
                
                res.status(301).json(response);
            }).catch((response)=>{
                res.status(500).json(JSON.stringify({response}));
            })
    } 
}

export default generate;