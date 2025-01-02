
document.addEventListener('DOMContentLoaded', () => {
    const result = document.getElementById('result');
    let currentInput = '0';
    let memory = 0;
    let operator = null;
    let isNewInput = true;

    document.querySelectorAll('.buttons button').forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (button.classList.contains('memory')) {
                handleMemory(value);
            } else if (value === 'C') {
                clearAll();
            } else if (value === 'CE') {
                clearEntry();
            } else if (value === '←') {
                backspace();
            } else if (value === '±') {
                toggleSign();
            } else if (value === '.') {
                inputDecimal();
            } else if (['+', '−', '×', '÷', '='].includes(value)) {
                handleOperator(value);
            } else {
                inputDigit(value);
            }
        });
    });

    function updateDisplay() {
        result.textContent = currentInput;
    }

    function clearAll() {
        currentInput = '0';
        operator = null;
        isNewInput = true;
        updateDisplay();
    }

    function clearEntry() {
        currentInput = '0';
        updateDisplay();
    }

    function backspace() {
        currentInput = currentInput.slice(0, -1) || '0';
        updateDisplay();
    }

    function toggleSign() {
        currentInput = currentInput.startsWith('-') ? currentInput.slice(1) : '-' + currentInput;
        updateDisplay();
    }

    function inputDecimal() {
        if (!currentInput.includes('.')) {
            currentInput += '.';
            updateDisplay();
        }
    }

    function inputDigit(digit) {
        if (isNewInput) {
            currentInput = digit;
            isNewInput = false;
        } else {
            currentInput = currentInput === '0' ? digit : currentInput + digit;
        }
        updateDisplay();
    }

    function handleOperator(nextOperator) {
        const inputValue = parseFloat(currentInput);

        if (operator && !isNewInput) {
            performOperation(inputValue);
        } else {
            memory = inputValue;
        }

        operator = nextOperator;
        isNewInput = true;

        if (operator === '=') {
            updateDisplay();
            operator = null;
        }
    }

    function performOperation(nextValue) {
        switch (operator) {
            case '+':
                memory += nextValue;
                break;
            case '−':
                memory -= nextValue;
                break;
            case '×':
                memory *= nextValue;
                break;
            case '÷':
                memory /= nextValue;
                break;
        }
        currentInput = String(memory);
    }

    function handleMemory(command) {
        // Implement memory functions (MC, MR, M+, M-, MS)
        // These are placeholders and need actual implementation based on the desired functionality
        switch (command) {
            case 'MC':
                memory = 0;
                break;
            case 'MR':
                currentInput = String(memory);
                updateDisplay();
                break;
            case 'M+':
                memory += parseFloat(currentInput);
                break;
            case 'M-':
                memory -= parseFloat(currentInput);
                break;
            case 'MS':
                memory = parseFloat(currentInput);
                break;
        }
    }
});
