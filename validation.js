const form = document.getElementById('form');
const result = document.getElementById('result');
const fullname = document.getElementById('fullname');
const mobilenumber = document.getElementById('mobilenumber');
const email = document.getElementById('email');
const subject = document.getElementById('subject');
const subjectline = document.getElementById('subjectline');
form.addEventListener('submit', e=>{
    e.preventDefault();
    

validateInputs();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');
    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
    element.classList.add('border-danger')
    element.classList.remove('border-success')
    element.classList.remove('border-dark')
    };

const setSuccess = element => {
        const inputControl = element.parentElement;
        const errorDisplay = inputControl.querySelector('.error');
        errorDisplay.innerText = '';
        inputControl.classList.add('success');
        inputControl.classList.remove('error');
        element.classList.add('border-success')
        element.classList.remove('border-danger')
        element.classList.remove('border-dark')
};

const isValidEmail = email => {
    const re =/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(String (email).toLowerCase());
    };

const validateInputs = () => {
const  fullnameValue = fullname.value.trim();
const mobilenumberValue = mobilenumber.value.trim();
const emailValue = email.value.trim();
const subjectValue = subject.value.trim();
let fullnameCheck = false ;
let mobilenumberCheck = false ;
let emailCheck = false ;
let subjectCheck = false ;

if(fullnameValue===''){
    setError(fullname,'  ***Fullname is required');
    fullnameCheck = false ;
}
else if (fullnameValue.length < 3){
    setError(fullname, '***name is too short');
    fullnameCheck = false ;
}
else {
    setSuccess(fullname);
    fullnameCheck = true ;
    }
     
    if(email === '') {
        setError(email, '  ***Email is required');
        emailCheck = false ;
        } 
        else if (!isValidEmail (emailValue)) {
        setError(email, '  ***Provide a valid email address');
        emailCheck = false ;
        } 
        else {
        setSuccess(email);
        emailCheck = true ;
        }
        if(mobilenumberValue === '') {
            setError(mobilenumber, '***mobile number is required');
            mobilenumberCheck = false ;
            } 
            else if (mobilenumberValue.length < 10 ) {
            setError(mobilenumber, '***please enter 10-digits number');
            mobilenumberCheck = false ;
            } 
            else if (mobilenumberValue.length > 10 ) {
            setError(mobilenumber, '***please enter 10-digits number');
            mobilenumberCheck = false ;
            } 
            else {
            setSuccess (mobilenumber);
            mobilenumberCheck = true ;
            }
         if(subjectValue ===''){
                setError(subject, '***subject is required');
                subjectCheck = false ;
            }
            else{
                setSuccess(subject);
                subjectCheck = true ;
            }
           
        if(subjectCheck === true && mobilenumberCheck === true && fullnameCheck === true && emailCheck === true ){
     
            subjectline.setAttribute("value",`${fullnameValue} Wanted to connect with us through HealCanada website`);
            
            const formData = new FormData(form);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);
            
            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
                    document.getElementById("statuslogo").innerHTML= `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="green" class="bi bi-check-circle-fill" viewBox="0 0 16 16" > <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/> </svg> `
                    document.getElementById("popupstatus").innerHTML="FORM SUBMITTED SUCCESSFULLY";
                    document.getElementById("popupstatus").classList.add("text-success")
                    document.getElementById("popup").click()

                    

                } else {
                    console.log(response);
                    document.getElementById("statuslogo").innerHTML= `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="red" class="bi bi-x-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/></svg>`
                    document.getElementById("popupstatus").innerHTML="something went wrong"
                    document.getElementById("popupstatus").classList.add("text-danger")
                    document.getElementById("popup").click()
                
                }
            })
            .catch(error => {
                console.log(error);
                document.getElementById("statuslogo").innerHTML= `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="red" class="bi bi-x-circle-fill" viewBox="0 0 16 16"><path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/></svg>`
                document.getElementById("popupstatus").innerHTML="something went wrong"
                document.getElementById("popupstatus").classList.add("text-danger")
                    document.getElementById("popup").click()
                    
               
            })
            
        }
};


 