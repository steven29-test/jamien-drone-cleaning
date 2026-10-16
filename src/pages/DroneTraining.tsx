import { useEffect, useState, type FormEvent } from 'react'
import { useLocation } from 'react-router-dom'
import { saveCustomerToCSV } from '../services/csvService'
import { updatePageMeta } from '../utils/seo'
import './DroneTraining.css'

export default function DroneTraining() {
  const { hash } = useLocation()
  const [course, setCourse] = useState('First RePL course')
  const [status, setStatus] = useState('')
  const [sending, setSending] = useState(false)
  const [failed, setFailed] = useState(false)
  useEffect(() => {
    window.scrollTo(0, 0)
    updatePageMeta('RePL Drone Training Sydney | Jamien Drone', 'Explore RePL drone training options in Sydney. Enquire about courses, licence upgrades, group training and Chinese-language support.', 'https://www.jamiendrone.com.au/drone-training')
  }, [])
  useEffect(() => {
    if (!hash) return
    const frame = requestAnimationFrame(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
    return () => cancelAnimationFrame(frame)
  }, [hash])
  async function sendEnquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (sending) return
    const form = event.currentTarget
    const data = new FormData(form)
    setSending(true)
    setFailed(false)
    setStatus('')
    try {
      const result = await saveCustomerToCSV({
        name: String(data.get('name') || '').trim(),
        email: String(data.get('email') || '').trim(),
        phone: String(data.get('phone') || '').trim(),
        serviceType: 'Academy — ' + course,
        message: `Course: ${course}\nPreferred timing: ${data.get('timing')}\n\n${String(data.get('message') || '').trim()}`,
        marketingConsent: false,
      })
      if (!result.success) throw new Error(result.error || 'Unable to send your enquiry. Please try again.')
      setStatus('Thank you. Your enquiry has been sent. We’ll be in touch soon.')
      form.reset()
      setCourse('First RePL course')
    } catch (error) {
      setFailed(true)
      setStatus(error instanceof Error ? error.message.replace(/^Error: /, '') : 'Unable to send your enquiry. Please try again.')
    } finally {
      setSending(false)
    }
  }
  return <div className="training-page"><main className="wrap"><section className="hero"><div className="herocopy"><div className="eyebrow">Sydney · Remote Pilot Licence</div><h1>RePL drone training.<br /><em>Your next chapter.</em></h1><p>Explore RePL drone training in Sydney. Find the right pathway for your goals, from learning to fly to developing your industry skills.</p><div className="actions"><a className="btn primary" href="#courses">Explore training <span>↗</span></a><a className="btn outline" href="#enquire">Ask a question</a></div><p className="micro">Planning your first course? Start with a conversation.</p></div><div className="flight" aria-label="Illustration of a quadcopter drone"><svg viewBox="0 0 500 400" fill="none" aria-hidden="true"><circle cx="250" cy="190" r="145" stroke="#AAA69E" opacity=".15"/><circle cx="250" cy="190" r="105" stroke="#AAA69E" opacity=".2" strokeDasharray="4 8"/><g stroke="#C8C5BE" strokeWidth="18" strokeLinecap="round"><path d="M235 175L135 100M265 175L365 100M235 205L135 280M265 205L365 280"/></g><g stroke="#AAA296" strokeWidth="2" fill="#4D524F"><ellipse cx="125" cy="95" rx="68" ry="21"/><ellipse cx="375" cy="95" rx="68" ry="21"/><ellipse cx="125" cy="285" rx="68" ry="21"/><ellipse cx="375" cy="285" rx="68" ry="21"/></g><g fill="#D7D4CD"><circle cx="125" cy="95" r="11"/><circle cx="375" cy="95" r="11"/><circle cx="125" cy="285" r="11"/><circle cx="375" cy="285" r="11"/></g><path d="M218 138Q250 120 282 138L293 216Q250 245 207 216Z" fill="#D9D6CF"/><path d="M229 145L271 145L278 194L222 194Z" fill="#A29D94"/><rect x="237" y="227" width="26" height="24" rx="5" fill="#d5decd"/><circle cx="250" cy="239" r="7" fill="#343936"/><path d="M40 40h25M40 40v25M460 40h-25M460 40v25M40 345h25M40 345v-25M460 345h-25M460 345v-25" stroke="#A39B8E" opacity=".6"/></svg><div className="tag"><span>LEARN. PRACTISE. PROGRESS.</span><span>JAMIEN / TRAINING</span></div></div></section><div className="facts"><div><strong>Sydney training enquiries</strong><span>Discuss location & availability</span></div><div><strong>Find your course pathway</strong><span>Get help choosing your next step</span></div><div><strong>中文咨询</strong><span>Chinese-language enquiries welcome</span></div></div>
<section className="section" id="courses"><div className="headrow"><div><div className="eyebrow">Choose your direction</div><h2>A clearer path<br />into drone training.</h2></div><p>Tell us what you want to do with a drone. We’ll help you understand the course options and confirm what is available.</p></div><div className="cards"><article className="card featured" id="repl-training"><span className="pill">Start here</span><h3>RePL training</h3><p>For people exploring their first Remote Pilot Licence.</p><ul><li>Discuss theory and practical training</li><li>Confirm the aircraft category and weight range</li><li>Ask about assessment and AROC inclusions</li></ul><a className="btn dark" href="#enquire" onClick={() => setCourse("First RePL course")}>Ask about RePL <span>↗</span></a></article><article className="card" id="licence-upgrades"><span className="pill">Your next step</span><h3>Licence upgrades</h3><p>Already hold a RePL? Enquire about training for a different aircraft weight range or category.</p><ul><li>Review your current licence</li><li>Discuss your intended aircraft</li><li>Check suitable training availability</li></ul><a className="btn" href="#enquire" onClick={() => setCourse("Licence upgrade")}>Explore an upgrade <span>↗</span></a></article><article className="card" id="group-training"><span className="pill">Learn as a team</span><h3>Group enquiries</h3><p>Planning drone training for your team or business?</p><ul><li>Share your team’s experience level</li><li>Discuss your operational goals</li><li>Request suitable course options</li></ul><a className="btn" href="#enquire" onClick={() => setCourse("Group training")}>Discuss group training <span>↗</span></a></article></div><p className="note">Course fees, dates, locations, approved training provider and inclusions will be confirmed before booking. Enquire below for current availability.</p></section>
<section className="section split" style={{"paddingTop": "10px"}}><div><div className="eyebrow">Know what comes next</div><h2>From first question<br />to the right course.</h2><p style={{"color": "var(--muted)"}}>Clear information before you commit. No guesswork about the provider, schedule or what your fee includes.</p></div><div className="steps"><div className="step"><b>01</b><div><h3>Tell us your goal</h3><p>Share your experience, the drone you want to fly and your preferred timing.</p></div></div><div className="step"><b>02</b><div><h3>Review your options</h3><p>Receive the available course details, provider information, fees and training arrangements.</p></div></div><div className="step"><b>03</b><div><h3>Choose with confidence</h3><p>Review the assessment requirements, booking terms and cancellation policy before enrolling.</p></div></div></div></section>
<section className="band split"><div><div className="eyebrow">Beyond the licence</div><h2>What would you<br />like to do next?</h2><p>Jamien’s focus on drone cleaning brings a practical industry perspective to your training enquiries.</p><a href="/" className="btn">Explore our cleaning services ↗</a></div><div><div className="application"><div>Aerial photography</div><div>Building inspections</div><div>Mapping & surveying</div><div>Drone cleaning</div></div><p className="note">These are possible application areas, not promised course outcomes. Specialist skills, equipment and operational approvals may be required. RePL training and any future cleaning equipment training are separate offerings.</p></div></section>
<section className="section split" id="faq"><div><div className="eyebrow">Before you begin</div><h2>Good questions.<br />Clear answers.</h2><p style={{"color": "var(--muted)"}}>Need help with something else?<br /><a href="tel:0435116503"><u>Call 0435 116 503</u></a></p></div><div className="faq"><details open><summary>Who delivers the RePL training?</summary><p>The approved training provider and its role will be identified in your course information before you book. Ask us for the provider details and course arrangements.</p></details><details><summary>Can I enquire if I have no flying experience?</summary><p>Yes. Tell us that you are a beginner so we can check suitable options and entry requirements with the training provider.</p></details><details><summary>How much does it cost and when can I start?</summary><p>Contact us for confirmed fees, available dates, location and inclusions. Ask whether AROC, assessments, licence application administration and any resit fees are included.</p></details><details><summary>Can I get help in Chinese?</summary><p>Chinese-language enquiries are welcome. The language of instruction, learning materials and assessments must be confirmed for the selected course.</p></details><details><summary>Does a RePL let me start drone cleaning straight away?</summary><p>A RePL alone does not establish permission for every cleaning operation. Aircraft, operating arrangements, equipment skills and any required approvals must also be considered.</p></details></div></section>
<section className="enquire" id="enquire"><div><div className="eyebrow">Let’s plan your next step</div><h2>Ready to explore<br />drone training?</h2><p>Tell us a little about your plans. Send your enquiry by email or speak with us directly.</p><a href="tel:0435116503" style={{"fontSize": "25px"}}>0435 116 503 ↗</a><p style={{"fontSize": "13px"}}>sales@jamiendrone.com.au<br />English & 中文咨询</p></div><form id="enquiry" onSubmit={sendEnquiry}><div className="row"><div><label htmlFor="name">Your name *</label><input id="name" name="name" required autoComplete="name" /></div><div><label htmlFor="email">Email *</label><input id="email" name="email" type="email" required autoComplete="email" /></div></div><label htmlFor="phone">Phone</label><input id="phone" name="phone" type="tel" autoComplete="tel" /><label htmlFor="course">I’m interested in</label><select id="course" name="course" value={course} onChange={event => setCourse(event.target.value)}><option>First RePL course</option><option>Licence upgrade</option><option>Group training</option><option>Not sure — help me choose</option></select><label htmlFor="timing">Preferred timing</label><select id="timing" name="timing"><option>Exploring my options</option><option>Within the next month</option><option>Within 1–3 months</option><option>Flexible</option></select><label htmlFor="message">Message *</label><textarea id="message" name="message" rows={5} required placeholder="Tell us about your training goals or ask a question." /><button className="btn primary" type="submit" disabled={sending}>{sending ? 'Sending…' : 'Send'}</button><div id="status" role={failed ? 'alert' : 'status'} style={{ color: failed ? '#FFD1C8' : '#D8D5CE', marginTop: 14 }}>{status}</div></form></section>
</main><div className="sticky"><a className="btn dark" href="#enquire">Training enquiry</a><a className="btn" href="tel:0435116503">Call 0435 116 503</a></div></div>
}
