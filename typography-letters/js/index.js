var particleNumber = {
	Particle: function(x, y) {
		this.x = x;
		this.y = y;
		this.radius = 3.5;
		this.draw = function(ctx) {
			ctx.save();
			ctx.translate(this.x, this.y);
			ctx.fillStyle = 'white';
			ctx.fillRect(0, 0, this.radius, this.radius);
			ctx.restore();
		};
	},
	init: function() {
		particleNumber.canvas = document.querySelector('canvas');
		particleNumber.ctx = particleNumber.canvas.getContext('2d');
		particleNumber.W = window.innerWidth;
		particleNumber.H = window.innerHeight;
		particleNumber.particlePositions = [];
		particleNumber.particles = [];
		particleNumber.tmpCanvas = document.createElement('canvas');
		particleNumber.tmpCtx = particleNumber.tmpCanvas.getContext('2d');

		particleNumber.canvas.width = particleNumber.W;
		particleNumber.canvas.height = particleNumber.H;

		setInterval(function(){
			particleNumber.changeLetter();
			particleNumber.getPixels(particleNumber.tmpCanvas, particleNumber.tmpCtx);
		}, 1200);

		particleNumber.makeParticles(2000);
		particleNumber.animate();
	}, 
	currentPos: 0,
	changeLetter: function() {
		var letters = '987654321',
			letters = letters.split('');
		particleNumber.time = letters[particleNumber.currentPos];
		particleNumber.currentPos++;
		if (particleNumber.currentPos >= letters.length) {
			particleNumber.currentPos = 0;
		}
	},
	makeParticles: function(num) {
		for (var i = 0; i <= num; i++) {
			particleNumber.particles.push(new particleNumber.Particle(particleNumber.W / 2 + Math.random() * 400 - 200, particleNumber.H / 2 + Math.random() * 400 -200));
		}
	},
	getPixels: function(canvas, ctx) {
		var keyword = particleNumber.time,
			gridX = 6,
			gridY = 6;
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		ctx.fillStyle = 'red';
		ctx.font = 'bold 330px Noto Serif';
		ctx.fillText(keyword, canvas.width / 2 - ctx.measureText(keyword).width / 2, canvas.height / 2 + 100);
		var idata = ctx.getImageData(0, 0, canvas.width, canvas.height);
		var buffer32 = new Uint32Array(idata.data.buffer);
		if (particleNumber.particlePositions.length > 0) particleNumber.particlePositions = [];
		for (var y = 0; y < canvas.height; y += gridY) {
			for (var x = 0; x < canvas.width; x += gridX) {
				if (buffer32[y * canvas.width + x]) {
					particleNumber.particlePositions.push({x: x, y: y});
				}
			}
		}
	},
	animateParticles: function() {
		var p, pPos;
		for (var i = 0, num = particleNumber.particles.length; i < num; i++) {
			p = particleNumber.particles[i];
			pPos = particleNumber.particlePositions[i];
			if (particleNumber.particles.indexOf(p) === particleNumber.particlePositions.indexOf(pPos)) {
			p.x += (pPos.x - p.x) * .3;
			p.y += (pPos.y - p.y) * .3;
			p.draw(particleNumber.ctx);
		}
		
		}
	},
	animate: function() {
		requestAnimationFrame(particleNumber.animate);
		particleNumber.ctx.fillStyle = 'rgba(23, 41, 58, .8)';
		particleNumber.ctx.fillRect(0, 0, particleNumber.W, particleNumber.H);
		particleNumber.animateParticles();
	}
};

window.onload = particleNumber.init;