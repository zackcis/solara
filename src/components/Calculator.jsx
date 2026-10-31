import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ChartNoAxesCombined, Info, MoveUpRight, TrendingUp, Wallet } from 'lucide-react'
import { DEMO } from '../data/site.js'
import { calculateSavings, formatMAD, formatNumber } from '../lib.js'
import { Eyebrow, Reveal } from './Shared.jsx'

function Count({ value, suffix = '' }) {
  const [display,setDisplay] = useState(value)
  const previous = useRef(value)
  useEffect(()=>{
    const start = previous.current
    const time = performance.now()
    let frame
    const animate = now => {
      const t = Math.min(1, (now-time)/640)
      const eased = 1 - Math.pow(1-t,3)
      setDisplay(start + (value-start)*eased)
      if(t<1) frame = requestAnimationFrame(animate)
      else previous.current=value
    }
    frame=requestAnimationFrame(animate)
    return ()=>{cancelAnimationFrame(frame);previous.current=value}
  },[value])
  return <>{formatNumber(display)}{suffix}</>
}

export default function Calculator() {
  const [bill,setBill] = useState(DEMO.billMAD)
  const [offset,setOffset] = useState(DEMO.energyOffsetPercent)
  const [cost,setCost] = useState(DEMO.installationCostMAD)
  const [methodOpen,setMethodOpen] = useState(false)
  const s = calculateSavings(bill,offset,cost)
  const yearly = Array.from({length:6},(_,i)=>({year:i+1,saved:s.annual*(i+1)}))
  const max = Math.max(s.annual*6,1)
  return <section className="calc-section" id="calculator">
    <div className="container">
      <Reveal className="calc-header">
        <div><Eyebrow>THE SOLAR ESTIMATOR</Eyebrow><h2 className="section-title">See the sunshine <em>in numbers.</em></h2></div>
        <p>Curious what solar could mean for your electricity spend? Explore the possibilities with a transparent, interactive illustration.</p>
      </Reveal>
      <Reveal className="calc-shell" y={45}>
        <div className="calc-controls">
          <div className="calc-label-top"><span className="small-caps">YOUR ENERGY PROFILE</span><span className="demo-tag">ILLUSTRATIVE TOOL</span></div>
          <h3>A little input.<br/><em>A lot of perspective.</em></h3>
          <div className="calc-field">
            <div className="calc-field-head"><label htmlFor="bill">Monthly electricity bill</label><strong>{formatMAD(bill)}</strong></div>
            <input id="bill" aria-label="Monthly electricity bill in MAD" className="range-input" type="range" min="150" max="12000" step="50" value={bill} style={{'--progress':`${(bill-150)/(12000-150)*100}%`}} onChange={e=>setBill(Number(e.target.value))}/>
            <div className="range-labels"><span>150 MAD</span><span>12,000 MAD</span></div>
          </div>
          <div className="calc-field">
            <div className="calc-field-head"><label htmlFor="offset">Estimated energy offset</label><strong>{offset}%</strong></div>
            <input id="offset" className="range-input" type="range" min="20" max="95" step="5" value={offset} style={{'--progress':`${(offset-20)/75*100}%`}} onChange={e=>setOffset(Number(e.target.value))}/>
            <div className="range-labels"><span>20%</span><span>95%</span></div>
          </div>
          <div className="calc-field cost-field">
            <div className="calc-field-head"><label htmlFor="cost">Assumed installation cost <span>(demo MAD)</span></label></div>
            <div className="cost-control"><span>MAD</span><input id="cost" type="number" min="1000" max="2000000" step="1000" value={cost} onChange={e=>setCost(Math.min(2000000,Math.max(0,Number(e.target.value)||0)))}/></div>
          </div>
          <p className="calc-helper"><Info size={15}/>Adjust the fictional cost to explore different payback scenarios. This is not a quotation.</p>
          <button className="method-toggle" type="button" aria-expanded={methodOpen} aria-controls="calculation-method" onClick={()=>setMethodOpen(v=>!v)}>How these numbers are calculated <span>{methodOpen ? '−' : '+'}</span></button>
          {methodOpen && <div className="method-panel" id="calculation-method">
            <p><b>Monthly savings</b> = monthly bill × offset ÷ 100</p>
            <p><b>Annual savings</b> = monthly savings × 12</p>
            <p><b>Simple payback</b> = assumed installation cost ÷ annual savings</p>
            <p>Assumes stable bills and savings. Excludes tariffs, financing, maintenance, degradation, export credits, taxes, and equipment suitability.</p>
          </div>}
        </div>
        <div className="calc-results" aria-live="polite" aria-atomic="true">
          <div className="calc-results-top"><span className="small-caps light-caps">YOUR ILLUSTRATIVE OUTLOOK</span><ChartNoAxesCombined size={22}/></div>
          <div className="saving-main"><span>Potential annual bill savings</span><strong><Count value={s.annual}/><small> MAD</small></strong><p><TrendingUp size={16}/> Based on a {offset}% estimated energy offset</p></div>
          <div className="result-mini-grid">
            <div><Wallet size={20}/><span>Monthly savings</span><b><Count value={s.monthly}/><small> MAD</small></b></div>
            <div><MoveUpRight size={20}/><span>Simple payback</span><b>{s.payback===null ? '—' : s.payback>100 ? '>100' : formatNumber(s.payback,1)}<small>{s.payback===null?'':' years'}</small></b></div>
          </div>
          <div className="savings-chart">
            <div className="chart-heading"><span>Illustrative cumulative savings</span><span>6 YEARS</span></div>
            <div className="bar-chart" role="img" aria-label={`Illustrative cumulative savings increasing to ${formatMAD(s.annual * 6)} by year 6`}>
              {yearly.map((y) => <div className="bar-item" key={y.year} title={`Year ${y.year}: ${formatMAD(y.saved)}`}><motion.div className="bar-fill" initial={{height:0}} whileInView={{height:`${y.saved/max*100}%`}} animate={{height:`${y.saved/max*100}%`}} viewport={{once:true}} transition={{duration:.7,delay:y.year*.05,ease:'easeOut'}}/><span>Y{y.year}</span></div>)}
            </div>
          </div>
          <p className="results-disclaimer">Illustrative financial demonstration only. Actual solar production, bills, tariffs and payback vary. Not financial or installation advice.</p>
        </div>
      </Reveal>
    </div>
  </section>
}
