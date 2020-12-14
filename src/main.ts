
function main() {
    console.log('Hello');
    const canvas = document.getElementById('screen') as HTMLCanvasElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');

    if (ctx == null) {
        document.body.innerHTML = "Your browser doesn't support canvas";
        return;
    }
    ctx.fillText('Hello world', 10, 10);
}

window.addEventListener('load', main);