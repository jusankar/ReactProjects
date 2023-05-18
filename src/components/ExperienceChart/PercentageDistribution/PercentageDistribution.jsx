import s from "./style.module.css";
export default function PercentageDistribution({items,maxPercentage}){
    const pxSize = items.percentage*2.5;
    return (
        <div className={s.conatiner} style={{ height: `${pxSize}px` }}>
            {/* <div className={s.percentage} style={{ backgroundColor: `rgba(86,82,117,${((items.percentage*100)/maxPercentage)*0.01})` }} /> */}
            <div 
                className={s.percentage} 
                style={{ backgroundColor: `rgba(86,82,117,${(items.percentage)*0.01})` }} 
                data-tooltip={`${items.label} ${items.percentage}%`}
                />
            <div className={s.label}>
                <h2>{items.percentage===maxPercentage? items.percentage+'%':''}</h2>
                {pxSize>20?items.label:''}
                </div>
        </div>
    );
}

