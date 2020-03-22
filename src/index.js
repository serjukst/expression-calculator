function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    const operators = {
        "+": {
            priority: 1,
            action: (a, b) => a + b
        },
        "-": {
            priority: 1,
            action: (a, b) => a - b
        },
        "*": {
            priority: 2,
            action: (a, b) => a * b
        },
        "/": {
            priority: 2,
            action: (a, b) => a / b
        },
        "(": {},
        ")": {}
    };

    let stackNumber = [];
    let stackOperators = [];
    let arr;
    if (expr.length < 4) {
        arr = expr.split('');
    } else {
        arr = expr.trim().split(' ').filter(e => e !== ' ').filter(e => e !== '');
    }

    if (arr.join('').includes("/0")) {
        throw new Error("TypeError: Division by zero.");
    }

    if (arr.join('').replace(/[^(]/g, "").length != arr.join('').replace(/[^)]/g, "").length) {
        throw new Error("ExpressionError: Brackets must be paired");
    }

    for (let i = 0; i < arr.length; i++) {
        let current = arr[i];

        if (Number(current)) {
            stackNumber.push(parseFloat(current));
        };
        if (current in operators) {
            if (stackOperators.length === 0) {

                stackOperators.push(current);

            } else {

                let top = stackOperators[stackOperators.length - 1];

                if (current === ')' && top === '(') {
                    stackOperators.pop();
                    top = stackOperators[stackOperators.length - 1];
                } else if (current === '(' || top === '(') {
                    stackOperators.push(current);

                } else if (operators[top].priority < operators[current].priority) {
                    stackOperators.push(current);
                } else {
                    let b = stackNumber.pop();
                    let a = stackNumber.pop();

                    stackNumber.push(operators[top].action(a, b));
                    stackOperators.pop();
                    i--
                };
            };
        };
    };

    while (stackOperators.length !== 0) {
        let top = stackOperators[stackOperators.length - 1];
        let b = stackNumber.pop();
        let a = stackNumber.pop();
        stackNumber.push(operators[top].action(a, b));
        stackOperators.pop();
    }
    return Number(stackNumber);
}

module.exports = {
    expressionCalculator
}