/* #urk24cs1111 */
import React, { useEffect, useRef, useState } from "react";
import "./App.css";

const gallery = [
  ["Screenshot 2026-07-15 212600.png", "Elegant dinner event table"],
  ["Screenshot 2026-07-15 212622.png", "Elegant floral wedding stage"],
  ["Screenshot 2026-07-15 212753.png", "Lakeside floral ceremony"],
  ["Screenshot 2026-07-15 212809.png", "Pastel birthday celebration"],
  ["Screenshot 2026-07-15 212820.png", "Pink and gold birthday decor"],
  ["Screenshot 2026-08-20 112737.png", "Floral garden seating arrangement"],
  ["Screenshot 2026-08-20 112744.png", "Yellow floral wedding stage"],
  ["Screenshot 2026-08-20 112759.png", "Golden ceremonial decor"],
  ["Screenshot 2026-08-20 112812.png", "White decorated event tent"],
  ["Screenshot 2026-08-20 112819.png", "Elegant banquet table setting"],
  ["Screenshot 2026-08-20 112831.png", "Outdoor red floral mandap"],
  ["Screenshot 2026-08-20 112848.png", "Couple at floral wedding arch"],
  ["Screenshot 2026-08-20 112855.png", "Mountain wedding ceremony arch"]
];

const eventChoices = [
  "Wedding Expo", "Corporate Meet", "Birthday Carnival", "College Fest",
  "Music Concert", "Fashion Show", "Engagement Ceremony", "Baby Shower",
  "Anniversary Celebration", "Product Launch", "Charity Gala", "New Year Party",
  "Sports Tournament", "Graduation Party", "Family Reunion"
];
const packages = [
  { name: "Silver", price: 10000, description: "1 Day" },
  { name: "Gold", price: 25000, description: "2 Days" },
  { name: "Platinum", price: 50000, description: "3 Days" },
  { name: "Custom", price: null, description: "Your budget" }
];
const team = [
  ["👑", "Roshini", "Event Coordinator"], ["💍", "John", "Wedding Planner"],
  ["🎨", "Priya", "Decoration Designer"], ["📸", "David", "Photography Director"],
  ["🍽️", "Sarah", "Catering Manager"], ["🎵", "Daniel", "Music & Entertainment"],
  ["💰", "Emily", "Budget & Packages Manager"], ["🤝", "Michael", "Guest Relations Manager"],
  ["🚚", "Olivia", "Logistics Manager"], ["💡", "Sophia", "Stage & Lighting Manager"],
  ["📣", "James", "Marketing Manager"], ["✨", "Emily Rose", "Guest Experience Manager"]
];
const money = n => Number(n || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 });
const todayString = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
};

function Section({ id, title, children }) {
  return <section className="section" id={id}><h2>{title}</h2>{children}</section>;
}

function App() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginMessage, setLoginMessage] = useState("");
  const [account, setAccount] = useState({ name: "", email: "", password: "" });
  const [accountMessage, setAccountMessage] = useState("");
  const [clock, setClock] = useState(new Date());
  const [background, setBackground] = useState({ color: "", name: "Original EventSphere" });
  const [flowerX, setFlowerX] = useState(0);
  const [flowerRunning, setFlowerRunning] = useState(false);
  const [flowerSpin, setFlowerSpin] = useState(false);
  const flowerDirection = useRef(1);
  const flowerXRef = useRef(0);
  const [hoverMessage, setHoverMessage] = useState(false);
  const [booking, setBooking] = useState(null);
  const [packageNotice, setPackageNotice] = useState("");
  const [form, setForm] = useState({
    name: "", email: "", password: "", phone: "", dob: "", age: "", gender: "",
    interests: [], event: "", pack: "", customPrice: "", customRequest: "",
    search: "", time: "", week: "", month: "", feedback: ""
  });
  const [formError, setFormError] = useState("");
  const [budget, setBudget] = useState({ amount: "", rent: "30", accessories: "20", emergency: "10", savings: "40" });
  const [budgetResult, setBudgetResult] = useState("");
  const [cake, setCake] = useState({ type: "500", weight: "1", egg: "0", message: "" });
  const [cakeResult, setCakeResult] = useState("");
  const [theme, setTheme] = useState({ event: "Wedding Celebration|💍", color: "#6d3190", style: "classic", title: "A Celebration to Remember" });
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState({ name: "", event: "", rating: "", text: "" });
  const [reviewMessage, setReviewMessage] = useState("");

  useEffect(() => {
    const timer = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!flowerRunning) return;
    let frame;
    let previous = 0;
    const animate = timestamp => {
      if (!previous) previous = timestamp;
      const elapsed = Math.min(timestamp - previous, 40);
      previous = timestamp;
      const container = document.getElementById("flowerContainer");
      const flower = document.getElementById("flower");
      const max = Math.max(0, (container?.clientWidth || 0) - (flower?.offsetWidth || 58));
      let next = flowerXRef.current + flowerDirection.current * elapsed * (flowerSpin ? .16 : .10);
      if (next >= max) { next = max; flowerDirection.current = -1; }
      if (next <= 0) { next = 0; flowerDirection.current = 1; }
      flowerXRef.current = next;
      setFlowerX(next);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [flowerRunning, flowerSpin]);

  function login(e) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginEmail) || !loginPassword.trim()) {
      setLoginMessage("Enter a valid email and password."); return;
    }
    setLoggedIn(true);
    setLoginMessage(`Welcome back, ${loginEmail.split("@")[0]}!`);
  }
  function createAccount(e) {
    e.preventDefault();
    if (!/^[A-Za-z ]{2,}$/.test(account.name.trim()) ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(account.email) ||
        !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(account.password)) {
      setAccountMessage("Enter a valid name and email. Password must be 8+ characters with uppercase, lowercase and a number."); return;
    }
    setAccountMessage("Account details validated for this demo. No account was saved to a server.");
  }
  function setField(e) {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setForm(prev => ({ ...prev, interests: checked ? [...prev.interests, value] : prev.interests.filter(x => x !== value) }));
    } else setForm(prev => ({ ...prev, [name]: value }));
  }
  function submitBooking(e) {
    e.preventDefault();
    setFormError("");
    if (!/^[A-Za-z ]{2,}$/.test(form.name.trim())) return setFormError("Enter a valid full name using letters and spaces.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return setFormError("Enter a valid email address.");
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(form.password)) return setFormError("Password must be at least 8 characters and include uppercase, lowercase and a number.");
    if (!/^\d{10}$/.test(form.phone)) return setFormError("Phone number must contain exactly 10 digits.");
    if (!form.event || !form.pack) return setFormError("Please select an event and package.");
    if (form.pack === "Custom" && (!form.customPrice || Number(form.customPrice) <= 0)) return setFormError("Enter a custom budget greater than zero.");
    const p = packages.find(x => x.name === form.pack);
    setBooking({ ...form, price: p?.price ?? Number(form.customPrice) });
  }
  function resetBooking() {
    setBooking(null); setFormError("");
    setForm({ name: "", email: "", password: "", phone: "", dob: "", age: "", gender: "", interests: [], event: "", pack: "", customPrice: "", customRequest: "", search: "", time: "", week: "", month: "", feedback: "" });
  }
  function evaluateBudget() {
    const amount = Number(budget.amount);
    const percentages = [budget.rent, budget.accessories, budget.emergency, budget.savings].map(Number);
    if (!budget.amount || !Number.isFinite(amount) || amount <= 0) return setBudgetResult("Enter a total budget greater than zero.");
    if (percentages.some(p => !Number.isFinite(p) || p < 0 || p > 100)) return setBudgetResult("Each percentage must be between 0 and 100.");
    if (Math.abs(percentages.reduce((a,b) => a+b, 0) - 100) > .001) return setBudgetResult("Percentages must add up to exactly 100%.");
    const labels = ["Room Rent", "Accessories", "Emergency", "Savings"];
    setBudgetResult(labels.map((label,i) => `${label} (${percentages[i]}%): ₹${money(amount * percentages[i] / 100)}`).join(" • ") + ` • Total: ₹${money(amount)}`);
  }
  function calculateCake() {
    const weight = Number(cake.weight);
    if (!Number.isFinite(weight) || weight <= 0) return setCakeResult("Enter a cake weight greater than zero.");
    setCakeResult(`Cake price: ₹${money(Number(cake.type) * weight)} | Eggless charge: ₹${money(Number(cake.egg))} | Message: ${cake.message.trim() || "No message"} | Total: ₹${money(Number(cake.type) * weight + Number(cake.egg))}`);
  }
  function updateReview(e) { setReview({ ...review, [e.target.name]: e.target.value }); }
  function submitReview(e) {
    e.preventDefault();
    if (!review.name.trim() || !review.event || !review.rating || !review.text.trim()) {
      setReviewMessage("Please complete all review fields."); return;
    }
    setReviews(prev => [{ ...review }, ...prev]);
    setReviewMessage(`Thank you, ${review.name}! Your review has been added.`);
    setReview({ name: "", event: "", rating: "", text: "" });
  }
  const [themeEvent, themeIcon] = theme.event.split("|");
  const selectedPackage = packages.find(p => p.name === form.pack);
  const displayedPrice = selectedPackage ? (selectedPackage.price ?? Number(form.customPrice || 0)) : 0;

  return (
    <div className="app-shell" style={background.color ? { "--page-bg": background.color, backgroundColor: background.color } : {}}>
      <header id="top">
        <h1>EventSphere</h1>
        <p>Creating Memorable Events with Style &amp; Perfection</p>
      </header>
      <nav>
        {["about","services","packages","contact","registration","javascript-demo","jquery-lab","event-team","reviews"].map((id) =>
          <a href={`#${id}`} key={id}>{({about:"About",services:"Services",packages:"Packages",contact:"Contact",registration:"Register","javascript-demo":"Interactive Experience","jquery-lab":"jQuery Lab","event-team":"Our Team",reviews:"Reviews"})[id]}</a>
        )}
      </nav>

      <div className="form-container">
        <form className="auth-card" onSubmit={login}>
          <h2>Welcome Back</h2>
          <label>Email</label><input type="email" value={loginEmail} onChange={e=>setLoginEmail(e.target.value)} placeholder="you@example.com" required />
          <label>Password</label><input type="password" value={loginPassword} onChange={e=>setLoginPassword(e.target.value)} placeholder="Enter password" required />
          <button className="btn-submit" type="submit">Sign In</button>
          {loginMessage && <p className="form-message">{loginMessage}</p>}
        </form>
        <form className="auth-card" onSubmit={createAccount}>
          <h2>Create Account</h2>
          <label>Full Name</label><input value={account.name} onChange={e=>setAccount({...account,name:e.target.value})} placeholder="Your name" required />
          <label>Email</label><input type="email" value={account.email} onChange={e=>setAccount({...account,email:e.target.value})} placeholder="you@example.com" required />
          <label>Password</label><input type="password" value={account.password} onChange={e=>setAccount({...account,password:e.target.value})} placeholder="Create a password" required />
          <button className="btn-submit" type="submit">Create Account</button>
          {accountMessage && <p className="form-message">{accountMessage}</p>}
        </form>
      </div>

      <Section id="about" title="About Us">
        <p>EventSphere is a professional event management company that orchestrates weddings, corporate meetings, birthday parties, concerts, and college festivals with elegance and precision.</p>
        <p>We bring together creative planning, stunning decor, curated catering, professional photography, and top-tier entertainment to craft experiences that linger in memory.</p>
        <p><a href="#packages">→ View our event packages</a> · <a href="#top">↑ Back to top</a></p>
        <div className="about-showcase">
          {[["Screenshot 2026-07-15 212622.png","Curated wedding settings"],["Screenshot 2026-07-15 212600.png","Refined dining experiences"],["Screenshot 2026-07-15 212809.png","Joyful birthday celebrations"]].map(([src,caption])=><figure key={src}><img src={`/images/${encodeURIComponent(src)}`} alt={caption}/><figcaption>{caption}</figcaption></figure>)}
        </div>
      </Section>

      <Section id="services" title="Our Services">
        <h3>What We Offer</h3>
        <dl><dt>Wedding Planning</dt><dd>Elegant decor, coordinated timelines, and attentive management for your dream wedding.</dd><dt>Corporate Events</dt><dd>Professional conferences, seminars, and branded meetings that leave a lasting impression.</dd><dt>Birthday Parties</dt><dd>Themed celebrations with custom cakes, entertainment, and joyful surprises.</dd></dl>
        <h3>Event Planning Process</h3>
        <ol><li>Planning<ol><li>Venue Selection &amp; Booking</li><li>Budget &amp; Timeline Preparation</li></ol></li><li>Execution<ol><li>Decoration &amp; Setup</li><li>On-site Coordination &amp; Management</li></ol></li></ol>
        <h3>What's Included</h3>
        <ul><li>Entertainment<ul><li>Professional DJ</li><li>Live Band</li></ul></li><li>Catering<ul><li>Vegetarian Menu</li><li>Non-Vegetarian Menu</li></ul></li></ul>
      </Section>

      <Section id="packages" title="Event Packages">
        <p className="package-intro">Choose a package to continue to registration.</p>
        <div className="package-cards">
          {[
            { name: "Silver", icon: "🎉", suitable: "Birthday Parties", price: "₹20,000", pack: "Silver" },
            { name: "Gold", icon: "💍", suitable: "Weddings", price: "₹75,000", pack: "Gold" },
            { name: "Platinum", icon: "🏢", suitable: "Corporate Events", price: "₹1,50,000", pack: "Platinum" },
            { name: "Wedding Special", icon: "🌸", suitable: "Engagements & Receptions", price: "₹75,000", pack: "Gold" },
            { name: "Corporate Special", icon: "✨", suitable: "Meetings & Launches", price: "₹1,50,000", pack: "Platinum" }
          ].map((item) => (
            <button type="button" className="package-card" key={item.name} onClick={() => {
              setForm(prev => ({ ...prev, pack: item.pack }));
              setPackageNotice(item.name);
              document.getElementById("registration")?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}>
              <span className="package-icon" aria-hidden="true">{item.icon}</span>
              <span className="package-card-title">{item.name}</span>
              <span className="package-suitable">{item.suitable}</span>
              <span className="package-price">{item.price}</span>
              <span className="package-action">Choose Package →</span>
            </button>
          ))}
        </div>
        {packageNotice && <div className="package-notice" role="status">
          <button type="button" className="package-notice-close" aria-label="Close" onClick={() => setPackageNotice("")}>×</button>
          <span className="notice-check">✓</span>
          <div><strong>You have chosen {packageNotice}!</strong><p>Your selection is ready in the registration form.</p></div>
          <button type="button" className="notice-continue" onClick={() => { setPackageNotice(""); document.getElementById("registration-form")?.scrollIntoView({ behavior: "smooth", block: "start" }); }}>Continue to Registration</button>
        </div>}
      </Section>

      <Section id="contact" title="Contact Us">
        <p>📧 Email: <a href="mailto:eventsphere@gmail.com">eventsphere@gmail.com</a></p>
        <p>📞 Phone: <a href="tel:+919876543210">+91 98765 43210</a></p>
        <p>📍 Location: Coimbatore, Tamil Nadu</p>
      </Section>

      <Section id="available-packages" title="Available Registration Packages">
        <div className="table-wrap"><table><thead><tr><th>Package</th><th>Duration</th><th>Price</th></tr></thead><tbody><tr><td>Silver</td><td>1 Day</td><td>₹10,000</td></tr><tr><td>Gold</td><td>2 Days</td><td>₹25,000</td></tr><tr><td>Platinum</td><td>3 Days</td><td>₹50,000</td></tr></tbody></table></div>
      </Section>

      <Section id="media" title="Event Highlights">
        <p>Listen to our event highlight track:</p><audio controls src="/1.mp3">Your browser does not support audio.</audio>
        <p>Watch our event highlights:</p><video controls className="promo-video" src="/1.mp4">Your browser does not support video.</video>
        <h3 className="gallery-heading">Event Inspiration Gallery</h3><p>Reference images to spark your vision:</p>
        <div className="gallery">{gallery.map(([src,alt])=><img key={src} src={`/images/${encodeURIComponent(src)}`} alt={alt} loading="lazy" />)}</div>
        <h3 className="gallery-heading">Our Location</h3>
        <iframe className="map-frame" title="EventSphere location in Coimbatore" src="https://www.google.com/maps?q=Coimbatore,Tamil%20Nadu&output=embed" loading="lazy" />
        <p>Complete the form below to register for your preferred event.</p>
        <img className="banner-img" src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900" alt="Event celebration banner" />
      </Section>

      <div className="reg-header" id="registration"><h1>EventSphere Registration Portal</h1><p>Secure your spot at our upcoming events</p></div>
      <Section id="registration-form" title={booking ? "Booking Confirmation" : "Registration Form"}>
        {booking ? <div className="confirmation">
          <div className="success-icon">✓</div><h2>Booking Confirmed!</h2><p>Thank you, {booking.name}. Your booking details are below.</p>
          <div className="booking-details">
            <p><strong>Name:</strong> {booking.name}</p><p><strong>Email:</strong> {booking.email}</p><p><strong>Phone:</strong> {booking.phone}</p><p><strong>Event:</strong> {booking.event}</p><p><strong>Package:</strong> {booking.pack}</p><p><strong>Price:</strong> ₹{money(booking.price)}</p><p><strong>Custom requirements:</strong> {booking.customRequest || booking.feedback || "None"}</p>
          </div><button className="btn-submit" onClick={resetBooking}>New Registration</button>
        </div> : <form onSubmit={submitBooking}>
          <fieldset><legend>Participant Details</legend>
            <div className="form-grid">
              <div><label>Full Name *</label><input name="name" value={form.name} onChange={setField} placeholder="Enter your full name" required /></div>
              <div><label>Email *</label><input name="email" type="email" value={form.email} onChange={setField} placeholder="you@example.com" required /></div>
              <div><label>Password *</label><input name="password" type="password" value={form.password} onChange={setField} placeholder="8+ characters" required /></div>
              <div><label>Phone Number *</label><input name="phone" type="tel" inputMode="numeric" maxLength="10" value={form.phone} onChange={setField} placeholder="10-digit phone number" required /></div>
              <div><label>Date of Birth</label><input name="dob" type="date" value={form.dob} onChange={setField} /></div>
              <div><label>Age</label><input name="age" type="number" min="1" max="120" value={form.age} onChange={setField} placeholder="Enter your age" /></div>
            </div>
            <label>Gender</label><div className="choice-row">{["Male","Female","Other"].map(g=><label key={g} className="inline-choice"><input type="radio" name="gender" value={g} checked={form.gender===g} onChange={setField}/>{g}</label>)}</div>
            <label>Interests</label><div className="choice-row">{["Music","Dance","DJ","Singing"].map(x=><label key={x} className="inline-choice"><input type="checkbox" name="interests" value={x} checked={form.interests.includes(x)} onChange={setField}/>{x}</label>)}</div>
            <div className="form-grid">
              <div><label>Select Event *</label><select name="event" value={form.event} onChange={setField} required><option value="">— Choose an Event —</option>{eventChoices.map(x=><option key={x}>{x}</option>)}</select></div>
              <div><label>Select Package *</label><select name="pack" value={form.pack} onChange={setField} required><option value="">— Choose a Package —</option>{packages.map(p=><option key={p.name} value={p.name}>{p.name}{p.price ? ` — ₹${money(p.price)}` : ""}</option>)}</select></div>
              {form.pack==="Custom" && <div className="custom-package-box"><label>Enter Your Custom Price (₹) *</label><input name="customPrice" type="number" min="1" value={form.customPrice} onChange={setField} placeholder="Enter your budget" required /><label>Custom Package Requirements</label><textarea name="customRequest" rows="3" value={form.customRequest} onChange={setField} placeholder="Describe your event requirements..." /></div>}
              <div><label>Search Event</label><input name="search" type="search" value={form.search} onChange={setField} placeholder="Type to search…" /></div>
              <div><label>Preferred Time</label><input name="time" type="time" value={form.time} onChange={setField} /></div>
              <div><label>Preferred Week</label><input name="week" type="week" value={form.week} onChange={setField} /></div>
              <div><label>Preferred Month</label><input name="month" type="month" value={form.month} onChange={setField} /></div>
            </div>
            {form.pack && <p className="price-preview">Selected package price: <strong>₹{money(displayedPrice)}</strong></p>}
            <label>Feedback / Special Requests</label><textarea name="feedback" rows="4" value={form.feedback} onChange={setField} placeholder="Write your message here…" />
            <label>Booking Progress</label><progress value="70" max="100" /><p className="progress-caption">70% complete</p>
            {formError && <p className="error-message">{formError}</p>}
            <button type="submit" className="btn-submit">Register Now</button>
            <button type="button" className="btn-reset" onClick={resetBooking}>Clear Form</button>
          </fieldset>
        </form>}
      </Section>

      <section id="javascript-demo" className="interactive-section">
        <h2>✨ EventSphere Interactive Experience ✨</h2>
        <p className="interactive-subtitle">Explore our celebration garden, enjoy the animations, and discover the magic behind every memorable event.</p>
        <h3 className="center-title">🕒 Event Time</h3>
        <div className="event-clock">{clock.toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:true})}<span>{clock.toLocaleDateString("en-IN",{weekday:"long",day:"2-digit",month:"long",year:"numeric"})}</span></div>
        <div className="flower-garden"><h3>🌸 EventSphere Flower Garden 🌸</h3><p className="center-text">Use the controls to move, stop, reset, or animate the flower.</p>
          <div id="flowerContainer"><span id="flower" style={{left:`${flowerX}px`,transform:`rotate(${flowerSpin && flowerRunning ? flowerX*3 : 0}deg) scale(${flowerSpin && flowerRunning ? 1.12 : 1})`}}>🌸</span></div>
          <div className="flower-controls"><button className="flower-btn" onClick={()=>{setFlowerSpin(false);setFlowerRunning(true)}}>▶ Move</button><button className="flower-btn" onClick={()=>setFlowerRunning(false)}>⏸ Stop</button><button className="flower-btn reset" onClick={()=>{setFlowerRunning(false);setFlowerSpin(false);flowerXRef.current=0;setFlowerX(0);flowerDirection.current=1}}>↩ Reset</button><button className="flower-btn" onClick={()=>{setFlowerSpin(true);setFlowerRunning(true)}}>✨ Animate</button></div>
          <p className="flower-status">{flowerRunning ? "🌸 Flower is dancing in the garden!" : "Flower is ready to move!"}</p>
        </div>
        <h3 className="center-title">🎨 Choose Your Background</h3><p className="center-text">Choose a colour to change the page background.</p>
        <div className="background-options">
          {[["#3d1765","Royal Purple"],["#f8dce8","Blush Pink"],["#d9ead3","Sage Green"],["#dbeafe","Sky Blue"],["#fff0c2","Champagne Gold"],["#ffffff","Classic White"]].map(([color,name])=><button key={name} className="bg-color-btn" style={{background:color,color:["#3d1765"].includes(color)?"white":"#442e4d"}} onClick={()=>setBackground({color,name})}>{name}</button>)}
        </div><p className="color-message">Current theme: {background.name}</p>
        <h3 className="center-title">💌 Interactive Event Message</h3><div className="event-message-box"><p className={hoverMessage?"event-message enlarged":"event-message"} onMouseEnter={()=>setHoverMessage(true)} onMouseLeave={()=>setHoverMessage(false)}>Every celebration tells a beautiful story! ✨<br/>Let EventSphere turn your dream event into an unforgettable memory. 💜<br/><small>Move your cursor over this message!</small></p></div>
      </section>

      <section id="jquery-lab" className="interactive-section lab-section">
        <h2>🧪 Ex.No:07 — Working with jQuery</h2><p className="interactive-subtitle">React-powered equivalents of the Budget Calculator, Cake Order Calculator and Event Theme Designer.</p>
        <div className="lab-grid">
          <article className="jquery-card"><h3>💰 1. Budget Calculator</h3>
            <label>Total Amount (₹)</label><input type="number" min="0" value={budget.amount} onChange={e=>setBudget({...budget,amount:e.target.value})} placeholder="Enter your total budget"/>
            {[["rent","Room Rent (%)"],["accessories","Accessories (%)"],["emergency","Emergency (%)"],["savings","Savings (%)"]].map(([k,label])=><div key={k}><label>{label}</label><input type="number" min="0" max="100" value={budget[k]} onChange={e=>setBudget({...budget,[k]:e.target.value})}/></div>)}
            <button onClick={evaluateBudget}>Evaluate My Money</button><div className="lab-result">{budgetResult || "Your budget breakdown will appear here."}</div>
          </article>
          <article className="jquery-card"><h3>🎂 2. Cake Order Calculator</h3>
            <label>Choose Cake</label><select value={cake.type} onChange={e=>setCake({...cake,type:e.target.value})}><option value="500">Chocolate Cake — ₹500/kg</option><option value="450">Vanilla Cake — ₹450/kg</option><option value="600">Red Velvet Cake — ₹600/kg</option><option value="700">Black Forest Cake — ₹700/kg</option></select>
            <label>Weight (kg)</label><input type="number" min=".5" step=".5" value={cake.weight} onChange={e=>setCake({...cake,weight:e.target.value})}/>
            <label>Cake Type</label><select value={cake.egg} onChange={e=>setCake({...cake,egg:e.target.value})}><option value="0">Regular</option><option value="100">Eggless (+₹100)</option></select>
            <label>Cake Message (optional)</label><input maxLength="60" value={cake.message} onChange={e=>setCake({...cake,message:e.target.value})} placeholder="Happy Birthday!"/>
            <button onClick={calculateCake}>Calculate Cake Order</button><div className="lab-result">{cakeResult || "Your cake order total will appear here."}</div>
          </article>
          <article className="jquery-card"><h3>🎉 3. Event Theme Designer</h3><p>Customize a celebration theme and preview your event card instantly.</p>
            <label>Choose Event Type</label><select value={theme.event} onChange={e=>setTheme({...theme,event:e.target.value})}>{["Wedding Celebration|💍","Birthday Party|🎂","Corporate Gala|🥂","College Fest|🎓","Music Concert|🎤","Baby Shower|🧸"].map(x=><option key={x} value={x}>{x.split("|")[0]}</option>)}</select>
            <label>Theme Colour</label><select value={theme.color} onChange={e=>setTheme({...theme,color:e.target.value})}>{[["#6d3190","Royal Purple"],["#b83280","Blush Pink"],["#267d68","Sage Green"],["#1976d2","Sky Blue"],["#b8860b","Champagne Gold"],["#c0392b","Ruby Red"]].map(([v,l])=><option key={v} value={v}>{l}</option>)}</select>
            <label>Decoration Style</label><select value={theme.style} onChange={e=>setTheme({...theme,style:e.target.value})}>{[["classic","Classic"],["floral","Floral Garden"],["glitter","Glamour & Glitter"],["elegant","Elegant Evening"]].map(([v,l])=><option key={v} value={v}>{l}</option>)}</select>
            <label>Event Heading</label><input maxLength="50" value={theme.title} onChange={e=>setTheme({...theme,title:e.target.value})}/>
            <div className={`event-preview ${theme.style}`} style={{"--theme-color":theme.color,background:theme.style==="classic"?`linear-gradient(135deg,${theme.color},#b83280)`:undefined}}><div className="preview-icon">{themeIcon}</div><h4>{theme.title || "A Celebration to Remember"}</h4><p>{themeEvent}</p><span className="preview-tag">Planned with EventSphere ✨</span></div>
            <div className="lab-result">Theme ready: {themeEvent} • {theme.style}.</div>
          </article>
        </div>
      </section>

      <section id="event-team" className="interactive-section"><h2>👑 Meet Our Event Team 👑</h2><p className="interactive-subtitle">Meet the creative planners and professionals who bring every EventSphere celebration to life.</p><div className="team-grid">{team.map(([icon,name,role],i)=><article className="team-card" key={name}><div className="team-icon">{icon}</div><h3>{name}</h3><span className="team-role">{role}</span><div className="team-contact">📞 +91 90000 000{String(i+1).padStart(2,"0")}<br/>✉️ {name.toLowerCase().replaceAll(" ",".")}@example.com</div></article>)}</div></section>

      <section id="reviews" className="interactive-section"><h2>⭐ Share Your Event Review ⭐</h2><p className="interactive-subtitle">Your feedback helps us create more beautiful celebrations.</p>
        <form className="review-form" onSubmit={submitReview}><label>Your Name</label><input name="name" value={review.name} onChange={updateReview} required placeholder="Enter your name"/>
          <label>Event Attended</label><select name="event" value={review.event} onChange={updateReview} required><option value="">Choose your event</option>{["Wedding Celebration","Birthday Party","Corporate Event","College Fest","Music Concert","Engagement Ceremony","Other Event"].map(x=><option key={x}>{x}</option>)}</select>
          <label>Rate Your Experience</label><select name="rating" value={review.rating} onChange={updateReview} required><option value="">Select a rating</option>{[5,4,3,2,1].map(n=><option key={n} value={n}>{"★".repeat(n)+"☆".repeat(5-n)} - {["","Needs Improvement","Average","Good","Very Good","Excellent"][n]}</option>)}</select>
          <label>Your Review</label><textarea name="text" rows="4" value={review.text} onChange={updateReview} required placeholder="Tell us about your EventSphere experience..."/><button className="review-submit">✨ Submit Review</button></form>
        {reviewMessage && <p className="review-message">{reviewMessage}</p>}<h3 className="gallery-heading">💜 Customer Reviews</h3>
        {reviews.map((r,i)=><article className="review-card" key={`${r.name}-${i}`}><h3>{r.name}</h3><div className="review-stars">{"★".repeat(Number(r.rating))+"☆".repeat(5-Number(r.rating))}</div><p>Event: {r.event}</p><p>{r.text}</p></article>)}
      </section>
      <footer><p>© 2026 EventSphere — Crafted with ♥ using ReactJS</p><p><a href="#top">↑ Go to Top</a></p></footer>
    </div>
  );
}

export default App;
