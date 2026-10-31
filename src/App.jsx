import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowDown, ArrowRight, ArrowUp, ArrowUpRight, Check, ChevronDown, CircleDot, Compass, Leaf, Menu, MoveUpRight, ShieldCheck, Sun, SunMedium, X, Zap } from 'lucide-react'
import { DEMO, faqs, imagery, solutions } from './data/site.js'
import { ArrowLink, Brand, Eyebrow, Mark, MediaImage, Reveal } from './components/Shared.jsx'
import Calculator from './components/Calculator.jsx'
import Gallery from './components/Gallery.jsx'
import Inquiry, { Dashboard } from './components/Inquiry.jsx'

const links=[['Solutions','#solutions'],['How it works','#approach'],['Calculator','#calculator'],['Projects','#projects']]

function Navbar({ onDashboard }) {
  const [open,setOpen]=useState(false)
  const [scrolled,setScrolled]=useState(false)
  useEffect(()=>{const handle=()=>setScrolled(window.scrollY>20);handle();window.addEventListener('scroll',handle,{passive:true});return()=>window.removeEventListener('scroll',handle)},[])
  useEffect(()=>{if(!open)return;const escape=e=>{if(e.key==='Escape')setOpen(false)};document.addEventListener('keydown',escape);return()=>document.removeEventListener('keydown',escape)},[open])
  return <>
    <div className="topline"><span>THE FUTURE IS FEELING BRIGHTER</span><span className="topline-right"><Sun size={11}/> MADE FOR MOROCCO <span className="topline-sep">/</span> AN INNOVATECHS CONCEPT</span></div>
    <header className={`site-header ${scrolled?'scrolled':''}`}>
      <nav className="nav-inner container" aria-label="Main navigation"><Brand/><div className="nav-links">{links.map(([label,url])=><a key={label} href={url}>{label}</a>)}</div><div className="nav-right"><button type="button" className="dashboard-nav" onClick={onDashboard}>Demo dashboard <ArrowUpRight size={14}/></button><a className="nav-cta" href="#quote">Get a demo quote <ArrowUpRight size={17}/></a></div><button type="button" className="mobile-toggle" aria-expanded={open} aria-label={open?'Close menu':'Open menu'} onClick={()=>setOpen(!open)}>{open?<X size={25}/>:<Menu size={25}/>}</button></nav>
      <AnimatePresence>{open&&<motion.div className="mobile-menu" initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}}><div className="mobile-menu-inner">{links.map(([label,url])=><a key={label} href={url} onClick={()=>setOpen(false)}>{label}<ArrowUpRight size={19}/></a>)}<a href="#quote" onClick={()=>setOpen(false)}>Get a demo quote<ArrowUpRight size={19}/></a><button type="button" onClick={()=>{setOpen(false);onDashboard()}}>Demo dashboard <ArrowUpRight size={19}/></button></div></motion.div>}</AnimatePresence>
    </header>
  </>
}

function Hero() {
  return <section className="hero" id="home"><div className="hero-content"><div className="hero-copy"><motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.12,duration:.65}}><Eyebrow>WELCOME TO A BRIGHTER WAY</Eyebrow></motion.div><motion.h1 initial={{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{delay:.2,duration:.75}}>Energy for<br/>a more <em>beautiful</em><br/>tomorrow<span className="hero-period">.</span></motion.h1><motion.p className="hero-description" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:.35,duration:.7}}>The sun has always been there. It's time to see what it can do for your home, your business, and everything you're building next.</motion.p><motion.div className="hero-actions" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{delay:.48,duration:.7}}><a href="#solutions" className="primary-button">Discover solutions <ArrowUpRight size={18}/></a><a href="#calculator" className="underlined-link">Estimate your savings <ArrowRight size={17}/></a></motion.div><div className="hero-bottom"><span className="hero-bottom-line"/><span>DESIGNED WITH THE FUTURE IN MIND</span><span className="hero-bottom-sun"><Sun size={18}/></span></div></div></div><div className="hero-visual"><MediaImage className="hero-photo" src={imagery.hero} alt="Contemporary architectural home bathed in warm sunlight" loading="eager"/><div className="hero-visual-overlay"/><div className="hero-visual-top"><span>01 / 05</span><span>ENERGY. DESIGN. POSSIBILITIES.</span></div><motion.div className="hero-floating-card" initial={{opacity:0,y:35}} animate={{opacity:1,y:0}} transition={{delay:.75,duration:.8}}><span className="card-sun"><SunMedium size={23}/></span><div><span>AN INVITATION TO IMAGINE</span><strong>A world powered<br/>by brighter thinking.</strong></div><ArrowUpRight size={22}/></motion.div><a className="hero-visual-scroll" href="#intro" aria-label="Scroll to introduction"><ArrowDown size={21}/></a></div></section>
}

function Intro() {
  return <section className="intro-section" id="intro"><div className="container intro-grid"><Reveal><Eyebrow>MEET SOLARA</Eyebrow><span className="intro-index">01 — THE PHILOSOPHY</span></Reveal><Reveal className="intro-main" delay={.1}><h2>There is a certain<br/>kind of <em>brilliance</em><br/>in simplicity.</h2><div className="intro-lower"><div className="intro-circle"><SunMedium size={32} strokeWidth={1.2}/></div><p>We imagine solar energy without compromise: beautifully considered, intelligently planned, and made to fit the way you live. This is a concept of what the experience could be.</p></div></Reveal></div></section>
}

function Solutions() {
  return <section className="solutions-section section-pad" id="solutions"><div className="container"><Reveal className="solutions-head"><div><Eyebrow>WHAT WE IMAGINE</Eyebrow><h2 className="section-title">One sun. <em>Infinite potential.</em></h2></div><p>Every space has a different story. Explore solar ideas thoughtfully matched to where life and business happen.</p></Reveal><div className="solutions-grid">{solutions.map((s,i)=><Reveal key={s.number} delay={i*.1} className="solution-card"><div className="solution-photo"><MediaImage src={s.image} alt={`${s.tag} architecture and solar energy visual inspiration`}/><span className="solution-number">{s.number}</span><span className="solution-photo-tag">{s.tag}</span></div><div className="solution-content"><span>{s.category} SOLUTIONS</span><h3>{s.name}</h3><p>{s.description}</p><a href="#quote" aria-label={`Explore ${s.category.toLowerCase()} quote`} className="solution-action"><ArrowUpRight size={23}/></a></div></Reveal>)}</div></div></section>
}

function Approach() {
  const steps=[{n:'01',title:"Let's understand.",desc:'Start with your goals, your energy bills, and the kind of space you want to power.'},{n:'02',title:"Let's imagine.",desc:'Explore a system direction that considers your site, requirements, and possible savings.'},{n:'03',title:"Let's make a plan.",desc:'Turn the conversation into a proper assessment with a qualified provider when you are ready.'}]
  return <section className="approach-section" id="approach"><div className="container"><Reveal className="approach-heading"><div><Eyebrow light>THE APPROACH</Eyebrow><h2>Good energy begins<br/>with <em>good thinking.</em></h2></div><p>Great projects are built one considered decision at a time. Here's how a real solar journey could start.</p></Reveal><div className="approach-steps">{steps.map((s,i)=><Reveal key={s.n} delay={i*.12} className="approach-step"><span className="approach-n">{s.n}</span><span className="approach-symbol"><CircleDot size={27} strokeWidth={1.3}/></span><h3>{s.title}</h3><p>{s.desc}</p><span className="approach-line"/></Reveal>)}</div><div className="approach-bottom"><span><span className="dot-pulse"/> BUILT AROUND CLARITY, NOT COMPLEXITY</span><a href="#quote">Begin your journey <ArrowUpRight size={16}/></a></div></div></section>
}

function EditorialBreak() {
  return <section className="editorial-break"><div className="editorial-break-image"><MediaImage src={imagery.solarTwo} alt="Solar panel installations in sunlight"/><div className="editorial-photo-shade"/></div><div className="editorial-break-content container"><Reveal><Eyebrow light>POWER IN PERSPECTIVE</Eyebrow><h2>The future looks<br/><em>beautiful from here.</em></h2><p>Sunlight isn't just something we live under. It's something we can learn to live with, more intelligently.</p></Reveal></div><div className="editorial-side-caption">A NEW PERSPECTIVE ON ENERGY — 2026</div></section>
}

function FAQ() {
  const [open,setOpen]=useState(1)
  return <section className="faq-section section-pad" id="faq"><div className="container faq-layout"><Reveal className="faq-intro"><Eyebrow>GOOD TO KNOW</Eyebrow><h2 className="section-title">Curiosity looks<br/><em>good on you.</em></h2><p>Thoughtful questions deserve clear answers. Here are a few things worth knowing before exploring solar.</p><a className="underlined-link" href="#quote">Have an idea? Start here <ArrowUpRight size={17}/></a></Reveal><div className="faq-list">{faqs.map((item,i)=><Reveal key={item.q} delay={i*.035}><div className={`faq-item ${open===i?'faq-open':''}`}><button type="button" className="faq-question" aria-expanded={open===i} aria-controls={`faq-answer-${i}`} onClick={()=>setOpen(open===i?null:i)}><span className="faq-num">{String(i+1).padStart(2,'0')}</span><b>{item.q}</b><span className="faq-plus">{open===i?'−':'+'}</span></button><AnimatePresence initial={false}>{open===i && <motion.div id={`faq-answer-${i}`} className="faq-answer" initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:.28}}><p>{item.a}</p></motion.div>}</AnimatePresence></div></Reveal>)}</div></div></section>
}

function ContactCTA() {
  return <section className="contact-section" id="contact"><div className="contact-grid"><div className="contact-image"><MediaImage src={imagery.interior} alt="Warm architectural interior inspired by sustainable modern living"/><div className="contact-image-overlay"/><span>THE POSSIBILITIES ARE ENDLESS.</span></div><div className="contact-copy"><Eyebrow light>LOOK TOWARD TOMORROW</Eyebrow><h2>Ready to see<br/>things in a <em>new light?</em></h2><p>There is more than one way forward. Start with a simple question and see where your solar story could go.</p><a href="#quote" className="light-button">Explore a demo quote <ArrowUpRight size={18}/></a><span className="contact-footnote">FICTIONAL COMPANY · FUNCTIONAL PORTFOLIO DEMO</span></div></div></section>
}

function Footer({ onDashboard }) {
  return <footer className="footer"><div className="container"><div className="footer-main"><div className="footer-brand"><Brand light/><p>Illuminating the possibilities of tomorrow, one considered idea at a time.</p><span className="footer-made">AN INNOVATECHS CONCEPT DEMONSTRATION</span></div><div className="footer-col"><span>EXPLORE</span><a href="#solutions">Solar solutions</a><a href="#calculator">Savings calculator</a><a href="#projects">Concept projects</a><a href="#approach">The approach</a></div><div className="footer-col"><span>THIS DEMO</span><a href="#faq">Questions & answers</a><a href="#quote">Demo inquiry</a><button type="button" onClick={onDashboard}>Local dashboard</button><a href="https://unsplash.com/license" target="_blank" rel="noreferrer">Image licensing <ArrowUpRight size={13}/></a></div><div className="footer-col footer-note"><span>LET'S BE CLEAR</span><p>SOLARA is not a real solar company. Prices, projects and savings figures are illustrative. Requests never leave this browser.</p></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} SOLARA / CONCEPT BY INNOVATECHS</span><span>CONCEPT MADE WITH INTENTION <span className="footer-asterisk">✳</span></span><a href="#home">BACK TO TOP <ArrowUp size={14}/></a></div></div></footer>
}

function BackToTop() {
  const [visible,setVisible]=useState(false)
  useEffect(()=>{const handler=()=>setVisible(window.scrollY>780);window.addEventListener('scroll',handler,{passive:true});return()=>window.removeEventListener('scroll',handler)},[])
  return <AnimatePresence>{visible&&<motion.a href="#home" className="back-to-top" aria-label="Back to top" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:10}}><ArrowUp size={19}/></motion.a>}</AnimatePresence>
}

export default function App() {
  const [dashboardOpen,setDashboardOpen]=useState(false)
  const [refreshKey,setRefreshKey]=useState(0)
  return <><Navbar onDashboard={()=>setDashboardOpen(true)}/><main><Hero/><Intro/><Solutions/><Approach/><Calculator/><EditorialBreak/><Gallery/><Inquiry onSaved={()=>setRefreshKey(k=>k+1)}/><FAQ/><ContactCTA/></main><Footer onDashboard={()=>setDashboardOpen(true)}/><BackToTop/><Dashboard open={dashboardOpen} onClose={()=>setDashboardOpen(false)} refreshKey={refreshKey}/><div className="fixed-concept-tag" aria-hidden="true">INNOVATECHS <span>✳</span> CONCEPT 01</div></>
}
