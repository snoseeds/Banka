const startApp = () => {
	document.addEventListener("DOMContentLoaded", function() {
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
					  adminElement.style.display = "inline-block";
						// TimeOut to Remove admin from page after a little while
						setTimeout(() => {
							adminElement.style.display = "none"
					  	noOfClick = 0;
					  	lastClick = undefined;
						}, 5000);
					} else {
				  	noOfClick = 0;
				  	lastClick = undefined;
					}

				}
			}

		  const adminTestingElement = document.querySelector('#heading');
		  adminTestingElement.addEventListener('click', adminDisplayer, false);		
		}

		const logOutMessage = () => {
			const logOut = document.querySelector('.log-out-message');
			logOut.style.display = window.location.href.endsWith('?log_out') ? 'block' : 'none';
		}

		if (presentPageBody.classList.contains('homePage')) {
			adminSection();
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

			// Toggle Menu on Login Forms Display
			const overlayForLogin = document.querySelector('#transOverlay');
			const slidingLogIn = document.querySelector('#slidingLogIn');

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
						overlayForLogin.removeEventListener('click', hideMenu, false);
						slidingLogIn.removeEventListener('click', hideMenu, false);
						overlayForLogin.removeAttribute('onclick');
						overlayForLogin.style.zIndex = '2';

					}
				}
				mainBody.addEventListener('click', hideMenu, false);
				if (formStatus) {
					overlayForLogin.style.zIndex = '3';
					overlayForLogin.setAttribute('onclick', 'event.stopPropagation()');
					overlayForLogin.addEventListener('click', hideMenu, false);
					slidingLogIn.addEventListener('click', hideMenu, false);
				}
			}			  
			menu.addEventListener('click', showMenu, false);
		}

		mobileMenuToggle();


		// Section to Toggle Login Form on Sign-in Pages
		const loginFormToggle = () => {
			// Show Login form on clicking SignIn Button, and Hide it on clicking body
			const mainBody = document.querySelector('#main');
			const slideContainer = document.querySelector('#slideContainer');
			const signInBtn = document.querySelector('#signInBtn');
			const transOverlay = document.querySelector('#transOverlay');
			const slideLogin = document.querySelector('#slideLogin');
			const slideForm = document.querySelector('#slideForm');

			const showForm = (linkForLogin) => {
				const formLoginButton = document.querySelector('#loginButton');
				formLoginButton.setAttribute('href', `${linkForLogin}`);

				mainBody.style.paddingTop = '0'
				slideContainer.classList.add('abs');
				transOverlay.classList.add('transparent-overlay');
				slideLogin.classList.add('show-login-form');

				// Activate mobile toggle menu button while viewing form on mobiles
				mobileMenuToggle(true);

				const hideForm = () => {
					mainBody.style.paddingTop = '5';
					slideContainer.classList.remove('abs');
					slideLogin.classList.remove('show-login-form');
					transOverlay.classList.remove('transparent-overlay');
					mainBody.removeEventListener('click', hideForm, false);
					formLoginButton.setAttribute('href', '');
				}
				mainBody.addEventListener('click', hideForm, false);
			}

			const loginLinkRouter = () => {
				// Sign-in Buttons present
				const userSignIn = document.querySelector('.user-sign-in');
				const staffSignIn = document.querySelector('.staff-sign-in');
				const adminSignIn = document.querySelector('.admin-sign-in');
									
				// Adding Event listeners on all sign-in buttons on pages across the app
				// We presently have the following only on index.html and staffAndAdminMainPage.html
				if (presentPageBody.classList.contains('allAdminPage')) {
					staffSignIn.addEventListener('click', function () {
						const buttonTitle = staffSignIn.textContent;
						const loginLink = `${buttonTitle.slice(0, -8).toLowerCase()}_portal.html`;
						showForm(loginLink);
					}, false);

					adminSignIn.addEventListener('click', function () {
						const buttonTitle = adminSignIn.textContent;
						const loginLink = `${buttonTitle.slice(0, -8).toLowerCase()}_portal.html`;
						showForm(loginLink);
					}, false);
				} else {
					userSignIn.addEventListener('click', function () {
						const buttonTitle = userSignIn.textContent;
						const loginLink = `${buttonTitle.slice(0, -8).toLowerCase()}_portal.html`;
						showForm(loginLink);
					}, false);
				}



			}

			loginLinkRouter();
			// signInBtn.addEventListener('click', showForm, false);

		}

		if (presentPageBody.classList.contains('loginPage')) {
			loginFormToggle();
			logOutMessage();
		}

		const accItemToggle = () => {
			const accMenuItems = document.querySelectorAll('.accordion');
			
			function toggleAccItem () {
		    this.classList.toggle('active-acc');
		    const panel = this.nextElementSibling;
		    panel.style.maxHeight = panel.style.maxHeight ? null : `${panel.scrollHeight}px`;
		  }
		  accMenuItems.forEach(accMenuItem =>
		  	accMenuItem.addEventListener('click', toggleAccItem, false));
		}

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

			function showDialogBox () {
				confirmationBoxTxt.textContent = `${this.dataset.question}`;
				confirmActionBtn.setAttribute('href', `${this.dataset.url}`);
				confirmActionBtn.textContent = `${this.dataset.urlTitle}`;
				confirmationBox.classList.add('show-confirmation');
				transOverlay.classList.add('transparent-overlay');

				const hideDialogBox = () => {
					confirmationBox.classList.remove('show-confirmation');
					transOverlay.classList.remove('transparent-overlay');
				}
				stopActionBtn.addEventListener('click', hideDialogBox, false);
				transOverlay.addEventListener('click', hideDialogBox, false);
			}

			actionButtons.forEach(actionButton =>
		  	actionButton.addEventListener('click', showDialogBox, false));

		}

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

				moreOptionsGuide.forEach(altTxt => 
					altTxt.textContent = altTxt.dataset.guideTxt);
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
				}
				advHistoryBtn.addEventListener('click', hideAdvancedOptions, false);
			}

			advHistoryBtn.addEventListener('click', showAdvancedOptions, false);

		}
		if (presentPageBody.classList.contains('history')) {
			advancedHistory();
		}

		const adminCrewSignUpRouter = () => {
			const title = document.querySelector('title');
			const mainPageAside = document.querySelector('#pageSideBar');
			const portalPageAside = document.querySelector('#portalSideBar');
			const formIntro = document.querySelector('header.intro h3');
			const submitForm = document.querySelector('#submitForm');
			const logOut = document.querySelector('.log-out');

			const pageCaller = window.location.href.includes('staff') ? 'staff' :
												 window.location.href.includes('root') ? 'root' : 'admin';

			const updateSignUpForm = () => {
				switch (pageCaller) {
					case 'root': 
						formIntro.textContent = "Create Root Admin Account that's needed to kickstart Banka";
						mainPageAside.style.display = 'block';
						submitForm.textContent = "Become a Root Admin";
						submitForm.setAttribute('href', 'root_admin_success.html');
						logOut.style.display = 'none';
						title.textContent = 'Banka | Root Admin Sign Up';
						break;
					case 'admin':
						formIntro.textContent = "Create Account for an Admin";
						portalPageAside.style.display = 'block';
						submitForm.textContent = "Create Admin Account";
						submitForm.setAttribute('href', 'admin_account_success.html?admin');
						title.textContent = 'Banka | Create Admin Account';
						accItemToggle();
						break;
					case 'staff':
						formIntro.textContent = "Create Account for a Staff Member";
						portalPageAside.style.display = 'block';
						submitForm.textContent = "Create Staff Account";
						submitForm.setAttribute('href', 'admin_account_success.html?staff');
						title.textContent = 'Banka | Create Staff Account';
						accItemToggle();
						break;
				}
			}
			updateSignUpForm();
		}

		if (presentPageBody.classList.contains('admin-sign-up')) {
			adminCrewSignUpRouter();
		}

		const createAdminStaffSuccess = () => {
			const accountType = document.querySelector('#accountType');
			
			accountType.textContent = window.location.href.includes('staff') ?
				accountType.dataset.staff : accountType.dataset.admin;
		}

		if (presentPageBody.classList.contains('admin-staff-success')) {
			createAdminStaffSuccess();
		}






	});

}

startApp();