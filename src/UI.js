export default class UI {
	constructor() {}

	initArrow() {
		const arrowIcon = document.getElementsByClassName("arrow-icon")[0];

		arrowIcon.addEventListener("click", () => {
			window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
		});
	}

	initResizeableNav() {
		// Controlling the navbar when page gets too narrow
		const toggleButton = document.getElementsByClassName("toggle-button")[0];
		const mobileMenu = document.getElementsByClassName("mobile-nav")[0];

		toggleButton.addEventListener("click", () => {
			mobileMenu.classList.toggle("active");
		});

		window.addEventListener("resize", () => {
			if (window.matchMedia("(min-width: 600px)").matches) {
				mobileMenu.classList.remove("active");
			}
		});
	}

	initResizablePageLayout() {
		window.addEventListener("resize", () => {
			if (window.matchMedia("(max-width: 600px)").matches) {
				//const boundhandleHomeRestructure = this.handleHomeRestructureAll.bind(this);
				this.handleHomeRestructureSmall();
			}
		});
	}

	handleHomeRestructureSmall() {
		const column6 = document.getElementsByClassName("column is-6")[0];
		column6.classList.toggle("active");

		const container = document.createElement("div");
		container.classList.add("resized-container");
		const gameScreen = document.getElementById("gameScreen");

		const deathlist = document.getElementsByClassName("column is-3")[0];
		console.log(deathlist);
		container.appendChild(deathlist);

		const input = document.getElementsByClassName("column is-3")[0];
		container.appendChild(input);

		gameScreen.after(container);
	}

	initInfoTabs() {
		const infoTabs = document.getElementsByClassName("tab");
		for (const tab of infoTabs) {
			const boundHandleSwitchInfoTab = this.handleSwitchInfoTab.bind(this);
			tab.addEventListener("click", boundHandleSwitchInfoTab);
		}
	}

	handleSwitchInfoTab(e) {
		const containers = document.getElementsByClassName("tab");
		for (const container of containers) {
			container.classList.remove("active");
		}

		e.target.classList.toggle("active");

		const infoContainers = document.getElementsByClassName("info");
		for (const infoContainer of infoContainers) {
			infoContainer.classList.remove("active");
		}

		if (e.target.getAttribute("id") == "tab1") {
			document.getElementById("HowToPlay").classList.toggle("active");
		} else if (e.target.getAttribute("id") == "tab2") {
			document.getElementById("GameMechanics").classList.toggle("active");
		}
	}
}
