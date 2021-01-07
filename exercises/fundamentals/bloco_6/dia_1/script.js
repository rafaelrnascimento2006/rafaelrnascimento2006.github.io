function createStateOptions() {
  const states = document.querySelector('#state');
  const stateOptions = ['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'];
  for (let state of stateOptions) {
    const option = document.createElement('option');
    option.innerText = state;
    states.appendChild(option);
  }
}
function validateDate(date) {
  let check = false;
  if (date.indexOf('/') === 2 || date.indexOf('/') === 5) {
    const day = date.substr(0, 2);
    const month = date.substr(3, 2);
    const year = date.substr(6, 4);
    if ((day > 0 && day < 31) && (month > 0 && month <= 12) && (year > 0 && year.length === 4)) {
      check = true;
    }
  }
  return check;
}

function checkDate() {
  const dateInput = document.querySelector('.date-input');
  const insertedDate = dateInput.value;
  const userDate = validateDate(insertedDate);
  if (!userDate && dateInput.length) {
    dateInput.value = '';
    alert('data invalida');
    return false;
  }
  return true;
}

function checkEmail() {
  const emailInput = document.querySelector('.email-input');
  const insertedEmail = emailInput.value;
  let emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(insertedEmail);
  if (!emailFormat && insertedEmail.length) {
    emailInput.value = '';
    alert('email inválido');
    return false;
  }
  return true;
}

function submitForm(event) {
  event.preventDefault();
  const formElements = document.querySelectorAll('input');
  for (let index = 0; index < formElements.length; index += 1) {
    if (formElements[index].type === 'radio' && !formElements[index].checked) {
      continue;
    }
    const userInput = formElements[index].value;
    const dataUser = document.querySelector('.form-data');
    if (checkEmail() && checkDate()) {
      const div = document.createElement('div');
      div.className = 'div-curriculum';
      div.innerHTML = userInput;
      dataUser.appendChild(div);
    }
  }
}

function clearForm() {
  const formElements = document.querySelectorAll('input');
  const textArea = document.querySelector('textarea')
  const div = document.querySelectorAll('.div-curriculum');
  for (let index = 0; index < formElements.length && index < div.length; index += 1) {
    const userInput = formElements[index];
    userInput.value = '';
    textArea.value = '';
    div[index].innerText = '';
  }
}

window.onload = function () {
  const submitButton = document.querySelector('.submit-button');
  const clearButton = document.querySelector('.clear-button');

  submitButton.addEventListener('click', submitForm);
  clearButton.addEventListener('click', clearForm);

  createStateOptions();
};
