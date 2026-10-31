import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, ImageOff, SunMedium } from 'lucide-react'

export function Mark({ small = false }) {
  return <span className={`brand-mark ${small ? 'brand-mark-small' : ''}`} aria-hidden="true">
    <SunMedium strokeWidth={1.7} />
  </span>
}

export function Brand({ light = false }) {
  return <a href="#home" className={`brand ${light ? 'brand-light' : ''}`} aria-label="SOLARA — Go to homepage">
    <Mark /><span>SOLARA<span className="brand-dot">.</span></span>
  </a>
}

export function Eyebrow({ children, light = false, className = '' }) {
  return <span className={`eyebrow ${light ? 'eyebrow-light' : ''} ${className}`}><span className="eyebrow-line" />{children}</span>
}

export function ArrowLink({ children, href, onClick, dark = false, className = '' }) {
  const common = `action-link ${dark ? 'action-link-dark' : ''} ${className}`
  return href ? <a href={href} className={common}>{children}<ArrowUpRight size={17}/></a> : <button type="button" onClick={onClick} className={common}>{children}<ArrowUpRight size={17}/></button>
}

export function Reveal({ children, className = '', delay = 0, y = 34 }) {
  return <motion.div className={className} initial={{opacity:0,y}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:0.12}} transition={{duration:0.7,delay,ease:[.22,1,.36,1]}}>{children}</motion.div>
}

export function MediaImage({ src, alt, className='', loading='lazy' }) {
  const [status,setStatus] = useState('loading')
  useEffect(()=>setStatus('loading'),[src])
  return <div className={`image-frame ${className} ${status === 'loading' ? 'is-loading' : ''} ${status === 'error' ? 'is-error' : ''}`}>
    {status !== 'error' && <img src={src} alt={alt} loading={loading} decoding="async" onLoad={()=>setStatus('loaded')} onError={()=>setStatus('error')} />}
    {status === 'loading' && <span className="image-loader" aria-hidden="true" />}
    {status === 'error' && <div className="image-fallback" role="img" aria-label={alt}><ImageOff size={24}/><span>Image unavailable</span></div>}
  </div>
}

export function Modal({ children, onClose, label, size='wide' }) {
  useEffect(() => {
    const keyHandler = e => { if(e.key === 'Escape') onClose() }
    document.addEventListener('keydown',keyHandler)
    const oldOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.removeEventListener('keydown',keyHandler);document.body.style.overflow=oldOverflow }
  },[onClose])
  return <motion.div className="modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={e=>{if(e.target===e.currentTarget)onClose()}}>
    <motion.div className={`modal-panel modal-${size}`} role="dialog" aria-modal="true" aria-label={label} initial={{opacity:0,scale:.97,y:28}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:.97,y:16}} transition={{duration:.25}}>
      {children}
    </motion.div>
  </motion.div>
}
