let paymentArray = [{
    paymentMonth: 0,
    paymentAmount: 0,
    principalPaid: 0,
    interestPaid: 0,
    totalIntPaid: 0,
    remainingBalance: 0
}];

function calculate() {
    let paymentArray = JSON.parse(localStorage.getItem("paymentArray")) || paymentArray;

    let obj = {};
    let amount = document.getElementById("amount").value;
    let term = document.getElementById("term").value;
    let rate = document.getElementById("interest").value;
    let principal = parseFloat(amount.value);
    let interest = parseFloat(rate.value) / 1200;
    let payments = parseFloat(term.value) * 12;

    for (let i = 0; i < paymentArray.length; i++) {

        

    }

    //compute monthly payment amt



};

// function calculateInterest(){
// let intRate = interest / 12000;

// };

// function setTermMonths(term) {
//     let loanTermMonths = term * 12;
// };


// function getPayments() {
//     let totalInterest = 0;
//     let prevBalance = balance;
//     let payment = calcPayment(balance, term, rate)
//     let remainingBalance = balance - prevBalance;

//     for (let i = 1; i<= term; i++) {
//         let interest = calcInterest(prevBalance, rate);
//         let principal = calcPrincipal(payment, interest);

//         totalInterest += interest;
//         remainingBalance -= principal;
//         prevBalance = remainingBalance;
//     }
// };

// function buildPaymentSchedule() {
//     let balance = parseInt(document.getElementById("balance").value);
//     let term = parseInt(document.getElementById("term").value) * 12;
//     let rate = document.getElementById("rate").value
// };

//fill output fields at 2 decimal places
function displayData(paymentArray) {
    const template = document.getElementById("dataTemplate");
    const body = document.getElementById("tableBody");

    body.innerHTML = "";
    for (let i = 1; i < term; 1++) {
        const tableRow = document.importNode(template.content, true);

        tableRow.getElementById("paymentMonth").textContent = paymentArray[i].month;
        tableRow.getElementById("paymentAmount").textContent = paymentArray[i].paymentAmount;
        tableRow.getElementById("principalPaid").textContent = paymentArray[i].principalPaid;
        tableRow.getElementById("interestPaid").textContent = paymentArray[i].interestPaid;
        tableRow.getElementById("totalIntPaid").textContent = paymentArray[i].totalIntPaid;
        tableRow.getElementById("remainingBalance").textContent = paymentArray[i].remainingBalance;

        body.appendChild(tableRow);
    };
};