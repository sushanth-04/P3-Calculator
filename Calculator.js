document.addEventListener('DOMContentLoaded', function () {
    const keys = document.querySelector('.calc-buttons');
    const display = document.querySelector('.calc-display');
    let operator = '';
    let firstValue = '';
    let secondValue = '';
    let shouldResetDisplay = false;

    keys.addEventListener('click', e => {
        if (e.target.matches('button')) {
            const key = e.target;
            const action = key.textContent;
            const displayedNum = display.textContent;

            if (key.classList.contains('operator')) {
                if (firstValue && operator && !shouldResetDisplay) {
                    secondValue = displayedNum;
                    display.textContent = calculate(firstValue, secondValue, operator);
                    firstValue = display.textContent;
                    operator = action;
                    shouldResetDisplay = true;
                } else {
                    operator = action;
                    firstValue = displayedNum;
                    shouldResetDisplay = true;
                }
            } else if (action === 'AC') {
                display.textContent = '0';
                firstValue = '';
                secondValue = '';
                operator = '';
                shouldResetDisplay = false;
            } else if (action === '=') {
                if (firstValue && operator) {
                    secondValue = displayedNum;
                    display.textContent = calculate(firstValue, secondValue, operator);
                    firstValue = '';
                    operator = '';
                    shouldResetDisplay = true;
                }
            } else {
                if (shouldResetDisplay) {
                    display.textContent = action;
                    shouldResetDisplay = false;
                } else {
                    display.textContent = displayedNum === '0' ? action : displayedNum + action;
                }
            }
        }
    });

    function calculate(first, second, operator) {
        first = parseFloat(first);
        second = parseFloat(second);
        if (operator === '+') return first + second;
        if (operator === '-') return first - second;
        if (operator === '×') return first * second;
        if (operator === '÷') return first / second;
        return second;
    }
});
