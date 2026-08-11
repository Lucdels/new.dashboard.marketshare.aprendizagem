(function(){
var s1=document.createElement('script');s1.src='https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';document.head.appendChild(s1);
var s2=document.createElement('script');s2.src='https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';document.head.appendChild(s2);
var s3=document.createElement('script');s3.src='https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';document.head.appendChild(s3);
var D=[
{r:1,n:"Vale dos Sinos 2",ms:95.36,f:"lider",al:961,cj:170,ct:699,sc:262,fo:72.74,co:733,gp:34,cj2:4.1,ri:"Baixo"},
{r:2,n:"Serra 2",ms:93.07,f:"lider",al:861,cj:221,ct:860,sc:1,fo:99.88,co:924,gp:64,cj2:3.9,ri:"Baixo"},
{r:3,n:"Vale dos Sinos 1",ms:83.89,f:"lider",al:506,cj:132,ct:401,sc:105,fo:79.25,co:478,gp:77,cj2:3.0,ri:"Baixo"},
{r:4,n:"Serra 3",ms:83.18,f:"lider",al:1403,cj:172,ct:1400,sc:3,fo:99.79,co:1683,gp:283,cj2:8.1,ri:"Médio"},
{r:5,n:"Vale do Taquari 1",ms:80.42,f:"lider",al:739,cj:93,ct:731,sc:8,fo:98.92,co:909,gp:178,cj2:7.9,ri:"Médio"},
{r:6,n:"Serra 1",ms:77.54,f:"consolidada",al:2459,cj:393,ct:2220,sc:239,fo:90.28,co:2863,gp:643,cj2:5.7,ri:"Baixo"},
{r:7,n:"Metropolitana 2",ms:73.17,f:"consolidada",al:888,cj:170,ct:810,sc:78,fo:91.22,co:1107,gp:297,cj2:4.8,ri:"Baixo"},
{r:8,n:"Vale dos Sinos 3",ms:72.84,f:"consolidada",al:918,cj:146,ct:909,sc:9,fo:99.02,co:1248,gp:339,cj2:6.2,ri:"Baixo"},
{r:9,n:"Encosta da Serra",ms:68.47,f:"consolidada",al:1188,cj:137,ct:1188,sc:0,fo:100,co:1735,gp:547,cj2:8.7,ri:"Médio"},
{r:10,n:"Sul",ms:67.71,f:"consolidada",al:639,cj:83,ct:541,sc:98,fo:84.66,co:799,gp:258,cj2:6.5,ri:"Baixo"},
{r:11,n:"Norte 2",ms:66.93,f:"consolidada",al:679,cj:104,ct:678,sc:1,fo:99.85,co:1013,gp:335,cj2:6.5,ri:"Baixo"},
{r:12,n:"Noroeste 1",ms:58.36,f:"desenvolvimento",al:515,cj:67,ct:492,sc:23,fo:95.53,co:843,gp:351,cj2:7.3,ri:"Médio"},
{r:13,n:"Vale do Taquari 2",ms:57.07,f:"desenvolvimento",al:769,cj:108,ct:751,sc:18,fo:97.66,co:1316,gp:565,cj2:7.0,ri:"Baixo"},
{r:14,n:"Norte 1",ms:56.97,f:"desenvolvimento",al:493,cj:49,ct:482,sc:11,fo:97.77,co:846,gp:364,cj2:9.8,ri:"Alto"},
{r:15,n:"Noroeste 2",ms:55.43,f:"desenvolvimento",al:664,cj:67,ct:664,sc:0,fo:100,co:1198,gp:534,cj2:9.9,ri:"Alto"},
{r:16,n:"Vale do Rio Pardo",ms:55.22,f:"desenvolvimento",al:616,cj:83,ct:603,sc:13,fo:97.89,co:1092,gp:489,cj2:7.3,ri:"Médio"},
{r:17,n:"Metropolitana 3",ms:50.07,f:"desenvolvimento",al:488,cj:86,ct:378,sc:110,fo:77.46,co:755,gp:377,cj2:4.4,ri:"Baixo"},
{r:18,n:"Metropolitana 1",ms:46.92,f:"critica",al:696,cj:169,ct:616,sc:80,fo:88.51,co:1313,gp:697,cj2:3.6,ri:"Baixo"},
{r:19,n:"Centro",ms:29.36,f:"critica",al:223,cj:49,ct:212,sc:11,fo:95.07,co:722,gp:510,cj2:4.3,ri:"Baixo"}
];
var fL={lider:"Líder",consolidada:"Consolidada",desenvolvimento:"Desenvolvimento",critica:"Crítica"};
var logoDataUrl=null;
function captureLogo(){
var img=document.querySelector('img[id="logoImg"]')||document.querySelector('img[alt="SENAI"]')||document.querySelector('img[src*="SENAI"]')||document.querySelector('img[src*="senai"]');
if(!img||!img.complete||img.naturalWidth===0)return;
try{
var c=document.createElement('canvas');
c.width=img.naturalWidth;c.height=img.naturalHeight;
var ctx=c.getContext('2d');
ctx.drawImage(img,0,0);
var id=ctx.getImageData(0,0,c.width,c.height);
var dt=id.data;
for(var i=0;i<dt.length;i+=4){
if(dt[i]<30&&dt[i+1]<30&&dt[i+2]<30)dt[i+3]=0;
}
ctx.putImageData(id,0,0);
logoDataUrl=c.toDataURL('image/png');
}catch(e){logoDataUrl=null;}
}
function findPanel(){
var all=document.querySelectorAll('div,section,main');
var c=[];
for(var i=0;i<all.length;i++){
var d=all[i];
var t=(d.textContent||'').toUpperCase();
var hasInsight=t.indexOf('INSIGHT')!==-1||t.indexOf('ESTRAT')!==-1||t.indexOf('PRIORIDADE')!==-1||t.indexOf('RISCO')!==-1;
var hasData=t.indexOf('MARKET SHARE')!==-1||t.indexOf('ALUNOS')!==-1||t.indexOf('CNPJ')!==-1;
if(hasInsight&&hasData&&d.offsetHeight>200&&d.querySelector('select,button,input')){c.push(d);}
}
if(c.length===0){
for(var j=0;j<all.length;j++){
var d2=all[j];var t2=(d2.textContent||'').toUpperCase();
if((t2.indexOf('INSIGHT')!==-1||t2.indexOf('ESTRAT')!==-1)&&d2.offsetHeight>200){c.push(d2);}
}
}
if(c.length===0){
var sel=document.querySelector('select');
if(sel){var p=sel.parentElement;for(var k=0;k<10&&p;k++){if(p.offsetHeight>300&&p.querySelectorAll('div').length>3){c.push(p);break;}p=p.parentElement;}}
}
if(c.length===0){
var btn=document.querySelector('button');
if(btn&&btn.textContent.indexOf('PDF')!==-1){var p2=btn.parentElement;for(var m=0;m<10&&p2;m++){if(p2.querySelector('select')&&p2.offsetHeight>300){c.push(p2);break;}p2=p2.parentElement;}}
}
c.sort(function(a,b){return a.offsetHeight-b.offsetHeight;});
return c.length>0?c[0]:null;
}
function init(){
var tbl=document.querySelector('table');
if(!tbl)return;
if(!document.getElementById('cSearch')){
var inp=document.createElement('input');
inp.id='cSearch';inp.type='text';inp.placeholder='Buscar por nome de sub-região...';
inp.style.cssText='width:100%;padding:8px 12px;border:1px solid #ccc;border-radius:8px;margin-bottom:12px;font-size:14px;box-sizing:border-box';
inp.oninput=function(){var t=inp.value.toLowerCase().trim();var rows=tbl.querySelectorAll('tbody tr');rows.forEach(function(r){var txt=r.textContent.toLowerCase();r.style.display=(!t||txt.indexOf(t)!==-1)?'':'none';});};
tbl.parentNode.insertBefore(inp,tbl);
}
tbl.querySelectorAll('th').forEach(function(th,i){
if(th.getAttribute('data-csort'))return;
th.setAttribute('data-csort','1');th.style.cursor='pointer';th.title='Clique para ordenar';
th.onclick=function(){var tbody=tbl.querySelector('tbody');if(!tbody)return;var rows=Array.from(tbody.querySelectorAll('tr'));var dir=th.getAttribute('data-cdir')==='asc'?-1:1;th.setAttribute('data-cdir',dir===1?'asc':'desc');rows.sort(function(a,b){var va=(a.cells[i]||{textContent:''}).textContent.trim();var vb=(b.cells[i]||{textContent:''}).textContent.trim();var na=parseFloat(va.replace(/[^\d,-]/g,'').replace(',','.'));var nb=parseFloat(vb.replace(/[^\d,-]/g,'').replace(',','.'));if(!isNaN(na)&&!isNaN(nb))return(na-nb)*dir;return va.localeCompare(vb)*dir;});rows.forEach(function(r){tbody.appendChild(r);});};
});
if(!document.getElementById('cXlsBtn')){
var btn=document.createElement('button');
btn.id='cXlsBtn';btn.innerHTML='📊 Exportar Excel';
btn.style.cssText='padding:8px 16px;border:1px solid #00A859;color:#00A859;background:#fff;border-radius:8px;font-weight:600;cursor:pointer;margin:8px 0;font-size:14px';
btn.onclick=function(){if(typeof XLSX==='undefined'){alert('Aguarde e tente novamente.');return;}var data=D.map(function(r){return{"Ranking":r.r,"Sub-região":r.n,"Market Share (%)":r.ms,"Faixa":fL[r.f],"Alunos":r.al,"CNPJs":r.cj,"Com Contrato":r.ct,"Sem Contrato":r.sc,"Formalização (%)":r.fo,"Cotas CAGED":r.co,"Gap":r.gp,"Alunos/CNPJ":r.cj2,"Risco":r.ri};});var ws=XLSX.utils.json_to_sheet(data);ws["!cols"]=[{wch:8},{wch:28},{wch:18},{wch:16},{wch:10},{wch:8},{wch:12},{wch:12},{wch:14},{wch:12},{wch:8},{wch:12},{wch:10}];var wb=XLSX.utils.book_new();XLSX.utils.book_append_sheet(wb,ws,"Market Share CAGED");XLSX.writeFile(wb,"SENAI-RS_MarketShare_CAGED_Q2-2026.xlsx");};
var sec=tbl.closest('section')||tbl.closest('div');
if(sec)sec.insertBefore(btn,sec.firstChild);
}
var sel=document.querySelector('select');
if(sel){try{var last=localStorage.getItem('senai_last');if(last){for(var i=0;i<sel.options.length;i++){if(sel.options[i].value===last){sel.value=last;break;}}}sel.addEventListener('change',function(){try{localStorage.setItem('senai_last',sel.value);}catch(e){}});}catch(e){}}
var pdfBtns=document.querySelectorAll('button');
pdfBtns.forEach(function(btn){
if(btn.textContent.indexOf('PDF')!==-1&&!btn.getAttribute('data-cpdf')){
btn.setAttribute('data-cpdf','1');
btn.onclick=function(){
var sel2=document.querySelector('select');
if(!sel2||!sel2.value){alert('Selecione uma sub-região.');return;}
var panel=findPanel();
if(!panel){alert('Não foi possível localizar o painel. Tente selecionar a região novamente.');return;}
captureLogo();
var ot=btn.innerHTML;
btn.innerHTML='Gerando...';btn.disabled=true;
function doCapture(){
if(typeof html2canvas==='undefined'){setTimeout(doCapture,200);return;}
var els=[panel].concat(Array.prototype.slice.call(panel.querySelectorAll('*')));
var saved=[];
for(var i=0;i<els.length;i++){
var e=els[i];
saved[i]={ov:e.style.overflow,ww:e.style.wordWrap,ws:e.style.whiteSpace};
e.style.overflow='visible';
e.style.wordWrap='break-word';
e.style.whiteSpace='normal';
}
html2canvas(panel,{scale:2,backgroundColor:'#ffffff',useCORS:true,logging:false,width:panel.scrollWidth,height:panel.scrollHeight}).then(function(canvas){
for(var i=0;i<els.length;i++){els[i].style.overflow=saved[i].ov;els[i].style.wordWrap=saved[i].ww;els[i].style.whiteSpace=saved[i].ws;}
var JC=window.jspdf?window.jspdf.jsPDF:window.jsPDF;
if(!JC){alert('Biblioteca não carregou.');btn.innerHTML=ot;btn.disabled=false;return;}
var doc=new JC({unit:'mm',format:'a4',orientation:'portrait'});
var pW=210,pH=297,mg=8,headerH=24;
var imgW=pW-mg*2;
var imgH=canvas.height*imgW/canvas.width;
var pageContentH=pH-headerH-mg-5;
var heightLeft=imgH;
var position=headerH;
var imgData=canvas.toDataURL('image/png');
function addHeader(){
doc.setFillColor(27,41,86);doc.rect(0,0,pW,headerH-2,'F');
if(logoDataUrl){
try{
var logoH=14;
var logoW=logoH*(4/1);
if(logoW>35)logoW=35;
doc.addImage(logoDataUrl,'PNG',mg,3,logoW,logoH);
}catch(e){}
}
doc.setTextColor(255,255,255);doc.setFont('helvetica','bold');doc.setFontSize(13);
var textX=logoDataUrl?mg+40:mg;
doc.text('SENAI RS - Relatorio Regional',textX,10);
doc.setFontSize(7);doc.setFont('helvetica','normal');
doc.text('Market Share CAGED | Aprendizagem Industrial | Q2 2026',textX,17);
doc.setDrawColor(27,41,86);doc.setLineWidth(0.5);doc.line(mg,headerH-2,pW-mg,headerH-2);
}
function addFooter(){
doc.setTextColor(150,150,150);doc.setFontSize(6);
doc.text('SENAI RS | Dashboard Market Share CAGED | Q2 2026 | Confidencial',pW/2,pH-3,{align:'center'});
}
addHeader();
doc.addImage(imgData,'PNG',mg,position,imgW,imgH);
heightLeft-=pageContentH;
addFooter();
while(heightLeft>0){
doc.addPage();
addHeader();
position=headerH-(imgH-heightLeft);
doc.addImage(imgData,'PNG',mg,position,imgW,imgH);
heightLeft-=pageContentH;
addFooter();
}
doc.save('SENAI-RS_'+sel2.value.replace(/\s+/g,'_')+'.pdf');
btn.innerHTML=ot;btn.disabled=false;
}).catch(function(err){
for(var i=0;i<els.length;i++){els[i].style.overflow=saved[i].ov;els[i].style.wordWrap=saved[i].ww;els[i].style.whiteSpace=saved[i].ws;}
console.error(err);
btn.innerHTML='Erro';btn.disabled=false;
setTimeout(function(){btn.innerHTML=ot;},3000);
alert('Erro ao gerar PDF. Tente novamente.');
});
}
doCapture();
};
}
});
}
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',function(){setTimeout(init,500);});}else{setTimeout(init,500);}
})();