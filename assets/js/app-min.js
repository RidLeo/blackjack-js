const miModulo=(()=>{"use strict";let e=[],t=["C","D","H","S"],r=["A","J","Q","K"],l=[],a=document.querySelector("#btnPedir"),n=document.querySelector("#btnDetener"),d=document.querySelector("#btnNuevo"),o=document.querySelectorAll(".divCartas"),s=document.querySelectorAll("small"),i=()=>{let e=[];for(let l=2;l<15;l++)for(let a of t){let n=String(l);l>10&&(n=r[l-11]),e.push(n+a)}return _.shuffle(e)},c=(t=2)=>{e=i(),l=[];for(let r=0;r<t;r++)l.push(0);a.disabled=!1,n.disabled=!1,d.disabled=!0,s.forEach(e=>{e.innerHTML=0}),o.forEach(e=>{e.innerHTML=""}),console.log(e)},u=()=>{if(0==e.length)throw"No hay cartas en el deck";return e.pop()},h=e=>{let t=e.substring(0,e.length-1);return isNaN(t)?"A"==t?11:10:parseInt(t)},$=(e,t)=>(l[t]+=h(e),s[t].innerHTML=l[t],l[t]),b=(e,t)=>{let r=document.createElement("img");r.src=`assets/cartas/${e}.png`,r.classList.add("carta"),o[t].append(r)},f=()=>{let[e,t]=l;t==e?console.warn("empate"):e>21?console.error("Computadora Gana"):t>21?console.info("Jugador Gana"):console.error("Lo siento, perdiste machucao")},g=e=>{let t=0;do{let r=u();t=$(r,l.length-1),b(r,l.length-1)}while(t<e&&e<22);f()},p=e=>{a.disabled=!0,n.disabled=!0,g(e)};return a.addEventListener("click",()=>{d.disabled=!1;let e=u(),t=$(e,0);b(e,0),(t>21||21===t)&&p(t)}),n.addEventListener("click",()=>{d.disabled=!1;let[e]=l;p(e)}),d.addEventListener("click",()=>{c()}),{nuevoJuego:c}})();