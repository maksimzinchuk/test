(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{110:function(e,t,i){e.exports=i.p+"images/65551b3f0b0b408c38d2280018774aa2.svg"},111:function(e,t,i){e.exports=i.p+"images/14e9195be4fd4fa9bf5024e894aec077.svg"},112:function(e,t,i){e.exports=i.p+"images/e1f9006d15a72ef14d88e977520f2ea5.svg"},113:function(e,t,i){e.exports=i.p+"images/f5786cb169e5fb1da1037b300bf3f159.svg"},184:function(e,t,i){"use strict";i.r(t);var o=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("div",{class:[e.published?"":"speaker_initial","speaker"]},[o("div",{staticClass:"speaker__container"},[o("div",{class:[e.published?"":"speaker__wrapper_initial","speaker__wrapper"]},[o("div",{class:[e.published?"":"speaker__wrap_initial","speaker__wrap"]},[o("video",{class:[e.published?"":"video-box_initial","video-box"],attrs:{id:"localVideo",autoplay:"",muted:"",playsinline:""},domProps:{muted:!0}})]),e.published?e._e():o("div",{staticClass:"initial__wrapper"},[o("VideoCheck",{attrs:{isCameraOn:e.isCameraOn},on:{toggleLocalCamera:e.toggleLocalCamera}}),o("StartStreamButton",{attrs:{title:"Начать трансляцию"},on:{toggleRoom:e.toggleRoom}})],1),e.published?o("div",[o("div",{staticClass:"settings"},[o("div",{staticClass:"settings__wrapper"},[o("div",{staticClass:"settings__item",on:{click:e.toggleLocalMic}},[o("div",{class:[e.isMicOn?"":"settings__round_disabled","settings__round"]},[o("img",{attrs:{src:i(110),alt:"mic"}})]),o("p",{staticClass:"settings__text"},[e._v("Микрофон")])]),o("div",{staticClass:"settings__item",on:{click:e.toggleLocalCamera}},[o("div",{class:[e.isCameraOn?"":"settings__round_disabled","settings__round"]},[o("img",{attrs:{src:i(111),alt:"cam"}})]),o("p",{staticClass:"settings__text"},[e._v("Камера")])]),o("div",{staticClass:"settings__item",on:{click:e.toggleDesktopCapture}},[e._m(0),o("p",{staticClass:"settings__text"},[e._v("Экран")])]),o("div",{staticClass:"settings__item",on:{click:e.leaveRoom}},[e._m(1),o("p",{staticClass:"settings__text"},[e._v("Выйти")])])])])]):e._e()]),e.published?o("div",{staticClass:"speaker__wrapper"},[o("div",{staticClass:"speaker__item"},[o("div",{staticClass:"speaker__wrap"},[o("div",{class:[e.guestVideoIsActive?"speaker__video_active":"","speaker__video"]},[e._m(2)])])])]):e._e()])])])},s=[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"settings__round"},[t("img",{attrs:{src:i(112),alt:"screen"}})])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"settings__round"},[t("img",{attrs:{src:i(113),alt:"exit"}})])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"players"}},[t("video",{staticClass:"video-box",attrs:{id:"remoteVideo",autoplay:"",playsinline:""}})])}];o._withStripped=!0;i(91),i(87),i(93);function a(e){return(a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var n=i(94),r=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",e._l(e.questions,(function(t,o){return i("div",{key:t.key,staticClass:"question"},[i("div",{staticClass:"question__wrapper"},[i("h2",{staticClass:"question__name"},[e._v(e._s(t.name))]),i("p",{ref:"question",refInFor:!0,staticClass:"question__text"},[e._v(e._s(t.question))]),i("div",{staticClass:"question__actions"},[i("p",{staticClass:"question__button question__button_accept",on:{click:function(i){return e.acceptDialog(t)}}},[e._v("Принять")]),i("p",{staticClass:"question__button question__button_decline"},[e._v("Отклонить")])])])])})),0)};r._withStripped=!0;var c={name:"Question",props:["questions"],methods:{acceptDialog:function(e){this.$emit("accept",e)}}},l=i(9),d=Object(l.a)(c,r,[],!1,null,null,null);d.options.__file="src/components/Question.vue";var u=d.exports,m=i(107),p=i(108),f={components:{VideoCheck:m.a,Question:u,StartStreamButton:p.a},data:function(){return{guestVideoIsActive:!1,questions:[{name:"Руслан Иванов",question:"Как вы считаете, кто станет президентом в США? А что, если это будет Роналду?"},{name:"Иванов",question:"А что, если это будет Роналду?"}],activeQuestion:"",devicesAllowed:!1,isMicOn:!0,isCameraOn:!0,token:null,streamId:"null",playOnly:null,canJoin:!1,canDesktop:!0,isDesktop:!1,published:!1,roomNameBox:"Test",roomOfStream:[],streamsList:[],publishStreamId:null,isDataChannelOpen:!1,pc_config:{iceServers:[{urls:"stun:stun.l.google.com:19302"}]},sdpConstraints:{OfferToReceiveAudio:!0,OfferToReceiveVideo:!0},mediaConstraints:{video:!0,audio:!0},websocketURL:"wss://ant2.tooladigital.ru:5443/WebRTCAppEE/websocket",webRTCAdaptor:void 0}},mounted:function(){this.init()},computed:{publicLink:function(){return"https://webrtc.tooladigital.ru/guest/".concat(this.roomNameBox)},startBtnLabel:function(){return this.canJoin&&this.devicesAllowed?"START PUBLISH":this.published?"STOP PUBLISH":"NOT ALLOWED DEVICES"}},methods:{acceptDialog:function(e){var t=this.publicLink;window.open(t,"_blank"),this.activeQuestion=e},pushToGuest:function(){var e=this.$router.resolve({name:"guest",params:{roomName:this.roomNameBox}});window.open(e.href,"_blank")},init:function(){var e=this;this.webRTCAdaptor=new n.a({websocket_url:this.websocketURL,mediaConstraints:{video:!0,audio:!0},peerconnection_config:{iceServers:[{urls:"stun:stun.l.google.com:19302"}]},sdp_constraints:{OfferToReceiveAudio:!1,OfferToReceiveVideo:!1},localVideoId:"localVideo",isPlayMode:this.playOnly,debug:!0,publishMode:"camera",callback:function(t,i){if("initialized"===t)console.log("initialized"),e.devicesAllowed=!0,e.canJoin=!0;else if("joinedTheRoom"===t)e.roomOfStream[i.streamId]=i.ATTR_ROOM_NAME,e.streamId=i.streamId,e.publish(i.streamId),null!=i.streams&&i.streams.forEach((function(t){e.webRTCAdaptor.play(t,null,e.roomNameBox)}));else if("streamJoined"===t)e.webRTCAdaptor.play(i.streamId,null,e.roomNameBox);else if("newStreamAvailable"===t)e.playVideo(i);else if("streamLeaved"===t){e.guestVideoIsActive=!1,document.getElementById("remoteVideo").srcObject=null}else if("publish_started"===t)e.published=!0,e.canJoin=!1;else if("publish_finished"===t)e.published=!1,e.canJoin=!0;else if("play_finished"===t){var o=document.getElementById("remoteVideo"+i.streamId);null!=o&&(o.srcObject=null),e.webRTCAdaptor.getStreamInfo(i.streamId)}else"streamInformation"===t?e.streamInformation(i):console.log(t+" notification received")},callbackError:function(t,i){console.log("error callback: "+JSON.stringify(t));var o=JSON.stringify(t);void 0!==i&&(o=i),-1!==t.indexOf("NotFoundError")?o="Camera or Mic are not found or not allowed in your device.":-1!==t.indexOf("NotReadableError")||-1!==t.indexOf("TrackStartError")?o="Camera or Mic is being used by some other process that does not not allow these devices to be read.":-1!==t.indexOf("OverconstrainedError")||-1!==t.indexOf("ConstraintNotSatisfiedError")?o="There is no device found that fits your video and audio constraints. You may change video and audio constraints.":-1!==t.indexOf("NotAllowedError")||-1!==t.indexOf("PermissionDeniedError")?(o="You are not allowed to access camera and mic.",e.devicesAllowed=!1,e.canJoin=!1):-1!==t.indexOf("TypeError")?o="Video/Audio is required.":-1!==t.indexOf("UnsecureContext")?o="Fatal Error: Browser cannot access camera and mic because of unsecure context. Please install SSL and access via https":-1!==t.indexOf("WebSocketNotSupported")?o="Fatal Error: WebSocket not supported in this browser":-1!==t.indexOf("no_stream_exist")||(-1!==t.indexOf("data_channel_error")?o="There was a error during data channel communication":-1!==t.indexOf("ScreenSharePermissionDenied")&&(o="You are not allowed to access screen share",e.isDesktop=!1,e.canDesktop=!1)),console.debug(o)}})},toggleDesktopCapture:function(){this.isDesktop?(this.webRTCAdaptor.switchVideoCameraCapture(this.streamId),this.isDesktop=!1):(this.webRTCAdaptor.switchDesktopCaptureWithCamera(this.streamId),this.isDesktop=!0)},toggleRoom:function(){this.canJoin?this.joinRoom():this.leaveRoom()},joinRoom:function(){this.webRTCAdaptor.joinRoom(this.roomNameBox,this.streamId),this.canJoin=!1},leaveRoom:function(){for(var e in this.webRTCAdaptor.leaveFromRoom(this.roomNameBox),this.canJoin=!0,document.getElementById("players").childNodes)"DIV"===e.tagName&&"localVideo"!==e.id&&document.getElementById("players").removeChild(e)},toggleLocalCamera:function(){this.isCameraOn?this.turnOffLocalCamera():this.turnOnLocalCamera()},toggleLocalMic:function(){this.isMicOn?this.muteLocalMic():this.unmuteLocalMic()},turnOffLocalCamera:function(){this.webRTCAdaptor.turnOffLocalCamera(),this.isCameraOn=!1,this.sendNotificationEvent("CAM_TURNED_OFF")},turnOnLocalCamera:function(){this.webRTCAdaptor.turnOnLocalCamera(),this.isCameraOn=!0,this.sendNotificationEvent("CAM_TURNED_ON")},muteLocalMic:function(){this.webRTCAdaptor.muteLocalMic(),this.isMicOn=!1,this.sendNotificationEvent("MIC_MUTED")},unmuteLocalMic:function(){this.webRTCAdaptor.unmuteLocalMic(),this.isMicOn=!0,this.sendNotificationEvent("MIC_UNMUTED")},sendNotificationEvent:function(e){if(this.isDataChannelOpen){var t={streamId:this.publishStreamId,eventType:e};this.webRTCAdaptor.sendData(this.publishStreamId,JSON.stringify(t))}else console.log("Could not send the notification because data channel is not open.")},publish:function(e){this.publishStreamId=e,this.webRTCAdaptor.publish(e)},playVideo:function(e){this.guestVideoIsActive=!0,document.getElementById("remoteVideo").srcObject=e.stream},createRemoteVideo:function(e){var t=document.createElement("div");t.className="col-sm-3",t.id="player"+e,t.innerHTML='<video id="remoteVideo'+e+'"autoplay style="max-height: 258px; max-width: 344px;"></video>',document.getElementById("players").appendChild(t)},removeRemoteVideo:function(e){var t=document.getElementById("remoteVideo"+e);if(null!=t){var i=document.getElementById("player"+e);t.srcObject=null,document.getElementById("players").removeChild(i)}},streamInformation:function(e){this.webRTCAdaptor.play(e.streamId,null,this.roomNameBox)},handleNotificationEvent:function(e){var t=JSON.parse(e.event.data);if(null!=t&&"object"===a(t)){var i=t.streamId,o=t.eventType;"CAM_TURNED_OFF"===o?console.log("Camera turned off for: ",i):"CAM_TURNED_ON"===o?console.log("Camera turned on for: ",i):"MIC_MUTED"===o?console.log("Microphone muted for: ",i):"MIC_UNMUTED"===o&&console.log("Microphone unmuted for: ",i)}}}},_=Object(l.a)(f,o,s,!1,null,null,null);_.options.__file="src/pages/Index.vue";t.default=_.exports}}]);