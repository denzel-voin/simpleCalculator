document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById('app');
  const calculator = document.createElement('div');
  calculator.className = 'calculator';

  const display = document.createElement('input');
  display.type = 'text';
  display.id = 'display';
  display.className = 'display';
  display.readOnly = true;

  const buttonsContainer = document.createElement('div');
  buttonsContainer.className = 'buttons';

  const buttons = [
    '(', ')', 'C', '⌫',
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
    '💾'
  ];

  buttons.forEach(text => {
    const button = document.createElement('button');
    button.className = 'btn';
    button.textContent = text;
    button.addEventListener('click', () => handleButtonClick(text));
    buttonsContainer.appendChild(button);
  });

  calculator.appendChild(display);
  calculator.appendChild(buttonsContainer);
  app.appendChild(calculator);

  document.addEventListener('keydown', handleKeyDown);

  function handleButtonClick(text) {
    if (text === 'C') {
      clearDisplay();
    } else if (text === '⌫') {
      deleteCharacter();
    } else if (text === '=') {
      calculateResult();
    } else if (text === '💾') {
      copyToClipboard();
    } else {
      appendCharacter(text);
    }
  }

  function handleKeyDown(event) {
    const allowedKeys = '0123456789/*-+.()=';
    if (allowedKeys.includes(event.key)) {
      appendCharacter(event.key);
    } else if (event.key === 'Backspace') {
      deleteCharacter();
    } else if (event.key === 'Enter') {
      calculateResult();
    } else if (event.key === 'Escape') {
      clearDisplay();
    }
  }

  function appendCharacter(char) {
    display.value += char;
  }

  function clearDisplay() {
    display.value = '';
  }

  function deleteCharacter() {
    display.value = display.value.slice(0, -1);
  }

  function calculateResult() {
    try {
      display.value = eval(display.value);
    } catch (error) {
      display.value = 'Error';
    }
  }

  function copyToClipboard() {
    display.select();
    document.execCommand('copy');
  }
});
