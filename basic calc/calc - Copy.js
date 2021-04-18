//the formulator: P * (r/1200) / (1 - (1+r/1200)**(0-term))
// p = amount of Principal (float)
// r = interest rate as a percentage (float) / (input(rate) / 1200)
// n = number of monthly payments / (input(yrs) / 12)
function calculateMortgage(totalAmount, interestRate, term) {

    // convert interest rate to decimal
    interestRate = percentToDecimal(interestRate);

    // convert years to yearsToMonths
    term = yearsToMonths(term);

    monthlyPayment = totalAmount * interestRate / (1 - (1 + interestRate) ** (0 - term));

    return parseFloat(monthlyPayment.toFixed(2));
}

function percentToDecimal(percent) {
    return (percent / 1200);
}

function yearsToMonths(years) {
    return years * 12
}

function printPayments(payment) {
    var htmlIn = document.getElementById("outMonthly");

    htmlIn.innerText = "$" + payment;
}

var btn = document.getElementById("calculate");
btn.onclick = function () {
    var p = document.getElementById("inAmount").value;

    if (p == "") {
        alert("Please enter an amount.");
        return false;
    } else if (p < 0) {
        alert("Invalid Input, please enter a non-negative integer.")
        return false;
    }

    var r = document.getElementById("inRate").value;
    //regex here to remove potential % chars

    var n = document.getElementById("inTerm").value;

    console.log(p, r, n);

    var pmt = calculateMortgage(p, r, n);

    printPayments(pmt);
};