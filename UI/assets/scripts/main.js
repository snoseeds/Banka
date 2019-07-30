const startApp = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const presentPageBody = document.querySelector('body');

    // Section to Display Admin Button on Homepage with
    // Seven continuous clicks under five seconds while no two clicks
    // are separated for a duration longer than three seconds
    const adminSection = () => {
      // adminDisplayer presets
      const threshold = 5000;
      let noOfClick = 0;
      let clickSeriesStart;
      let clickSeriesEnd;
      let lastClick;
      let presentClick;

      const adminDisplayer = () => {
        presentClick = new Date();
        noOfClick = lastClick && (presentClick - lastClick > 3000) ? 1 : noOfClick + 1;
        lastClick = new Date();
        clickSeriesStart = noOfClick === 1 ? new Date() : clickSeriesStart;
        clickSeriesEnd = noOfClick === 7 ? new Date() : 0;
        if (noOfClick === 7) {
          if (clickSeriesEnd - clickSeriesStart < threshold) {
            const adminElement = document.querySelector('#admin');
            adminElement.style.display = 'inline-block';
            // TimeOut to Remove admin from page after a little while
            setTimeout(() => {
              adminElement.style.display = 'none';
              noOfClick = 0;
              lastClick = undefined;
            }, 5000);
          } else {
            noOfClick = 0;
            lastClick = undefined;
          }
        }
      };

      const adminTestingElement = document.querySelector('#heading');
      adminTestingElement.addEventListener('click', adminDisplayer, false);
    };

    const logOutMessage = () => {
      const logOut = document.querySelector('.log-out-message');
      logOut.style.display = window.location.href.endsWith('?log_out') ? 'block' : 'none';
    };

    if (presentPageBody.classList.contains('loginPage')) {
      logOutMessage();
    }

    if (presentPageBody.classList.contains('homePage')) {
      adminSection();
    }

    const validateFormFields = () => {
      const validValuesObj = {
        text: {
          expected: () => /^[A-z]{2,20}$/,
          failureResponse: 'must be two letters at least and must not contain digits',
        },
        number: {
          expected: () => /^[0-9]{11}$/,
          failureResponse: 'must contain eleven digits as a Nigerian phone number',
        },
        email: {
          expected: () => /([A-z0-9.-_]+)@([A-z]+)\.([A-z]){2,5}$/,
          failureResponse: 'is invalid',
        },
        password: {
          expected: () => /[a-zA-Z0-9\w!@#$%^&*()_+|]{8,20}$/,
          failureResponse: 'must be eight characters at least',
        },
        confirmPassword: {
          expected: () => new RegExp(`^${document.querySelector('#password').value}$`),
          failureResponse: 'must be equal to password',
        },
        transactionAmount: {
          expected: () => /^[1-9]+\d*$/,
          failureResponse: 'must be a non negative whole number',
        },
        libraryValidation: {
          expected: () => /^.{8,100}$/,
          failureResponse: 'must have minimum of eight characters',
        },
      };
      const formSubmitBtn = document.querySelector('.formActionBtn');

      function validate() {
        const valTypeStore = validValuesObj[this.dataset.valType || this.type];
        if (valTypeStore.expected().test(this.value)) {
          this.parentNode.previousElementSibling.textContent = '';
          formSubmitBtn.removeAttribute('disabled');
        } else {
          this.parentNode.previousElementSibling.textContent = `${this.placeholder} ${valTypeStore.failureResponse}`;
          formSubmitBtn.setAttribute('disabled', 'disabled');
        }
      }

      // const fieldsToBeValidated = document.querySelectorAll('.create-account label input');
      const fieldsToBeValidated = document.querySelectorAll('input:not([type="month"])');
      fieldsToBeValidated.forEach((element) => {
        const elementToDisplayError = document.createElement('p');
        elementToDisplayError.classList.add('error');
        element.parentNode.parentNode.insertBefore(elementToDisplayError, element.parentNode);
        element.addEventListener('keyup', validate, false);
      });
    };

    if (presentPageBody.classList.contains('createAcct')
      || presentPageBody.classList.contains('slidingFormPage')) {
      validateFormFields();
    }

    // Section to Toggle Menu on Mobile Screen
    const mobileMenuToggle = (formStatus) => {
      // toggleMenu on mobile
      const menu = document.querySelector('#menuB');
      const mainBody = document.querySelector('#main');
      // Multiple definitions for sideBar because of different type of
      // sidebars that are to be used for create admin page
      const sideBar = window.location.href.includes('root') &&
                      document.querySelector('#pageSideBar') ?
                      document.querySelector('#pageSideBar') :
                      document.querySelector('#portalSideBar') ? 
                      document.querySelector('#portalSideBar') :
                      document.querySelector('#side');

      const nav = sideBar.firstElementChild;

      // Toggle Menu on Forms Login Forms Display
      const overlayForForm = document.querySelector('#transOverlay');
      const formSliding = document.querySelector('#formSliding');

      const style = document.createElement('style');
      document.head.appendChild(style);

      const showMenu = () => {
        const mainBodyStyles = window.getComputedStyle(mainBody);
        // To get tentative width of sideBar (70vw),
        // which has been given to nav as well
        const sideBarStyles = window.getComputedStyle(nav);
        const mainBodyHeight = mainBodyStyles.getPropertyValue('height');
        const mainBodyWidth = mainBodyStyles.getPropertyValue('width').slice(0, -2);
        const sideBarWidth = sideBarStyles.getPropertyValue('width').slice(0, -2);
        style.textContent = `@media only screen and (max-width: 400px) {
          aside.main-sidebar {
            height: ${mainBodyHeight};
          }
          .show-menu {
            -webkit-box-shadow: ${mainBodyWidth - sideBarWidth}px 0px 0px 0px rgba(0,0,0,0.46);
               -moz-box-shadow: ${mainBodyWidth - sideBarWidth}px 0px 0px 0px rgba(0,0,0,0.46);
                    box-shadow: ${mainBodyWidth - sideBarWidth}px 0px 0px 0px rgba(0,0,0,0.46);   
          }     
        }`;
        sideBar.classList.add('show-menu');

        const hideMenu = () => {
          sideBar.classList.remove('show-menu');
          mainBody.removeEventListener('click', hideMenu, false);
          if (formStatus) {
            overlayForForm.removeEventListener('click', hideMenu, false);
            formSliding.removeEventListener('click', hideMenu, false);
            overlayForForm.removeAttribute('onclick');
            overlayForForm.style.zIndex = '2';
          }
        };
        mainBody.addEventListener('click', hideMenu, false);
        if (formStatus) {
          overlayForForm.style.zIndex = '3';
          overlayForForm.setAttribute('onclick', 'event.stopPropagation()');
          overlayForForm.addEventListener('click', hideMenu, false);
          formSliding.addEventListener('click', hideMenu, false);
        }
      };
      menu.addEventListener('click', showMenu, false);
    };

    mobileMenuToggle();

    // Section to Toggle Sliding Form on Login Form on Sign-in Pages and Transact Page
    const slidingFormToggle = () => {
      // Show Login form on clicking SignIn Button, and Hide it on clicking body
      const mainBody = document.querySelector('#main');
      const slideContainer = document.querySelector('#slideContainer');
      // const signInBtn = document.querySelector('#signInBtn');
      const transOverlay = document.querySelector('#transOverlay');
      const slide = document.querySelector('#slide');
      const slideForm = document.querySelector('#slideForm');

      function showForm(formSubmitLink) {
        const submitForm = document.querySelector('#slideForm');
        const submitBtn = document.querySelector('#slidingFormButton');
        // const slidingFormButton = document.querySelector('#slidingFormButton');

        if (presentPageBody.classList.contains('transaction')) {
          const configTransactionForm = () => {
            const transactLabel = document.querySelector('#formLabel p');
            const selectUserAcctNo = document.querySelector('#selectAcctNoOfUser');
            const amountInputField = document.querySelector('#transactField');

            const transactBoxForm = () => {
              transactLabel.textContent = `${this.textContent}`;
              amountInputField.value = '';
              amountInputField.setAttribute('placeholder', `${this.dataset.transactAction}`);
              amountInputField.setAttribute('name', `${this.dataset.name}`);
              submitBtn.textContent = `${this.textContent}`;
              const transactType = `${this.dataset.transactType}`;
              console.log(selectUserAcctNo);
              const selectedUserAcctNo = selectUserAcctNo.options[selectUserAcctNo.selectedIndex].value;
              const doTransaction = () => {
                const inputAmount = amountInputField.value;
                console.log(inputAmount);
                const transactLink = `${transactType}_${selectedUserAcctNo}_with_${inputAmount}`;
                submitForm.setAttribute('action', `${transactLink}`);
                amountInputField.value = '';
              };
              submitBtn.addEventListener('click', doTransaction, false);
            };
            transactBoxForm();
          };
          configTransactionForm();
        } else {
          submitForm.setAttribute('action', `${formSubmitLink}`);
        }

        mainBody.style.paddingTop = '0';
        slideContainer.classList.add('abs');
        transOverlay.classList.add('transparent-overlay');
        slide.classList.add('show-sliding-form');

        // Activate mobile toggle menu button while viewing form on mobiles
        mobileMenuToggle(true);

        const hideForm = () => {
          mainBody.style.paddingTop = '5';
          slideContainer.classList.remove('abs');
          slide.classList.remove('show-sliding-form');
          transOverlay.classList.remove('transparent-overlay');
          mainBody.removeEventListener('click', hideForm, false);
          submitForm.setAttribute('action', '');
        };
        mainBody.addEventListener('click', hideForm, false);
      }

      const loginLinkRouter = () => {
        const anyUserTypeSignInBtn = document.querySelectorAll('button[class*="sign-in"]');

        // Adding Event listeners on all sign-in buttons on pages across the app
        // We presently have the following only on index.html and staffAndAdminMainPage.html
        anyUserTypeSignInBtn.forEach((signInType) => {
          signInType.addEventListener('click', function configLogInFormLink() {
            // the next line relies on each sign in button having a class attribute
            // whose first classname follows the signature like userType-
            const loginLink = `${this.classList.value.split('-')[0]}_portal.html`;
            showForm(loginLink);
          });
        }, false);
      };

      const transactFormRouter = () => {
        const transactBtns = document.querySelectorAll('.transact');
        transactBtns.forEach((transactBtn) => {
          transactBtn.addEventListener('click', showForm, false);
        });
      };

      if (presentPageBody.classList.contains('loginPage')) {
        loginLinkRouter();
        // signInBtn.addEventListener('click', showForm, false);
      } else {
        /* Sliding form on Page is for transaction */
        transactFormRouter();
      }
    };

    if (presentPageBody.classList.contains('slidingFormPage')) {
      slidingFormToggle();
    }

    const accItemToggle = () => {
      const accMenuItems = document.querySelectorAll('.accordion');
    
      function toggleAccItem() {
        this.classList.toggle('active-acc');
        const panel = this.nextElementSibling;
        panel.style.maxHeight = panel.style.maxHeight ? null : `${panel.scrollHeight}px`;
      }
      accMenuItems.forEach((accMenuItem) => {
        accMenuItem.addEventListener('click', toggleAccItem, false);
      });
    };

    if (presentPageBody.classList.contains('accordion-page')) {
      accItemToggle();
    }


    const confirmationBoxToggle = () => {
      const actionButtons = document.querySelectorAll('.action');
      const confirmationBox = document.querySelector('.confirmation');
      const confirmationBoxTxt = document.querySelector('.confirmation p');
      const confirmActionBtn = document.querySelector('.do-action');
      const stopActionBtn = document.querySelector('.stop-action');

      const transOverlay = document.querySelector('#transOverlay');

      function showDialogBox() {
        confirmationBoxTxt.textContent = `${this.dataset.question}`;
        confirmActionBtn.setAttribute('href', `${this.dataset.url}`);
        confirmActionBtn.textContent = `${this.dataset.urlTitle}`;
        confirmationBox.classList.add('show-confirmation');
        transOverlay.classList.add('transparent-overlay');

        const hideDialogBox = () => {
          confirmationBox.classList.remove('show-confirmation');
          transOverlay.classList.remove('transparent-overlay');
        };
        stopActionBtn.addEventListener('click', hideDialogBox, false);
        transOverlay.addEventListener('click', hideDialogBox, false);
      }

      actionButtons.forEach((actionButton) => {
        actionButton.addEventListener('click', showDialogBox, false);
      });
    };

    if (presentPageBody.classList.contains('confirmation-box')) {
      confirmationBoxToggle();
    }

    const advancedHistory = () => {
      const advHistoryBtn = document.querySelector('.adv-history');
      const advHistoryToggle = document.querySelector('.adv-history span')
      const moreOptionsGuide = document.querySelectorAll('.guide');
      const dateRangeStart = document.querySelector('label.history.start');
      const dateRangeEndTxt = document.querySelector('label.history.end p');

      const showAdvancedOptions = () => {
        advHistoryBtn.removeEventListener('click', showAdvancedOptions, false);
        moreOptionsGuide.forEach((altTxt) => { altTxt.textContent = altTxt.dataset.guideTxt; });
        advHistoryToggle.textContent = advHistoryToggle.dataset.hideMore;
        dateRangeStart.classList.remove('hide');
        dateRangeEndTxt.classList.remove('hide');

        const hideAdvancedOptions = () => {
          advHistoryBtn.addEventListener('click', showAdvancedOptions, false);
          // moreOptionsGuide.textContent = moreOptionsGuide.dataset.basicTxt;
          moreOptionsGuide.forEach(altTxt => 
            altTxt.textContent = altTxt.dataset.basicTxt);
          advHistoryToggle.textContent = advHistoryToggle.dataset.showMore;
          dateRangeStart.classList.add('hide');
          dateRangeEndTxt.classList.add('hide');
        };
        advHistoryBtn.addEventListener('click', hideAdvancedOptions, false);
      };
      advHistoryBtn.addEventListener('click', showAdvancedOptions, false);
    };

    const setHistoryDate = () => {
      // const startingDateFormDiv = document.querySelector('div.date-label .start .form-div');
      // const endingDateFormDiv = document.querySelector('div.date-label .end .form-div');
      // const dayElements = document.querySelectorAll('select[data-name*="day"]');
      const presentDate = new Date();
      const presentMonth = presentDate.getMonth() + 1;
      const presentYear = presentDate.getFullYear();
      const monthElements = document.querySelectorAll('input[name*="month"]');
      const getNoOfDaysInMonth = (m, y) => {
        if (/4|6|9|11/.test(m)) return 30;
        if (m !== 2) return 31;
        if ((y % 4 === 0 && y % 100 !== 0) || y % 400 === 0) return 29;
        return 28;
      };
      function populateDayFieldWithDays() {
        const [selectedMonth, selectedYear] = this.value.split('-').map(Number).reverse();
        const noOfDaysInSelectedMonth = getNoOfDaysInMonth(selectedMonth, selectedYear);
        const newDaySelectElement = document.createElement('select');
        newDaySelectElement.setAttribute('name', this.previousElementSibling.getAttribute('name'));
        const fragment = document.createDocumentFragment();
        Array(noOfDaysInSelectedMonth).fill('#').forEach((v, i) => {
          const newOptionElement = document.createElement('option');
          newOptionElement.setAttribute('value', i + 1);
          newOptionElement.textContent = i + 1;
          fragment.appendChild(newOptionElement);
        });
        newDaySelectElement.appendChild(fragment);
        this.parentNode.replaceChild(newDaySelectElement, this.parentNode.firstElementChild);

        // preventing ending date from being earlier than starting date
        if (monthElements[0].value > monthElements[1].value) {
          monthElements[1].value = monthElements[0].value;
        }
      }
      monthElements.forEach((element) => {
        const value = `${presentYear}-`.concat(String(presentMonth).length === 1
          ? `0${presentMonth}` : String(presentMonth));
        element.setAttribute('max', value);
        element.setAttribute('value', value);
        populateDayFieldWithDays.call(element);
        element.addEventListener('change', populateDayFieldWithDays, false);
      });
    };

    if (presentPageBody.classList.contains('history')) {
      advancedHistory();
      setHistoryDate();
    }

    const adminCrewSignUpRouter = () => {
      const title = document.querySelector('title');
      const mainPageAside = document.querySelector('#pageSideBar');
      const portalPageAside = document.querySelector('#portalSideBar');
      const formIntro = document.querySelector('header.intro h3');
      const submitForm = document.querySelector('.sign-up-form form');
      const submitBtn = document.querySelector('#signupBtn');
      const logOut = document.querySelector('.log-out');

      const pageCaller = window.location.href.includes('staff') ? 'staff' :
                         window.location.href.includes('root') ? 'root' : 'admin';

      const updateSignUpForm = () => {
        switch (pageCaller) {
          case 'root':
            formIntro.textContent = "Create Root Admin Account that's needed to kickstart Banka";
            mainPageAside.style.display = 'block';
            submitBtn.textContent = 'Become a Root Admin';
            submitForm.setAttribute('action', 'root_admin_success.html');
            logOut.style.display = 'none';
            title.textContent = 'Banka | Root Admin Sign Up';
            break;
          case 'admin':
            formIntro.textContent = 'Create Account for an Admin';
            portalPageAside.style.display = 'block';
            submitBtn.textContent = 'Create Admin Account';
            submitForm.setAttribute('action', 'admin_account_success.html?admin');
            title.textContent = 'Banka | Create Admin Account';
            accItemToggle();
            break;
          // case 'staff':
            default:
            formIntro.textContent = 'Create Account for a Staff Member';
            portalPageAside.style.display = 'block';
            submitBtn.textContent = 'Create Staff Account';
            submitForm.setAttribute('action', 'admin_account_success.html?staff');
            title.textContent = 'Banka | Create Staff Account';
            accItemToggle();
            break;
        }
      };
      updateSignUpForm();
    };

    if (presentPageBody.classList.contains('admin-sign-up')) {
      adminCrewSignUpRouter();
    }

    const createAdminOrStaffSuccess = () => {
      const accountType = document.querySelector('#accountType');
      accountType.textContent = window.location.href.includes('staff')
        ? accountType.dataset.staff : accountType.dataset.admin;
    };

    if (presentPageBody.classList.contains('admin-staff-success')) {
      createAdminOrStaffSuccess();
    }

    const processAdminStaffRequest = () => {
      const selectUser = document.querySelector('#selectUser');
      const goButton = document.querySelector('#selectUser + div button');
      const dataRequester = goButton.dataset.request;
      const validationReply = document.querySelector('.accts-history-form .flex-label p');
      const submitForm = document.querySelector('.accts-history-form form');

      const setUserPortalAdd = () => {
        const selectedUserEmail = selectUser.options[selectUser.selectedIndex].value;
        // const selectedUserPortalAdd = `user_portal.html/${selectedUserEmail}/accounts?_${dataRequester}`;
        const selectedUserPortalAdd = `user_portal.html?${dataRequester}`;
        if (selectedUserEmail === '0') {
          validationReply.style.display = 'block';
          submitForm.setAttribute('action', '#');
        } else {
          validationReply.style.display = 'none';
          submitForm.setAttribute('action', `${selectedUserPortalAdd}`);
        }
      };
      goButton.addEventListener('click', setUserPortalAdd, false);
    };

    if (presentPageBody.classList.contains('staff-access')) {
      processAdminStaffRequest();
    }

    const displayAdminPriviledges = () => {
      const adminPortalBtn = document.querySelector('#adminPortalBtn');
      const adminPortalBtnLink = document.querySelector('#adminPortalBtn a');
      const showReturnToPortalBtn = adminOrStaff => function setLink() {
        this.setAttribute('href', `${this.getAttribute('href')}?${adminOrStaff}`);
      };
      const staffType = window.location.href.split('?')[1];
  
      // Configuring and displaying button to take admin crew back to his portal
      adminPortalBtnLink.setAttribute('href', `${staffType.toLowerCase()}_portal_view_reg_clients.html`);
      adminPortalBtn.style.display = 'block';

      const linksToShowBtnOnTheirPages = document.querySelectorAll('a[href^="user"]');
      linksToShowBtnOnTheirPages.forEach((linkElement) => {
        linkElement.addEventListener('click', showReturnToPortalBtn(staffType), false);
      });

      // Configuring logout link to take admin crew member to admin/staff home page
      document.querySelector('.log-out a').dataset.url = 'staffAndAdminMainPage.html?log_out';

      // Showing Admin specific information on user portal homepage
      if (window.location.href.includes('user_portal')) {
        const welcomeHeader = document.querySelector('header.portal-intro.intro');
        const createBankAcctSection = document.querySelector('section.account-creation');
        welcomeHeader.classList.add('hide-user-portal-intro');
        createBankAcctSection.classList.add('hide-account-creation');
        const adminOrStaffPrivileges = document.createElement('p');
        adminOrStaffPrivileges.style.color = 'red';
        adminOrStaffPrivileges.textContent = 'Click on any specific bank account or on history '
          + `to view bank account history and/or wield your ${staffType} privileges.`;
        welcomeHeader.parentNode
          .insertBefore(adminOrStaffPrivileges, welcomeHeader.nextElementSibling);
      }

      // showing Admin Section or Admin and Staff Section on user bank accounts history page
      if (window.location.href.includes('history')) {
        document.querySelector('.admin-staff-section').classList.remove('hide-admin-staff-section');
        if (window.location.href.includes('Staff')) {
          document.querySelector('.staff-section').classList.remove('hide-staff-section');
        }
      }
    };

    if (presentPageBody.classList.contains('admin-user-portal')
      && (window.location.href.includes('Staff') || window.location.href.includes('Admin'))) {
      displayAdminPriviledges();
    }
  });
};

startApp();
