
function register(){
    let username=document.getElementById("reg_username").value;
    let password=document.getElementById("reg_password").value;
    let password_chk=document.getElementById("reg_password_chk").value;

    let reg_success=document.getElementById("reg_success");
    let reg_danger=document.getElementById("reg_danger");

    let reg_robot=document.getElementById("reg_robot");
    
    reg_danger.hidden=true;
    reg_success.hidden=true;

    if(!reg_robot.checked){
        reg_danger.innerText="你是機器人 👆🤖👇 ";
        reg_danger.hidden=false;  
    }else if(username===""||password===""||password_chk===""){
        reg_danger.innerText="資料輸入不完全";
        reg_danger.hidden=false;  
    }else if(password===password_chk){
        fetch("/register",{
            headers: {'Content-Type':'application/x-www-form-urlencoded'}, 
            body: `username=${username}&password=${password}`,
            method:'POST'
        }).then(
            (res)=>{
                res.text().then(
                    (text)=>{
                        if(text=='register success'){
                            reg_success.innerHTML="帳號建立成功";
                            reg_success.hidden=false;
                        }else if(text=="user exist"){
                            reg_danger.innerHTML="此帳號已被使用";
                            reg_danger.hidden=false;
                        }
                    }
                );
            }
        );

    }else{
        reg_danger.innerText="兩次密碼不一致";
        reg_danger.hidden=false;        
    }
}

function login(){
    let username=document.getElementById("login_username").value;
    let password=document.getElementById("login_password").value;

    let login_success=document.getElementById("login_success");
    let login_danger=document.getElementById("login_danger");

    let login_robot=document.getElementById("login_robot");

    login_success.hidden=true;
    login_danger.hidden=true;
    
    if(!login_robot.checked){
        login_danger.innerText="你是機器人 👆🤖👇 ";
        login_danger.hidden=false;  
    }else if(username===""||password===""){
        login_danger.innerText="資料輸入不完全";
        login_danger.hidden=false;  
    }else{
        fetch("/login",{
            headers: {'Content-Type':'application/x-www-form-urlencoded'}, 
            body: `username=${username}&password=${password}`,
            method:'POST'
        }).then(
            (res)=>{
                res.text().then(
                    (text)=>{
                        if(text==='error'){
                            login_danger.innerHTML="帳號或密碼錯誤";
                            login_danger.hidden=false;
                        }else{
                            location.href="/";
                        }
                    }
                );
            }
        );

    }
}