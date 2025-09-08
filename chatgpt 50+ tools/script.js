/* ---------- TEXT TOOLS ---------- */
function countWords() {
  const v = (document.getElementById("wordInput")?.value || "").trim();
  const words = v.length ? v.split(/\s+/).filter(Boolean) : [];
  byId("wordResult").textContent = `Words: ${words.length}`;
}

function countChars() {
  const v = document.getElementById("charInput")?.value || "";
  byId("charResult").textContent = `Characters: ${[...v].length}`;
}

function toUpper() { setText("caseResult", getVal("caseInput").toUpperCase()); }
function toLower() { setText("caseResult", getVal("caseInput").toLowerCase()); }
function toTitle() {
  const out = getVal("caseInput").toLowerCase().split(/\s+/).map(w=> w? w[0].toUpperCase()+w.slice(1):"").join(" ");
  setText("caseResult", out);
}

function removeSpaces() {
  const out = getVal("spaceInput").replace(/\s+/g," ").trim();
  setText("spaceResult", out);
}

function reverseText() {
  setText("reverseResult", [...getVal("reverseInput")].reverse().join(""));
}

/* ---------- DATE & TIME ---------- */
function calculateAge() {
  const v = getVal("dob");
  if(!v){ setText("ageResult","Select DOB!"); return; }
  const d = new Date(v), now = new Date();
  let age = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--;
  setText("ageResult", `You are ${age} years old.`);
}

function showTime() { setText("timeResult", new Date().toLocaleString()); }

/* Countdown */
let countdownTimer=null, countdownLeft=0;
function startCountdown() {
  const sec = parseInt(getVal("countdownInput"));
  if(isNaN(sec) || sec<0){ setText("countdownResult","Enter seconds"); return; }
  clearInterval(countdownTimer);
  countdownLeft = sec;
  renderCountdown();
  countdownTimer = setInterval(()=>{
    countdownLeft--;
    renderCountdown();
    if(countdownLeft<=0){ clearInterval(countdownTimer); setText("countdownResult","⏰ Time's up!"); }
  },1000);
}
function stopCountdown(){ clearInterval(countdownTimer); }
function resetCountdown(){ clearInterval(countdownTimer); countdownLeft=0; setText("countdownResult",""); }
function renderCountdown(){ setText("countdownResult", `${countdownLeft} second(s) left`); }

/* Stopwatch */
let swInt=null, swMs=0;
function startStopwatch(){
  if(swInt) return;
  swInt = setInterval(()=>{ swMs+=10; renderStopwatch(); },10);
}
function stopStopwatch(){ clearInterval(swInt); swInt=null; }
function resetStopwatch(){ stopStopwatch(); swMs=0; renderStopwatch(); }
function renderStopwatch(){
  const ms = swMs % 1000, s = Math.floor(swMs/1000)%60, m=Math.floor(swMs/60000)%60, h=Math.floor(swMs/3600000);
  byId("stopwatchTime").textContent = `${pad(h)}:${pad(m)}:${pad(s)}.${String(ms).padStart(3,"0")}`;
}
function pad(n){ return String(n).padStart(2,"0"); }

function dateDiff(){
  const a = new Date(getVal("date1")), b = new Date(getVal("date2"));
  if(isNaN(a) || isNaN(b)){ setText("dateDiffResult","Select both dates"); return; }
  const diffDays = Math.abs(b - a)/(1000*60*60*24);
  setText("dateDiffResult", `Difference: ${diffDays.toFixed(0)} day(s)`);
}

/* ---------- GENERATORS ---------- */
function randomNumber(){
  const min = parseInt(getVal("min")), max = parseInt(getVal("max"));
  if(isNaN(min)||isNaN(max)||min>max){ setText("randResult","Enter valid min/max"); return; }
  const n = Math.floor(Math.random()*(max-min+1))+min;
  setText("randResult", `Random: ${n}`);
}

function generatePassword(){
  const len = parseInt(getVal("passLength")) || 12;
  const useLower = byId("optLower")? byId("optLower").checked : true;
  const useUpper = byId("optUpper")? byId("optUpper").checked : true;
  const useNums  = byId("optNums")?  byId("optNums").checked  : true;
  const useSyms  = byId("optSyms")?  byId("optSyms").checked  : true;
  let pool = "";
  if(useLower) pool+="abcdefghijklmnopqrstuvwxyz";
  if(useUpper) pool+="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if(useNums)  pool+="0123456789";
  if(useSyms)  pool+="!@#$%^&*()_+-=[]{};:,.<>/?";
  if(!pool){ setText("passResult","Select at least 1 set"); return; }
  let out=""; for(let i=0;i<len;i++) out+= pool[Math.floor(Math.random()*pool.length)];
  setText("passResult", out);
}

function generateQR(){
  const t = getVal("qrText");
  if(!t){ byId("qrResult").innerHTML="Enter text/URL"; return; }
  const src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(t)}`;
  byId("qrResult").innerHTML = `<img alt="QR" src="${src}" />`;
}

function generateLorem(){
  const count = parseInt(getVal("loremCount")) || 2;
  const para = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  setText("loremResult", Array.from({length:Math.min(10,Math.max(1,count))},()=>para).join("\n\n"));
}

function pickColor(){
  const c = getVal("colorInput");
  setText("colorResult", `Selected: ${c}`);
  const box = byId("colorBox"); if(box) box.style.background = c;
}

/* ---------- DEV TOOLS ---------- */
function formatJSON(){
  try{
    const obj = JSON.parse(getVal("jsonInput"));
    byId("jsonResult").textContent = JSON.stringify(obj,null,2);
  }catch(e){ byId("jsonResult").textContent = "Invalid JSON!"; }
}

function encodeBase64(){ setText("base64Result", btoa(getVal("base64Input"))); }
function decodeBase64(){
  try{ setText("base64Result", atob(getVal("base64Input"))); }
  catch(e){ setText("base64Result", "Invalid Base64!"); }
}

function encodeURL(){ setText("urlResult", encodeURIComponent(getVal("urlInput"))); }
function decodeURL(){ setText("urlResult", decodeURIComponent(getVal("urlInput"))); }

function encodeHTML(){
  const t = getVal("htmlInput");
  const out = t.replace(/[<>&"']/g, ch => ({
    "<":"&lt;", ">":"&gt;", "&":"&amp;", '"':"&quot;", "'":"&#39;"
  }[ch]));
  setText("htmlResult", out);
}

function testRegex(){
  const p = getVal("regexPattern"), f = getVal("regexFlags");
  const text = getVal("regexText");
  try{
    const re = new RegExp(p,f);
    const match = text.match(re);
    setText("regexResult", match ? `✅ Match: ${JSON.stringify(match[0])}` : "❌ No Match");
  }catch(e){ setText("regexResult","Invalid Regex!"); }
}

/* ---------- Helpers ---------- */
function byId(id){ return document.getElementById(id); }
function getVal(id){ return (byId(id)?.value || ""); }
function setText(id, val){ const el = byId(id); if(el) el.textContent = val; }
