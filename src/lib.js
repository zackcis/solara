export const formatMAD = value => new Intl.NumberFormat('en-MA', {maximumFractionDigits:0}).format(Math.round(value)) + ' MAD'
export const formatNumber = (value, digits = 0) => new Intl.NumberFormat('en-MA', {minimumFractionDigits:digits, maximumFractionDigits:digits}).format(value)
export const calculateSavings = (bill, offset, cost) => {
  const validBill = Math.max(0, Number(bill) || 0)
  const validOffset = Math.min(100, Math.max(0, Number(offset) || 0))
  const validCost = Math.max(0, Number(cost) || 0)
  const monthly = validBill * validOffset / 100
  const annual = monthly * 12
  const payback = annual > 0 ? validCost / annual : null
  return { monthly, annual, payback, currentAnnual: validBill*12, afterAnnual: (validBill-monthly)*12 }
}
export const validateInquiry = (form, step) => {
  const errors = {}
  if (step === 0) {
    if (!form.property) errors.property = 'Select a property type.'
    if (!form.city.trim() || form.city.trim().length < 2) errors.city = 'Enter a valid city.'
    if (!form.bill || Number(form.bill) < 100 || Number(form.bill) > 50000) errors.bill = 'Enter a monthly bill between 100 and 50,000 MAD.'
  }
  if (step === 1) {
    if (!form.name.trim() || form.name.trim().length < 2) errors.name = 'Enter your full name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errors.email = 'Enter a valid email address.'
    if (!/^[+\d\s()-]{9,20}$/.test(form.phone.trim()) || (form.phone.match(/\d/g)||[]).length < 9) errors.phone = 'Enter a valid phone number.'
  }
  if (step === 2 && !form.agreed) errors.agreed = 'Please confirm you understand this is a local demo.'
  return errors
}
const STORAGE_KEY = 'solara_inquiries_v1'
export const readInquiries = () => {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return []
  const parsed = JSON.parse(raw)
  if (!Array.isArray(parsed)) throw new Error('Stored inquiry data is not a valid list.')
  return parsed
}
export const writeInquiries = list => localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
export const storageKey = STORAGE_KEY
