function startIntro(texts,contentId){
	const intro=document.getElementById('intro');
	const text=document.getElementById('intro-text');
	const content=document.getElementById(contentId);

	let i=0;
	let char=0;

	function type(){
		if(i>=texts.length){
			intro.style.opacity=0;

			setTimeout(()=>{
				intro.style.display='none';
				content.style.display='block';
				revealInit();
			},500);

			return;
		}

		const current=texts[i];

		if(char<current.length){
			text.textContent+=current.charAt(char);
			char++;

			setTimeout(type,40);
			return;
		}

		setTimeout(()=>{
			text.textContent='';
			char=0;
			i++;
			type();
		},900);

	}

	type();
}

/* REVEAL ANIMATION */
function revealInit(){
	const elements=document.querySelectorAll('.reveal');
	const observer=new IntersectionObserver(entries=>{
		entries.forEach(entry=>{
			if(entry.isIntersecting){
				entry.target.classList.add('active');
			}
		});
	});

	elements.forEach(el=>observer.observe(el));
}

/* CURSOR GLOW */
document.addEventListener('mousemove',e=>{
	const glow=document.getElementById('cursor-glow');

	if(!glow) return;
	glow.style.left=e.clientX+'px';
	glow.style.top=e.clientY+'px';
});

/* GLASS BUTTON LIGHT */
const buttons=document.querySelectorAll(".glass-btn");
buttons.forEach(btn=>{

	btn.addEventListener("mousemove",e=>{
		const rect=btn.getBoundingClientRect();
		const x=e.clientX-rect.left;
		const y=e.clientY-rect.top;

		btn.style.setProperty("--x",x+"px");
		btn.style.setProperty("--y",y+"px");
	});
});

/* NAVBAR MAGNETIC + LIGHT */
const navItems=document.querySelectorAll(".nav-item");
navItems.forEach(item=>{

	item.addEventListener("mousemove",e=>{
		const rect=item.getBoundingClientRect();
		const x=e.clientX-rect.left;
		const y=e.clientY-rect.top;

		item.style.setProperty("--x",x+"px");
		item.style.setProperty("--y",y+"px");

		/* MAGNETIC EFFECT */
		const moveX=(x-rect.width/2)*0.2;
		const moveY=(y-rect.height/2)*0.2;

		item.style.transform=`translate(${moveX}px, ${moveY}px)`;

	});

	item.addEventListener("mouseleave",()=>{
		item.style.transform="translate(0,0)";
	});
});

/* NAVBAR LIQUID BUBBLE */
const bubble = document.querySelector(".nav-bubble");

function moveBubble(target){
	const rect = target.getBoundingClientRect();
	const navRect = target.parentElement.getBoundingClientRect();

	bubble.style.width = rect.width + "px";
	bubble.style.height = rect.height + "px";

	bubble.style.left = rect.left - navRect.left + "px";
	bubble.style.top = rect.top - navRect.top + "px";

	bubble.style.opacity = 1; 

	bubble.classList.remove("liquid");
	void bubble.offsetWidth;
	bubble.classList.add("liquid");
}

navItems.forEach(item=>{
	item.addEventListener("mouseenter",()=>{
		moveBubble(item);
	});

	item.addEventListener("click",()=>{
		navItems.forEach(i=>i.classList.remove("active"));
		item.classList.add("active");
		moveBubble(item);
	});
});

/* bubble start di active */
window.addEventListener("load",()=>{

	setTimeout(()=>{
		const active=document.querySelector(".nav-item.active");
		if(active){
			moveBubble(active);
		}
	},60);
});

/* NAVBAR SCROLL HIDE */
let lastScroll = 0;
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
	const currentScroll = window.pageYOffset;
		if(currentScroll > lastScroll && currentScroll > 100){
			navbar.classList.add("hide");
		}else{
			navbar.classList.remove("hide");
		}
		lastScroll = currentScroll;
});

document.addEventListener("DOMContentLoaded", () => {

	const cards = document.querySelectorAll(".card");

	/* cursor light */
	cards.forEach(card => {

		card.addEventListener("mousemove", e => {
			const rect = card.getBoundingClientRect();

			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;

			card.style.setProperty("--x", x + "px");
			card.style.setProperty("--y", y + "px");
		});
	});

cards.forEach(card => {

	card.addEventListener("click", () => {
		const id = card.getAttribute("data-card");
		// hapus active card lain
		cards.forEach(c => c.classList.remove("active"));
		// aktifkan card yang diklik
		card.classList.add("active");
		// simpan ke localStorage
		localStorage.setItem("lastCard", id);
	});
});

	/* load → aktifkan card terakhir */
	const lastCard = localStorage.getItem("lastCard");

	if(lastCard){
		const activeCard = document.querySelector(`[data-card="${lastCard}"]`);
		if(activeCard){
			activeCard.classList.add("active");
		}
	}
});

/* =========================
   ACTIVE NAV DESKTOP + MOBILE
========================= */
const currentPath = window.location.pathname.replace(/\/$/, "") || "/";

function normalizePath(path){
	path = path.replace(/\/$/, "");
	return path === "" ? "/" : path;
}

function isHomePath(path){
	return path === "/portogha" || path === "/";
}

/* desktop */
document.querySelectorAll(".nav-item").forEach(link => {
	const linkPath = normalizePath(
		new URL(link.href, window.location.origin).pathname
	);

	if (
		(isHomePath(currentPath) && isHomePath(linkPath)) ||
		currentPath === linkPath
	){
		link.classList.add("active");
	}
});

/* mobile */
document.querySelectorAll(".mobile-nav-item").forEach(link => {
	const linkPath = normalizePath(
		new URL(link.href, window.location.origin).pathname
	);

	if (
		(isHomePath(currentPath) && isHomePath(linkPath)) ||
		currentPath === linkPath
	){
		link.classList.add("active");
	}
});

const aboutBtn = document.querySelector(".about-btn");

if (aboutBtn) {

	aboutBtn.addEventListener("mousemove", (e) => {

		const rect =
		aboutBtn.getBoundingClientRect();

		const x =
		e.clientX - rect.left;

		const y =
		e.clientY - rect.top;

		aboutBtn.style.setProperty(
			"--x",
			x + "px"
		);

		aboutBtn.style.setProperty(
			"--y",
			y + "px"
		);

	});

}

const projectCards = document.querySelectorAll(".p-card");
let sliderIndex = 0;

function updateSlider(){
	projectCards.forEach((card, i)=>{

		card.classList.remove("active","left","right","hidden");

		if(i === sliderIndex){
			card.classList.add("active");
		}
		else if(i === sliderIndex - 1){
			card.classList.add("left");
		}
		else if(i === sliderIndex + 1){
			card.classList.add("right");
		}
		else{
			card.classList.add("hidden");
		}

	});
}

// INIT
updateSlider();

const isMobile = window.innerWidth <= 768;

/* =========================
   DESKTOP (HOVER CONTROL)
========================= */
function initDesktop(){

	projectCards.forEach((card, i)=>{

		card.addEventListener("mouseenter", ()=>{

			if(i === sliderIndex - 1){
				sliderIndex--;
			}
			else if(i === sliderIndex + 1){
				sliderIndex++;
			}

			if(sliderIndex < 0) sliderIndex = projectCards.length - 1;
			if(sliderIndex >= projectCards.length) sliderIndex = 0;

			updateSlider();
		});

	});
}

/* =========================
   MOBILE (TAP + SWIPE)
========================= */
function initMobile(){

	// TAP
	projectCards.forEach((card, i)=>{

		card.addEventListener("click", ()=>{
			sliderIndex = i;
			updateSlider();
		});

	});

	// SWIPE
	let startX = 0;
	const slider = document.querySelector(".slider");

	if(!slider) return;

	slider.addEventListener("touchstart", (e)=>{
		startX = e.touches[0].clientX;
	}, {passive:true});

	slider.addEventListener("touchend", (e)=>{

		let diff = startX - e.changedTouches[0].clientX;

		if(diff > 50){
			sliderIndex++;
		}
		else if(diff < -50){
			sliderIndex--;
		}

		if(sliderIndex < 0) sliderIndex = projectCards.length - 1;
		if(sliderIndex >= projectCards.length) sliderIndex = 0;

		updateSlider();

	}, {passive:true});
}

/* =========================
   INIT MODE
========================= */
if(isMobile){
	initMobile();
}else{
	initDesktop();
}

/* =========================
   AUTO SLIDE (SAFE)
========================= */
setInterval(()=>{

	sliderIndex++;

	if(sliderIndex >= projectCards.length){
		sliderIndex = 0;
	}

	updateSlider();

}, 4000);

/* =========================
   MOBILE NAV TOUCH EFFECT
========================= */
const mobileNavItems = document.querySelectorAll(".mobile-nav-item");

mobileNavItems.forEach(item => {

	item.addEventListener("touchstart", () => {
		item.classList.add("pressed");
	}, { passive: true });

	item.addEventListener("touchend", () => {
		setTimeout(() => {
			item.classList.remove("pressed");
		}, 120);
	}, { passive: true });

	item.addEventListener("touchcancel", () => {
		item.classList.remove("pressed");
	}, { passive: true });

	/* fallback kalau di browser mobile tapi klik biasa */
	item.addEventListener("mousedown", () => {
		item.classList.add("pressed");
	});

	item.addEventListener("mouseup", () => {
		setTimeout(() => {
			item.classList.remove("pressed");
		}, 120);
	});

	item.addEventListener("mouseleave", () => {
		item.classList.remove("pressed");
	});
});

/* =========================
   MOBILE NAV ACTIVE CLICK
========================= */
const mobileLinks = document.querySelectorAll(".mobile-nav-item");

mobileLinks.forEach(link => {
	link.addEventListener("click", () => {
		mobileLinks.forEach(item => item.classList.remove("active"));
		link.classList.add("active");

		setTimeout(() => {
			document.body.classList.remove("mobile-menu-open");
		}, 120);
	});
});