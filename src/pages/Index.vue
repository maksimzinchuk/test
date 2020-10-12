<template lang="pug">
  div
    div(:class="[!published? 'speaker_initial' : '', 'speaker']")
      .speaker__container
        div(:class="[!published ? 'speaker__wrapper_initial' : '', 'speaker__wrapper']")
          div(:class="[!published ? 'speaker__wrap_initial' : '', 'speaker__wrap']")
            video#localVideo(
              autoplay
              muted
              playsinline
              :class="[!published ? 'video-box_initial' : '', 'video-box']")
          .initial__wrapper(v-if="!published")
            VideoCheck(:isCameraOn="isCameraOn", @toggleLocalCamera="toggleLocalCamera")
            StartStreamButton(title="Начать трансляцию", @toggleRoom="toggleRoom")
          div(v-if="published")
            .settings
              .settings__wrapper
                .settings__item(@click="toggleLocalMic")
                  div(:class="[!isMicOn ? 'settings__round_disabled' : '', 'settings__round']")
                    img(src="../images/Index/mic.svg", alt="mic")
                  p.settings__text Микрофон
                .settings__item(@click="toggleLocalCamera")
                  div(:class="[!isCameraOn ? 'settings__round_disabled' : '', 'settings__round']")
                    img(src="../images/Index/cam.svg", alt="cam")
                  p.settings__text Камера
                .settings__item(@click="toggleDesktopCapture")
                  .settings__round
                    img(src="../images/Index/screen.svg", alt="screen")
                  p.settings__text Экран
                .settings__item(@click="leaveRoom")
                  .settings__round
                    img(src="../images/Index/exit.svg", alt="exit")
                  p.settings__text Выйти

            //.questions
              .questions__wrapper.disable-scrollbars
                p.questions__title Список обсуждаемых вопросов:
                .questions__container
                  <Question :questions="questions" v-on:accept="acceptDialog" />

        .speaker__wrapper(v-if="published")
          .speaker__item
            .speaker__wrap
              div(:class="[guestVideoIsActive ? 'speaker__video_active' : '', 'speaker__video']")
                #players
                  video#remoteVideo(
                    autoplay
                    playsinline
                    class="video-box")
          //.settings
            .settings__wrapper
              .settings__item
                .settings__round
                  img(src="../images/Index/mic.svg", alt="mic")
                p.settings__text Микрофон
              .settings__item
                .settings__round
                  img(src="../images/Index/cam.svg", alt="cam")
                p.settings__text Камера
              .settings__item
                .settings__round
                  img(src="../images/Index/exit.svg", alt="exit")
                p.settings__text Кикнуть
          //.questions.questions_actual
            .questions__wrapper.questions__wrapper_actual.disable-scrollbars
              p.questions__title Обсуждаемый вопрос:
              p.question__text.question__text_actual {{ activeQuestion.question }}
          //.questions.questions_next
            .questions__wrapper.questions__wrapper_next.disable-scrollbars
              p.questions__title Следующие подтверждённые вопросы:
              .questions__container
                .question
                  .question__wrapper
                    h2.question__name Руслан Иванов
                    p.question__text.question__text_actual Как вы считаете, кто станет президентом в США? А что, если это будет Роналду?
                    .question__actions
                      p.question__button.question__button_decline Отклонить
</template>

<script>
import { WebRTCAdaptor } from '../vendor/webrtc_adaptor';
import Question from "./../components/Question";
import VideoCheck from "./../components/VideoCheck";
import StartStreamButton from "./../components/StartStreamButton";


export default {
  components: {
    VideoCheck,
    Question,
    StartStreamButton
  },
  data () {
    return {
      guestVideoIsActive: false,
      questions: [
        {name: 'Руслан Иванов', question: 'Как вы считаете, кто станет президентом в США? А что, если это будет Роналду?'},
        {name: 'Иванов', question: 'А что, если это будет Роналду?'}
      ],
      activeQuestion: '',
      // availability of the device
      devicesAllowed: false,
      isMicOn: true,
      isCameraOn: true,

      token: null,
      // streams id
      streamId: 'null',
      playOnly: null,
      canJoin: false,
      canDesktop: true,
      isDesktop: false,
      published: false,
      roomNameBox: 'Test',
      roomOfStream: [],
      streamsList: [],
      publishStreamId: null,
      isDataChannelOpen: false,

      pc_config: {
        iceServers: [
          {
            urls: 'stun:stun.l.google.com:19302'
          }
        ]
      },
      sdpConstraints: {
        OfferToReceiveAudio: true,
        OfferToReceiveVideo: true
      },
      mediaConstraints: {
        video: true,
        audio: true
      },
      websocketURL: process.env.VUE_APP_WEBSOCKET_URL,
      webRTCAdaptor: undefined
    }
  },
  mounted () {
    this.init()
  },
  computed: {
    publicLink () {
      return `https://webrtc.tooladigital.ru/guest/${this.roomNameBox}`
    },
    startBtnLabel () {
      if (this.canJoin && this.devicesAllowed) {
        return 'START PUBLISH'
      } else if (this.published) {
        return 'STOP PUBLISH'
      } else { return 'NOT ALLOWED DEVICES' }
    }
  },
  methods: {
    acceptDialog (question) {
      const routeData = this.publicLink;
      window.open(routeData, '_blank');

      this.activeQuestion = question;
    },
    pushToGuest () {
      const route = this.$router.resolve({ name: 'guest', params: { roomName: this.roomNameBox } })
      window.open(route.href, '_blank')
    },
    init () {
      this.webRTCAdaptor = new WebRTCAdaptor(
        {
          websocket_url: this.websocketURL,
          mediaConstraints: {
            video: true,
            audio: true
          },
          peerconnection_config: {
            iceServers: [
              {
                urls: 'stun:stun.l.google.com:19302'
              }
            ]
          },
          sdp_constraints: {
            OfferToReceiveAudio: false,
            OfferToReceiveVideo: false
          },
          localVideoId: 'localVideo',
          isPlayMode: this.playOnly,
          debug: true,
          publishMode: 'camera',
          callback: (info, obj) => {
            // INITIALIZED
            if (info === 'initialized') {
              console.log('initialized')
              this.devicesAllowed = true
              this.canJoin = true

            // JOINED THE ROOM
            } else if (info === 'joinedTheRoom') {
              this.roomOfStream[obj.streamId] = obj.ATTR_ROOM_NAME
              this.streamId = obj.streamId
              this.publish(obj.streamId)

              if (obj.streams != null) {
                obj.streams.forEach((item) => {
                  this.webRTCAdaptor.play(item, null /* token */, this.roomNameBox)
                })
              }

            // STREAM JOINED
            } else if (info === 'streamJoined') {
              this.webRTCAdaptor.play(obj.streamId, null /* token */, this.roomNameBox)

            // NEW STREAM AVAILABLE
            } else if (info === 'newStreamAvailable') {
              this.playVideo(obj)

            // STREAM LEAVED
            } else if (info === 'streamLeaved') {
              this.guestVideoIsActive = false;
              const video = document.getElementById('remoteVideo')
              video.srcObject = null

              // PUBLISH STARTED
            } else if (info === 'publish_started') {
              this.published = true
              this.canJoin = false

            // PUBLISH FINISHED
            } else if (info === 'publish_finished') {
              this.published = false
              this.canJoin = true

            // PLAY FINISHED
            } else if (info === 'play_finished') {
              const video = document.getElementById('remoteVideo' + obj.streamId)
              if (video != null) video.srcObject = null
              this.webRTCAdaptor.getStreamInfo(obj.streamId)

            // GET STREAM INFORMATION
            } else if (info === 'streamInformation') {
              this.streamInformation(obj)
            } else console.log(info + ' notification received')
          },
          callbackError: (error, message) => {
            // Some of the possible errors, NotFoundError, SecurityError, PermissionDeniedError
            console.log('error callback: ' + JSON.stringify(error))
            let errorMessage = JSON.stringify(error)
            if (typeof message !== 'undefined') {
              errorMessage = message
            }
            if (error.indexOf('NotFoundError') !== -1) {
              errorMessage = 'Camera or Mic are not found or not allowed in your device.'
            } else if (error.indexOf('NotReadableError') !== -1 ||
              error.indexOf('TrackStartError') !== -1) {
              errorMessage = 'Camera or Mic is being used by some other process that does not not allow these devices to be read.'
            } else if (error.indexOf('OverconstrainedError') !== -1 ||
              error.indexOf('ConstraintNotSatisfiedError') !== -1) {
              errorMessage = 'There is no device found that fits your video and audio constraints. You may change video and audio constraints.'
            } else if (error.indexOf('NotAllowedError') !== -1 ||
              error.indexOf('PermissionDeniedError') !== -1) {
              errorMessage = 'You are not allowed to access camera and mic.'
              this.devicesAllowed = false
              this.canJoin = false
            } else if (error.indexOf('TypeError') !== -1) {
              errorMessage = 'Video/Audio is required.'
            } else if (error.indexOf('UnsecureContext') !== -1) {
              errorMessage = 'Fatal Error: Browser cannot access camera and mic because of unsecure context. Please install SSL and access via https'
            } else if (error.indexOf('WebSocketNotSupported') !== -1) {
              errorMessage = 'Fatal Error: WebSocket not supported in this browser'
            } else if (error.indexOf('no_stream_exist') !== -1) {
              // TODO: removeRemoteVideo(error.streamId)
            } else if (error.indexOf('data_channel_error') !== -1) {
              errorMessage = 'There was a error during data channel communication'
            } else if (error.indexOf('ScreenSharePermissionDenied') !== -1) {
              errorMessage = 'You are not allowed to access screen share'
              this.isDesktop = false
              this.canDesktop = false
            }
            console.debug(errorMessage)
          }
        })
    },
    toggleDesktopCapture () {
      if (this.isDesktop) {
        this.webRTCAdaptor.switchVideoCameraCapture(this.streamId)
        this.isDesktop = false
      } else {
        this.webRTCAdaptor.switchDesktopCaptureWithCamera(this.streamId)
        this.isDesktop = true
      }
    },
    toggleRoom () {
      this.canJoin ? this.joinRoom() : this.leaveRoom()
    },
    joinRoom () {
      this.webRTCAdaptor.joinRoom(this.roomNameBox, this.streamId)
      this.canJoin = false
    },
    leaveRoom () {
      this.webRTCAdaptor.leaveFromRoom(this.roomNameBox)

      this.canJoin = true
      for (const node in document.getElementById('players').childNodes) {
        if (node.tagName === 'DIV' && node.id !== 'localVideo') {
          document.getElementById('players').removeChild(node)
        }
      }
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
        console.log('Could not send the notification because data channel is not open.')
      }
    },
    publish (streamName) {
      this.publishStreamId = streamName
      this.webRTCAdaptor.publish(streamName)
    },
    playVideo (obj) {
      this.guestVideoIsActive = true;
      const video = document.getElementById('remoteVideo')
      video.srcObject = obj.stream
    },
    createRemoteVideo (streamId) {
      const player = document.createElement('div')
      player.className = 'col-sm-3'
      player.id = 'player' + streamId
      player.innerHTML = '<video id="remoteVideo' + streamId + '"autoplay style="max-height: 258px; max-width: 344px;"></video>'
      document.getElementById('players').appendChild(player)
    },
    removeRemoteVideo (streamId) {
      const video = document.getElementById('remoteVideo' + streamId)
      if (video != null) {
        const player = document.getElementById('player' + streamId)
        video.srcObject = null
        document.getElementById('players').removeChild(player)
      }
    },
    streamInformation (obj) {
      this.webRTCAdaptor.play(obj.streamId, null /* token */, this.roomNameBox)
    },
    handleNotificationEvent (obj) {
      const notificationEvent = JSON.parse(obj.event.data)
      if (notificationEvent != null && typeof (notificationEvent) === 'object') {
        const eventStreamId = notificationEvent.streamId
        const eventTyp = notificationEvent.eventType

        if (eventTyp === 'CAM_TURNED_OFF') {
          console.log('Camera turned off for: ', eventStreamId)
        } else if (eventTyp === 'CAM_TURNED_ON') {
          console.log('Camera turned on for: ', eventStreamId)
        } else if (eventTyp === 'MIC_MUTED') {
          console.log('Microphone muted for: ', eventStreamId)
        } else if (eventTyp === 'MIC_UNMUTED') {
          console.log('Microphone unmuted for: ', eventStreamId)
        }
      }
    }
  }
}
</script>
