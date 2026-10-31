import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, ArrowUpRight, MapPin, X } from 'lucide-react'
import { projects } from '../data/site.js'
import { Eyebrow, MediaImage, Modal, Reveal } from './Shared.jsx'

const filters=['All projects','Residential','Business','Commercial']
export default function Gallery() {
  const [filter,setFilter]=useState(filters[0])
  const [selected,setSelected]=useState(null)
  const visible=projects.filter(p=>filter==='All projects'||p.type===filter)
  return <section className="projects-section section-pad" id="projects">
    <div className="container">
      <Reveal className="gallery-head">
        <div><Eyebrow>DESIGN POSSIBILITIES</Eyebrow><h2 className="section-title">Proof of <em>possibility.</em></h2></div>
        <p>Imagined places. Real inspiration. Explore a curated collection of fictional solar design studies.</p>
      </Reveal>
      <div className="gallery-filter" role="group" aria-label="Filter concept projects">
        {filters.map(f=><button type="button" key={f} className={filter===f?'active':''} aria-pressed={filter===f} onClick={()=>setFilter(f)}>{f}</button>)}
        <span className="gallery-count">{visible.length.toString().padStart(2,'0')} CONCEPTS</span>
      </div>
      {visible.length ? <motion.div layout className="project-grid">
        <AnimatePresence mode="popLayout">
          {visible.map((p,i)=><motion.button layout key={p.id} className="project-card" type="button" initial={{opacity:0,scale:.96}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:.96}} transition={{duration:.35}} onClick={()=>setSelected(p)} aria-label={`Open concept study ${p.title}`}>
            <div className="project-image"><MediaImage src={p.image} alt={`Visual inspiration for ${p.title}`}/><span className="project-badge">CONCEPT STUDY</span><span className="project-arrow"><ArrowUpRight size={20}/></span></div>
            <div className="project-info"><div><span className="project-meta">{p.city.toUpperCase()} <span>·</span> {p.type.toUpperCase()}</span><h3>{p.title}</h3></div><span className="project-spec">{p.size} <small>DEMO</small></span></div>
          </motion.button>)}
        </AnimatePresence>
      </motion.div> : <div className="empty-projects">No concept projects match this filter.</div>}
      <p className="gallery-note">All names, locations, system sizes and project scenarios above are fictional. Photographs are visual references, not SOLARA installations.</p>
    </div>
    <AnimatePresence>{selected && <Modal onClose={()=>setSelected(null)} label={`${selected.title} project details`}><div className="project-modal"><button className="modal-x" onClick={()=>setSelected(null)} aria-label="Close project"><X size={20}/></button><div className="modal-visual"><MediaImage src={selected.image} alt={`Concept reference for ${selected.title}`}/><span>FICTIONAL CONCEPT / VISUAL REFERENCE</span></div><div className="project-modal-content"><Eyebrow>{selected.type} / CONCEPT STUDY</Eyebrow><h2>{selected.title}</h2><p className="project-modal-lead">{selected.brief}</p><div className="project-facts"><span><MapPin size={16}/>{selected.city} (illustrative)</span><span>{selected.size} (demo)</span></div><p>{selected.details}</p><button type="button" className="text-cta" onClick={()=>{setSelected(null);setTimeout(()=>document.getElementById('quote')?.scrollIntoView({behavior:'smooth'}),100)}}>Explore your own project <ArrowRight size={18}/></button></div></div></Modal>}</AnimatePresence>
  </section>
}
