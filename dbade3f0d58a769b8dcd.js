(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{100:function(t,e,n){var r,o,i=n(0),a=n(85),s=i.process,c=s&&s.versions,l=c&&c.v8;l?o=(r=l.split("."))[0]+r[1]:a&&(!(r=a.match(/Edge\/(\d+)/))||r[1]>=74)&&(r=a.match(/Chrome\/(\d+)/))&&(o=r[1]),t.exports=o&&+o},101:function(t,e,n){var r=n(102);t.exports=function(t){if(r(t))throw TypeError("The method doesn't accept regular expressions");return t}},102:function(t,e,n){var r=n(6),o=n(12),i=n(8)("match");t.exports=function(t){var e;return r(t)&&(void 0!==(e=t[i])?!!e:"RegExp"==o(t))}},103:function(t,e,n){var r=n(8)("match");t.exports=function(t){var e=/./;try{"/./"[t](e)}catch(n){try{return e[r]=!1,"/./"[t](e)}catch(t){}}return!1}},104:function(t,e,n){var r=n(22),o=n(0),i=n(85),a=[].slice,s=function(t){return function(e,n){var r=arguments.length>2,o=r?a.call(arguments,2):void 0;return t(r?function(){("function"==typeof e?e:Function(e)).apply(this,o)}:e,n)}};r({global:!0,bind:!0,forced:/MSIE .\./.test(i)},{setTimeout:s(o.setTimeout),setInterval:s(o.setInterval)})},105:function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}n.d(e,"a",(function(){return r}))},106:function(t,e,n){"use strict";function r(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function o(t,e,n){return e&&r(t.prototype,e),n&&r(t,n),t}n.d(e,"a",(function(){return o}))},109:function(t,e,n){"use strict";var r=n(22),o=n(36).find,i=n(82),a=n(37),s=!0,c=a("find");"find"in[]&&Array(1).find((function(){s=!1})),r({target:"Array",proto:!0,forced:s||!c},{find:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}}),i("find")},110:function(t,e,n){"use strict";var r=n(22),o=n(39).includes,i=n(82);r({target:"Array",proto:!0,forced:!n(37)("indexOf",{ACCESSORS:!0,1:0})},{includes:function(t){return o(this,t,arguments.length>1?arguments[1]:void 0)}}),i("includes")},111:function(t,e,n){"use strict";var r=n(22),o=n(25),i=n(17),a=n(38),s=[].join,c=o!=Object,l=a("join",",");r({target:"Array",proto:!0,forced:c||!l},{join:function(t){return s.call(i(this),void 0===t?",":t)}})},112:function(t,e,n){"use strict";var r=n(22),o=n(40),i=n(11),a=n(14),s=n(23),c=n(52),l=n(98),u=n(99),d=n(37),f=u("splice"),p=d("splice",{ACCESSORS:!0,0:0,1:2}),m=Math.max,h=Math.min;r({target:"Array",proto:!0,forced:!f||!p},{splice:function(t,e){var n,r,u,d,f,p,g=s(this),v=a(g.length),S=o(t,v),b=arguments.length;if(0===b?n=r=0:1===b?(n=0,r=v-S):(n=b-2,r=h(m(i(e),0),v-S)),v+n-r>9007199254740991)throw TypeError("Maximum allowed length exceeded");for(u=c(g,r),d=0;d<r;d++)(f=S+d)in g&&l(u,d,g[f]);if(u.length=r,n<r){for(d=S;d<v-r;d++)p=d+n,(f=d+r)in g?g[p]=g[f]:delete g[p];for(d=v;d>v-r+n;d--)delete g[d-1]}else if(n>r)for(d=v-r;d>S;d--)p=d+n-1,(f=d+r-1)in g?g[p]=g[f]:delete g[p];for(d=0;d<n;d++)g[d+S]=arguments[d+2];return g.length=v-r+n,u}})},113:function(t,e,n){var r=n(16),o=Date.prototype,i=o.toString,a=o.getTime;new Date(NaN)+""!="Invalid Date"&&r(o,"toString",(function(){var t=a.call(this);return t==t?i.call(this):"Invalid Date"}))},114:function(t,e,n){"use strict";var r=n(16),o=n(10),i=n(1),a=n(50),s=RegExp.prototype,c=s.toString,l=i((function(){return"/a/b"!=c.call({source:"a",flags:"b"})})),u="toString"!=c.name;(l||u)&&r(RegExp.prototype,"toString",(function(){var t=o(this),e=String(t.source),n=t.flags;return"/"+e+"/"+String(void 0===n&&t instanceof RegExp&&!("flags"in s)?a.call(t):n)}),{unsafe:!0})},115:function(t,e,n){"use strict";var r=n(22),o=n(101),i=n(13);r({target:"String",proto:!0,forced:!n(103)("includes")},{includes:function(t){return!!~String(i(this)).indexOf(o(t),arguments.length>1?arguments[1]:void 0)}})},179:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("video",{staticStyle:{height:"259px",width:"344px",border:"2px solid #aaa"},attrs:{id:"speakerVideo",autoplay:"",controls:"",playsinline:""}}),e("video",{staticStyle:{height:"259px",width:"344px",border:"2px solid #aaa"},attrs:{id:"guestVideo",autoplay:"",controls:"",muted:"",playsinline:""},domProps:{muted:!0}}),e("video",{staticStyle:{height:"259px",width:"344px",border:"2px solid #aaa"},attrs:{id:"myVideo",autoplay:"",controls:"",muted:"",playsinline:""},domProps:{muted:!0}}),e("button",{on:{click:this.togglePublish}},[this._v("publish")])])};r._withStripped=!0;n(89);var o=n(108),i={props:["roomName"],data:function(){return{devicesAllowed:!1,isMicOn:!0,isCameraOn:!0,hasGuest:!1,hasSpeaker:!1,myStreamId:null,guestStreamId:null,speakerStreamId:null,published:!1,webRTCAdaptor:void 0}},mounted:function(){this.initGuestWebRTCAdaptor()},methods:{initGuestWebRTCAdaptor:function(){var t=this;this.webRTCAdaptor=new o.a({websocket_url:"wss://ant2.tooladigital.ru:5443/WebRTCAppEE/websocket",mediaConstraints:{video:!0,audio:!0},peerconnection_config:{iceServers:[{urls:"stun:stun.l.google.com:19302"}]},sdp_constraints:{OfferToReceiveAudio:!0,OfferToReceiveVideo:!0},localVideoId:"myVideo",isPlayMode:!1,debug:!1,callback:function(e,n){if("initialized"===e)t.log("INITIALIZED"),t.devicesAllowed=!0,t.webRTCAdaptor.joinRoom(t.roomName,t.myStreamId);else if("joinedTheRoom"===e){t.log("JOINED THE ROOM"),t.myStreamId=n.streamId,document.getElementById("myVideo").srcObject=t.webRTCAdaptor.localStream,1===n.streams.length?(t.speakerStreamId=n.streams[0],t.webRTCAdaptor.play(t.speakerStreamId,null,t.roomNameBox)):2===n.streams.length&&(t.guestStreamId=n.streams[0],t.webRTCAdaptor.play(n.streams[0],null,t.roomNameBox),t.speakerStreamId=n.streams[1],t.webRTCAdaptor.play(n.streams[1],null,t.roomNameBox))}else if("streamInformation"===e)t.webRTCAdaptor.play(t.roomName);else if("newStreamAvailable"===e){if(t.log("NEW STREAM AVAILABLE"),null===t.speakerStreamId||t.speakerStreamId===n.streamId)document.getElementById("speakerVideo").srcObject=n.stream,t.speakerStreamId=n.streamId,t.hasSpeaker=!0;else if(null===t.guestStreamId||t.guestStreamId===n.streamId){document.getElementById("guestVideo").srcObject=n.stream,t.guestStreamId=n.streamId,t.hasGuest=!0}t.webRTCAdaptor.play(n.streamId,null,t.roomNameBox)}else if("streamJoined"===e)t.log("STREAM JOINED: "+n.streamId),t.webRTCAdaptor.play(n.streamId,null,t.roomName);else if("streamLeaved"===e){if(t.log("STREAM LEAVED: "+n.streamId),t.speakerStreamId===n.streamId)t.log("REMOVE SRC SPEAKER"),document.getElementById("speakerVideo").srcObject=null,t.hasSpeaker=!1,t.speakerStreamId=null;else if(t.guestStreamId===n.streamId){t.log("REMOVE SRC GUEST"),document.getElementById("guestVideo").srcObject=null,t.hasGuest=!1,t.guestStreamId=null}}else"publish_started"===e?(t.log("PUBLISH STARTED"),t.published=!0):"publish_finished"===e?(t.log("PUBLISH FINISHED"),t.published=!1):"leavedFromRoom"===e?(t.log("LEAVED THE ROOM"),t.webRTCAdaptor.joinRoom(t.roomName,t.myStreamId)):"closed"===e&&t.log("CONNECTION CLOSED")},callbackError:function(e){"no_stream_exist"===e?t.log("NO STREAM EXIST"):"notSetRemoteDescription"===e?t.log("Getting codec incompatible or remote description error"):-1!==e.indexOf("NotAllowedError")||-1!==e.indexOf("PermissionDeniedError")?t.devicesAllowed=!1:t.log("error callback: "+JSON.stringify(e))}})},publish:function(){this.webRTCAdaptor.publish(this.myStreamId)},unpublish:function(){this.webRTCAdaptor.leaveFromRoom(this.roomName)},togglePublish:function(){this.published?this.unpublish():this.publish()},toggleLocalCamera:function(){this.isCameraOn?this.turnOffLocalCamera():this.turnOnLocalCamera()},toggleLocalMic:function(){this.isMicOn?this.muteLocalMic():this.unmuteLocalMic()},turnOffLocalCamera:function(){this.webRTCAdaptor.turnOffLocalCamera(),this.isCameraOn=!1,this.sendNotificationEvent("CAM_TURNED_OFF")},turnOnLocalCamera:function(){this.webRTCAdaptor.turnOnLocalCamera(),this.isCameraOn=!0,this.sendNotificationEvent("CAM_TURNED_ON")},muteLocalMic:function(){this.webRTCAdaptor.muteLocalMic(),this.isMicOn=!1,this.sendNotificationEvent("MIC_MUTED")},unmuteLocalMic:function(){this.webRTCAdaptor.unmuteLocalMic(),this.isMicOn=!0,this.sendNotificationEvent("MIC_UNMUTED")},sendNotificationEvent:function(t){if(this.isDataChannelOpen){var e={streamId:this.publishStreamId,eventType:t};this.webRTCAdaptor.sendData(this.publishStreamId,JSON.stringify(e))}else this.log("Could not send the notification because data channel is not open.")},log:function(t){0}}},a=n(9),s=Object(a.a)(i,r,[],!1,null,null,null);s.options.__file="src/pages/Guest.vue";e.default=s.exports},82:function(t,e,n){var r=n(8),o=n(84),i=n(15),a=r("unscopables"),s=Array.prototype;null==s[a]&&i.f(s,a,{configurable:!0,value:o(null)}),t.exports=function(t){s[a][t]=!0}},83:function(t,e,n){"use strict";var r=n(36).forEach,o=n(38),i=n(37),a=o("forEach"),s=i("forEach");t.exports=a&&s?[].forEach:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}},84:function(t,e,n){var r,o=n(10),i=n(95),a=n(42),s=n(27),c=n(97),l=n(46),u=n(44),d=u("IE_PROTO"),f=function(){},p=function(t){return"<script>"+t+"<\/script>"},m=function(){try{r=document.domain&&new ActiveXObject("htmlfile")}catch(t){}var t,e;m=r?function(t){t.write(p("")),t.close();var e=t.parentWindow.Object;return t=null,e}(r):((e=l("iframe")).style.display="none",c.appendChild(e),e.src=String("javascript:"),(t=e.contentWindow.document).open(),t.write(p("document.F=Object")),t.close(),t.F);for(var n=a.length;n--;)delete m.prototype[a[n]];return m()};s[d]=!0,t.exports=Object.create||function(t,e){var n;return null!==t?(f.prototype=o(t),n=new f,f.prototype=null,n[d]=t):n=m(),void 0===e?n:i(n,e)}},85:function(t,e,n){var r=n(41);t.exports=r("navigator","userAgent")||""},89:function(t,e,n){"use strict";var r=n(22),o=n(39).indexOf,i=n(38),a=n(37),s=[].indexOf,c=!!s&&1/[1].indexOf(1,-0)<0,l=i("indexOf"),u=a("indexOf",{ACCESSORS:!0,1:0});r({target:"Array",proto:!0,forced:c||!l||!u},{indexOf:function(t){return c?s.apply(this,arguments)||0:o(this,t,arguments.length>1?arguments[1]:void 0)}})},92:function(t,e,n){"use strict";var r=n(22),o=n(83);r({target:"Array",proto:!0,forced:[].forEach!=o},{forEach:o})},93:function(t,e,n){var r=n(0),o=n(94),i=n(83),a=n(5);for(var s in o){var c=r[s],l=c&&c.prototype;if(l&&l.forEach!==i)try{a(l,"forEach",i)}catch(t){l.forEach=i}}},94:function(t,e){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}},95:function(t,e,n){var r=n(4),o=n(15),i=n(10),a=n(96);t.exports=r?Object.defineProperties:function(t,e){i(t);for(var n,r=a(e),s=r.length,c=0;s>c;)o.f(t,n=r[c++],e[n]);return t}},96:function(t,e,n){var r=n(49),o=n(42);t.exports=Object.keys||function(t){return r(t,o)}},97:function(t,e,n){var r=n(41);t.exports=r("document","documentElement")},98:function(t,e,n){"use strict";var r=n(26),o=n(15),i=n(24);t.exports=function(t,e,n){var a=r(e);a in t?o.f(t,a,i(0,n)):t[a]=n}},99:function(t,e,n){var r=n(1),o=n(8),i=n(100),a=o("species");t.exports=function(t){return i>=51||!r((function(){var e=[];return(e.constructor={})[a]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}}}]);