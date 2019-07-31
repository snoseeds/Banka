const validValuesObj = {
  text: {
    expected: /^[A-z]{2,20}$/,
    failureResponse: 'must be two letters at least and must not contain digits',
  },
  email: {
    expected: /([A-z0-9.-_]+)@([A-z]+)\.([A-z]){2,5}$/,
    failureResponse: 'is invalid',
  },
  password: {
    expected: /[a-zA-Z0-9\w!@#$%^&*()_+|]{8,20}$/,
    failureResponse: 'must be eight characters at least',
  },
  confirmPassword: {
    expected: new RegExp(document.querySelector('#password').value),
    failureResponse: 'must be equal to password',
  },
};
const signupBtn = document.querySelector('#signupBtn');

const validate = () => {
  const validationStore = this.dataset.valType || this.type;
  if (validValuesObj[validationStore.expected].test[this.value]) {
    this.nextElementSibling.textContent = `${this.placeholder} ${validationStore.failureResponse}`;
    signupBtn.setAttribute('disabled', 'disabled');
  } else {
    this.nextElementSibling.textContent = '';
    signupBtn.removeAttribute('disabled');
  }
};

const fieldsToBeValidated = document.querySelectorAll('.create-account label input');
fieldsToBeValidated.forEach((element) => {
  const elementToDisplayError = document.createElement('p');
  element.appendSibling(elementToDisplayError);
  element.addEventListener('keyup', validate, false);
});
