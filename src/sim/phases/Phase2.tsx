import { useEffect, useRef, useState } from "react";

function generateNormalDistribution() {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); // Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

function drawTick(canvas: HTMLCanvasElement, tickStart: number, tickEnd: number) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    // Draw x-axis tick marks
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = tickStart; i <= tickEnd; i += 5) {
        ctx.moveTo(18 + (canvas.width-30)/(tickEnd-tickStart)*(i-tickStart), canvas.height-12);
        ctx.lineTo(18 + (canvas.width-30)/(tickEnd-tickStart)*(i-tickStart), canvas.height-8);
    }
    ctx.stroke();
    ctx.closePath();

    // Draw x-axis tick mark labels
    const tickInterval = 5;
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    for (let i = tickStart; i <= tickEnd; i += tickInterval) {
        ctx.fillText((i).toString(), 18 + (canvas.width-30)/(tickEnd-tickStart)*(i-tickStart), canvas.height-8);
    }

}

function drawToMain(canvas: HTMLCanvasElement, sample: number[]) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const tickStart = 25;
    const tickEnd = 85;
    
    const sortedSample = sample.sort((a, b) => a - b);
    const boxPlotQ1 = sortedSample[Math.floor(sample.length/4)];
    const boxPlotQ2 = sortedSample[Math.floor(sample.length/2)];
    const boxPlotQ3 = sortedSample[Math.floor(sample.length*3/4)];

    // Draw median
    ctx.strokeStyle = 'blue';
    ctx.beginPath();
    ctx.moveTo(18 + (canvas.width-30)/(tickEnd-tickStart)*(boxPlotQ2-tickStart), 3);
    ctx.lineTo(18 + (canvas.width-30)/(tickEnd-tickStart)*(boxPlotQ2-tickStart), 28);
    ctx.stroke();
    ctx.closePath();
    
    // Draw box
    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.moveTo(18 + (canvas.width-30)/(tickEnd-tickStart)*(boxPlotQ1-tickStart), 3);
    ctx.lineTo(18 + (canvas.width-30)/(tickEnd-tickStart)*(boxPlotQ3-tickStart), 3);
    ctx.lineTo(18 + (canvas.width-30)/(tickEnd-tickStart)*(boxPlotQ3-tickStart), 28);
    ctx.lineTo(18 + (canvas.width-30)/(tickEnd-tickStart)*(boxPlotQ1-tickStart), 28);
    ctx.lineTo(18 + (canvas.width-30)/(tickEnd-tickStart)*(boxPlotQ1-tickStart), 3);
    ctx.stroke();
    ctx.closePath();
}

function draw(canvas: HTMLCanvasElement, sample: number[]) {
    if (canvas) {
        canvas.width = 321;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.imageSmoothingEnabled = false;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'black';
            const tickStart = 25;
            const tickEnd = 85;
            
            
            // Draw box plot
            const sortedSample = sample.sort((a, b) => a - b);
            const boxPlotQ1 = sortedSample[Math.floor(sample.length/4)];
            const boxPlotQ2 = sortedSample[Math.floor(sample.length/2)];
            const boxPlotQ3 = sortedSample[Math.floor(sample.length*3/4)];
            
            ctx.lineWidth = 1;
            // Draw box
            ctx.beginPath();
            ctx.moveTo(18 + (canvas.width-30)/(tickEnd-tickStart)*(boxPlotQ1-tickStart), 3);
            ctx.lineTo(18 + (canvas.width-30)/(tickEnd-tickStart)*(boxPlotQ3-tickStart), 3);
            ctx.lineTo(18 + (canvas.width-30)/(tickEnd-tickStart)*(boxPlotQ3-tickStart), 28);
            ctx.lineTo(18 + (canvas.width-30)/(tickEnd-tickStart)*(boxPlotQ1-tickStart), 28);
            ctx.lineTo(18 + (canvas.width-30)/(tickEnd-tickStart)*(boxPlotQ1-tickStart), 3);
            ctx.stroke();
            ctx.closePath();

            // Draw median
            ctx.beginPath();
            ctx.moveTo(18 + (canvas.width-30)/(tickEnd-tickStart)*(boxPlotQ2-tickStart), 3);
            ctx.lineTo(18 + (canvas.width-30)/(tickEnd-tickStart)*(boxPlotQ2-tickStart), 28);
            ctx.stroke();
            ctx.closePath();


            // Draw whiskers
            ctx.beginPath();
            ctx.moveTo(18 + (canvas.width-30)/(tickEnd-tickStart)*(boxPlotQ1-tickStart), 15);
            ctx.lineTo(18 + (canvas.width-30)/(tickEnd-tickStart)*(sortedSample[0]-tickStart), 15);
            ctx.moveTo(18 + (canvas.width-30)/(tickEnd-tickStart)*(boxPlotQ3-tickStart), 15);
            ctx.lineTo(18 + (canvas.width-30)/(tickEnd-tickStart)*(sortedSample[sample.length-1]-tickStart), 15);
            ctx.stroke();
            ctx.closePath();
        }
    }
}
function sample(sampleSize: number = 30, mean: number = 50, stdDev: number = 7) {
    let newSample: number[] = [];
    for (let i = 0; i < sampleSize; i++) {
        newSample.push(Math.round((generateNormalDistribution() * stdDev + mean) * 10) / 10);
    }
    return newSample;
}


export default function Phase2() {
    const [sampleSize, setSampleSize] = useState<number>(30);
    const [canvasList, setCanvasList] = useState<HTMLCanvasElement[]>([]);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const graphCanvasRef = useRef<HTMLCanvasElement>(null);
    const canvasContainer = useRef<HTMLDivElement>(null);
    const [samplemeans, setSampleMeans] = useState<number[]>([]);
    useEffect(() => {
        const n = Math.min(Math.ceil(Math.log2(samplemeans.length + 4)) * 10, 160);
        const graphY: number[] = [];
        for (let i = 0; i < n; i++) {
            graphY.push(0);
        }
        for (let i = 0; i < samplemeans.length; i++) {
            graphY[Math.floor(samplemeans[i] / 321 * n)]++;
        }

        const graphCanvas = graphCanvasRef.current;
        if (!graphCanvas) return () => {};
        const ctx = graphCanvas.getContext('2d');
        if (!ctx) return () => {};
        ctx.clearRect(0, 0, graphCanvas.width, graphCanvas.height);
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, graphCanvas.width, graphCanvas.height);

        const amp = n / graphCanvas.width * 12;

        ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, graphCanvas.height);
        for (let i = 0; i < n; i++) {
            ctx.lineTo(i / n * graphCanvas.width, graphCanvas.height - graphY[i] / samplemeans.length * graphCanvas.height * amp);
            // ctx.lineTo((i + 1) / n * graphCanvas.width, graphCanvas.height - graphY[i] / samplemeans.length * graphCanvas.height * amp);
        }
        ctx.lineTo(graphCanvas.width, graphCanvas.height);
        ctx.stroke();
        ctx.closePath();

        // Normal distribution of population
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, graphCanvas.height);
        for (let i = 0; i < 160; i++) {
    
            const tickStart = 25;
            const tickEnd = 85;
            const mean = 50;
            const stdDev = 7;
            const diff = ((tickEnd - tickStart) / 321) * ((i/160) * 321) + tickStart - mean;
            const y = Math.exp(-diff * diff / (2 * stdDev * stdDev)) / (stdDev * Math.sqrt(2 * Math.PI));
            ctx.lineTo(i / 160 * graphCanvas.width, graphCanvas.height - y * graphCanvas.height * amp);
            // ctx.lineTo((i + 1) / n * graphCanvas.width, graphCanvas.height - graphY[i] / samplemeans.length * graphCanvas.height * amp);
        }
        ctx.lineTo(graphCanvas.width, graphCanvas.height);
        ctx.stroke();
        ctx.closePath();
        
    }, [samplemeans, 321]);
    useEffect(() => {
        if (canvasRef.current) {
            const mainCanvas = canvasRef.current;
            mainCanvas.width = 321;
            mainCanvas.height = 48;
            drawTick(mainCanvas, 25, 85);
        }
    }, []);
    useEffect(() => {
        if (canvasContainer.current) {
            const container = canvasContainer.current;
            container.innerHTML = '';
            for (let canvas of canvasList) {
                container.appendChild(canvas);
            }
        }
    }, [canvasList]);

    function simulate() {
        if (!canvasRef.current) return;
        const newSample = sample(sampleSize);
        const newCanvas = document.createElement('canvas');
        newCanvas.width = 321;
        newCanvas.height = 32;
        newCanvas.style.margin = '-2px';
        const divElement = document.createElement('div');
        divElement.style.display = 'block';
        divElement.style.border = '1px solid black';
        divElement.style.height = '32px';
        divElement.style.width = '321px';
        divElement.style.margin = '-1px';
        divElement.appendChild(newCanvas);

        draw(newCanvas, newSample);
        drawToMain(canvasRef.current, newSample);
        setCanvasList([...canvasList, newCanvas]);
        const tickStart = 25;
        const tickEnd = 85;
        const sampleMean = newSample.reduce((a, b) => a + b) / newSample.length;
        console.log(sampleMean)
        const sampleX = 18 + (sampleMean - tickStart) / (tickEnd - tickStart) * 321;
        setSampleMeans([...samplemeans, sampleX]);
    }

    return (
        <div className="Phase2">
            <h3>컴퓨터 표집 애니메이션</h3>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                width: 'fit-content',
                margin: '0 auto',
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: 'fit-content',
                    margin: '0 auto',
                    border: '1px solid black',
                }}>
                    <button className="simulateBtn" onClick={() => simulate()}>Simulate</button>
                    <div style={{margin: '4px'}}>n: <input type="number" value={sampleSize} onChange={(e) => setSampleSize(parseInt(e.target.value))} style={{width: '5em'}} /></div>
                    <div style={{display: 'block', border: '1px solid black', height: '128px', width: '321px', margin: '-1px'}}>
                        <canvas id="current_histogram" width="321" height="48" style={{margin: '-2px'}} ref={canvasRef}></canvas>
                        <canvas width="321" height="80" style={{margin: '-2px'}} ref={graphCanvasRef}></canvas>
                    </div>
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '321px',
                    margin: '0 auto',
                    marginTop: '-1px',
                    border: '1px solid black',
                    maxHeight: '52vh',
                    overflow: 'auto',
                    overflowX: 'hidden',
                }} ref={canvasContainer}>
                </div>
            </div>
        </div>
    )
}