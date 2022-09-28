let jose = ["76213876823","senhateste123"]

function autentication(){
    if (document.getElementById("cpf").value == "") {
        console.log("seu cpf esta vazio")
    }else{
        document.getElementById("cpf").value;
        const timeOutClose = setTimeout(close, 500);
        document.getElementById("cpf").style.display = "none";
        document.getElementById("senha").style.display = "block";
        const timeoutShow = setTimeout(show, 400);
        if (document.getElementById("senha").value == "") {
            
        }else{
            await fetch(URL + "login",{
                headers:{
                    "Content-Type":"application/json"
                },
                method:"GET",
                body:JSON.stringify({
                    "cpf":document.getElementById("cpf").value,
                    "user_password":document.getElementById("senha").value
                })
            }).then(response => response.json())
                    .then(async(response)=>{
                        console.log("aqui");
                        await fetch(URL + "inicio",{
                            headers:{
                                "Content-Type":"application/json"
                            },
                            method:"POST",
                            body:JSON.stringify({
                               "response":response
                            })
                    })
                    .catch((response)=>{
                        console.log(response);
                    })
        }) 
            console.log(document.getElementById("cpf").value + " " + document.getElementById("senha").value);
        }
    }
}

function show(){
    document.getElementById("senha").style.opacity = 1;
}

function close(){
    document.getElementById("cpf").style.opacity = 0;
}