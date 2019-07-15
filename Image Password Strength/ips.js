const password = document.getElementById('password');
const imgSrc = 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4639e1b6276d9554431592d07edc98e2&auto=format&fit=crop&w=1050&q=80';
const maxPixels = 50;
let img;
let quality = [];
let done = false;

password.addEventListener('keyup', (e) => {
    // Change this to improve the strength check
    const strength = e.target.value.length;
    const mappedStrength = Math.floor(mapRange(strength, 0, 10, maxPixels, 1));
    drawImageFromPoints(mappedStrength);
});

function mapRange(num, in_min, in_max, out_min, out_max) {
    if(num > in_max) {
        num = in_max;
    }
    return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function preload() {
    img = loadImage(imgSrc);
}

function setup() {
    createCanvas(innerWidth, innerHeight);
    pixelDensity(1);
    
    img.resize(width, 0);
    image(img, 0, 0);
    loadPixels();
    drawImageFromPoints(maxPixels);
}

function getPoints(step) {
    let points = [];

    // Save all points
    for(let x = 0; x < width; x+= step) {
        for(let y = 0; y < height; y+= step) {
            let index = (x + y * width) * 4;

            points.push({
                x,
                y,
                c: [
                    pixels[index],
                    pixels[index+1],
                    pixels[index+2]
                ],
                s: step
            });
        }
    }

    return points;
}

function drawImageFromPoints(step) {
    if(step < 10) {
        // A small check to prevent drawing the image multiple times when the password is already strength enough
        if(!done) {
            image(img, 0, 0);
            done = true;
        }
    } else {
    	const points = getPoints(step);
        points.forEach(p => {
            let color = p.c;
            noStroke();
            fill(...color);
            rect(p.x, p.y, p.s, p.s);
        });
        done = false;
    }
}