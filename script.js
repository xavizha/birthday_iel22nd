const SECRET_CODE = "0810"; // GANTI KODE DI SINI

const screens = [...document.querySelectorAll(".screen")];
const dots = [...document.querySelectorAll("#codeDots span")];
let entered = "";

function showScreen(id){
  screens.forEach(s => s.classList.toggle("active", s.id === id));
  window.scrollTo({top:0,behavior:"instant"});
}

function updateDots(){
  dots.forEach((dot,i)=>dot.classList.toggle("filled",i < entered.length));
}

document.querySelectorAll("[data-key]").forEach(btn=>{
  btn.addEventListener("click",()=>{
    if(entered.length >= SECRET_CODE.length) return;
    entered += btn.dataset.key;
    updateDots();

    if(entered.length === SECRET_CODE.length){
      setTimeout(()=>{
        if(entered === SECRET_CODE){
          showScreen("birthdayScreen");
        }else{
          dots.forEach(d=>d.classList.add("wrong"));
          entered="";
          setTimeout(()=>{dots.forEach(d=>d.classList.remove("wrong"));updateDots()},450);
        }
      },180);
    }
  });
});

document.getElementById("backspace").addEventListener("click",()=>{
  entered=entered.slice(0,-1);
  updateDots();
});

document.querySelectorAll("[data-next]").forEach(btn=>{
  btn.addEventListener("click",()=>showScreen(btn.dataset.next));
});

document.getElementById("restart").addEventListener("click",()=>{
  entered="";
  updateDots();
  showScreen("loginScreen");
});

const audio = document.getElementById("audioPlayer");
document.querySelectorAll(".song").forEach(song=>{
  song.addEventListener("click",()=>{
    const src=song.dataset.audio;
    audio.src=src;
    audio.play().catch(()=>{});
    document.querySelectorAll(".song .play").forEach(p=>p.textContent="▶");
    song.querySelector(".play").textContent="Ⅱ";
  });
});

const particles=document.getElementById("particles");
for(let i=0;i<45;i++){
  const p=document.createElement("span");
  p.className="particle";
  p.style.left=Math.random()*100+"%";
  p.style.animationDelay=(Math.random()*7)+"s";
  p.style.animationDuration=(5+Math.random()*6)+"s";
  p.style.opacity=(.15+Math.random()*.35);
  particles.appendChild(p);
}
