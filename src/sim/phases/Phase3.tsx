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
        canvas.height = 145;
        const ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.imageSmoothingEnabled = false;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'black';
            
            // Draw axes
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(18, 32);
            ctx.lineTo(18, canvas.height-12);
            ctx.lineTo(canvas.width-12, canvas.height-12);
            ctx.stroke();
            ctx.closePath();

            // Draw tick marks
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (let i = 0; i <= 10; i++) {
                ctx.moveTo(18, 32 + (canvas.height-58)/10*i);
                ctx.lineTo(12, 32 + (canvas.height-58)/10*i);
            }
            ctx.stroke();
            ctx.closePath();

            // Draw tick mark labels
            ctx.font = '10px Arial';
            ctx.textAlign = 'right';
            ctx.textBaseline = 'middle';
            for (let i = 0; i <= 10; i++) {
                if (i % 5 == 0)
                    ctx.fillText((10-i).toString(), 10, 32 + (canvas.height-58)/10*i);
            }
            const tickStart = 25;
            const tickEnd = 85;
            const tickInterval = 5;

            // Draw x-axis tick marks
            ctx.lineWidth = 1;
            ctx.beginPath();
            for (let i = tickStart; i <= tickEnd; i += tickInterval) {
                ctx.moveTo(18 + (canvas.width-30)/(tickEnd-tickStart)*(i-tickStart), canvas.height-12);
                ctx.lineTo(18 + (canvas.width-30)/(tickEnd-tickStart)*(i-tickStart), canvas.height-8);
            }
            ctx.stroke();
            ctx.closePath();

            // Draw x-axis tick mark labels
            ctx.font = '10px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'top';
            for (let i = tickStart; i <= tickEnd; i += tickInterval) {
                ctx.fillText((i).toString(), 18 + (canvas.width-30)/(tickEnd-tickStart)*(i-tickStart), canvas.height-8);
            }

            ctx.fillStyle = 'black';
            for (let i = 0; i < sample.length; i++) {
                ctx.beginPath();
                ctx.moveTo(18 + (canvas.width-30)/(tickEnd-tickStart)*(sample[i]-tickStart), canvas.height-12);
                ctx.lineTo(18 + (canvas.width-30)/(tickEnd-tickStart)*(sample[i]-tickStart), canvas.height-18);
                ctx.stroke();
                ctx.closePath();
            }
            
            // Draw box plot
            const sortedSample = sample.sort((a, b) => a - b);
            const boxPlotQ1 = sortedSample[Math.floor(sample.length/4)];
            const boxPlotQ2 = sortedSample[Math.floor(sample.length/2)];
            const boxPlotQ3 = sortedSample[Math.floor(sample.length*3/4)];
            
            ctx.lineWidth = 1;
            // Draw box
            ctx.beginPath();
            ctx.moveTo(18 + (canvas.width-30)/(tickEnd-tickStart)*(boxPlotQ1-tickStart), canvas.height- 16 - (canvas.height-58)/10*4);
            ctx.lineTo(18 + (canvas.width-30)/(tickEnd-tickStart)*(boxPlotQ3-tickStart), canvas.height- 16 - (canvas.height-58)/10*4);
            ctx.lineTo(18 + (canvas.width-30)/(tickEnd-tickStart)*(boxPlotQ3-tickStart), canvas.height- 16 - (canvas.height-58)/10*7);
            ctx.lineTo(18 + (canvas.width-30)/(tickEnd-tickStart)*(boxPlotQ1-tickStart), canvas.height- 16 - (canvas.height-58)/10*7);
            ctx.lineTo(18 + (canvas.width-30)/(tickEnd-tickStart)*(boxPlotQ1-tickStart), canvas.height- 16 - (canvas.height-58)/10*4);
            ctx.stroke();
            ctx.closePath();

            // Draw median
            ctx.beginPath();
            ctx.moveTo(18 + (canvas.width-30)/(tickEnd-tickStart)*(boxPlotQ2-tickStart), canvas.height- 16 - (canvas.height-58)/10*4);
            ctx.lineTo(18 + (canvas.width-30)/(tickEnd-tickStart)*(boxPlotQ2-tickStart), canvas.height- 16 - (canvas.height-58)/10*7);
            ctx.stroke();
            ctx.closePath();


            // Draw whiskers
            ctx.beginPath();
            ctx.moveTo(18 + (canvas.width-30)/(tickEnd-tickStart)*(boxPlotQ1-tickStart), canvas.height- 16 - (canvas.height-58)/10*5.5);
            ctx.lineTo(18 + (canvas.width-30)/(tickEnd-tickStart)*(sortedSample[0]-tickStart), canvas.height- 16 - (canvas.height-58)/10*5.5);
            ctx.moveTo(18 + (canvas.width-30)/(tickEnd-tickStart)*(boxPlotQ3-tickStart), canvas.height- 16 - (canvas.height-58)/10*5.5);
            ctx.lineTo(18 + (canvas.width-30)/(tickEnd-tickStart)*(sortedSample[sample.length-1]-tickStart), canvas.height- 16 - (canvas.height-58)/10*5.5);
            ctx.stroke();
            ctx.closePath();
        }
    }
}
function sample(sampleSize: number = 30, mean: number = 50, stdDev: number = 7) {
    let newSample: number[] = [];
    for (let i = 0; i < sampleSize; i++) {
        newSample.push((generateNormalDistribution() * stdDev + mean));
    }
    return newSample;
}


export default function Phase3() {
    const [sampleSize, setSampleSize] = useState<number>(30);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const boxCanvasRef = useRef<HTMLCanvasElement>(null);
    const momBoxCanvasRef = useRef<HTMLCanvasElement>(null);
    const [means, setMeans] = useState<number[]>([]);
    const [left, setLeft] = useState<number>(0);
    const [std, setStd] = useState<number>(7);
    useEffect(() => {
        if (canvasRef.current) {
            const mainCanvas = canvasRef.current;
            mainCanvas.width = 321;
            mainCanvas.height = 48;
            drawTick(mainCanvas, 25, 85);
        }
        if (momBoxCanvasRef.current) {
            const populationList: number[] = [];
            populationList.push((-2 * 7 + 50));
            populationList.push((-0.675 * 7 + 50));
            populationList.push((0 * 7 + 50));
            populationList.push((0.675 * 7 + 50));
            populationList.push((2 * 7 + 50));
            draw(momBoxCanvasRef.current, populationList);
        }
    }, []);

    function simulate() {
        if (!canvasRef.current) return;
        const newSample = sample(sampleSize, 50, std);
        const divElement = document.createElement('div');
        divElement.style.display = 'block';
        divElement.style.border = '1px solid black';
        divElement.style.height = '32px';
        divElement.style.width = '321px';
        divElement.style.margin = '-1px';

        drawToMain(canvasRef.current, newSample);

        setMeans([...means, (newSample.reduce((a, b) => a + b, 0) / newSample.length)]);
        boxCanvasRef.current?draw(boxCanvasRef.current, means):null;
    }

    return (
        <div className="Phase2">
            <h3>컴퓨터 표집 시뮬레이션2</h3>
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
                    <div style={{margin: '4px'}}>σ: <input type="number" value={std} onChange={(e) => setStd(parseInt(e.target.value))} style={{width: '5em'}} /></div>
                    <div style={{borderBottom: '1px solid gray', borderTop: '1px solid gray', width: '321px', 'backgroundColor': 'white'}}>표본 중앙값 변동 띠</div>
                    <div style={{display: 'block', border: '1px solid black', height: '48px', width: '321px', margin: '-1px'}}>
                        <canvas id="current_histogram" width="321" height="48" style={{margin: '-2px'}} ref={canvasRef}></canvas>
                    </div>
                </div>

                <div style={{
                    display: 'block',
                    border: '1px solid black',
                    height: '20vh',
                    width: '321px',
                }}>
                    <div style={{borderBottom: '1px solid gray', position: 'fixed', width: '321px', 'backgroundColor': 'white'}}>표본 중앙값 상자 그림</div>
                    <canvas id="histogram" width="321" height="145" style={{margin: '-2px'}} ref={boxCanvasRef}></canvas>
                </div>
                <div style={{
                    display: 'block',
                    border: '1px solid black',
                    height: '20vh',
                    width: '321px',
                }}>
                    <div style={{borderBottom: '1px solid gray', position: 'fixed', width: '321px', 'backgroundColor': 'white'}}>모집단 상자 그림</div>
                    <canvas id="histogram" width="321" height="145" style={{margin: '-2px'}} ref={momBoxCanvasRef}></canvas>
                </div>
                    <div style={{borderLeft: '1px solid gray', borderRight: '1px solid gray', borderBottom: '1px solid lightgray',
                    width: '321px', backgroundColor: 'white', userSelect: 'none'}}
                    onTouchMove={(e) => setLeft(e.touches[0].clientX)}
                    onMouseMove={(e) => setLeft(e.clientX)}
                    onTouchEnd={() => setLeft(0)}
                    onMouseLeave={() => setLeft(0)}>
                        비교
                        <div style={{position: 'absolute', backgroundColor: 'green', width: '1px', height: '368px', top: '216px', left: left + 'px'}}></div>
                    </div>
            </div>
        </div>
    )
}