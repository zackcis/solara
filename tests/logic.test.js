import test from 'node:test'
import assert from 'node:assert/strict'
import { calculateSavings, validateInquiry, readInquiries, writeInquiries } from '../src/lib.js'

test('calculates transparent demo savings and payback',()=>{
  const result=calculateSavings(1450,70,68000)
  assert.equal(result.monthly,1015)
  assert.equal(result.annual,12180)
  assert.equal(result.currentAnnual,17400)
  assert.equal(result.afterAnnual,5220)
  assert.ok(Math.abs(result.payback - 68000 / 12180)<.00001)
})

test('does not divide by zero on 0 bill',()=>{
  const result=calculateSavings(0,70,68000)
  assert.equal(result.annual,0)
  assert.equal(result.payback,null)
})

test('clamps out-of-range offset',()=>{
  assert.equal(calculateSavings(1000,300,10000).monthly,1000)
  assert.equal(calculateSavings(1000,-5,10000).monthly,0)
})

test('checks required project inputs',()=>{
  assert.deepEqual(validateInquiry({property:'Villa',city:'Agadir',bill:800},0),{})
  assert.equal(Object.keys(validateInquiry({property:'',city:'A',bill:0},0)).length,3)
})

test('validates contact inputs',()=>{
  assert.deepEqual(validateInquiry({name:'Amina Example',email:'amina@example.com',phone:'+212 612345678'},1),{})
  assert.equal(Object.keys(validateInquiry({name:'A',email:'invalid',phone:'xxx'},1)).length,3)
})

test('requires browser-only demo acknowledgement',()=>{
  assert.deepEqual(validateInquiry({agreed:true},2),{})
  assert.equal(validateInquiry({agreed:false},2).agreed.length>0,true)
})

test('local record CRUD can round-trip with a browser storage shim',()=>{
  const data = new Map()
  globalThis.localStorage={getItem:k=>data.get(k)??null,setItem:(k,v)=>data.set(k,v)}
  try{
    assert.deepEqual(readInquiries(),[])
    writeInquiries([{id:'SOL-TEST',name:'Demo'}])
    assert.equal(readInquiries()[0].name,'Demo')
    writeInquiries([])
    assert.deepEqual(readInquiries(),[])
  }finally{delete globalThis.localStorage}
})
