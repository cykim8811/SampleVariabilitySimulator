
import { LazyExoticComponent, lazy, useEffect, useState } from "react";
import { Suspense } from "react";


export function SimulationPage() {
    const [phase, setPhase] = useState<number>(1);
    const [PhaseElement, setPhaseElement] = useState<LazyExoticComponent<() => JSX.Element>>(lazy(() => import(`./phases/Phase${phase}.tsx`)));
    useEffect(() => {setPhaseElement(lazy(() => import(`./phases/Phase${phase}.tsx`)))}, [phase]);

    return (
        <div className="SimulationPage">
            <div className="PhaseSelector">
                <button className={'phaseSelectBtn' + (phase==1?' selected':'')} onClick={() => setPhase(1)}>Com Sim 1</button>
                &nbsp;→&nbsp;
                <button className={'phaseSelectBtn' + (phase==2?' selected':'')} onClick={() => setPhase(2)}>Com Anim</button>
                &nbsp;→&nbsp;
                <button className={'phaseSelectBtn' + (phase==3?' selected':'')} onClick={() => setPhase(3)}>Com Sim 2</button>
            </div>
            <Suspense fallback={<h1>Loading...</h1>}>
                <PhaseElement />
            </Suspense>
        </div>
    )
}