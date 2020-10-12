<template lang="pug">
  .container
    TalkToSpeakerPopup(v-if="showPopup", @close="showPopup = false", @question="actualQuestion = $event")
      ClonedVideo(:isCameraOn="isCameraOn")
      VideoCheck(:isCameraOn="isCameraOn", @toggleLocalCamera="toggleLocalCamera")
      StartStreamButton(title="Готово", @toggleRoom="togglePublish")
    GuestHeader
    .speaker.speaker_guest
      .speaker__container.speaker__container_guest
        .speaker__wrapper-guest
          h2.speaker__heading Спикер
          div(:class="[!hasSpeaker ? 'video-container_speaker' : '', 'video-container']")
            p.video-container__label(v-if="!hasSpeaker") Диалог скоро начнётся
            video#speakerVideo(
              v-show="hasSpeaker"
              autoplay
              playsinline
              class="video-box video-box_guest")
          //.guest-questions.guest-questions_speaker
            .guest-questions__wrapper.disable-scrollbars
              .guest-questions__header
                h2.guest-questions__actual Обсуждаемый вопрос
                p.guest-questions__queue Смотреть вопросы в очереди (234)
              p.guest-questions__question {{ actualQuestion }}
        .speaker__wrapper-guest
          h2.speaker__heading Сейчас на связи
          div(:class="[!hasGuest ? 'video-container_guest' : '', 'video-container']", v-show="!isYourStreamStarted")
            p.video-container__label(v-if="!hasGuest")
              |Для начала диалога
              br
              |задайте вопрос спикеру
            video(
              ref="guestVideo"
              id="guestVideo"
              autoplay
              playsinline
              class="video-box video-box_guest")
          div(:class="[hasGuest ? 'video-container_guest' : '', 'video-container']", v-show="isYourStreamStarted")
            video(
              ref="myVideo"
              id="myVideo"
              autoplay
              muted
              playsinline
              class="video-box video-box_guest")
          .guest-questions.guest-questions_guest
            div(v-if="!hasGuest")
              button.button(@click="showDialogWindow", v-if="!isYourStreamStarted") Задать вопрос спикеру
            .guest-controls(v-if="isYourStreamStarted")
              .guest-controls__buttons
                div(:class="[!isMicOn ? 'guest-controls__item_disabled' : '', 'guest-controls__item']", @click="toggleLocalMic")
                  img(src="../images/Guest/mic.svg")
                div(:class="[!isCameraOn ? 'guest-controls__item_disabled' : '', 'guest-controls__item']", @click="toggleLocalCamera")
                  img(src="../images/Guest/camera.svg")
              .guest-controls__leave
                button.button.button_red(@click="unpublish") Выйти из диалога
</template>

<script>
import { WebRTCAdaptor } from '../vendor/webrtc_adaptor'
import TalkToSpeakerPopup from '../components/TalkToSpeakerPopup';
import VideoCheck from '../components/VideoCheck';
import StartStreamButton from '../components/StartStreamButton';
import ClonedVideo from '../components/ClonedVideo';
import GuestHeader from "../layouts/GuestHeader";

export default {
  name: "Guest",
  props: ['roomName'],
  components: {
    StartStreamButton,
    VideoCheck,
    TalkToSpeakerPopup,
    ClonedVideo,
    GuestHeader
  },
  data () {
    return {
      isYourStreamStarted: false,
      guestVideoId: 'guestVideo',
      myVideoId: 'myVideo',
      actualQuestion: '',
      showPopup: false,
      // availability of the device
      devicesAllowed: false,
      isMicOn: true,
      isCameraOn: true,
      // presence tag
      hasGuest: false,
      hasSpeaker: false,
      // streams id
      myStreamId: null,
      guestStreamId: null,
      speakerStreamId: null,
      published: false,
      // ANT MEDIA Adaptor
      webRTCAdaptor: undefined
    }
  },
  mounted () {
    this.initGuestWebRTCAdaptor()
  },
  methods: {
    showDialogWindow () {
      this.showPopup = true
    },
    initGuestWebRTCAdaptor () {
      this.webRTCAdaptor = new WebRTCAdaptor(
        {
          websocket_url: process.env.VUE_APP_WEBSOCKET_URL,
          mediaConstraints: {
            video: true,
            audio: true
          },
          peerconnection_config: {
            iceServers: [
              { urls: 'stun:stun.l.google.com:19302' }
            ]
          },
          sdp_constraints: {
            OfferToReceiveAudio: true,
            OfferToReceiveVideo: true
          },
          localVideoId: 'myVideo',
          isPlayMode: false,
          debug: false,
          callback: (info, description) => {
            // INITIALIZED
            if (info === 'initialized') {
              this.log('INITIALIZED')
              this.devicesAllowed = true

              // Auto join after initialize
              this.webRTCAdaptor.joinRoom(this.roomName, this.myStreamId)

              // JOINED THE ROOM
            } else if (info === 'joinedTheRoom') {
              this.log('JOINED THE ROOM')

              // save my stream ID
              this.myStreamId = description.streamId
              // show local video as you
              //const myVideo = document.getElementById('myVideo')
              this.$refs.myVideo.srcObject = this.webRTCAdaptor.localStream



              // if streams is one (maybe it's speaker?)
              if (description.streams.length === 1) {
                // set speaker stream ID
                this.speakerStreamId = description.streams[0]

                // start play speaker stream
                this.webRTCAdaptor.play(this.speakerStreamId, null /* token */, this.roomNameBox)
              } else if (description.streams.length === 2) {
                // TODO: need detect who is who
                // set guest stream ID
                this.guestStreamId = description.streams[0]
                this.webRTCAdaptor.play(description.streams[0], null /* token */, this.roomNameBox)

                // set speaker stream ID
                this.speakerStreamId = description.streams[1]
                this.webRTCAdaptor.play(description.streams[1], null /* token */, this.roomNameBox)
              }

              // GET STREAM INFORMATION
            } else if (info === 'streamInformation') {
              // this.log('stream information')
              this.webRTCAdaptor.play(this.roomName)

              // NEW STREAM AVAILABLE
            } else if (info === 'newStreamAvailable') {
              this.log('NEW STREAM AVAILABLE')
              if (this.speakerStreamId === null || this.speakerStreamId === description.streamId) {
                // set speaker stream to video element
                const speakerVideo = document.getElementById('speakerVideo')
                speakerVideo.srcObject = description.stream

                this.speakerStreamId = description.streamId
                this.hasSpeaker = true
              } else if (this.guestStreamId === null || this.guestStreamId === description.streamId) {
                //const guestVideo = document.getElementById('guestVideo')
                this.$refs.guestVideo.srcObject = description.stream

                this.guestStreamId = description.streamId
                this.hasGuest = true
              }
              this.webRTCAdaptor.play(description.streamId, null /* token */, this.roomNameBox)

              // STREAM JOINED
            } else if (info === 'streamJoined') {
              this.log('STREAM JOINED: ' + description.streamId)

              // send command for playing
              this.webRTCAdaptor.play(description.streamId, null /* token */, this.roomName)

              // STREAM LEAVED
            } else if (info === 'streamLeaved') {
              this.log('STREAM LEAVED: ' + description.streamId)

              if (this.speakerStreamId === description.streamId) {
                this.log('REMOVE SRC SPEAKER')
                const speakerVideo = document.getElementById('speakerVideo')
                speakerVideo.srcObject = null
                this.hasSpeaker = false
                this.speakerStreamId = null
              } else if (this.guestStreamId === description.streamId) {
                this.log('REMOVE SRC GUEST')
                const guestVideo = document.getElementById('guestVideo')
                guestVideo.srcObject = null
                this.hasGuest = false
                this.guestStreamId = null
              }

              // PUBLISH STARTED
            } else if (info === 'publish_started') {
              this.log('PUBLISH STARTED')
              this.published = true
              this.isYourStreamStarted = true

              // PUBLISH FINISHED
            } else if (info === 'publish_finished') {
              this.log('PUBLISH FINISHED')
              this.published = false
              this.isYourStreamStarted = false

              // LEAVED THE ROOM
            } else if (info === 'leavedFromRoom') {
              this.log('LEAVED THE ROOM')

              // monkey patch:
              // after leaved room we join the room again but without publish
              // (why no unpublish method ? in API)
              this.webRTCAdaptor.joinRoom(this.roomName, this.myStreamId)

              // CONNECTION CLOSED
            } else if (info === 'closed') {
              this.log('CONNECTION CLOSED')
            }
          },
          callbackError: (error) => {
            if (error === 'no_stream_exist') {
              this.log('NO STREAM EXIST')
            } else if (error === 'notSetRemoteDescription') {
              this.log('Getting codec incompatible or remote description error')
            } else if (error.indexOf('NotAllowedError') !== -1 || error.indexOf('PermissionDeniedError') !== -1) {
              this.devicesAllowed = false
            } else {
              this.log('error callback: ' + JSON.stringify(error))
            }
          }
        })
    },
    publish () {
      this.isYourStreamStarted = true
      this.webRTCAdaptor.publish(this.myStreamId)
    },
    unpublish () {
      this.isYourStreamStarted = false
      this.actualQuestion = '';
      this.webRTCAdaptor.leaveFromRoom(this.roomName)
    },
    togglePublish () {
      this.showPopup = false
      this.published ? this.unpublish() : this.publish()
    },
    toggleLocalCamera () {
      this.isCameraOn ? this.turnOffLocalCamera() : this.turnOnLocalCamera()
    },
    toggleLocalMic () {
      this.isMicOn ? this.muteLocalMic() : this.unmuteLocalMic()
    },
    turnOffLocalCamera () {
      this.webRTCAdaptor.turnOffLocalCamera()
      this.isCameraOn = false
      this.sendNotificationEvent('CAM_TURNED_OFF')
    },
    turnOnLocalCamera () {
      this.webRTCAdaptor.turnOnLocalCamera()
      this.isCameraOn = true
      this.sendNotificationEvent('CAM_TURNED_ON')
    },
    muteLocalMic () {
      this.webRTCAdaptor.muteLocalMic()
      this.isMicOn = false
      this.sendNotificationEvent('MIC_MUTED')
    },
    unmuteLocalMic () {
      this.webRTCAdaptor.unmuteLocalMic()
      this.isMicOn = true
      this.sendNotificationEvent('MIC_UNMUTED')
    },
    sendNotificationEvent (eventType) {
      if (this.isDataChannelOpen) {
        const notEvent = {
          streamId: this.publishStreamId,
          eventType: eventType
        }
        this.webRTCAdaptor.sendData(this.publishStreamId, JSON.stringify(notEvent))
      } else {
        this.log('Could not send the notification because data channel is not open.')
      }
    },
    log (message) {
      if (process.env.NODE_ENV === 'development') console.log(message)
    }
  }
}
</script>
