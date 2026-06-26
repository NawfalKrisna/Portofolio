const robotContainer =
document.getElementById("robot-container");

const cardsContainer =
document.getElementById("cards-container");

const canvas =
document.getElementById("explode-canvas");

const ctx =
canvas.getContext("2d");

function resizeCanvas(){

canvas.width =
window.innerWidth;

canvas.height =
window.innerHeight;

}

resizeCanvas();

window.addEventListener(
	"resize",
	resizeCanvas
);

let particles = [];
const rect =
robotContainer.getBoundingClientRect();

const centerX =
rect.left + rect.width / 2;

const centerY =
rect.top + rect.height / 2;

class Particle{

	constructor(x,y){

this.x =
x + (Math.random()-0.5)*120;

this.y =
y + (Math.random()-0.5)*120;

		const angle =
		Math.random() * Math.PI * 2;

		const speed =
		Math.random() * 25 + 15;

		this.vx =
		Math.cos(angle) * speed;

		this.vy =
		Math.sin(angle) * speed;

		this.size =
		Math.random() * 5 + 2;

		this.life = 140;

		this.color = [
			"#dff9ff", // putih kebiruan
			"#ffffff", // putih
			"#8ef3ff", // cyan muda
			"#57e8ff", // cyan robot
			"#21d4fd", // neon cyan
			"#00bfff", // deep sky blue
			"#4facfe"  // electric blue
		][
			Math.floor(
				Math.random() * 7
			)
		];

	}

	update(){

		this.x += this.vx;
		this.y += this.vy;

		this.vx *= 0.97;
		this.vy *= 0.97;

		this.life--;

	}

	draw(){

		ctx.globalAlpha =
		this.life / 140;

		ctx.beginPath();

		ctx.arc(
			this.x,
			this.y,
			this.size,
			0,
			Math.PI * 2
		);

ctx.shadowBlur = 25;
ctx.shadowColor = this.color;

ctx.fillStyle =
this.color;

ctx.fill();

	}

}

robotContainer.addEventListener(
	"dblclick",
	() => {

		explodeRobot();		
		robotContainer.classList.add(
			"robot-hide"
		);

		setTimeout(() => {

			robotContainer.style.display =
			"none";

			cardsContainer.style.display =
			"flex";

			const cards =
			document.querySelectorAll(".card");

			cards.forEach(
				(card,index)=>{

					setTimeout(()=>{

						card.classList.add(
							"card-show"
						);

					},index*200);

				}
			);

		},600);

	}
);

const robot = document.querySelector("#robot");

let mouseX = 0;
let mouseY = 0;
let lastMove = Date.now();

document.addEventListener("mousemove", (e) => {

    lastMove = Date.now();

    mouseX =
        (e.clientX / window.innerWidth - 0.5) * 70;

    mouseY =
        (e.clientY / window.innerHeight - 0.5) * 50;

});

let idleTime = 0;

function animateRobot() {

    const idle =
        Date.now() - lastMove > 2000;

    if(idle){

        idleTime += 0.015;

        const scanX =
            Math.sin(idleTime) * 18;

        const scanY =
            75 + Math.cos(idleTime * 0.7) * 4;

        robot.cameraOrbit =
            `${scanX}deg ${scanY}deg 2.5m`;

    }else{

        robot.cameraOrbit =
            `${-mouseX}deg ${75 - mouseY}deg 2.5m`;

    }

    requestAnimationFrame(
        animateRobot
    );

}

animateRobot();

function explodeRobot(){

	const rect =
	robotContainer.getBoundingClientRect();

	const centerX =
	rect.left + rect.width/2;

	const centerY =
	rect.top + rect.height/2;

	particles = [];

	for(let i=0;i<700;i++){

		particles.push(
			new Particle(
				centerX,
				centerY
			)
		);

	}
}

function animateParticles(){

	ctx.clearRect(
		0,
		0,
		canvas.width,
		canvas.height
	);

	particles.forEach(
		p => {

			p.update();
			p.draw();

		}
	);

	particles =
	particles.filter(
		p => p.life > 0
	);

	ctx.globalAlpha = 1;

	requestAnimationFrame(
		animateParticles
	);

}

animateParticles();