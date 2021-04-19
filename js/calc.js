let payArray = [];

//the formulator: P * (r/1200) / (1 - (1+r/1200)**(0-term))
// p = amount of Principal (float)
// r = interest rate as a percentage (float) / (input(rate) / 1200)
// n = number of monthly payments / (input(yrs) / 12)
function calculateMortgage(totalAmount, interestRate, term) {

    // convert interest rate percentage to decimal
    interestRate = interestRate / 1200;
    // convert years to months
    term = term * 12;

    monthlyPayment = totalAmount * interestRate / (1 - (1 + interestRate) ** (0 - term));
    return monthlyPayment;
    // return parseFloat(monthlyPayment.toFixed(2));
}

// function percentToDecimal(percent) {
//     return (percent / 1200);
// }

// function yearsToMonths(years) {
//     return years * 12
// }

// function getPayments() {
//     //builds array of payments for table with
//     for (let i = 0; i < payArray.length; i++) {

//     }
// }

function printPayments(payment, interest, principal) {

    var payAmount = document.getElementById("monthlyPayment");
    payAmount.innerText = "$ " + (Math.round(payment * 100) / 100).toFixed(2);
    var interestPaid = document.getElementById("interestPaid");
    interestPaid.innerText = "$ " + (Math.round(interest * 100) / 100).toFixed(2);
    var principalPay = document.getElementById("principalPay");
    principalPay.innerText = "$ " + (Math.round(principal * 100) / 100).toFixed(2);
}


function findInterestPaid(currentBalance) {
    let interestPaid = currentBalance * interestRate;
    return interestPaid;
}

function findPrincipalPaid(totalPayment) {
    let principalPaid = totalPayment - interestPaid;
    return principalPaid;
}
// var btn = document.getElementById("calculate");
// btn.onclick = 
function calculatePayment() {

    var principal = document.getElementById("inAmount").value;
    if (principal == "") {
        alert("Please enter an amount for the loan.");
        return false;
    } else if (principal < 0) {
        alert("Invalid loan amount, please enter a non-negative number.")
        return false;
    }
    var rate = parseFloat(document.getElementById("inRate").value);
    //TODO regex here to remove potential % chars?
    var term = parseFloat(document.getElementById("inTerm").value);

    var months = term * 12;
    var monthlyPayment = calculateMortgage(principal, rate, term);
    var remainingBalance = principal;
    // principal - monthlyPayment;
    var interestPaid = remainingBalance * (rate /1200);
    var principalPaid = monthlyPayment - interestPaid;

    printPayments(monthlyPayment, interestPaid, principalPaid);
    let totalPaid = 0;
    let interest = interestPaid;
    principal = principalPaid;
    let totalInterest = 0;

    for (let i = 1; i <= months; i++) {
        totalPaid = totalPaid + monthlyPayment;
        interest = remainingBalance * (rate / 1200);
        totalInterest += interest;
        remainingBalance -= principalPaid;
        previousBalance = remainingBalance;

        addToArray(i, totalPaid, principalPaid, interest, totalInterest, previousBalance);
    };
    displayData(payArray);
};

function addToArray(month, totalPaid, principalPaid, interestPaid, totalInterest, remainingBalance) {
    let obj = {};
    obj["month"] = month;
    obj["totalPaid"] = totalPaid;
    obj["principalPaid"] = principalPaid;
    obj["interestPaid"] = interestPaid;
    obj["totalInterestPaid"] = totalInterest;
    obj["remainingBalance"] = remainingBalance;

    payArray.push(obj);
}

function displayData(payArray) {

    const template = document.getElementById("dataTemplate");
    const body = document.getElementById("tableBody");

    body.innerHTML = "";

    for (let i = 0; i < payArray.length; i++) {
        const dataRow = document.importNode(template.content, true);

        dataRow.getElementById("month").textContent = payArray[i].month;
        dataRow.getElementById("totalPaid").textContent = (Math.round(payArray[i].totalPaid * 100) / 100).toFixed(2);
        dataRow.getElementById("principalPaid").textContent = (Math.round(payArray[i].principalPaid * 100) / 100).toFixed(2);
        dataRow.getElementById("interestPaid").textContent = (Math.round(payArray[i].interestPaid * 100) / 100).toFixed(2);
        dataRow.getElementById("totalInterestPaid").textContent = (Math.round(payArray[i].totalInterestPaid * 100) / 100).toFixed(2);
        dataRow.getElementById("remainingBalance").textContent = (Math.round(payArray[i].remainingBalance * 100) / 100).toFixed(2);

        body.appendChild(dataRow);

    };


}