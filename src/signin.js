
// Retrieve user sign-up data from local storage(signup.js)
const storedFormDataArray = JSON.parse(localStorage.getItem('formDataArray'));
const updatedFormDataArray = JSON.parse(localStorage.getItem('formDataArray'));


if (updatedFormDataArray) {
    updatedFormDataArray.forEach((storedFormData) => {
        console.log(storedFormData);

        const signinEmailInput=document.getElementById("signinEmailInput");
        const signinpasswordInput=document.getElementById("signinpasswordInput");
        const passwordSiginBox=document.getElementById("passwordSiginBox");
        const signinErrorMsg=document.getElementById("signinEmailErrorMsg");
        const siginPasswordErrorMsg=document.getElementById("siginPasswordErrorMsg");
        
        // Function to validate the sign-in based on entered email or phone number registered during sign-up
        const validateSignin=()=>{
            const enteredValue = signinEmailInput.value;
            // Find a matching user in the storedFormDataArray based on either email or phone number
            if (enteredValue.match(storedFormData.email) || enteredValue.match(storedFormData.phoneno)) {
                passwordSiginBox.style.display = "block";
                signinErrorMsg.style.display="none";
            }else{
                signinErrorMsg.innerHTML="email doesnot exist";
            }
        }
        signinEmailInput.addEventListener("change",validateSignin);
        
        // Function to validate and redirect to the home page
        const validateToHome=()=>{
            const enteredValue = signinEmailInput.value;
            const passwordEnteredValue=signinpasswordInput.value;

            if (enteredValue.match(storedFormData.email) || enteredValue.match(storedFormData.phoneno)) {
                // Check if the entered password matches the stored password
                if (passwordEnteredValue===storedFormData.password) {
                    siginPasswordErrorMsg.textContent="";

                    const spinner1 = document.getElementById("spinner1");
                    const siginContainer = document.getElementById("siginContainer");
                    const bottomContainerSigin=document.getElementById("bottomContainerSigin");
                    
                    spinner1.style.display = "block";
                    siginContainer.style.display = "none";
                    bottomContainerSigin.style.display="none";

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
                    const loader = new PrimaryLoader1();
                    loader.start();
                    
                    setTimeout(function() {
                        const userEmail = storedFormData.email;
                        // Store the user's email in local storage which he signin 
                        localStorage.setItem("userSigninEmail", userEmail);

                        spinner1.style.display = "none";
                        window.location.href = `../public/dashboard.html?hideNav=true&userEmail=${userEmail}`;
                    },4000);
                }else {
                    siginPasswordErrorMsg.textContent="Incorrect password";
                }
            }else {
                signinErrorMsg.innerHTML="email doesnot exist";
            }
        }
        signinpasswordInput.addEventListener("keyup", () => {
            if (signinpasswordInput.value.trim() === "") {
                siginPasswordErrorMsg.textContent = "Password is required";
            } else {
                siginPasswordErrorMsg.textContent="";
            }
        });
        

        const signinButton=document.getElementById("signinButton");
        signinButton.addEventListener("click",(event)=>{
            event.preventDefault();
            validateSignin()
            validateToHome()
        })
    });
}




// to toggle password visibility
const togglePasswordVisibility = () => {
    const passwordInputE1 = document.getElementById("signinpasswordInput");
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