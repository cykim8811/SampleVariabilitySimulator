
import { useMemo, useState } from "react";
import { lazy, Suspense } from "react";
/*
 *  실험 1: 표본 뽑은 결과 주고 예상하게 함
 *  실험 2: 계속 눌러서 정확하게 예상하게 함
 *  Page style: Typeform
 */

const experimentImports: {[key: number]: React.LazyExoticComponent<() => JSX.Element>} = {
    1: lazy(() => import('./experiments/Experiment1.tsx')),
    2: lazy(() => import('./experiments/Experiment2.tsx')),
    3: lazy(() => import('./experiments/Experiment3.tsx')),
}


export function Custom() {
    const [experiment, setExperiment] = useState<number>(1);
    const ExperimentElement = useMemo(() => experimentImports[experiment], [experiment]);
    return (
        <div className="Custom" style={{userSelect: 'none'}}>
            <div className="ExperimentSelector">
                <button className={'phaseSelectBtn' + (experiment==1?' selected':'')} onClick={() => setExperiment(1)}>Exp1</button>
                &nbsp;→&nbsp;
                <button className={'phaseSelectBtn' + (experiment==2?' selected':'')} onClick={() => setExperiment(2)}>Exp2</button>
                &nbsp;→&nbsp;
                <button className={'phaseSelectBtn' + (experiment==3?' selected':'')} onClick={() => setExperiment(3)}>Exp3</button>
            </div> <br/>
            <Suspense fallback={<h1>Loading...</h1>}>
                <ExperimentElement />
            </Suspense>
        </div>
    );
}
