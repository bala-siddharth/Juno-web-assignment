
// signup form
// Data object to store form field values
const formData={
    email:"",
    password:"",
    phoneno:"",
    check:"",
    displayName:"",
};
const MIN_PASSWORD_LENGTH = 8;
const MAX_PASSWORD_LENGTH = 12;
const emailPattern = /^[A-Za-z0-9._%+-]+@gmail.com$/;




// Function to handle input field changes
function addChangeEventListenerForSignup(inputElement){
    const errorSignupId=inputElement.getAttribute("data-error");
    const formDataKey=inputElement.getAttribute("data-key");
    const signupErrorElement=document.getElementById(errorSignupId);

    // Validate the specific input field based on its key
    function handleInputChange(event){
        const value=event.target.value;
        const isEmpty = value === "";
        switch (formDataKey) {
            case "email":
                const isValidEmail = emailPattern.test(value);
                signupErrorElement.textContent = isEmpty ? "Please enter a valid email address" : isValidEmail ? "" : "Please enter a valid email address (e.g., username@gmail.com)";
                break;
            case "password":
                const isInvalidLength = value.length < MIN_PASSWORD_LENGTH || value.length > MAX_PASSWORD_LENGTH;
                signupErrorElement.textContent = isEmpty ? "Please enter a valid password" : isInvalidLength ? `Password must be between ${MIN_PASSWORD_LENGTH} and ${MAX_PASSWORD_LENGTH} characters` : "";
                
                inputElement.classList.toggle("change-password-input-form-box", !isEmpty && isInvalidLength);
                inputElement.classList.toggle("input-signup-form-box", !isEmpty && !isInvalidLength);
                break;
            case "phoneno":
                const isInvalidPhoneNo = value.length !== 10;
                signupErrorElement.textContent = isEmpty ? "Please enter a valid mobile number" : isInvalidPhoneNo ? "Mobile number must be exactly 10 digits" : "";
                break;
            case "check":
                if (event.target.checked) {
                    signupErrorElement.textContent = "";
                    formData[formDataKey] = 'on';
                } else {
                    signupErrorElement.textContent = "Please accept the terms.";
                    formData[formDataKey] = ''; 
                }
                break;
            case "default":
                break;
        }

        // Update the formData object
        formData[formDataKey]=value;
        // Toggle the class to indicate if the field is empty
        inputElement.classList.toggle("change-signup-form-box", isEmpty);
    }
    inputElement.addEventListener("input", handleInputChange);
    inputElement.addEventListener("blur", handleInputChange);
}
// Get input elements with data attributes for error handling and attach event listeners
const signupInputElementsWithAttributes=document.querySelectorAll(`[data-error][data-key]`);
signupInputElementsWithAttributes.forEach((inputElement)=>{
    addChangeEventListenerForSignup(inputElement);
})




// password strength checker
const pswrdCont1=document.querySelectorAll('.each-check-content');
let progressLen=0;
pswrdCont1.forEach((value,index)=>{
    const checkImageE1=value.querySelector('.check-img')
    const checkContentE1=value.querySelector('.check-content')
    const passwordfield=document.getElementById("passwordfield")
    let conditionSatisfied = false;

    passwordfield.addEventListener("keyup", (event) => {
        const updatedValue = event.target.value;
            let isValid = false;
            switch (index){
                case 0:
                    isValid = updatedValue.length >= 8 && updatedValue.length <= 12;
                    break;
                case 1:
                    const hasUppercase = /[A-Z]/.test(updatedValue);
                    const hasLowercase = /[a-z]/.test(updatedValue);
                    isValid = hasUppercase && hasLowercase;
                    break;
                case 2:
                    isValid = /[0-9]/.test(updatedValue);
                    break;
                case 3:
                    isValid= /[!@#$%^&*(),.?":{}|<>]/.test(updatedValue);
                    break;
                default:
                    clearValidationClasses();
                    break;
            }
            toggleValidationClass(isValid);
            
            function updateProgressBar() {
                const processPasswordPercent = document.querySelector('.process-password-dector-percent');
                processPasswordPercent.style.width = progressLen + '%';
            }
            
            if (!conditionSatisfied && isValid) {
                progressLen = Math.min(progressLen + 25, 100);
                conditionSatisfied = true;
                updateProgressBar();
            } else if (conditionSatisfied && !isValid) {
                progressLen = Math.max(progressLen - 25, 0);
                conditionSatisfied = false;
                updateProgressBar();
            }

            function toggleValidationClass(isValid) {
                checkContentE1.classList.toggle("success-check-content", isValid);
                checkContentE1.classList.toggle("error-check-content", !isValid);
                checkImageE1.classList.toggle("success-check-img", isValid);
                checkImageE1.classList.toggle("error-check-img", !isValid);
            }
            
            function clearValidationClasses() {
                checkContentE1.classList.remove("success-check-content", "error-check-content");
                checkImageE1.classList.remove("success-check-img", "error-check-img");
                checkContentE1.classList.add("check-content");
                checkImageE1.classList.add("check-img");
            }
    });
})




// function to show and hide the password strength container
const passwordInputE1 = document.getElementById("passwordfield");
const passwordChecker = document.querySelector(".password-checker");
const showPasswordChecker = () => {
    passwordChecker.style.display = "block";
};

const hidePasswordChecker = () => {
    passwordChecker.style.display = "none";
};
passwordInputE1.addEventListener("focus", showPasswordChecker);
passwordInputE1.addEventListener("blur", hidePasswordChecker);




// to toggle password visibility
const togglePasswordVisibility = () => {
    const passwordInputE1 = document.getElementById("passwordfield");
    const eyeChange = document.getElementById("eyeChange");
    const eyeOpen = passwordInputE1.type === "text";
  
    passwordInputE1.type = eyeOpen ? "password" : "text";
    eyeChange.classList.toggle("fa-eye", !eyeOpen);
    eyeChange.classList.toggle("fa-eye-slash", eyeOpen);
}
const eyeChange=document.getElementById("eyeChange");
eyeChange.addEventListener("click",()=>{
    togglePasswordVisibility();
})




const signupFieldToValidate=[
    { element: document.getElementById("emailfield"), errorElement: document.getElementById("emailErrorMsg"), fieldkey:"email"},
    { element: document.getElementById("passwordfield"), errorElement: document.getElementById("passwordErrorMsg"), fieldkey:"password"},
    { element: document.getElementById("phoneNofield"), errorElement: document.getElementById("phoneErrorMsg"), fieldkey:"phoneno"},
    { element: document.getElementById("checkboxId"), errorElement: document.getElementById("checkErrorMsg"), fieldkey:"check"},
]




// Validate field on submit if empty
const validateField = (element, errorElement, fieldKey) => {
    const value = element.value;
    const isEmpty = value === "";
    switch (fieldKey) {
        case "email":
            const isValidEmail = emailPattern.test(value);
            errorElement.textContent = isEmpty ? "Please enter a valid email address" : isValidEmail ? "" : "Please enter a valid email address (e.g., username@gmail.com)";
            break;
        case "password":
            const isInvalidLength = value.length < MIN_PASSWORD_LENGTH || value.length > MAX_PASSWORD_LENGTH;
            errorElement.textContent = isEmpty ? "Please enter a valid password" : isInvalidLength ? `Password must be between ${MIN_PASSWORD_LENGTH} and ${MAX_PASSWORD_LENGTH} characters` : "";
            
            element.classList.toggle("change-password-input-form-box", !isEmpty && isInvalidLength);
            element.classList.toggle("input-signup-form-box", !isEmpty && !isInvalidLength);
            break;
        case "phoneno":
            const isInvalidPhoneNo = value.length !== 10;
            errorElement.textContent = isEmpty ? "Please enter a valid mobile number" : isInvalidPhoneNo ? "Mobile number must be exactly 10 digits" : "";
            break;
        case "check":
            errorElement.textContent = !element.checked ? "Please accept the terms." : "";
            break;
        case "default":
            break;
    }         
    element.classList.toggle("change-signup-form-box", isEmpty);
};



// Function to validate the entire form
const validateFormData = () =>{
    signupFieldToValidate.forEach((field)=> validateField(field.element,field.errorElement,field.fieldkey));

    const emailValid=formData.email;
    const passwordValue = formData.password;
    const phoneNoCheck=formData.phoneno;
    const isemailValid=emailPattern.test(emailValid);
    const isPasswordValid = passwordValue.length >= 8 && passwordValue.length <= 12 && /[A-Z]/.test(passwordValue) && /[a-z]/.test(passwordValue) && /[0-9]/.test(passwordValue) && /[!@#$%^&*(),.?":{}|<>]/.test(passwordValue); 
    const isPhoneNoValid = phoneNoCheck.length === 10;

    const passwordcheckBox=document.getElementById("passwordfield");
    const errorPwrd=document.getElementById("passwordErrorMsg");
    if (isPasswordValid){
        passwordcheckBox.classList.remove("change-password-input-form-box");
    }else{
        passwordcheckBox.classList.add("change-password-input-form-box");
        const passwordChecker = document.querySelector(".password-checker");
        passwordChecker.style.display = "block";
        errorPwrd.textContent="That's an invalid password.";
    }

    let loader;
    // Check if all conditions are met for successful validation
    if (Object.values(formData) && checkboxId.checked && isPhoneNoValid && isPasswordValid && isemailValid){
        submitFormData(formData);

        let storedFormDataArray = JSON.parse(localStorage.getItem('formDataArray')) || [];
        // Add the current formData to the array
        storedFormDataArray.push(formData);
        // Store the updated array back in localStorage
        localStorage.setItem('formDataArray', JSON.stringify(storedFormDataArray));
        
        console.log(storedFormDataArray);
        const spinner = document.getElementById("spinner");
        const signUpFormContainer = document.getElementById("signUpFormContainer");
        spinner.style.display = "block";
        signUpFormContainer.style.display = "none";

        class PrimaryLoader {
            NUMBER_OF_SQUARES = 7;
            FRAME_INTERVAL_MS = 800;
            STATES = [
              [
                { left: 30, top: 6, opacity: 0.6 },
                { left: 18, top: 18 },
                { left: 42, top: 18 },
                { left: 6, top: 30 },
                { left: 18, top: 42 },
                { left: 12, top: 12, opacity: 0 },
                { left: 42, top: 54 }
              ],
              [
                { left: 24, top: 12 },
                { left: 0, top: 24 },
                { left: 48, top: 24 },
                { left: 12, top: 36 },
                { left: 12, top: 48, opacity: 0.6 },
                { left: 12, top: 12, opacity: 0 },
                { left: 36, top: 38 }
              ],
              [
                { left: 24, top: 24 },
                { left: 0, top: 24, opacity: 0.6 },
                { left: 48, top: 12, opacity: 1 },
                { left: 0, top: 36 },
                { left: 12, top: 60, opacity: 0.6 },
                { left: 12, top: 0 },
                { left: 24, top: 38 }
              ]
            ];
          
            constructor() {
              this.currentState = 0;
          
              this.mount();
            }
          
            mount() {
              this.squares = [];
              const surface = document.querySelector(".loader__surface");
              
              for (let i = 0; i < this.NUMBER_OF_SQUARES; i++) {
                const square = document.createElement("div");
                square.className = "loader__square";
                square.style.opacity = 1;
                surface.appendChild(square);
                this.squares.push(square);
              }
            }      
            start() {
              this.intervalId = setInterval(() => {
                this.currentState = (this.currentState + 1) % this.STATES.length;
                this.render();
              }, this.FRAME_INTERVAL_MS);
            }
          
            render() {
              const state = this.STATES[this.currentState];
          
              for (let i = 0; i < state.length; i++) {
                const square = this.squares[i];
                square.style.transform = `translate(${state[i].left}px, ${state[i].top}px)`;
                square.style.opacity = state[i].opacity ?? 1;
              }
            }
        }
        loader = new PrimaryLoader();
        loader.start();
        
        // Submit the form data to the API (simulated with a setTimeout for demonstration)
        setTimeout(function() {
            // Hide the spinner after the data is processed
            spinner.style.display = "none";

            // Hide the signUpFormContainer and show the otpContainer
            const signUpFormContainer = document.getElementById("signUpFormContainer");
            const otpContainer = document.getElementById("otpContainer");
            signUpFormContainer.style.display = "none";
            otpContainer.style.display = "block";
            window.location.href = "../public/usersignup.html#otpContainer";
            // Display the user's phone number in the otpContainer
            const userMail = document.getElementById("userMail");
            userMail.textContent = formData.email;

            function sendVerificationEmail() {
                const emailE1=document.getElementById("emailfield");
                const otpDigitNumber = Math.floor(Math.random() * (9999999- 1000000 + 1)) + 1000000;
                const otpfield=document.getElementById("otpfield");
                const emailImg="images/mailImg.png"
                let emailbody=`<html>
                                    <head>
                                        <style>
                                            body {
                                                font-family: Arial, sans-serif;
                                                background-color: #f4f4f4;
                                                padding: 20px;
                                                text-align: center;
                                            }
                                            .container-fluid {
                                                background-color: #c6cbd4;
                                                padding: 20px;
                                                border: 1px solid #c6cbd4;
                                                border-radius: 5px;
                                            }
                                            .mail-templte-cont{
                                                display: flex;
                                                flex-direction: row;
                                                justify-content: center;
                                                align-items: center;
                                            }
                                            .mail-templte{
                                                background-color: #fff;
                                                border: solid 1px #fafafa;
                                                width: 100%;
                                                padding: 0px 20px;
                                            }
                                            .mail-templte h1{
                                                text-align: left;
                                                font-weight: lighter;
                                                color: #62656b;
                                            }
                                            .mail-templte h5{
                                                text-align: left;
                                                font-size:30px;
                                            }
                                            .otp {
                                                font-size: 24px;
                                            }
                                            .img-temp{
                                                width: 100%;
                                            }
                                        </style>
                                    </head>
                                    <body>
                                        <div class="container-fluid">
                                            <div class="row">
                                                <div class="col-12">
                                                    <div class="mail-templte-cont">
                                                        <div class="mail-templte">
                                                            <h1>JUNO</h1>
                                                            <h5>One-Time-Password:${otpDigitNumber}</h5>
                                                            <img src="${emailImg}" alt="" class="img-temp">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </body>
                                </html>`;

                Email.send({
                    SecureToken : "3312ba01-feeb-4dc5-9fd4-1942c544b97e",
                    To : emailE1.value,
                    From : "balasiddharth198@gmail.com",
                    Subject : "Juno corporation",
                    Body : emailbody
                }).then(
                message => {
                    if(message === "OK"){
                        alert("OTP sent to your email "+emailE1.value);
            
                        const verifyOtp=document.getElementById("verifyOtp");
                        verifyOtp.addEventListener('click',()=>{
                            if(parseInt(otpfield.value) === otpDigitNumber){
                                alert("Email address verified...");
                                const spinner1 = document.getElementById("spinner1");
                                const otpFormContainer = document.getElementById("otpContainer");
                                spinner1.style.display = "block";
                                otpFormContainer.style.display = "none";

                                class PrimaryLoader1 {
                                    NUMBER_OF_SQUARES = 7;
                                    FRAME_INTERVAL_MS = 800;
                                    STATES = [
                                      [
                                        { left: 30, top: 6, opacity: 0.6 },
                                        { left: 18, top: 18 },
                                        { left: 42, top: 18 },
                                        { left: 6, top: 30 },
                                        { left: 18, top: 42 },
                                        { left: 12, top: 12, opacity: 0 },
                                        { left: 42, top: 54 }
                                      ],
                                      [
                                        { left: 24, top: 12 },
                                        { left: 0, top: 24 },
                                        { left: 48, top: 24 },
                                        { left: 12, top: 36 },
                                        { left: 12, top: 48, opacity: 0.6 },
                                        { left: 12, top: 12, opacity: 0 },
                                        { left: 36, top: 38 }
                                      ],
                                      [
                                        { left: 24, top: 24 },
                                        { left: 0, top: 24, opacity: 0.6 },
                                        { left: 48, top: 12, opacity: 1 },
                                        { left: 0, top: 36 },
                                        { left: 12, top: 60, opacity: 0.6 },
                                        { left: 12, top: 0 },
                                        { left: 24, top: 38 }
                                      ]
                                    ];
                                  
                                    constructor() {
                                      this.currentState = 0;
                                  
                                      this.mount();
                                    }
                                  
                                    mount() {
                                      this.squares = [];
                                      const surface = document.querySelector(".loader__surface1");
                                      
                                      for (let i = 0; i < this.NUMBER_OF_SQUARES; i++) {
                                        const square = document.createElement("div");
                                        square.className = "loader__square";
                                        square.style.opacity = 1;
                                        surface.appendChild(square);
                                        this.squares.push(square);
                                      }
                                    }      
                                    start() {
                                      this.intervalId = setInterval(() => {
                                        this.currentState = (this.currentState + 1) % this.STATES.length;
                                        this.render();
                                      }, this.FRAME_INTERVAL_MS);
                                    }
                                  
                                    render() {
                                      const state = this.STATES[this.currentState];
                                  
                                      for (let i = 0; i < state.length; i++) {
                                        const square = this.squares[i];
                                        square.style.transform = `translate(${state[i].left}px, ${state[i].top}px)`;
                                        square.style.opacity = state[i].opacity ?? 1;
                                      }
                                    }
                                }
                                loader = new PrimaryLoader1();
                                loader.start();

                                const redirectDate = new Date();
                                setTimeout(function() {
                                    spinner1.style.display = "none";

                                    const currentTime = new Date();
                                    const timeDiff = Math.floor((currentTime - redirectDate) / (1000 * 60 * 60 * 24));
                                    localStorage.setItem('userDaysElapsed', timeDiff);

                                    window.location.href = "../public/usersignin.html";
                                },4000);
                            }
                            else{
                                alert("Invalid OTP");
                            }
                        })
                    }
                }
                );
            }
            sendVerificationEmail();
        }, 4000);
    }
}




// Function to submit the form data to an API
const submitFormData = (formData) =>{
    const url="https://jsonplaceholder.typicode.com/posts";
    const options={
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Accept:"application/json",
            Authorization:"Bearer 00f3f8fde06120db02b587cc372c3d85510896e899b45774068bb750462acd9f"
        },
        body:JSON.stringify(formData)
    };
    fetch(url,options)
        .then(function(response){
            return response.json();
        })
        .then(function(jsonData){
            console.log(jsonData);
        });
}



// Event listener for "Sign Up" button
const getStartedButton=document.getElementById("getStartedButton");
getStartedButton.addEventListener("click",(event)=>{
    event.preventDefault();
    validateFormData();
});