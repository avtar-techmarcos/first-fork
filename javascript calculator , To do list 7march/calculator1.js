function add() {
        performCalculation((num1, num2) => num1 + num2);
    }

    function subtract() {
        performCalculation((num1, num2) => num1 - num2);
    }

    function multiply() {
        performCalculation((num1, num2) => num1 * num2);
    }

    function divide() {
        performCalculation((num1, num2) => num1 / num2);
    }

    function performCalculation(operation) {
        const num1 = Number(document.getElementById("num1").value);
        const num2 = Number(document.getElementById("num2").value);

        if (!isNaN(num1) && !isNaN(num2)) {
            const result = operation(num1, num2);
            document.getElementById("result").innerText = result;
        } else {
            alert("Please enter valid numbers");
        }
    }