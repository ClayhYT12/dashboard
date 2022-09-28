

let URL = "https://localhost:3000/"
async function Cadastrar(){
    let email = document.getElementById("email").value;
    let senha = document.getElementById("senha").value;
    let nome = document.getElementById("nome").value;
    let cpf = document.getElementById("cpf").value;
    let date = document.getElementById("date").value;
    let telefone = document.getElementById("telefone").value;

    window.location.replace(URL + `cadastrar/${email}/${senha}/${nome}/${cpf}/${date}/${telefone}`)
}

async function GeneratePayment(){
    let user = document.getElementById("ClientFature").value;
    let amount = document.getElementById("AmountFature").value;
    let date = document.getElementById("DateVencimentFature").value;

    await fetch(URL + "generate",{
        headers:{
            "Content-Type":"application/json"
        },
        method:"POST",
        body:JSON.stringify({
            "user":user,
            "amount":amount,
            "date":date
        })
    }).then(response => response.json())
        .then((response)=>{
            let resposta = response._embedded.charges[0];
                console.log(resposta.checkoutUrl);
                fetch(URL + "clientfature",{
                    headers:{
                        "Content-Type":"application/json"
                    },
                    method:"POST",
                    body:JSON.stringify({
                        "user":user,
                        "amount":amount,
                        "date":date,
                        "link":resposta.checkoutUrl
                    })
                }).then(response=> response.json())
                .then((response)=>{
                    console.log(response);
                })
            if (document.getElementById("error").style.display = "block") {
                document.getElementById("error").style.display = "none"
                document.getElementById("sucess").style.display = "block";
            }
            
        }).catch((response)=>{
            if (document.getElementById("sucess").style.display = "block") {
                document.getElementById("sucess").style.display = "none"
                document.getElementById("error").style.display = "block";
            }
            
        })
}

async function Login(){
    if (document.getElementById("cpf").value == "") {
        console.log("seu cpf esta vazio")
    }else{
        let cpf = document.getElementById("cpf").value;
        const timeOutClose = setTimeout(close, 500);
        document.getElementById("cpf").style.display = "none";
        document.getElementById("senha").style.display = "block";
        const timeoutShow = setTimeout(show, 400);
        if (document.getElementById("senha").value == "") {
        }else{
            let user_password = document.getElementById("senha").value;
            await fetch(URL + "login",{
                headers:{
                    "Content-Type":"application/json"
                },
                method:"POST",
                body:JSON.stringify({
                    "cpf":document.getElementById("cpf").value,
                    "user_password":document.getElementById("senha").value
                })
            }).then(response => response.json())
                .then(async(response)=>{
                    window.location.href = URL + `inicio/${response[0].cpf}`;  
                }) 
        }
    }
}

async function Publicar(){
    let title = document.getElementById("post-title").value;
    let body = document.getElementById("post-body").value;
    let img = document.getElementById("text-post").innerText;
    let footer = document.getElementById("post-footer").value;

    await fetch(URL + "post",{
        headers:{
            "Content-Type":"application/json"
        },
        method:"POST",
        body:JSON.stringify({
            "title":title,
            "body":body,
            "img":img,
            "footer":footer
        })
    }).then(response => response.json())
        .then((response)=>{
    })
}

function GetPainel(usuario){
    window.location.href = URL + `painel/${usuario.cpf}`
}

function show(){
    document.getElementById("senha").style.opacity = 1;
}

function close(){
    document.getElementById("cpf").style.opacity = 0;
}