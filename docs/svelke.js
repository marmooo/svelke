var Svelke=(function(){var Svelke=function(elements,options={}){if(!(this instanceof Svelke)){return new Svelke(elements,options);}
this.tmpCanvas=document.createElement('canvas');this.intervalTime=options.intervalTime||200;this.nukegeNum=options.nukegeNum||20;this.nukegeTexts=['ノ','ﾉ','ミ','彡'];if(!Array.isArray(elements)){elements=[elements];}
this.flyAll(elements);}
Svelke.prototype.flyAll=function(elements){for(var i=0;i<elements.length;i++){var style=getComputedStyle(elements[i]);var fontSize=parseInt(style.fontSize);var fontFamily=style.fontFamily;var zuraPositions=this.getZuraPositions(elements[i],fontSize,fontFamily);var self=this;(async function(element){for(var j=0;j<zuraPositions.length;j++){for(var k=0;k<self.nukegeNum;k++){self.fly(element,zuraPositions[j],fontSize,fontFamily);await self.sleep(1000);}}})(elements[i]);}}
Svelke.prototype.fly=function(element,zuraPosition,fontSize,fontFamily){var top=zuraPosition[0]-fontSize;var left=zuraPosition[1]+this.getRandomInt(fontSize,fontSize*3);var nukege=document.createElement('div');nukege.style=`position:absolute;  top:${top}; left:${left}; font-family:${fontFamily}`;nukege.innerText=this.nukegeTexts[this.getRandomInt(0,this.nukegeTexts.length)];document.body.appendChild(nukege);var self=this;var count=0;var interval=setInterval(function(){if(count<50){top+=-5*Math.random();left+=10*Math.random();}else if(count<100){if(count==50){element.innerText=element.innerText.replace('彡ﾉﾉﾊミ','彡 ⌒ ミ');}
top+=5*Math.random();left+=10*Math.random();}else if(count==100){element.innerText=element.innerText.replace('彡 ⌒ ミ','〆⌒ ヽ');clearInterval(interval);}
nukege.style=`position:absolute;  top:${top}; left:${left}`;count+=1;},self.intervalTime);}
Svelke.prototype.sleep=function(milliseconds){return new Promise(resolve=>setTimeout(resolve,milliseconds));}
Svelke.prototype.getRandomInt=function(min,max){min=Math.ceil(min);max=Math.floor(max);return Math.floor(Math.random()*(max-min))+min;}
Svelke.prototype.getTextWidth=function(text,font){var context=this.tmpCanvas.getContext("2d");context.font=font;var metrics=context.measureText(text);return metrics.width;}
Svelke.prototype.getZura=function(str){return /彡(?:(?:ﾉﾉ)?ﾊ| ⌒ |⌒)ミ/.exec(str);}
Svelke.prototype.getZuraPositions=function(element,fontSize,fontFamily){var positions=[];var exists=true;var aa=element.innerText;var zura=this.getZura(aa);while(zura){var zuraPos=zura.index+zura[0].length;var tmp=aa.slice(0,zuraPos);var linePos=tmp.lastIndexOf('\n');var lineNum=0;if(linePos>0){lineNum=tmp.slice(0,linePos+1).split('\n').length-1;}
var width=this.getTextWidth(aa.slice(linePos,zura.index),fontFamily);positions.push([element.offsetTop+lineNum*fontSize*1.1,element.offsetLeft+width]);aa=aa.slice(zuraPos);zura=this.getZura(aa);}
return positions;}
return Svelke;})();