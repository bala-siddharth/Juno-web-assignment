
// Monitoring pending data
const userData = [
    {   headcont:[
            "User","Risk level","Trigger reason","in queue For","Date added on","Previously reviewed"
        ],
        userMail: [
            { name: "Sam Altman", email: "samaltman123@gmail.com" },
            { name: "Sameer Choubey", email: "sameerchoubey123@gmail.com" },
            { name: "Adarsh Panikkar", email: "adarsh@onjuno.com" },
            { name: "Pratik Shetty", email: "pratik3@gmail.com" },
            { name: "Elon Musk", email: "elon@twitterceo.com" },
            { name: "Trina Kundu", email: "trina@onjuno.com" }
        ],
        RiskLevel:[
            "Medium","High","Low","High","Low","Low"
        ],
        TriggerReason:[
            "IP Change","FIFO","IP Change","FIFO","FIFO","FIFO"
        ],
        inqueueFor:[
            "4 days","4 days","5 days","5 days","5 days","5 days"
        ],
        dateAddedOn:[
            "12 Oct, 2023","12 Oct, 2023","12 Oct, 2023","12 Oct, 2023","12 Oct, 2023","12 Oct, 2023"
        ],
        PreviouslyReviewed:[
            {type:"Yes",Date:"23 Aug,2023"},
            {type:"No",Date:""},
            {type:"No",Date:""},
            {type:"Yes",Date:"12 Sep,2023"},
            {type:"Yes",Date:"11 Nov,2023"},
            {type:"Yes",Date:"22 Nov,2023"}
        ]

    }
];
// Storing Monitoring pending data in localStorage
localStorage.setItem('userData', JSON.stringify(userData));



// Monitoring completed data
const userDataCompleted = [
    {   headcont:[
            "User","Risk level","Trigger reason","in queue For","Date added on","Action taken by"
        ],
        userMail: [
            { name: "Sam Altman", email: "samaltman123@gmail.com" },
            { name: "Sameer Choubey", email: "sameerchoubey123@gmail.com" },
            { name: "Adarsh Panikkar", email: "adarsh@onjuno.com" },
            { name: "Pratik Shetty", email: "pratik3@gmail.com" },
            { name: "Elon Musk", email: "elon@twitterceo.com" },
            { name: "Trina Kundu", email: "trina@onjuno.com" }
        ],
        RiskLevel:[
            "Medium","High","Low","High","Low","Low"
        ],
        TriggerReason:[
            "Flagged","Closed","Cleared","SOI requested","Flagged","Closed"
        ],
        inqueueFor:[
            "14 days","14 days","15 days","15 days","15 days","15 days"
        ],
        dateAddedOn:[
            "12 Oct, 2023","12 Oct, 2023","12 Oct, 2023","12 Oct, 2023","12 Oct, 2023","12 Oct, 2023"
        ],
        ActionTakenBy: [
            { name: "Neil ", email: "neil@onjuno.com" },
            { name: "Pratik", email: "pratik@onjuno.com" },
            { name: "Prashanth", email: "prashanth@onjuno.com" },
            { name: "Rasleen Kaur", email: "rasleen@onjuno.com" },
            { name: "Pratik Shetty", email: "pratik@onjuno.com" },
            { name: "Varun Deshpande", email: "varun@onjuno.com" }
        ]
    }
];
// Storing Monitoring completed data in localStorage
localStorage.setItem('userDataCompleted', JSON.stringify(userDataCompleted));