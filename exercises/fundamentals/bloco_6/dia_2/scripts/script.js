function createStateOptions() {
  const states = document.querySelector('#state');
  const stateOptions = ['AC', 'AL', 'AM', 'AP', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MG', 'MS', 'MT', 'PA', 'PB', 'PE', 'PI', 'PR', 'RJ', 'RN', 'RO', 'RR', 'RS', 'SC', 'SE', 'SP', 'TO'];
  for (let state of stateOptions) {
    const option = document.createElement('option');
    option.innerText = state;
    states.appendChild(option);
  }
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
    const div = document.createElement('div');
    div.className = 'div-curriculum';
    div.innerHTML = userInput;
    dataUser.appendChild(div);
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
  const picker = new Pikaday({ field: document.getElementById('datepicker') });
  const submitButton = document.querySelector('#submit');
  const clearButton = document.querySelector('#clear');

  submitButton.addEventListener('click', submitForm);
  clearButton.addEventListener('click', clearForm);

  validation.init('form');
  createStateOptions();
};
