(function(){
    let canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d'),
    w = canvas.width = innerWidth,
    h = canvas.height = innerHeight,
    particles = [],
    properties = {
        bg: 'rgba(17,17,17,1)',
        //partColor: 'rgba(255,40,40,1)',
        partColor: 'rgba(250,250,250,.13)',
        partRadius: 3,
        partCount: 100,
        partMaxVelocity: 2.5,
        lineLength: 190,
        partLife: 6
    };
    document.querySelector('body').appendChild(canvas);

    window.onresize = function(){
        w = canvas.width = innerWidth;
        h = canvas.height = innerHeight;
    }

    class Particle{
        constructor(){
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.velocityX = Math.random() * (properties.partMaxVelocity * 2) - properties.partMaxVelocity;
            this.velocityY = Math.random() * (properties.partMaxVelocity * 2) - properties.partMaxVelocity;
            this.life = Math.random() * properties.partLife * 60;

        }
        position(){
            this.x + this.velocityX > w && this.velocityX > 0 || this.x + this.velocityX < 0 && this.velocityX < 0 ? this.velocityX *= -1 : this.velocityX;
            this.y + this.velocityY > h && this.velocityY > 0 || this.y + this.velocityY < 0 && this.velocityY < 0 ? this.velocityY *= -1 : this.velocityY;
            this.x += this.velocityX;
            this.y += this.velocityY;
        }
        reDraw(){
            ctx.beginPath();
            ctx.arc(this.x, this.y, properties.partRadius, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fillStyle = properties.partColor;
            ctx.fill();
        }
        reCalculateLife(){
            if (this.life < 1){
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.velocityX = Math.random() * (properties.partMaxVelocity * 2) - properties.partMaxVelocity;
                this.velocityY = Math.random() * (properties.partMaxVelocity * 2) - properties.partMaxVelocity;
                this.life = Math.random() * properties.partLife * 60;
            }
            this.life--;
        }
    }

    function reDrawBackground(){
        ctx.fillStyle = properties.bg;
        ctx.fillRect(0, 0, w, h);
    }

    function drawLines(){
        let x1, y1, x2, y2, length, opacity;
        for(let i in particles){
            for(let j in particles){
                x1 = particles[i].x;
                y1 = particles[i].y;
                x2 = particles[j].x;
                y2 = particles[j].y;
                length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
                if (length < properties.lineLength){
                    opacity = 1 - length / properties.lineLength;
                    ctx.lineWidth = '0.5';
                    ctx.strokeStyle = 'rgba(50, 50, 50, '+opacity+')';
                    // ctx.strokeStyle = 'rgba(255, 40, 40, '+opacity+')';
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.closePath();
                    ctx.stroke();
                }
            }
        }
    }

    function redrawParticles(){
        for(let i in particles){
            particles[i].reCalculateLife();
            particles[i].position();
            particles[i].reDraw();
        }
    }

    function loop(){
        reDrawBackground();
        redrawParticles();
        drawLines();
        requestAnimationFrame(loop);
    }

    function init(){
        for(let i = 0; i < properties.partCount;i++){
            particles.push(new Particle);
        }
        loop();
    }

    init();
}())