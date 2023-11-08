import { useEffect, useRef, useState } from "react";

function generateNormalDistribution() {
    var u = 0, v = 0;
    while(u === 0) u = Math.random(); // Converting [0,1) to (0,1)
    while(v === 0) v = Math.random();
    return Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
}

export default function Phase1() {
    const [sampleSize, setSampleSize] = useState<number>(30);
    const [sample, setSample] = useState<number[]>([]);
    const [std, setStd] = useState<number>(7);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mean = 50;
    function simulate() {
        let newSample: number[] = [];
        for (let i = 0; i < sampleSize; i++) {
            newSample.push(Math.round((generateNormalDistribution() * std + mean) * 10) / 10);
        }
        setSample(newSample);
    }
    // Canvas
    const canvas = canvasRef.current;
    useEffect(() => {
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

                function getYCoord(x: number) {
                    let count = 0;
                    for (let i = 0; i < sample.length; i++) {
                        if (Math.abs(sample[i] - x) < 2) count++;
                    }
                    return count * Math.random() * 20 / sample.length;
                }
                ctx.fillStyle = 'black';
                for (let i = 0; i < sample.length; i++) {
                    ctx.beginPath();
                    const yCoord = getYCoord(sample[i]);
                    ctx.arc(18 + (canvas.width-30)/(tickEnd-tickStart)*(sample[i]-tickStart), canvas.height- 16 - (canvas.height-58)/10*yCoord, 3, 0, 2*Math.PI);
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
    }, [sampleSize, sample]);
    return (
        <div className="Phase1">
            <h3>컴퓨터 표집 시뮬레이션 1</h3>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                width: 'fit-content',
                margin: '0 auto',
            }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: 'fit-content',
                    margin: '0 auto',
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        border: '1px solid black',
                        height: '50vh',
                        width: '160px',
                        margin: '0 auto',
                        marginBottom: '-1px',
                        overflowY: 'scroll',
                    }}>
                        <div style={{borderBottom: '1px solid gray', position: 'fixed', width: '160px', 'backgroundColor': 'white'}}>몸무게</div>
                        <br/>
                        {sample.map((value, index) => {
                            return (
                                <div key={index} style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    width: '100%',
                                    margin: '0 auto',
                                    fontSize: '0.8em',
                                    lineHeight: '1.2em',
                                    textAlign: 'center',
                                }}>
                                    <div style={{margin: '0 auto'}}>{value}</div>
                                </div>
                            )
                        })}
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        border: '1px solid black',
                        borderLeft: 'none',
                        height: '50vh',
                        width: '160px',
                        margin: '0 auto',
                        marginBottom: '-1px',
                        backgroundColor: 'lightgray',
                    }}>
                        <button className="simulateBtn" onClick={() => simulate()}>Simulate</button>
                        <div>n: <input type="number" value={sampleSize} onChange={(e) => setSampleSize(parseInt(e.target.value))} style={{width: '5em'}} /></div>
                        <div style={{margin: '4px'}}>σ: <input type="number" value={std} onChange={(e) => setStd(parseInt(e.target.value))} style={{width: '5em'}} /></div>
                    </div>
                </div>
                <div style={{
                    display: 'block',
                    border: '1px solid black',
                    height: '20vh',
                    width: '321px',
                }}>
                    <div style={{borderBottom: '1px solid gray', position: 'fixed', width: '321px', 'backgroundColor': 'white'}}>히스토그램</div>
                    <canvas id="histogram" width="321" height="145" style={{margin: '-2px'}} ref={canvasRef}></canvas>
                </div>
            </div>
        </div>
    )
}