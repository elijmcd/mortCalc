//the formulator: P * (r/1200) / (1 - (1+r/1200)**(0-term))
// p = amount of Principal (float)
// r = interest rate as a percentage (float) / (input(rate) / 1200)
// n = number of monthly payments / (input(yrs) / 12)
// function calculateMonthly(totalAmount, interestRate, term) {

//     // convert interest rate percentage to decimal
//     interestRate = interestRate / 1200;
//     // convert years to months
//     term = term * 12;

//     monthlyPayment = totalAmount * (interestRate / (1 - (1 + interestRate) ** (0 - term)));
//     return monthlyPayment;
//     // return parseFloat(monthlyPayment.toFixed(2));
// }

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

// function findInterestPaid(currentBalance) {
//     let interestPaid = currentBalance * interestRate;
//     return interestPaid;
// }

// function findPrincipalPaid(totalPayment) {
//     let principalPaid = totalPayment - interestPaid;
//     return principalPaid;
// }
// let btn = document.getElementById("calculate");
// btn.onclick = 
function calculatePayment() {

    let principal = document.getElementById("inAmount").value;
    if (principal == "") {
        alert("Please enter an amount for the loan.");
        return false;
    } else if (principal < 0) {
        alert("Invalid loan amount, please enter a non-negative number.")
        return false;
    }
    let rate = parseFloat(document.getElementById("inRate").value);
    //TODO regex here to remove potential % chars?
    rate = rate / 1200;
    let term = parseFloat(document.getElementById("inTerm").value);
    term = term * 12;

    let monthlyPayment = principal * rate / (1 - (1 + rate) ** (-term));
    // let monthlyPayment = calculateMonthly(principal, rate, term);
    let principalPaid = 0;
    let interestPaid = 0;
    let balance = principal;
    let remainingBalance = 0;
    remainingBalance = balance - principalPaid;
    // principal = principalPaid;

    // let rate = 0;
    let totalInterest = 0;
    let totalPaid = 0;
    // let interest = principal * (rate / 1200);
    // principal - monthlyPayment;

    let payArray = [];

    // printPayments(monthlyPayment, interestPaid, principalPaid);
    for (let i = 1; i <= term; i++) {
        totalPaid = totalPaid + monthlyPayment;
        interestPaid = remainingBalance * rate;
        principalPaid = monthlyPayment - interestPaid;
        totalInterest += interestPaid;
        remainingBalance -= principalPaid;

        let obj = addToArray(i, monthlyPayment, principalPaid, interestPaid, totalInterest, remainingBalance);
        payArray.push(obj);
    };

    // function printPayments(payment, interest, principal) {


    let payAmount = document.getElementById("monthlyPayment");
    payAmount.innerText = "$" + (Math.round(monthlyPayment * 100) / 100).toFixed(2);
    let principalAmt = document.getElementById("principalAmt");
    principalAmt.innerText = "$" + parseFloat(principal);
    let interestPay = document.getElementById("interestTotal");
    interestPay.innerText = "$" + (Math.round(totalInterest * 100) / 100).toFixed(2);
    let costTotal = document.getElementById("costTotal");
    costTotal.innerText = "$" + (Math.round((parseFloat(principal) + totalInterest) * 100) / 100).toFixed(2);

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

    return obj;
}

function displayData(payArray) {

    const template = document.getElementById("dataTemplate");
    const body = document.getElementById("tableBody");

    body.innerHTML = "";

    for (let i = 0; i < payArray.length; i++) {
        const dataRow = document.importNode(template.content, true);

        dataRow.getElementById("month").textContent = payArray[i].month;
        dataRow.getElementById("totalPaid").textContent = payArray[i].totalPaid.toLocaleString('en-US', {
            style: 'decimal',
            minimumFractionDigits: '2',
            maximumFractionDigits: '2',
        });
        dataRow.getElementById("principalPaid").textContent = payArray[i].principalPaid.toLocaleString('en-US', {
            style: 'decimal',
            minimumFractionDigits: '2',
            maximumFractionDigits: '2',
        });
        dataRow.getElementById("interestPaid").textContent = payArray[i].interestPaid.toLocaleString('en-US', {
            style: 'decimal',
            minimumFractionDigits: '2',
            maximumFractionDigits: '2',
        });
        dataRow.getElementById("totalInterestPaid").textContent = payArray[i].totalInterestPaid.toLocaleString('en-US', {
            style: 'decimal',
            minimumFractionDigits: '2',
            maximumFractionDigits: '2',
        });
        dataRow.getElementById("remainingBalance").textContent = payArray[i].remainingBalance.toLocaleString('en-US', {
            style: 'decimal',
            minimumFractionDigits: '2',
            maximumFractionDigits: '2',
        });

        body.appendChild(dataRow);

    };


}



// number.toLocaleString(locales, options)