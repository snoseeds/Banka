const start = () => {
  let userLocation = window.location.href.split('/');
  // eslint-disable-next-line prefer-destructuring
  userLocation = userLocation[userLocation.length - 1].split('.')[0];


  // Function to show error message on signup and login
  const showError = (msg) => {
    const formError = document.querySelector('#formError');
    formError.innerHTML = msg;
    formError.style.display = 'block';
    setTimeout(() => {
      formError.style.display = 'none';
    }, 7000);
  };

  // Function to change text content of form action
  const changeContent = (e, msg) => {
    e.textContent = msg;
  };
  // Function to set location
  const setLocation = (location) => {
    window.location.href = `https://encodedBicoding.github.io/banka/UI/${location}.html`;
  };
  const Welcome = (obj) => {
    const welcome = document.querySelector('#welcome');
    changeContent(welcome, `Welcome: ${obj.toUpperCase()}`);
  };
  // Function to logout
  function Logout() {
    const logout = document.querySelector('.logout');
    logout.addEventListener('click', () => {
      const type = window.sessionStorage.user_type;
      switch (type) {
        case 'admin':
          setLocation('admin_login');
          window.sessionStorage.clear();
          break;
        case 'staff':
          setLocation('staff_login');
          window.sessionStorage.clear();
          break;
        case '':
          setLocation('login');
          window.sessionStorage.clear();
          break;
        default:
          setLocation('login');
          window.sessionStorage.clear();
          break;
      }
    });
  }
  // Function to show modal
  const showModal = (msg) => {
    const modal = document.querySelector('#modal');
    const modalOverLay = document.querySelector('#modal_overlay');
    modal.innerHTML = `${msg} <br /> <button id="okBtn">OK</button>`;
    modalOverLay.style.display = 'block';
    const okBtn = document.querySelector('#okBtn');
    okBtn.addEventListener('click', () => {
      modalOverLay.style.display = 'none';
    });
  };
  // Function to protect route
  const checkRoutes = () => {
    if (userLocation !== 'signup'
      && userLocation !== 'login'
      && userLocation !== 'index'
      && userLocation !== 'admin_login'
      && userLocation !== 'staff_login') {
      const token = window.sessionStorage.access_banka_token;
      if (!token) {
        setLocation('login');
      }
    }
  };

  checkRoutes();
  if (userLocation === 'signup') {
    // signup form
    const signupForm = document.querySelector('#signup_form');
    signupForm.addEventListener('submit', (e) => {
      const signupBtn = document.querySelector('#signupBtn');
      changeContent(signupBtn, 'Loading...');
      e.preventDefault();
      const api = 'https://dominic-banka.herokuapp.com/api/v1/auth/signup';
      const user = {
        firstname: document.querySelector('#firstname').value,
        lastname: document.querySelector('#lastname').value,
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value,
      };
      fetch(api, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(user),
      }).then(resp => resp.json())
        .then((res) => {
          if (res.status !== 201) {
            changeContent(signupBtn, 'CREATE ACCOUNT');
            showError(res.message);
          } else {
            window.sessionStorage.access_banka_token = res.data.token;
            window.sessionStorage.user_name = res.data.firstname;
            setLocation('dashboard');
          }
        }).catch((err) => {
          console.log(err);
        });
    });
  } if (userLocation === 'login') {
    const loginForm = document.querySelector('#login_form');
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const loginBtn = document.querySelector('#loginBtn');
      changeContent(loginBtn, 'Loading...');
      const api = 'https://dominic-banka.herokuapp.com/api/v1/auth/login';
      const user = {
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value,
      };
      fetch(api, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(user),
      }).then(resp => resp.json())
        .then((res) => {
          if (res.status !== 200) {
            changeContent(loginBtn, 'LOG IN');
            showError(res.message);
          } else {
            window.sessionStorage.access_banka_token = res.data.token;
            window.sessionStorage.user_name = res.data.userObj.firstname;
            setLocation('dashboard');
          }
        }).catch((err) => {
          console.log(err.message);
          showError('Internet Disconnected');
          changeContent(loginBtn, 'LOG IN');
        });
    });
  } if (userLocation === 'dashboard' || userLocation === 'create_acc') {
    Logout();
    let userType;
    document.getElementsByName('user_type').forEach((name) => {
      name.addEventListener('click', () => {
        userType = name.value;
      });
    });
    const { user_name } = window.sessionStorage;
    Welcome(user_name);
    const createBankForm = document.querySelector('#create_bank_account');
    const createBankBtn = document.querySelector('#createBankBtn');
    createBankForm.addEventListener('submit', (e) => {
      e.preventDefault();
      changeContent(createBankBtn, 'Creating...');
      const token = window.sessionStorage.access_banka_token;
      const data = {
        accType: document.querySelector('#acc_type').value,
        userType,
      };
      const api = 'https://dominic-banka.herokuapp.com/api/v1/accounts';
      fetch(api, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }).then(resp => resp.json())
        .then((res) => {
          if (res.status !== 201) {
            showError(res.message);
            changeContent(createBankBtn, 'Create Bank Account');
          } else {
            showModal(`
            <h3 id="centerHeader">New Bank Account Created</h3>
            <p>Account Details: </p>
            Account Number: ${res.data.accountnumber} <br/>
            Account Balance: ${res.data.balance} <br />
            Status: ${res.data.status} <br />
            Type: ${res.data.type} <br />
            Date Created: ${res.data.createdon}<br/>
            `);
            changeContent(createBankBtn, 'Create Bank Account');
          }
        }).catch(err => console.log(err));
    });
  }
  if (userLocation === 'view_all') {
    Logout();
    const { user_name } = window.sessionStorage;
    Welcome(user_name);
    const searchForm = document.querySelector('#searchForm');
    const table = document.querySelector('#all_trans_table');
    const searchBtn = document.querySelector('#searchBtn');
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      changeContent(searchBtn, 'Searching...');
      const data = document.querySelector('#s').value;
      const token = window.sessionStorage.access_banka_token;
      const api = `https://dominic-banka.herokuapp.com/api/v1/accounts/${data}/transactions?token=${token}`;
      fetch(api)
        .then(resp => resp.json())
        .then((res) => {
          if (res.status === 200 && res.data.length > 0) {
            res.data.forEach((d) => {
              const tableRow2 = document.createElement('tr');
              // Table Data
              const tableData = document.createElement('td');
              const tableData2 = document.createElement('td');
              const tableData3 = document.createElement('td');
              const tableData4 = document.createElement('td');
              const tableData5 = document.createElement('td');

              tableData.innerText = `${d.type}`;
              tableData2.innerText = `${d.amount}`;
              tableData3.innerText = `${d.cashier}`;
              tableData4.innerText = `${d.oldbalance}`;
              tableData5.innerText = `${d.newbalance}`;

              tableRow2.appendChild(tableData);
              tableRow2.appendChild(tableData2);
              tableRow2.appendChild(tableData3);
              tableRow2.appendChild(tableData4);
              tableRow2.appendChild(tableData5);

              table.appendChild(tableRow2);
              table.style.opacity = '1';
            });
            changeContent(searchBtn, 'Search');
          } else if (res.status === 200 && res.data.length <= 0) {
            showModal(`
            <h1>No Transactions Yet</h1>
            `);
            changeContent(searchBtn, 'Search');
          } else {
            showModal(`
          <h1>Not Allowed</h1>
          `);
            changeContent(searchBtn, 'Search');
          }
        }).catch(err => console.log(err));
    });
  }
  if (userLocation === 'admin_login') {
    const adminLoginForm = document.querySelector('#admin_login_form');
    adminLoginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const loginBtn = document.querySelector('#a_loginBtn');
      changeContent(loginBtn, 'Loading...');
      const api = 'https://dominic-banka.herokuapp.com/api/v1/auth/admin/login';
      const data = {
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value,
      };
      fetch(api, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then(resp => resp.json())
        .then((res) => {
          if (res.status !== 200) {
            changeContent(loginBtn, 'LOG IN');
            showError(res.message);
          } else if (res.data.type !== 'admin') {
            showError('You are not permitted to use this login');
            changeContent(loginBtn, 'LOG IN');
          } else {
            window.sessionStorage.access_banka_token = res.data.token;
            window.sessionStorage.user_name = res.data.firstname;
            window.sessionStorage.user_type = res.data.type;
            setLocation('admin');
          }
        }).catch(err => console.log(err));
    });
  } if (userLocation === 'staff_login') {
    const staffLoginForm = document.querySelector('#staff_login_form');
    staffLoginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const loginBtn = document.querySelector('#s_loginBtn');
      changeContent(loginBtn, 'Loading...');
      const api = 'https://dominic-banka.herokuapp.com/api/v1/auth/admin/login';
      const data = {
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value,
      };
      fetch(api, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then(resp => resp.json())
        .then((res) => {
          if (res.status !== 200) {
            changeContent(loginBtn, 'LOG IN');
            showError(res.message);
          } else if (res.data.type !== 'staff') {
            showError('You are not permitted to use this login');
            changeContent(loginBtn, 'LOG IN');
          } else {
            window.sessionStorage.access_banka_token = res.data.token;
            window.sessionStorage.user_name = res.data.firstname;
            window.sessionStorage.user_type = res.data.type;
            setLocation('staff');
          }
        }).catch(err => console.log(err));
    });
  }
  if (userLocation === 'admin') {
    Logout();
    const { user_name } = window.sessionStorage;
    Welcome(user_name);
  }
  if (userLocation === 'staff') {
    Logout();
    const { user_name } = window.sessionStorage;
    Welcome(user_name);
  }
  if (userLocation === 'credit') {
    Logout();
    const { user_name } = window.sessionStorage;
    Welcome(user_name);
    const creditForm = document.querySelector('#credit_form');
    const creditBtn = document.querySelector('#creditBtn');
    creditForm.addEventListener('submit', (e) => {
      e.preventDefault();
      changeContent(creditBtn, 'Loading...');
      const token = window.sessionStorage.access_banka_token;
      const accountNumber = document.querySelector('#acc_id').value;
      const amount = document.querySelector('#amt').value;
      const data = {
        amount: Number(amount),
      };

      const api = `https://dominic-banka.herokuapp.com/api/v1/transactions/${accountNumber}/credit?token=${token}`;
      fetch(api, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then(resp => resp.json())
        .then((res) => {
          if (res.status !== 200) {
            showModal(`<h3>${res.message}</h3>`);
            changeContent(creditBtn, 'Credit Account');
          } else {
            changeContent(creditBtn, 'Credit Account');
            showModal(`
              <h2 id="centerHeader">${res.message}</h2>
              Amount: ${res.data.amount} <br/>
              Account Number: ${res.data.accountnumber} <br/>
              Type: ${res.data.type} <br/>
              Cashier: ${res.data.cashier} <br/>
              Old Balance: ${res.data.oldbalance} <br/>
              New Balance: ${res.data.newbalance} <br/>
              Date Issued: ${res.data.createdon} <br/>
              `);
          }
        }).catch(err => console.log(err));
    });
  } if (userLocation === 'debit') {
    Logout();
    const { user_name } = window.sessionStorage;
    Welcome(user_name);
    const debitForm = document.querySelector('#debit_form');
    const debitBtn = document.querySelector('#debitBtn');
    debitForm.addEventListener('submit', (e) => {
      e.preventDefault();
      changeContent(debitBtn, 'Loading...');
      const token = window.sessionStorage.access_banka_token;
      const accountNumber = document.querySelector('#acc_id').value;
      const amount = document.querySelector('#amt').value;
      const data = {
        amount: Number(amount),
      };
      
      const api = `https://dominic-banka.herokuapp.com/api/v1/transactions/${accountNumber}/debit?token=${token}`;
      fetch(api, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then(resp => resp.json())
      .then((res) => {
        if (res.status !== 200) {
          showModal(`<h3>${res.message}</h3>`);
          changeContent(debitBtn, 'Credit Account');
        } else {
          changeContent(debitBtn, 'Credit Account');
          showModal(`
              <h2 id="centerHeader">${res.message}</h2>
              Amount: ${res.data.amount} <br/>
              Account Number: ${res.data.accountnumber} <br/>
              Type: ${res.data.type} <br/>
              Cashier: ${res.data.cashier} <br/>
              Old Balance: ${res.data.oldbalance} <br/>
              New Balance: ${res.data.newbalance} <br/>
              Date Issued: ${res.data.createdon} <br/>
              `);
        }
      }).catch(err => console.log(err));
    });
  }
};
start();
