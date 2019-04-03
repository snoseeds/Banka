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
			logOutMessage();
		}

		// Section to Toggle Menu on Mobile Screen
		const mobileMenuToggle = (formStatus) => {
			// toggleMenu on mobile
			const menu = document.querySelector('#menuB');
			const mainBody = document.querySelector('#main');
			const sideBar = document.querySelector('#side');
			const nav = document.querySelector('#side ul');

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
					#side {
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
				const setDialogBoxWidth = () => {
					const mainBody = document.querySelector('.main-body');
					// if (!document.querySelector('style')) {
						const style = document.createElement('style');
						document.head.appendChild(style);
					// }

					const mainBodyStyles = window.getComputedStyle(mainBody);
					const mainBodyWidth = mainBodyStyles.getPropertyValue('width').slice(0, -2);
					style.textContent = `@media only screen and (min-width: 400px) {
							.confirmation {
								width: ${mainBodyWidth * 0.6}px;	
							}			
					}`;
				}
				setDialogBoxWidth();

				confirmationBoxTxt.textContent = `${this.dataset.question}`;
				confirmActionBtn.setAttribute('href', `${this.dataset.url}`);
				confirmActionBtn.textContent = `${this.dataset.urlTitle}`;
				confirmationBox.classList.add('show-confirmation');
				transOverlay.classList.add('transparent-overlay');

				if (confirmActionBtn.textContent == 'Log Out') {
					const displayLogOutMessage = () => {
						confirmActionBtn.setAttribute('href', `${this.dataset.url}?log_out`);
					}

					confirmActionBtn.addEventListener('click', displayLogOutMessage, false)
				}

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




	});

}

startApp();