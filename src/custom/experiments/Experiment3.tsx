
import React from 'react';

import '../../checkbox.css'

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

export default function Experiment3() {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const graphCanvasRef = React.useRef<HTMLCanvasElement>(null);
    const [canvasHeight, setCanvasHeight] = React.useState<number>(window.innerHeight - 256);
    const [canvasWidth, setCanvasWidth] = React.useState<number>((window.innerHeight - 256) * 0.5625);

    const [enemyX, setEnemyX] = React.useState<number>(canvasWidth * (Math.random() * 0.6 + 0.2));
    const [bullets, setBullets] = React.useState<{x: number, y: number, xSpeed: number}[]>([]);
    const bulletSpeed = 30;

    const [n, setN] = React.useState<number>(10);
    const [std, setStd] = React.useState<number>(2);

    const [bulletMarks, setBulletMarks] = React.useState<number[]>([]);

    const [fog, setFog] = React.useState<boolean>(true);

    const [smoothen, setSmoothen] = React.useState<boolean>(false);

    const [left, setLeft] = React.useState<number>(0);

    const [compareWidth, setCompareWidth] = React.useState<number>(1);

    const [success, setSuccess] = React.useState<number>(0);
    const [trial, setTrial] = React.useState<number>(0);

    React.useEffect(() => {
        const n = Math.min(Math.ceil(Math.log2(bulletMarks.length + 4) * 5), 160);
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
        if (!smoothen || bulletMarks.length < 2) {
            for (let i = 0; i < n; i++) {
                ctx.lineTo(i / n * graphCanvas.width, graphCanvas.height - graphY[i] / bulletMarks.length * graphCanvas.height * amp);
            }
            ctx.lineTo(graphCanvas.width, graphCanvas.height);
        } else {
            const sample_mean = bulletMarks.reduce((a, b) => a + b) / bulletMarks.length;
            const sample_std = Math.sqrt(bulletMarks.reduce((a, b) => a + Math.pow(b - sample_mean, 2)) / bulletMarks.length);
            for (let i = 1; i < 320; i++) {
                const x = i / 320 * graphCanvas.width;
                const dist = Math.abs(x - sample_mean) / sample_std;
                const y = Math.exp(-Math.pow(dist, 2) / 2) / Math.sqrt(2 * Math.PI) / sample_std;
                ctx.lineTo(i / 320 * graphCanvas.width, graphCanvas.height - y * graphCanvas.height * (320 / graphCanvas.width * 32));
            }
            ctx.lineTo(graphCanvas.width, graphCanvas.height);
        }

        ctx.stroke();
        ctx.closePath();
        
    }, [bulletMarks, canvasWidth, smoothen]);


    React.useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'white';

        if (!fog || left > 0) {
            ctx.fillRect(enemyX - 5, 5, 10, 10);
        }

        ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
        ctx.lineWidth = 2;
        for (let i = 0; i < bullets.length; i++) {
            if (left <= 0 && fog && bullets[i].y < canvasHeight - 32) continue;
            ctx.beginPath();
            ctx.moveTo(bullets[i].x + bullets[i].xSpeed, bullets[i].y);
            ctx.lineTo(bullets[i].x + bullets[i].xSpeed, bullets[i].y + bulletSpeed);
            ctx.stroke();
            ctx.closePath();
        }

        for (let i = 0; i < bulletMarks.length; i++) {
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.beginPath();
            ctx.arc(bulletMarks[i], canvasHeight - 10, 2, 0, 2 * Math.PI);
            ctx.fill();
        }

        if (fog && left <= 0) {
            ctx.fillStyle = `rgba(64, 64, 64, 1)`;
            ctx.fillRect(0, 0, canvas.width, canvas.height * 0.9);
            for (let i = 0; i < 20; i++) {
                ctx.fillStyle = `rgba(64, 64, 64, ${1 - i / 20})`;
                ctx.fillRect(0, canvas.height * 0.9 + i * canvas.height * 0.07 / 20 - 2, canvas.width, canvas.height * 0.2 / 20);
            }
        }

        
    }, [enemyX, bullets]);

    function shoot() {
        setBulletMarks([]);
        const newEnemyX = canvasWidth * (Math.random() * 0.6 + 0.2);
        setEnemyX(newEnemyX);
        // setBullets(bullets => [{x: enemyX, y: 20, xSpeed: normalRandom(0, std)}]);
        // n Bullets
        const newBullets: {x: number, y: number, xSpeed: number}[] = [];
        for (let i = 0; i < n; i++) {
            newBullets.push({x: newEnemyX, y: 20, xSpeed: normalRandom(0, std)});
        }
        setBullets(newBullets);
    }

    function attempt(left: number) {
        if (canvasRef.current === null) return;
        const cent = left - canvasRef.current?.getBoundingClientRect().left;
        console.log(cent, enemyX, compareWidth)
        if (left <= 0) return;
        if (Math.abs((cent) - enemyX) < (compareWidth / 2)) {
            setSuccess(success => success + 1);
        }
        setTrial(trial => trial + 1);
    }

    React.useEffect(() => {
        setTrial(0);
        setSuccess(0);
    }, [compareWidth]);
        

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
            setCanvasHeight((window.innerHeight - 256));
            setCanvasWidth((window.innerHeight - 256) * 0.5625);
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }
    , []);

    const ui_x = -32;
    const ui_y = 96;
    const center = (canvasRef.current)?left - canvasRef.current?.getBoundingClientRect().left: 0;
    return (
        <div className="Experiment3">
            <canvas ref={canvasRef} height={canvasHeight} width={canvasWidth} style={{margin: '0 auto', position: 'absolute', left: '0', right: '0'}}></canvas>
            <canvas ref={graphCanvasRef} height={96} width={canvasWidth} style={{border: '1px solid black', margin: '0 auto', position: 'absolute', left: '0', right: '0', top: canvasHeight + 96}}></canvas>
            <label style={{color: 'white', fontWeight:'bold', position: 'absolute', left: window.innerWidth / 2 + canvasWidth / 2 - 54 + ui_x, top: ui_y + 56}}>n</label>
            <input type='number' value={n} onChange={e => setN(parseInt(e.target.value))} style={{position: 'absolute', left: window.innerWidth / 2 + canvasWidth / 2 - 36 + ui_x, top: ui_y + 56, width: 48}}></input>
            <label style={{color: 'white', fontWeight:'bold', position: 'absolute', left: window.innerWidth / 2 + canvasWidth / 2 - 54 + ui_x, top: ui_y + 24}}>σ</label>
            <input type='number' value={std} onChange={e => setStd(parseInt(e.target.value))} style={{position: 'absolute', left: window.innerWidth / 2 + canvasWidth / 2 - 36 + ui_x, top: ui_y + 24, width: 48}}></input>
            <input className="checkbox" type="checkbox" checked={fog} onChange={e => setFog(e.target.checked)} style={{position: 'absolute', left: window.innerWidth / 2 + canvasWidth / 2 - 12 + ui_x, top: ui_y + 88}}></input>
            <label style={{color: 'white', fontWeight:'bold', position: 'absolute', left: window.innerWidth / 2 + canvasWidth / 2 - 44 + ui_x, top: ui_y + 84}}>Fog</label>
            <input className="checkbox" type="checkbox" checked={smoothen} onChange={e => setSmoothen(e.target.checked)} style={{position: 'absolute', left: window.innerWidth / 2 + canvasWidth / 2 - 12 + ui_x, top: ui_y + 118}}></input>
            <label style={{color: 'white', fontWeight:'bold', position: 'absolute', left: window.innerWidth / 2 + canvasWidth / 2 - 57 + ui_x, top: ui_y + 116}}>Norm</label>
            <button onClick={() => {setBulletMarks([]); setEnemyX(canvasWidth / 2); setBullets([]); setTrial(0); setSuccess(0);}} style={{position: 'absolute', left: window.innerWidth / 2 + canvasWidth / 2 - 24 + ui_x, top: ui_y + 158}}>Reset</button>
            <input type="range" min="1" max="100" value={compareWidth} onChange={e => setCompareWidth(parseInt(e.target.value))} style={{position: 'absolute', left: window.innerWidth / 2 + canvasWidth / 2 - 68 + ui_x, top: ui_y + 190, width: '96px'}}></input>
            <input type="number" min="1" max="100" value={compareWidth} onChange={e => setCompareWidth(parseInt(e.target.value))} style={{position: 'absolute', left: window.innerWidth / 2 + canvasWidth / 2 - 32 + ui_x, top: ui_y + 208}}></input>
            <div className="success_rate" style={{color: 'white', fontWeight:'bold', position: 'absolute', left: window.innerWidth / 2 + canvasWidth / 2 - 32 + ui_x, top: ui_y + 248}}>{(trial === 0)?'- %':(success / trial * 100).toFixed(0) + '%'}</div>
            <div style={{borderBottom: '1px solid lightgray',
            width: '321px', backgroundColor: 'white', userSelect: 'none', position: 'absolute', left: window.innerWidth / 2 - 160, top: canvasHeight + 200, height: '368px'}}
            onTouchStart={(e) => {setLeft(e.touches[0].clientX);}}
            onMouseDown={(e) => {setLeft(e.clientX); attempt(e.clientX);}}
            onTouchEnd={() => {setLeft(-1000);}}
            onTouchCancel={() => {setLeft(-1000);}}
            onMouseMove={(e) => {if (e.buttons === 1) setLeft(e.clientX)}}
            onTouchMove={(e) => setLeft(e.touches[0].clientX)}
            onMouseUp={() => {setLeft(-1000); shoot();}}
            >
                비교
                <div style={{position: 'fixed', backgroundColor: (Math.abs((center) - enemyX) < (compareWidth / 2))?'rgba(0, 255, 0, 0.5)':'rgba(255, 0, 0, 0.5)', width: compareWidth + 'px', height: '90vh', top: '72px', left: Math.floor(left - compareWidth/2) + 'px'}}></div>
            </div>
        </div>
    );
}