const startApp = () => {
	document.addEventListener("DOMContentLoaded", function() {

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

		adminSection();

		// Section to Toggle Menu on Mobile Screen
		const mobileMenuToggle = () => {
			// toggleMenu on mobile
			const menu = document.querySelector('#menuB');
			const mainBody = document.querySelector('#main');
			const sideBar = document.querySelector('#side');
			const nav = document.querySelector('#side ul');

			const style = document.createElement('style');
			document.head.appendChild(style);

			const showMenu = () => {
				sideBar.classList.remove('reset-height');
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
					sideBar.classList.add('reset-height');
					mainBody.removeEventListener('click', hideMenu, false);
				}
				mainBody.addEventListener('click', hideMenu, false);
			}			  
			menu.addEventListener('click', showMenu, false);
		}

		mobileMenuToggle();
	
	});
}

startApp();