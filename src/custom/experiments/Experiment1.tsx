
import React from 'react';


const useInterval = (callback: () => void, delay: number) => {
    const savedCallback = React.useRef<() => void>();
    React.useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);
    React.useEffect(() => {
        function tick() {
            savedCallback.current?.();
        }
        if (delay !== null) {
            const id = setInterval(tick, delay);
            return () => clearInterval(id);
        }
    }, [delay]);
}

function normalRandom(mean: number, std: number) {
    let u = 0, v = 0;
    while(u === 0) u = Math.random();
    while(v === 0) v = Math.random();
    return mean + std * Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v );
}

export default function Experiment1() {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const graphCanvasRef = React.useRef<HTMLCanvasElement>(null);
    const [canvasHeight, setCanvasHeight] = React.useState<number>(window.innerHeight - 256);
    const [canvasWidth, setCanvasWidth] = React.useState<number>((window.innerHeight - 256) * 0.5625);

    const [enemyX, _] = React.useState<number>(canvasWidth / 2);
    const [bullets, setBullets] = React.useState<{x: number, y: number, xSpeed: number}[]>([]);
    const bulletSpeed = 30;

    const [std, __] = React.useState<number>(2);

    const [bulletMarks, setBulletMarks] = React.useState<number[]>([]);

    React.useEffect(() => {
        const n = Math.min(Math.ceil(Math.log2(bulletMarks.length + 4)) * 5, 160);
        const graphY: number[] = [];
        for (let i = 0; i < n; i++) {
            graphY.push(0);
        }
        for (let i = 0; i < bulletMarks.length; i++) {
            graphY[Math.floor(bulletMarks[i] / canvasWidth * n)]++;
        }

        const graphCanvas = graphCanvasRef.current;
        if (!graphCanvas) return () => {};
        const ctx = graphCanvas.getContext('2d');
        if (!ctx) return () => {};
        ctx.clearRect(0, 0, graphCanvas.width, graphCanvas.height);
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, graphCanvas.width, graphCanvas.height);

        const amp = n / graphCanvas.width * 32;

        ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, graphCanvas.height);
        for (let i = 0; i < n; i++) {
            ctx.lineTo(i / n * graphCanvas.width, graphCanvas.height - graphY[i] / bulletMarks.length * graphCanvas.height * amp);
            // ctx.lineTo((i + 1) / n * graphCanvas.width, graphCanvas.height - graphY[i] / bulletMarks.length * graphCanvas.height * amp);
        }
        ctx.lineTo(graphCanvas.width, graphCanvas.height);
        ctx.stroke();
        ctx.closePath();
        
    }, [bulletMarks, canvasWidth]);


    React.useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'white';

        ctx.fillRect(enemyX - 5, 5, 10, 10);

        ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
        ctx.lineWidth = 2;
        for (let i = 0; i < bullets.length; i++) {
            ctx.beginPath();
            ctx.moveTo(bullets[i].x, bullets[i].y);
            ctx.lineTo(bullets[i].x + bullets[i].xSpeed, bullets[i].y + bulletSpeed);
            ctx.stroke();
            ctx.closePath();
        }

        for (let i = 0; i < bulletMarks.length; i++) {
            ctx.fillStyle = 'rgba(255, 255, 255, 1)';
            ctx.beginPath();
            ctx.arc(bulletMarks[i], canvasHeight - 10, 1, 0, 2 * Math.PI);
            ctx.fill();
        }
    }, [enemyX, bullets]);

    function shoot() {
        setBullets(bullets => [...bullets, {x: enemyX, y: 20, xSpeed: normalRandom(0, std)}]);
    }

    useInterval(() => {
        const newBulletList: {x: number, y: number, xSpeed: number}[] = [];
        for (let i = 0; i < bullets.length; i++) {
            if (bullets[i].y < canvasHeight - 10 - bulletSpeed) {
                newBulletList.push({x: bullets[i].x + bullets[i].xSpeed, y: bullets[i].y + bulletSpeed, xSpeed: bullets[i].xSpeed});
            } else {
                setBulletMarks(bulletMarks => [...bulletMarks, bullets[i].x]);
            }
        }
        setBullets(newBulletList);
    }, 10);

    React.useEffect(() => {
        function handleResize() {
            setCanvasHeight(window.innerHeight - 64);
            setCanvasWidth(window.innerHeight * 0.5625);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }
    , []);

    return (
        <div className="Experiment1">
            <canvas ref={canvasRef} height={canvasHeight} width={canvasWidth} onClick={shoot} style={{margin: '0 auto', position: 'absolute', left: '0', right: '0'}}></canvas>
            <canvas ref={graphCanvasRef} height={96} width={canvasWidth} onClick={shoot} style={{margin: '0 auto', position: 'absolute', left: '0', right: '0', top: canvasHeight + 96}}></canvas>
        </div>
    );
}