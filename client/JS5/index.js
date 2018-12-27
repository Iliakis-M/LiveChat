"use strict";function asyncGeneratorStep(a,b,c,d,e,f,g){try{var h=a[f](g),i=h.value}catch(a){return void c(a)}h.done?b(i):Promise.resolve(i).then(d,e)}function _asyncToGenerator(a){return function(){var b=this,c=arguments;return new Promise(function(d,e){function f(a){asyncGeneratorStep(h,d,e,f,g,"next",a)}function g(a){asyncGeneratorStep(h,d,e,f,g,"throw",a)}var h=a.apply(b,c);f(void 0)})}}var text={shift:!1,area:null,send:null,room:null},scroll=100,historyIdx=0,hist=[""],maxHistory=50,rooms={},room="LOBBY",prefix="!!";for(window.nick=getCookie("user")||"guest_"+Math.round(1e5*Math.random());!(nick=prompt("Insert a Nickname:",nick||getCookie("user")))||!/^[a-zA-Z0-9_\-();' ]+$/i.test(nick););function drop(a){var b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:1;for(a=a.split(" ");b--;)a.shift();return a.join(" ")}//drop
function dropGet(a){var b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:0;for(a=a.split(" ");b--;)a.shift();return a.shift()}//dropGet
function load(){return _load.apply(this,arguments)}//load
function _load(){return _load=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function a(){return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:console.log("Index loaded"),text.area=document.getElementById("msgarea"),text.send=document.getElementById("txtarea"),text.room=document.getElementById("rooms"),auth(nick),setCookie("user",nick),parseQueries(),sock.on("message",/*#__PURE__*/function(){var a=_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function a(b,c){return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:message(b,c);case 1:case"end":return a.stop();}},a,this)}));return function(){return a.apply(this,arguments)}}()),sock.on("joined",function(a){var b=a;a.startsWith("USR")&&(b="Private Channel");var c=document.createElement("p");c.classList.add("channel"),c.innerHTML=b,c.onclick=function(){switchCur(a)},rooms[a]=c,text.room.appendChild(c)}),sock.on("left",function(){}),sock.on("main",function(a){rooms[room].classList.remove("selected-chan"),rooms[a].classList.add("selected-chan"),room=a}),sock.on("history",/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/regeneratorRuntime.mark(function a(){var b,c,d,e,f,g=arguments;return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:for(b=g.length,c=Array(b),d=0;d<b;d++)c[d]=g[d];for(e=0;e<c.length;e++)f=c[e],message(f.content,f.user,new Date(f.timestamp).toDateString());case 2:case"end":return a.stop();}},a,this)}))),sock.once("connect",function(){text.area.innerHTML="",message("This is a Beta version of a chatting service, upcoming features are: profile picture support, multiple chatrooms and more security!","<font color='red'><b>SYSTEM</b></font>"),message("<b>THIS SERVER DOES NOT FOLLOW PRIVACY RULES!! USE AT YOUR OWN AGREEMENT (GDPR)</b>","<font color='red'><b>SYSTEM</b></font>"),message("<u>Please be kind and don't spam, we have means of banning aggitators.</u>","<font color='red'><b>SYSTEM</b></font>"),console.info("The prefix is !!, type !!help in chat for commands.")});case 13:case"end":return a.stop();}},a,this)})),_load.apply(this,arguments)}function switchCur(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:"LOBBY",b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:prompt("Password (Leave empty for public rooms or already authorized rooms)","");sock.emit("switch",a,b),text.area.innerHTML=""}//switchCur
function send(){var msg=0<arguments.length&&void 0!==arguments[0]?arguments[0]:text.send.value;return text.send.value="",msg.startsWith(prefix)?command(msg):void(msg=msg.replace(/\${((.|\n)+?)}/gm,function(match,p){return eval(p)}),msg=msg.trim(),sendMessage(msg))}//send
function sendMessage(a){a?conn?sock.send(a):message("<font color='red'><b>You cannot send messages while disconnected!</b></font>","<font color='red'><b>SYSTEM</b></font>"):message("<font color='red'><b>You cannot send an empty message!</b></font>","<font color='red'><b>SYSTEM</b></font>")}//sendMessage
function message(a,b){var c=2<arguments.length&&arguments[2]!==void 0?arguments[2]:new Date().toDateString(),d=document.createElement("p");d.innerHTML="<font color='gray'><small>".concat(c,"</small></font>&emsp;<b>").concat(b,":</b> ").concat(a,"<br />"),text.area.appendChild(d),text.area.scrollBy&&text.area.scrollBy(0,scroll)}//message
function shiftcheck(a){var b=!(1<arguments.length&&arguments[1]!==void 0)||arguments[1];if("Shift"==a.key)text.shift=b;else{if("ArrowUp"==a.key&&b)return++historyIdx,historyIdx%=hist.length,void(text.send.value=hist[historyIdx]);if("ArrowUp"==a.key)return;if("ArrowDown"==a.key&&b)return historyIdx=1>historyIdx?hist.length-1:historyIdx-1,void(text.send.value=hist[historyIdx]);if("ArrowDown"==a.key)return;if("Enter"==a.key&&!text.shift&&!b)for(send(),hist.unshift("");hist.length>=maxHistory;)hist.pop()}hist[0]=text.send.value}//shiftcheck
function submit(){text.shift=!1,shiftcheck({key:"Enter"},!1)}//submit
function sanitize(a){return a=a.replace(/&/gmi,"&amp;").replace(/</gmi,"&lt;").replace(/>/gmi,"&gt;").replace(/"/gmi,"&quot;").replace(/'/gmi,"&#039;"),a}//sanitize
function parseCookies(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:document.cookie;return new Map(a.split(";").map(function(a){return a.split("=")}))}//parseCookies
function storeCookies(a){return document.cookie=Array.from(a).map(function(b){return b.join("=")}).join(";")}//storeCookies
function setCookie(a,b){var c=parseCookies();return c.set(a,b),storeCookies(c)}//setCookie
function getCookie(a){var b=parseCookies();return b.get(a)}//getCookie
function parseQueries(){var a=0<arguments.length&&arguments[0]!==void 0?arguments[0]:location.href,b=a.split("?").pop().replace(/#.*?$/,"").split("&").map(function(a){return a.split("=")}),c=!0,d=!1,e=void 0;try{for(var f,g,h=b[Symbol.iterator]();!(c=(f=h.next()).done);c=!0)g=f.value,window[g.shift()]=g.pop()}catch(a){d=!0,e=a}finally{try{c||null==h.return||h.return()}finally{if(d)throw e}}}//parseQueries
window.addEventListener("DOMContentLoaded",load);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL0pTL2luZGV4LmpzIl0sIm5hbWVzIjpbInRleHQiLCJzaGlmdCIsImFyZWEiLCJzZW5kIiwicm9vbSIsInNjcm9sbCIsImhpc3RvcnlJZHgiLCJoaXN0IiwibWF4SGlzdG9yeSIsInJvb21zIiwicHJlZml4Iiwid2luZG93IiwibmljayIsImdldENvb2tpZSIsIk1hdGgiLCJyb3VuZCIsInJhbmRvbSIsInByb21wdCIsInRlc3QiLCJkcm9wIiwibGluZSIsInQiLCJzcGxpdCIsImpvaW4iLCJkcm9wR2V0IiwibG9hZCIsImNvbnNvbGUiLCJsb2ciLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiYXV0aCIsInNldENvb2tpZSIsInBhcnNlUXVlcmllcyIsInNvY2siLCJvbiIsIm1zZyIsIm1lc3NhZ2UiLCJjaGFuIiwiY2hhbm4iLCJzdGFydHNXaXRoIiwicCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJpbm5lckhUTUwiLCJvbmNsaWNrIiwic3dpdGNoQ3VyIiwiYXBwZW5kQ2hpbGQiLCJuYW1lIiwicmVtb3ZlIiwiZGF0YSIsImkiLCJjb250ZW50IiwidXNlciIsIkRhdGUiLCJ0aW1lc3RhbXAiLCJ0b0RhdGVTdHJpbmciLCJvbmNlIiwiaW5mbyIsInBhc3MiLCJlbWl0IiwidmFsdWUiLCJjb21tYW5kIiwicmVwbGFjZSIsIm1hdGNoIiwiZXZhbCIsInRyaW0iLCJzZW5kTWVzc2FnZSIsImNvbm4iLCJkYXRlIiwic2Nyb2xsQnkiLCJzaGlmdGNoZWNrIiwiZXZlbnQiLCJkb3duIiwia2V5IiwibGVuZ3RoIiwidW5zaGlmdCIsInBvcCIsInN1Ym1pdCIsInNhbml0aXplIiwicGFyc2VDb29raWVzIiwiY29va2llcyIsImNvb2tpZSIsIk1hcCIsIm1hcCIsImMiLCJzdG9yZUNvb2tpZXMiLCJBcnJheSIsImZyb20iLCJhIiwidG1wIiwic2V0IiwiZ2V0IiwibG9jIiwibG9jYXRpb24iLCJocmVmIiwib3V0IiwicSIsImFkZEV2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d0JBR2xELFVBQVM2QixDQUFULEdBQWM2QyxDQUFkLGdEQUFTN0MsQ0FBVCxTQUNDeEMsTUFBTSxDQUFDd0MsQ0FBQyxDQUFDbEQsS0FBRixFQUFELENBQU4sQ0FBb0JrRCxDQUFDLENBQUMwQixHQUFGLEVBSjZCLG1GQU1sRCxDQUFDO0FBRUZsRSxNQUFNLENBQUN1RixnQkFBUCxDQUF3QixrQkFBeEIsQ0FBNEN6RSxJQUE1QyxDIiwic291cmNlc0NvbnRlbnQiOlsi77u/XCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG5sZXQgdGV4dDogb2JqZWN0ID0ge1xyXG5cdHNoaWZ0OiBmYWxzZSxcclxuXHRhcmVhOiBudWxsLFxyXG5cdHNlbmQ6IG51bGwsXHJcblx0cm9vbTogbnVsbFxyXG59LFxyXG5cdHNjcm9sbDogbnVtYmVyID0gMTAwLFxyXG5cdGhpc3RvcnlJZHg6IG51bWJlciA9IDAsXHJcblx0aGlzdDogQXJyYXkgPSBbJyddLFxyXG5cdG1heEhpc3Rvcnk6IG51bWJlciA9IDUwLFxyXG5cdHJvb21zOiBvYmplY3QgPSB7IH0sXHJcblx0cm9vbTogc3RyaW5nID0gXCJMT0JCWVwiO1xyXG5cclxuY29uc3QgcHJlZml4OiBzdHJpbmcgPSBcIiEhXCI7XHJcblxyXG53aW5kb3cubmljayA9IGdldENvb2tpZShcInVzZXJcIikgfHwgXCJndWVzdF9cIiArIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDFlNSk7XHJcblxyXG53aGlsZSAoIShuaWNrID0gcHJvbXB0KFwiSW5zZXJ0IGEgTmlja25hbWU6XCIsIG5pY2sgfHwgZ2V0Q29va2llKFwidXNlclwiKSkpIHx8ICEvXlthLXpBLVowLTlfXFwtKCk7JyBdKyQvaS50ZXN0KG5pY2spKSB7IH1cclxuXHJcbmZ1bmN0aW9uIGRyb3AobGluZTogbnVtYmVyLCB0OiBudW1iZXIgPSAxKTogc3RyaW5nIHtcclxuXHRsaW5lID0gbGluZS5zcGxpdCgnICcpO1xyXG5cdHdoaWxlICh0LS0pIHtcclxuXHRcdGxpbmUuc2hpZnQoKTtcclxuXHR9XHJcblx0cmV0dXJuIGxpbmUuam9pbignICcpO1xyXG59IC8vZHJvcFxyXG5cclxuZnVuY3Rpb24gZHJvcEdldChsaW5lOiBudW1iZXIsIHQ6IG51bWJlciA9IDApOiBzdHJpbmcge1xyXG5cdGxpbmUgPSBsaW5lLnNwbGl0KCcgJyk7XHJcblx0d2hpbGUgKHQtLSkge1xyXG5cdFx0bGluZS5zaGlmdCgpO1xyXG5cdH1cclxuXHRyZXR1cm4gbGluZS5zaGlmdCgpO1xyXG59IC8vZHJvcEdldFxyXG5cclxuYXN5bmMgZnVuY3Rpb24gbG9hZChlPzogb2JqZWN0KTogdm9pZCB7XHJcblx0Y29uc29sZS5sb2coXCJJbmRleCBsb2FkZWRcIik7XHJcblxyXG5cdHRleHQuYXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibXNnYXJlYVwiKTtcclxuXHR0ZXh0LnNlbmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInR4dGFyZWFcIik7XHJcblx0dGV4dC5yb29tID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb29tc1wiKTtcclxuXHJcblx0YXV0aChuaWNrKTtcclxuXHRzZXRDb29raWUoXCJ1c2VyXCIsIG5pY2spO1xyXG5cdHBhcnNlUXVlcmllcygpO1xyXG5cdFxyXG5cdHNvY2sub24oXCJtZXNzYWdlXCIsIGFzeW5jIChtc2c6IHN0cmluZywgbmljazogc3RyaW5nKTogdm9pZCA9PiB7XHJcblx0XHRtZXNzYWdlKG1zZywgbmljayk7XHJcblx0fSk7XHJcblx0c29jay5vbihcImpvaW5lZFwiLCBjaGFuID0+IHtcclxuXHRcdGxldCBjaGFubiA9IGNoYW47XHJcblx0XHRpZiAoY2hhbi5zdGFydHNXaXRoKFwiVVNSXCIpKSB7XHJcblx0XHRcdGNoYW5uID0gXCJQcml2YXRlIENoYW5uZWxcIjtcclxuXHRcdH1cclxuXHRcdGxldCBwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcblx0XHRwLmNsYXNzTGlzdC5hZGQoXCJjaGFubmVsXCIpO1xyXG5cdFx0cC5pbm5lckhUTUwgPSBjaGFubjtcclxuXHRcdHAub25jbGljayA9IGZ1bmN0aW9uIGNsaWNrKGU/OiBvYmplY3QpIHtcclxuXHRcdFx0c3dpdGNoQ3VyKGNoYW4pO1xyXG5cdFx0fTtcclxuXHRcdHJvb21zW2NoYW5dID0gcDtcclxuXHRcdHRleHQucm9vbS5hcHBlbmRDaGlsZChwKTtcclxuXHR9KTtcclxuXHRzb2NrLm9uKFwibGVmdFwiLCAoKSA9PiB7IH0pOyAgLy9JTVBMXHJcblx0c29jay5vbihcIm1haW5cIiwgbmFtZSA9PiB7XHJcblx0XHRyb29tc1tyb29tXS5jbGFzc0xpc3QucmVtb3ZlKFwic2VsZWN0ZWQtY2hhblwiKTtcclxuXHRcdHJvb21zW25hbWVdLmNsYXNzTGlzdC5hZGQoXCJzZWxlY3RlZC1jaGFuXCIpO1xyXG5cdFx0cm9vbSA9IG5hbWU7XHJcblx0fSk7XHJcblx0c29jay5vbihcImhpc3RvcnlcIiwgYXN5bmMgKC4uLmRhdGE6IHN0cmluZ1tdKTogdm9pZCA9PiB7XHJcblx0XHRmb3IgKGxldCBpIG9mIGRhdGEpIHtcclxuXHRcdFx0bWVzc2FnZShpLmNvbnRlbnQsIGkudXNlciwgKG5ldyBEYXRlKGkudGltZXN0YW1wKSkudG9EYXRlU3RyaW5nKCkpO1xyXG5cdFx0fVxyXG5cdH0pO1xyXG5cdHNvY2sub25jZShcImNvbm5lY3RcIiwgKCk6IHZvaWQgPT4ge1xyXG5cdFx0dGV4dC5hcmVhLmlubmVySFRNTCA9ICcnO1xyXG5cdFx0bWVzc2FnZShcIlRoaXMgaXMgYSBCZXRhIHZlcnNpb24gb2YgYSBjaGF0dGluZyBzZXJ2aWNlLCB1cGNvbWluZyBmZWF0dXJlcyBhcmU6IHByb2ZpbGUgcGljdHVyZSBzdXBwb3J0LCBtdWx0aXBsZSBjaGF0cm9vbXMgYW5kIG1vcmUgc2VjdXJpdHkhXCIsIFwiPGZvbnQgY29sb3I9J3JlZCc+PGI+U1lTVEVNPC9iPjwvZm9udD5cIik7XHJcblx0XHRtZXNzYWdlKFwiPGI+VEhJUyBTRVJWRVIgRE9FUyBOT1QgRk9MTE9XIFBSSVZBQ1kgUlVMRVMhISBVU0UgQVQgWU9VUiBPV04gQUdSRUVNRU5UIChHRFBSKTwvYj5cIiwgXCI8Zm9udCBjb2xvcj0ncmVkJz48Yj5TWVNURU08L2I+PC9mb250PlwiKTtcclxuXHRcdG1lc3NhZ2UoXCI8dT5QbGVhc2UgYmUga2luZCBhbmQgZG9uJ3Qgc3BhbSwgd2UgaGF2ZSBtZWFucyBvZiBiYW5uaW5nIGFnZ2l0YXRvcnMuPC91PlwiLCBcIjxmb250IGNvbG9yPSdyZWQnPjxiPlNZU1RFTTwvYj48L2ZvbnQ+XCIpO1xyXG5cdFx0Y29uc29sZS5pbmZvKFwiVGhlIHByZWZpeCBpcyAhISwgdHlwZSAhIWhlbHAgaW4gY2hhdCBmb3IgY29tbWFuZHMuXCIpO1xyXG5cdH0pO1xyXG59IC8vbG9hZFxyXG5cclxuZnVuY3Rpb24gc3dpdGNoQ3VyKG5hbWU6IHN0cmluZyA9IFwiTE9CQllcIiwgcGFzczogc3RyaW5nID0gcHJvbXB0KFwiUGFzc3dvcmQgKExlYXZlIGVtcHR5IGZvciBwdWJsaWMgcm9vbXMgb3IgYWxyZWFkeSBhdXRob3JpemVkIHJvb21zKVwiLCAnJykpIHtcclxuXHRzb2NrLmVtaXQoXCJzd2l0Y2hcIiwgbmFtZSwgcGFzcyk7XHJcblx0dGV4dC5hcmVhLmlubmVySFRNTCA9ICcnO1xyXG59IC8vc3dpdGNoQ3VyXHJcblxyXG5mdW5jdGlvbiBzZW5kKG1zZzogc3RyaW5nID0gdGV4dC5zZW5kLnZhbHVlKTogdm9pZCB7XHJcblx0dGV4dC5zZW5kLnZhbHVlID0gJyc7XHJcblx0aWYgKG1zZy5zdGFydHNXaXRoKHByZWZpeCkpIHtcclxuXHRcdHJldHVybiBjb21tYW5kKG1zZyk7XHJcblx0fVxyXG5cdG1zZyA9IG1zZy5yZXBsYWNlKC9cXCR7KCgufFxcbikrPyl9L2dtLCAobWF0Y2gsIHApID0+IGV2YWwocCkpO1xyXG5cdG1zZyA9IG1zZy50cmltKCk7XHJcblx0c2VuZE1lc3NhZ2UobXNnKTtcclxufSAvL3NlbmRcclxuXHJcbmZ1bmN0aW9uIHNlbmRNZXNzYWdlKG1zZzogc3RyaW5nKTogdm9pZCB7XHJcblx0aWYgKCFtc2cpIHtcclxuXHRcdG1lc3NhZ2UoXCI8Zm9udCBjb2xvcj0ncmVkJz48Yj5Zb3UgY2Fubm90IHNlbmQgYW4gZW1wdHkgbWVzc2FnZSE8L2I+PC9mb250PlwiLCBcIjxmb250IGNvbG9yPSdyZWQnPjxiPlNZU1RFTTwvYj48L2ZvbnQ+XCIpO1xyXG5cdH0gZWxzZSBpZiAoY29ubikge1xyXG5cdFx0c29jay5zZW5kKG1zZyk7XHJcblx0fSBlbHNlIHtcclxuXHRcdG1lc3NhZ2UoXCI8Zm9udCBjb2xvcj0ncmVkJz48Yj5Zb3UgY2Fubm90IHNlbmQgbWVzc2FnZXMgd2hpbGUgZGlzY29ubmVjdGVkITwvYj48L2ZvbnQ+XCIsIFwiPGZvbnQgY29sb3I9J3JlZCc+PGI+U1lTVEVNPC9iPjwvZm9udD5cIik7XHJcblx0fVxyXG59IC8vc2VuZE1lc3NhZ2VcclxuXHJcbmZ1bmN0aW9uIG1lc3NhZ2UobXNnOiBzdHJpbmcsIHVzZXI6IHN0cmluZywgZGF0ZTogc3RyaW5nID0gKG5ldyBEYXRlKCkpLnRvRGF0ZVN0cmluZygpKTogdm9pZCB7XHJcblx0bGV0IHAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuXHRwLmlubmVySFRNTCA9IGA8Zm9udCBjb2xvcj0nZ3JheSc+PHNtYWxsPiR7ZGF0ZX08L3NtYWxsPjwvZm9udD4mZW1zcDs8Yj4ke3VzZXJ9OjwvYj4gJHttc2d9PGJyIC8+YDtcclxuXHRcclxuXHR0ZXh0LmFyZWEuYXBwZW5kQ2hpbGQocCk7XHJcblx0aWYgKHRleHQuYXJlYS5zY3JvbGxCeSkge1xyXG5cdFx0dGV4dC5hcmVhLnNjcm9sbEJ5KDAsIHNjcm9sbCk7XHJcblx0fVxyXG59IC8vbWVzc2FnZVxyXG5cclxuZnVuY3Rpb24gc2hpZnRjaGVjayhldmVudDogb2JqZWN0LCBkb3duOiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xyXG5cdGlmIChldmVudC5rZXkgPT0gXCJTaGlmdFwiKSB7XHJcblx0XHR0ZXh0LnNoaWZ0ID0gZG93bjtcclxuXHR9IGVsc2UgaWYgKGV2ZW50LmtleSA9PSBcIkFycm93VXBcIiAmJiBkb3duKSB7XHJcblx0XHQrK2hpc3RvcnlJZHg7XHJcblx0XHRoaXN0b3J5SWR4ICU9IGhpc3QubGVuZ3RoO1xyXG5cdFx0dGV4dC5zZW5kLnZhbHVlID0gaGlzdFtoaXN0b3J5SWR4XTtcclxuXHRcdHJldHVybjtcclxuXHR9IGVsc2UgaWYgKGV2ZW50LmtleSA9PSBcIkFycm93VXBcIikge1xyXG5cdFx0cmV0dXJuO1xyXG5cdH0gZWxzZSBpZiAoZXZlbnQua2V5ID09IFwiQXJyb3dEb3duXCIgJiYgZG93bikge1xyXG5cdFx0aGlzdG9yeUlkeCA9IChoaXN0b3J5SWR4IDwgMSkgPyAoaGlzdC5sZW5ndGggLSAxKSA6IChoaXN0b3J5SWR4IC0gMSk7XHJcblx0XHR0ZXh0LnNlbmQudmFsdWUgPSBoaXN0W2hpc3RvcnlJZHhdO1xyXG5cdFx0cmV0dXJuO1xyXG5cdH0gZWxzZSBpZiAoZXZlbnQua2V5ID09IFwiQXJyb3dEb3duXCIpIHtcclxuXHRcdHJldHVybjtcclxuXHR9IGVsc2UgaWYgKGV2ZW50LmtleSA9PSBcIkVudGVyXCIgJiYgIXRleHQuc2hpZnQgJiYgIWRvd24pIHtcclxuXHRcdHNlbmQoKTtcclxuXHRcdGhpc3QudW5zaGlmdCgnJyk7XHJcblx0XHR3aGlsZSAoaGlzdC5sZW5ndGggPj0gbWF4SGlzdG9yeSkge1xyXG5cdFx0XHRoaXN0LnBvcCgpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRoaXN0WzBdID0gdGV4dC5zZW5kLnZhbHVlO1xyXG59IC8vc2hpZnRjaGVja1xyXG5cclxuZnVuY3Rpb24gc3VibWl0KGU/OiBvYmplY3QpOiB2b2lkIHtcclxuXHR0ZXh0LnNoaWZ0ID0gZmFsc2U7XHJcblx0c2hpZnRjaGVjayh7XHJcblx0XHRrZXk6IFwiRW50ZXJcIlxyXG5cdH0sIGZhbHNlKTtcclxufSAvL3N1Ym1pdFxyXG5cclxuZnVuY3Rpb24gc2FuaXRpemUobXNnOiBzdHJpbmcpOiBzdHJpbmcge1xyXG5cdG1zZyA9IG1zZy5yZXBsYWNlKC8mL2dtaSwgXCImYW1wO1wiKVxyXG5cdFx0LnJlcGxhY2UoLzwvZ21pLCBcIiZsdDtcIilcclxuXHRcdC5yZXBsYWNlKC8+L2dtaSwgXCImZ3Q7XCIpXHJcblx0XHQucmVwbGFjZSgvXCIvZ21pLCBcIiZxdW90O1wiKVxyXG5cdFx0LnJlcGxhY2UoLycvZ21pLCBcIiYjMDM5O1wiKTtcclxuXHRyZXR1cm4gbXNnO1xyXG59IC8vc2FuaXRpemVcclxuXHJcbmZ1bmN0aW9uIHBhcnNlQ29va2llcyhjb29raWVzOiBzdHJpbmcgPSBkb2N1bWVudC5jb29raWUpOiBNYXAge1xyXG5cdHJldHVybiBuZXcgTWFwKGNvb2tpZXMuc3BsaXQoJzsnKS5tYXAoYyA9PiBjLnNwbGl0KCc9JykpKTtcclxufSAvL3BhcnNlQ29va2llc1xyXG5cclxuZnVuY3Rpb24gc3RvcmVDb29raWVzKG1hcDogTWFwKTogc3RyaW5nIHtcclxuXHRyZXR1cm4gZG9jdW1lbnQuY29va2llID0gQXJyYXkuZnJvbShtYXApLm1hcChhID0+IGEuam9pbignPScpKS5qb2luKCc7Jyk7XHJcbn0gLy9zdG9yZUNvb2tpZXNcclxuXHJcbmZ1bmN0aW9uIHNldENvb2tpZShrZXk6IHN0cmluZywgdmFsdWU6IHN0cmluZyk6IHN0cmluZyB7XHJcblx0bGV0IHRtcCA9IHBhcnNlQ29va2llcygpO1xyXG5cdHRtcC5zZXQoa2V5LCB2YWx1ZSk7XHJcblx0cmV0dXJuIHN0b3JlQ29va2llcyh0bXApO1xyXG59IC8vc2V0Q29va2llXHJcblxyXG5mdW5jdGlvbiBnZXRDb29raWUoa2V5OiBzdHJpbmcpOiBzdHJpbmcge1xyXG5cdGxldCB0bXA6IE1hcCA9IHBhcnNlQ29va2llcygpO1xyXG5cdHJldHVybiB0bXAuZ2V0KGtleSk7XHJcbn0gLy9nZXRDb29raWVcclxuXHJcbmZ1bmN0aW9uIHBhcnNlUXVlcmllcyhsb2M6IHN0cmluZyA9IGxvY2F0aW9uLmhyZWYpIHtcclxuXHRsZXQgb3V0ID0gbG9jLnNwbGl0KCc/JykucG9wKCkucmVwbGFjZSgvIy4qPyQvLCAnJykuc3BsaXQoJyYnKS5tYXAocSA9PiBxLnNwbGl0KCc9JykpO1xyXG5cclxuXHRmb3IgKGxldCBpIG9mIG91dCkge1xyXG5cdFx0d2luZG93W2kuc2hpZnQoKV0gPSBpLnBvcCgpO1xyXG5cdH1cclxufSAvL3BhcnNlUXVlcmllc1xyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGxvYWQpO1xyXG4iXX0=