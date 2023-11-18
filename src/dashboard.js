
// get userprofile in side panel
window.addEventListener("load", function () {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has("userEmail")) {
         // Get the value of the "userEmail" parameter from the URL.
        const userEmail = urlParams.get("userEmail");

        const railUserName=document.getElementById("railUserName");
        railUserName.textContent=userEmail.replace("@gmail.com","");

        const railUserEmail =this.document.getElementById("railUserEmail");
        railUserEmail.textContent=userEmail
    }
});


// sidepanel
const listAccountElements = document.querySelectorAll(".list-account");
listAccountElements[2].classList.add("change-list-account");

document.addEventListener("DOMContentLoaded", function (){
    listAccountElements.forEach(function (listAccount) {
        listAccount.addEventListener("click", function () {
            listAccountElements.forEach(function (element) {
                element.classList.remove("change-list-account");
            });
            listAccount.classList.add("change-list-account");

            const detailId = listAccount.getAttribute("data-detail-id");
            // Hide all detailed list items
            const detailedListItems = document.querySelectorAll(".detailed-list-account");
            detailedListItems.forEach(function (item) {
                item.style.display = "none";
            });
            // Show the relevant detailed list item based on the clicked list item
            const relevantDetailItem = document.getElementById(detailId);
            if (relevantDetailItem) {
                relevantDetailItem.style.display = "block";
            }
        }); 
    });
});


// Monitoring pending dashboard
const storedData = JSON.parse(localStorage.getItem('userData'));
const listContainer = document.getElementById('listContainer');

if (storedData) {
    storedData.forEach((data)=>{
        const headcontData = data.headcont;
        headcontData.forEach((head, index) => {
            const ulElement = document.createElement("ul");
            ulElement.className = `head${index + 1}`;

            const headLiE1=document.createElement("li");
            headLiE1.classList.add("all-head");
            headLiE1.textContent=head;
            if(index===0){
                headLiE1.classList.add("all-head1");
            }else if(index===5){
                headLiE1.classList.add("all-head5");
            }
            ulElement.appendChild(headLiE1)
            switch (head) {
                case "User":
                    data.userMail.forEach((userMail,bfindex) => {
                        const userLi = document.createElement("li");
                        userLi.className = `minihead${bfindex+1}`;
                        
                        const l1cont=document.createElement("div");
                        l1cont.classList.add("d-flex","flex-row","align-items-center","justify-content-between");
                        userLi.appendChild(l1cont);

                        const subl1cont=document.createElement("div");
                        subl1cont.classList.add("d-flex","flex-column");
                        l1cont.appendChild(subl1cont);

                        const nameSpan = document.createElement("span");
                        nameSpan.textContent = userMail.name;
                        nameSpan.classList.add("user-name-li")
                        subl1cont.appendChild(nameSpan);

                        const emailSpan = document.createElement("span");
                        emailSpan.textContent = userMail.email;
                        subl1cont.appendChild(emailSpan);

                        const shareIcon=document.createElement("i");
                        shareIcon.classList.add("fa-regular","fa-share-from-square","share-icon");
                        l1cont.appendChild(shareIcon);

                        ulElement.appendChild(userLi);
                    });
                    break;
                case "Risk level":
                    data.RiskLevel.forEach((riskLevel,bfindex) => {
                        const riskLi = document.createElement("li");
                        riskLi.className = `minihead${bfindex+1}`;;

                        const dotIcon=document.createElement("i");
                        dotIcon.classList.add("fa-solid","fa-circle","fa-2xs");
                        riskLi.appendChild(dotIcon);

                        const riskSpan = document.createElement("span");
                        riskSpan.classList.add("ml-1");
                        riskSpan.textContent =riskLevel;
                        riskLi.appendChild(riskSpan);

                        ulElement.appendChild(riskLi);
                    });
                    break;
                case "Trigger reason":
                    data.TriggerReason.forEach((triggerReason, bfindex) => {
                        const triggerLi = document.createElement("li");
                        triggerLi.className = `minihead${bfindex + 1}`;
                        triggerLi.textContent = triggerReason;
                        ulElement.appendChild(triggerLi);
                    });
                    break;
                case "in queue For":
                    data.inqueueFor.forEach((inqueueFor, bfindex) => {
                        const inqueueLi = document.createElement("li");
                        inqueueLi.className = `minihead${bfindex + 1}`;
                        inqueueLi.textContent = inqueueFor;
                        ulElement.appendChild(inqueueLi);
                    });
                    break;
                case "Date added on":
                    data.dateAddedOn.forEach((dateAddedOn, bfindex) => {
                        const dateLi = document.createElement("li");
                        dateLi.className = `minihead${bfindex + 1}`;
                        dateLi.textContent = dateAddedOn;
                        ulElement.appendChild(dateLi);
                    });
                    break;
                case "Previously reviewed":
                    data.PreviouslyReviewed.forEach((previouslyReviewed, bfindex) => {
                        const reviewedLi = document.createElement("li");
                        reviewedLi.className = `minihead${bfindex + 1}`;

                        const nameSpan = document.createElement("span");
                        nameSpan.textContent = previouslyReviewed.type;
                        nameSpan.classList.add("user-name-li")
                        reviewedLi.appendChild(nameSpan);

                        reviewedLi.appendChild(document.createElement("br"));

                        const emailSpan = document.createElement("span");
                        emailSpan.textContent = previouslyReviewed.Date;
                        emailSpan.classList.add("user-date-li");
                        reviewedLi.appendChild(emailSpan);
                        ulElement.appendChild(reviewedLi);
                    });
                    break;
                default:
            }
            listContainer.appendChild(ulElement);
            
            // // search, filtering, and dynamic data adjustments
            function toFindEachUserDetail() {
                const allMatchElements = document.querySelectorAll(`.list-container .minihead${index+1}`);
                allMatchElements.forEach(element => {
                    element.style.display = 'none';
                });

                const liElements = document.querySelectorAll(`.head1 .minihead${index+1}`);
                liElements.forEach((liElement) => {
                    const textContent = liElement.textContent.toLowerCase();
                    if (textContent.includes(searchInputVal.toLowerCase())) {
                        const miniheadClass = liElement.className;
                        const liMatchE1 = document.querySelectorAll(`.list-container .${miniheadClass}`);
                        liMatchE1.forEach((matchElement)=>{
                            matchElement.style.display="block";
                        })
                    }
                });
            }
            function onDetails(event) {
              searchInputVal = event.target.value;
              toFindEachUserDetail();
            }
            const userSearchInput=document.getElementById("searchField")
            userSearchInput.addEventListener("keyup", onDetails);

        });
    });
}


// Monitoring completed dashboard
const storedDataCompleted = JSON.parse(localStorage.getItem('userDataCompleted'));
const listContainerComplted = document.getElementById('listContainerComplted');

if (storedDataCompleted) {
    storedDataCompleted.forEach((data1)=>{
        const headcontData = data1.headcont;
        headcontData.forEach((head, index) => {
            const ulElement = document.createElement("ul");
            ulElement.className = `head${index + 1}`;

            const headLiE1=document.createElement("li");
            headLiE1.classList.add("all-head");
            headLiE1.textContent=head;
            if(index===0){
                headLiE1.classList.add("all-head1");
            }else if(index===5){
                headLiE1.classList.add("all-head5");
            }
            ulElement.appendChild(headLiE1)
            switch (head) {
                case "User":
                    data1.userMail.forEach((userMail,bfindex) => {
                        const userLi = document.createElement("li");
                        userLi.className = `minihead${bfindex+1}`;
                        
                        const l1cont=document.createElement("div");
                        l1cont.classList.add("d-flex","flex-row","align-items-center","justify-content-between");
                        userLi.appendChild(l1cont);

                        const subl1cont=document.createElement("div");
                        subl1cont.classList.add("d-flex","flex-column");
                        l1cont.appendChild(subl1cont);

                        const nameSpan = document.createElement("span");
                        nameSpan.textContent = userMail.name;
                        nameSpan.classList.add("user-name-li")
                        subl1cont.appendChild(nameSpan);

                        const emailSpan = document.createElement("span");
                        emailSpan.textContent = userMail.email;
                        subl1cont.appendChild(emailSpan);

                        const shareIcon=document.createElement("i");
                        shareIcon.classList.add("fa-regular","fa-share-from-square","share-icon");
                        l1cont.appendChild(shareIcon);

                        ulElement.appendChild(userLi);
                    });
                    break;
                case "Risk level":
                    data1.RiskLevel.forEach((riskLevel,bfindex) => {
                        const riskLi = document.createElement("li");
                        riskLi.className = `minihead${bfindex+1}`;;

                        const dotIcon=document.createElement("i");
                        dotIcon.classList.add("fa-solid","fa-circle","fa-2xs");
                        riskLi.appendChild(dotIcon);

                        const riskSpan = document.createElement("span");
                        riskSpan.classList.add("ml-1");
                        riskSpan.textContent =riskLevel;
                        riskLi.appendChild(riskSpan);

                        ulElement.appendChild(riskLi);
                    });
                    break;
                case "Trigger reason":
                    data1.TriggerReason.forEach((triggerReason, bfindex) => {
                        const triggerLi = document.createElement("li");
                        triggerLi.className = `minihead${bfindex + 1}`;
                        triggerLi.textContent = triggerReason;
                        ulElement.appendChild(triggerLi);
                    });
                    break;
                case "in queue For":
                    data1.inqueueFor.forEach((inqueueFor, bfindex) => {
                        const inqueueLi = document.createElement("li");
                        inqueueLi.className = `minihead${bfindex + 1}`;
                        inqueueLi.textContent = inqueueFor;
                        ulElement.appendChild(inqueueLi);
                    });
                    break;
                case "Date added on":
                    data1.dateAddedOn.forEach((dateAddedOn, bfindex) => {
                        const dateLi = document.createElement("li");
                        dateLi.className = `minihead${bfindex + 1}`;
                        dateLi.textContent = dateAddedOn;
                        ulElement.appendChild(dateLi);
                    });
                    break;
                case "Action taken by":
                    data1.ActionTakenBy.forEach((ActionTakenBy, bfindex) => {
                        const actionLi = document.createElement("li");
                        actionLi.className = `minihead${bfindex + 1}`;

                        const subl1cont=document.createElement("div");
                        subl1cont.classList.add("d-flex","flex-column");
                        actionLi.appendChild(subl1cont);

                        const nameSpan = document.createElement("span");
                        nameSpan.textContent = ActionTakenBy.name;
                        nameSpan.classList.add("user-name-li")
                        subl1cont.appendChild(nameSpan);

                        const emailSpan = document.createElement("span");
                        emailSpan.textContent = ActionTakenBy.email;
                        subl1cont.appendChild(emailSpan);

                        ulElement.appendChild(actionLi);
                    });
                    break;
                default:
            }
            listContainerComplted.appendChild(ulElement);
            
            // search, filtering, and dynamic data adjustments
            function toFindEachUserDetail() {
                const allMatchElements = document.querySelectorAll(`.list-container-complted .minihead${index+1}`);
                allMatchElements.forEach(element => {
                    element.style.display = 'none';
                });

                const liElements = document.querySelectorAll(`.head1 .minihead${index+1}`);
                liElements.forEach((liElement) => {
                    const textContent = liElement.textContent.toLowerCase();
                    if (textContent.includes(searchInputVal.toLowerCase())) {
                        const miniheadClass = liElement.className;
                        const liMatchE1 = document.querySelectorAll(`.list-container-complted .${miniheadClass}`);
                        liMatchE1.forEach((matchElement)=>{
                            matchElement.style.display="block";
                        })
                    }
                });
            }
            function onDetails(event) {
              searchInputVal = event.target.value;
              toFindEachUserDetail();
            }
            const userSearchInput=document.getElementById("searchField")
            userSearchInput.addEventListener("keyup", onDetails);
        });
    });
}


// close button
const hideDisplayFeatAcc=document.getElementById("hideDisplayFeatAcc");
const backgroundFeatueBox=document.getElementById("backgroundFeatueBox");
const closeIcon=document.getElementById("closeIcon");
hideDisplayFeatAcc.addEventListener("click",(event)=>{
    event.preventDefault()
    backgroundFeatueBox.style.display="block";
})
closeIcon.addEventListener("click",(event)=>{
    event.preventDefault()
    backgroundFeatueBox.style.display="none";
})


// trigger button
const trigger=document.getElementById("trigger");
const triggerCont=document.getElementById("triggerCont");
const trigeerIcon=document.getElementById("trigeerIcon");
trigger.addEventListener("click",(event)=>{
    event.preventDefault();
    triggerCont.classList.toggle("display-trigger");
    trigeerIcon.classList.toggle("fa-chevron-down");
    trigeerIcon.classList.toggle("fa-chevron-up");
});



const pending=document.getElementById("pending");
const complted=document.getElementById("complted");
const frame20329=document.getElementById("frame20329");
const frame20330=document.getElementById("frame20330");

complted.addEventListener("click",function(){
    pending.classList.add("change-in-bg-line");
    complted.classList.add("change-in-bg-line-com");
    frame20329.style.display="none";
    frame20330.style.display="block";
});

pending.addEventListener("click",function(){
    pending.classList.remove("change-in-bg-line");
    complted.classList.remove("change-in-bg-line-com");
    frame20329.style.display="block";
    frame20330.style.display="none";
})