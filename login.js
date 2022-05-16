let registerOption=document.querySelector('.register');
let loginSection=document.querySelector('.lSection');
let registerSection=document.querySelector('.rSection');

let email=document.querySelector('.lEmail')
let password=document.querySelector('.lPassword')
let loginBtn=document.querySelector('.loginButton')

let registerEmail=document.querySelector('.rEmail')
let registerCreatePassword=document.querySelector('.rPassword')
let registerConfirmPassword=document.querySelector('.rCPassword')
let submit=document.querySelector('.registerButton');
let backButton=document.querySelector('.backButton');

const emailData=['vnaveen894@gmail.com']
const passwordData=['naveen@123']

function register(){
    if(!emailData.includes(registerEmail.value)&&registerEmail.value!=''&&registerCreatePassword.value!=''&&registerConfirmPassword.value!=''){
    if(registerCreatePassword.value==registerConfirmPassword.value){
        emailData.push(registerEmail.value)
        passwordData.push(registerConfirmPassword.value);
        alert('Registered sucessfully')
        loginSection.classList.replace('d-none','d-flex')
    registerSection.classList.replace('d-flex','d-none')
    }
    else{
        alert('password not matching')
        registerCreatePassword.value='';
        registerConfirmPassword.value='';
    }
}
else{
    if(registerEmail.value==''){
        alert('invalid details')
    }else if(emailData.includes(registerEmail.value)){
        alert('you are an existing user go to login section')
    }
}
}

function login(){
    if(emailData.includes(email.value)){
        let i=emailData.indexOf(email.value)
        if(password.value==passwordData[i]){
            window.location.href='news.html'
        }
        else{
            alert('incorrect password')
        }
    }
    else{
        alert(" A user with this email doesn't exist ")
    }
}

registerOption.addEventListener('click',()=>{
    loginSection.classList.replace('d-flex','d-none')
    registerSection.classList.replace('d-none','d-flex')
})
backButton.addEventListener('click',()=>{
    loginSection.classList.replace('d-none','d-flex')
    registerSection.classList.replace('d-flex','d-none')
})
 
submit.addEventListener('click',register);
loginBtn.addEventListener('click',login)
