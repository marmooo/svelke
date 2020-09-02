var Svelke=(function(){var Svelke=function(elements,options={}){if(!(this instanceof Svelke)){return new Svelke(elements,options);}
this.tmpCanvas=document.createElement('canvas');this.intervalTime=options.intervalTime||200;this.nukegeNum=options.nukegeNum||20;this.nukegeTexts=['ノ','ﾉ','ミ','彡'];if(!Array.isArray(elements)){elements=[elements];}
this.flyAll(elements);}
Svelke.prototype.flyAll=function(elements){for(var i=0;i<elements.length;i++){var style=getComputedStyle(elements[i]);var fontSize=parseInt(style.fontSize);var fontFamily=style.fontFamily;var zuraPositions=this.getZuraPositions(elements[i],fontSize,fontFamily);var self=this;(async function(element){for(var j=0;j<zuraPositions.length;j++){for(var k=0;k<self.nukegeNum;k++){self.fly(element,zuraPositions[j],fontSize,fontFamily);await self.sleep(1000);}}})(elements[i]);}}
Svelke.prototype.fly=function(element,zuraPosition,fontSize,fontFamily){var top=zuraPosition[0]-fontSize;var left=zuraPosition[1]+this.getRandomInt(fontSize,fontSize*3);var nukege=document.createElement('div');nukege.style=`position:absolute;  top:${top}; left:${left}; font-family:${fontFamily}`;nukege.innerText=this.nukegeTexts[this.getRandomInt(0,this.nukegeTexts.length)];document.body.appendChild(nukege);var self=this;var count=0;var interval=setInterval(function(){if(count<50){top+=-5*Math.random();left+=5*Math.random();}else if(count<100){if(count==50){var aa=element.innerText;aa=aa.slice(0,zuraPosition[2])
+aa.slice(zuraPosition[2],zuraPosition[3]).replace('彡ﾉﾉﾊミ','彡 ⌒ ミ')
+aa.slice(zuraPosition[3]);element.innerText=aa;}
top+=5*Math.random();left+=5*Math.random();}else if(count==100){var aa=element.innerText;aa=aa.slice(0,zuraPosition[2])
+aa.slice(zuraPosition[2],zuraPosition[3]).replace('彡 ⌒ ミ','〆⌒ ヽ')
+aa.slice(zuraPosition[3]);element.innerText=aa;clearInterval(interval);}
nukege.style=`position:absolute;  top:${top}; left:${left}`;count+=1;},self.intervalTime);}
Svelke.prototype.sleep=function(milliseconds){return new Promise(resolve=>setTimeout(resolve,milliseconds));}
Svelke.prototype.getRandomInt=function(min,max){min=Math.ceil(min);max=Math.floor(max);return Math.floor(Math.random()*(max-min))+min;}
Svelke.prototype.getTextWidth=function(text,font){var context=this.tmpCanvas.getContext("2d");context.font=font;var metrics=context.measureText(text);return metrics.width;}
Svelke.prototype.getZura=function(str){return /彡(?:(?:ﾉﾉ)?ﾊ| ⌒ |⌒)ミ/.exec(str);}
Svelke.prototype.getZuraPositions=function(element,fontSize,fontFamily){var positions=[];var exists=true;var aa=element.innerText;var zura=this.getZura(aa);var lineNum=0;var p1=0;var p2=0;while(zura){var zuraPos=zura.index+zura[0].length;var tmp=aa.slice(0,zuraPos);var linePos=tmp.lastIndexOf('\n');if(linePos>0){lineNum+=tmp.slice(0,linePos+1).split('\n').length-1;}
var width=this.getTextWidth(aa.slice(linePos,zura.index),fontFamily);var w=element.offsetTop+lineNum*fontSize*1.1;var h=element.offsetLeft+width;p1+=zura.index;p2+=zuraPos;positions.push([w,h,p1,p2]);aa=aa.slice(zuraPos);zura=this.getZura(aa);}
return positions;}
return Svelke;})();