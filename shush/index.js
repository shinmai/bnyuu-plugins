(function(i,s,o){"use strict";const a=function(n){const t=n.length>1?n[1]:n[0].parsedMessage;t.content.startsWith(".")?t.content=t.content.substring(1):t.content="@silent "+t.content};let e=[];var d={onLoad(){e.push(o.before("sendMessage",s.findByProps("sendMessage","receiveMessage"),a)),e.push(o.before("uploadLocalFiles",s.findByProps("uploadLocalFiles"),a)),e.push(o.instead("startTyping",s.findByProps("startTyping","stopTyping"),function(n){})),e.push(o.instead("stopTyping",s.findByProps("startTyping","stopTyping"),function(n){}))},onUnload(){e.forEach(function(n){return n()}),e=[]}};return i.default=d,Object.defineProperty(i,"__esModule",{value:!0}),i})({},vendetta.metro,vendetta.patcher);
