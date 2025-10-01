let display = document.getElementById('display');
let currentValue = '0';
let previousValue = '';
let operation = '';
let shouldResetDisplay = false;

function updateDisplay() {
    display.textContent = currentValue;
}

function clearDisplay() {
    currentValue = '0';
    previousValue = '';
    operation = '';
    shouldResetDisplay = false;
    updateDisplay();
}

function deleteLast() {
    if (currentValue.length > 1) {
        currentValue = currentValue.slice(0, -1);
    } else {
        currentValue = '0';
    }
    updateDisplay();
}

function appendNumber(num) {
    if (shouldResetDisplay) {
        currentValue = num;
        shouldResetDisplay = false;
    } else {
        if (num === '.' && currentValue.includes('.')) return;
        if (currentValue === '0' && num !== '.') {
            currentValue = num;
        } else {
            currentValue += num;
        }
    }
    updateDisplay();
}

function appendOperator(op) {
    if (previousValue !== '' && operation !== '' && !shouldResetDisplay) {
        calculate();
    }
    previousValue = currentValue;
    operation = op;
    shouldResetDisplay = true;
}

function calculate() {
    if (previousValue === '' || operation === '') return;

    let prev = parseFloat(previousValue);
    let current = parseFloat(currentValue);
    let result;

    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = current !== 0 ? prev / current : 'Error';
            break;
        case '%':
            result = prev % current;
            break;
        default:
            return;
    }

    currentValue = result.toString();
    operation = '';
    previousValue = '';
    shouldResetDisplay = true;
    updateDisplay();
}

// Keyboard support
document.addEventListener('keydown', function (e) {
    if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
    if (e.key === '.') appendNumber('.');
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') appendOperator(e.key);
    if (e.key === '%') appendOperator('%');
    if (e.key === 'Enter' || e.key === '=') calculate();
    if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') clearDisplay();
    if (e.key === 'Backspace') deleteLast();
});