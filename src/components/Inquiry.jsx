import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, CheckCircle2, ChevronRight, Clock3, Database, Download, FileText, Inbox, Info, RotateCcw, ShieldCheck, Trash2, X } from 'lucide-react'
import { readInquiries, validateInquiry, writeInquiries } from '../lib.js'
import { Eyebrow, Modal, Reveal } from './Shared.jsx'

const blankForm = () => ({ property:'', city:'', bill:'', name:'', email:'', phone:'', message:'', agreed:false })
const steps=['Your project','Contact details','Review & save']

function Field({ label, name, form, set, error, children, type='text', placeholder, required=false }) {
  return <label className="quote-field"><span>{label} {required && <b>*</b>}</span>
    {children ?? <input name={name} value={form[name]} type={type} placeholder={placeholder} onChange={e=>set(name,e.target.value)} aria-invalid={!!error} aria-describedby={error ? `${name}-error` : undefined}/>}
    {error && <small className="field-error" id={`${name}-error`}>{error}</small>}
  </label>
}

export default function Inquiry({ onSaved }) {
  const [step,setStep]=useState(0)
  const [form,setForm]=useState(blankForm)
  const [errors,setErrors]=useState({})
  const [saving,setSaving]=useState(false)
  const [success,setSuccess]=useState(null)
  const [storageError,setStorageError]=useState('')
  const set=(key,val)=>{setForm(f=>({...f,[key]:val}));setErrors(e=>({...e,[key]:undefined}));setStorageError('')}
  const next=()=>{const found=validateInquiry(form,step);setErrors(found);if(Object.keys(found).length===0)setStep(s=>Math.min(2,s+1))}
  const submit=async(e)=>{
    e.preventDefault()
    const found=validateInquiry(form,2);setErrors(found)
    if(Object.keys(found).length) return
    setSaving(true);setStorageError('')
    await new Promise(resolve=>setTimeout(resolve,450))
    try {
      const existing=readInquiries()
      const record={...form,id:`SOL-${Date.now().toString(36).toUpperCase()}`,createdAt:new Date().toISOString()}
      writeInquiries([record,...existing]);setSuccess(record);onSaved?.()
    } catch {setStorageError('Unable to save this request. Browser storage may be disabled or full. Please enable local storage and retry.')}
    finally {setSaving(false)}
  }
  const reset=()=>{setForm(blankForm());setErrors({});setStep(0);setSuccess(null);setStorageError('')}
  return <section className="quote-section section-pad" id="quote"><div className="container quote-layout">
    <Reveal className="quote-aside"><Eyebrow light>START A CONVERSATION</Eyebrow><h2>Every great change starts with <em>a little curiosity.</em></h2><p>Tell us what you're imagining. In this portfolio demo, you'll experience how a considered solar inquiry can feel.</p><div className="quote-aside-bottom"><span className="quote-orbit"><span>✳</span></span><div><b>A considered first step.</b><span>No account. No pressure. Just a smarter customer journey.</span></div></div></Reveal>
    <Reveal className="quote-card" delay={.1}>
      {success ? <div className="quote-success"><span className="success-icon"><CheckCircle2 size={38}/></span><Eyebrow>LOCALLY SAVED</Eyebrow><h3>Beautiful beginnings.</h3><p>Your concept inquiry <b>{success.id}</b> has been saved in this browser only.</p><div className="success-detail"><span>{success.property}</span><span>{success.city}</span><span>{success.bill} MAD / month (entered)</span></div><p className="success-small">This is a demo confirmation, not a real submission. No email was sent and no business received your information.</p><button type="button" className="primary-button" onClick={reset}>Start another request <RotateCcw size={17}/></button></div> : <>
        <div className="quote-top"><span>PROJECT ENQUIRY</span><span>0{step+1} <span className="quote-divider">/</span> 03</span></div>
        <div className="steps" aria-label="Form progress">{steps.map((s,i)=><div key={s} className={`step-indicator ${i===step?'current':''} ${i<step?'completed':''}`}><span>{i<step?<Check size={13}/>:String(i+1).padStart(2,'0')}</span><small>{s}</small></div>)}</div>
        <form onSubmit={submit} noValidate>
          <AnimatePresence mode="wait">
            {step===0 && <motion.div key="step0" className="form-fields" initial={{opacity:0,x:16}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-16}}><h3>Let's talk about your space.</h3><p>The good details make the difference.</p>
              <Field label="Property type" name="property" form={form} set={set} error={errors.property} required><select value={form.property} onChange={e=>set('property',e.target.value)} aria-invalid={!!errors.property}><option value="">Select a property type</option><option>Home or villa</option><option>Office or shop</option><option>Commercial / industrial</option><option>Other</option></select></Field>
              <div className="form-two"><Field label="City" name="city" form={form} set={set} error={errors.city} placeholder="e.g. Casablanca" required/><Field label="Monthly electricity bill (MAD)" name="bill" type="number" form={form} set={set} error={errors.bill} placeholder="e.g. 1200" required/></div>
              <Field label="Anything else about the space?" name="message" form={form} set={set}><textarea value={form.message} onChange={e=>set('message',e.target.value)} rows={3} maxLength={900} placeholder="Optional: roof type, your goals, approximate area..."/></Field>
            </motion.div>}
            {step===1 && <motion.div key="step1" className="form-fields" initial={{opacity:0,x:16}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-16}}><h3>Who should we address?</h3><p>These details stay on this device in the demo.</p>
              <Field label="Full name" name="name" form={form} set={set} error={errors.name} placeholder="Your name" required/><Field label="Email address" name="email" type="email" form={form} set={set} error={errors.email} placeholder="you@example.com" required/><Field label="Phone number" name="phone" type="tel" form={form} set={set} error={errors.phone} placeholder="+212 6..." required/>
            </motion.div>}
            {step===2 && <motion.div key="step2" className="form-fields review" initial={{opacity:0,x:16}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-16}}><h3>One last look.</h3><p>Review your details before saving them locally.</p><div className="review-grid"><span>Property</span><b>{form.property}</b><span>City</span><b>{form.city}</b><span>Monthly bill</span><b>{form.bill} MAD</b><span>Name</span><b>{form.name}</b><span>Email</span><b>{form.email}</b><span>Phone</span><b>{form.phone}</b></div><label className="consent"><input type="checkbox" checked={form.agreed} onChange={e=>set('agreed',e.target.checked)}/><span>I understand this is an Innovatechs concept demo. My inquiry is stored in this browser only and will not be transmitted to any company.</span></label>{errors.agreed && <small className="field-error">{errors.agreed}</small>}</motion.div>}
          </AnimatePresence>
          {storageError && <div role="alert" className="storage-error">{storageError}</div>}
          <div className="form-footer">{step>0 ? <button className="back-button" type="button" onClick={()=>{setStep(s=>s-1);setErrors({})}}><ArrowLeft size={16}/> Back</button> : <span className="form-security"><ShieldCheck size={16}/> LOCAL DEMO ONLY</span>}{step<2 ? <button type="button" className="primary-button" onClick={next}>Continue <ArrowRight size={17}/></button> : <button disabled={saving} type="submit" className="primary-button">{saving?'Saving locally…':'Save demo inquiry'} {saving?<span className="button-spinner"/>:<ArrowRight size={17}/>}</button>}</div>
        </form>
      </>}
    </Reveal>
  </div></section>
}

export function Dashboard({ open, onClose, refreshKey }) {
  const [rows,setRows]=useState([])
  const [error,setError]=useState('')
  const [confirmId,setConfirmId]=useState(null)
  useEffect(()=>{
    if(!open)return
    try{setRows(readInquiries());setError('')}
    catch{setError('Browser storage could not be read. The stored data might be invalid or storage access may be blocked.');setRows([])}
  },[open,refreshKey])
  function remove(id){try{const updated=rows.filter(row=>row.id!==id);writeInquiries(updated);setRows(updated);setConfirmId(null);setError('')}catch{setError('Deletion failed because browser storage is unavailable.')}}
  function exportData(){const blob=new Blob([JSON.stringify(rows,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='solara-demo-inquiries.json';a.click();URL.revokeObjectURL(url)}
  return <AnimatePresence>{open&&<Modal size="dashboard" label="Demo inquiry dashboard" onClose={onClose}><div className="dashboard"><div className="dashboard-heading"><div><Eyebrow>INNOVATECHS CONCEPT</Eyebrow><h2>Inquiry dashboard<span>.</span></h2><p>A tiny CRM experience, powered only by this browser.</p></div><button className="modal-x" type="button" onClick={onClose} aria-label="Close dashboard"><X size={21}/></button></div><div className="dashboard-summary"><div><Database size={20}/><span>LOCAL RECORDS</span><strong>{rows.length.toString().padStart(2,'0')}</strong></div><div><ShieldCheck size={20}/><span>STORAGE</span><strong>On device</strong></div><div><Clock3 size={20}/><span>SYNC</span><strong>Not enabled</strong></div></div>{error&&<div role="alert" className="storage-error">{error}</div>}
      <div className="dashboard-list-head"><b>Saved inquiries</b><button type="button" disabled={!rows.length} onClick={exportData}><Download size={16}/> Export JSON</button></div>
      {!rows.length ? <div className="dashboard-empty"><Inbox size={37} strokeWidth={1.35}/><h3>No enquiries yet.</h3><p>Complete the quotation form and your demo inquiries will appear right here.</p><button type="button" className="text-cta" onClick={()=>{onClose();setTimeout(()=>document.getElementById('quote')?.scrollIntoView({behavior:'smooth'}),100)}}>Create an inquiry <ArrowRight size={17}/></button></div> : <div className="dashboard-rows">{rows.map(row=><div className="dashboard-row" key={row.id}><span className="row-avatar">{(row.name||'?').slice(0,1).toUpperCase()}</span><div className="row-primary"><b>{row.name}</b><span>{row.email}</span><small>{row.id} · {new Date(row.createdAt).toLocaleDateString()}</small></div><div className="row-secondary"><b>{row.city}</b><span>{row.property}</span><small>{row.bill} MAD/mo · demo input</small></div>{confirmId===row.id?<div className="confirm-delete"><span>Delete?</span><button type="button" onClick={()=>remove(row.id)}>Yes</button><button type="button" onClick={()=>setConfirmId(null)}>No</button></div>:<button className="delete-button" type="button" title="Delete inquiry" aria-label={`Delete inquiry for ${row.name}`} onClick={()=>setConfirmId(row.id)}><Trash2 size={18}/></button>}</div>)}</div>}
      <div className="dashboard-footer"><Info size={16}/> This is not a real customer database. Records remain in your browser, can be exported, and disappear if site data is cleared.</div></div></Modal>}</AnimatePresence>
}
