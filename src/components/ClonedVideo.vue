<template lang="pug">
  .speaker__wrap.speaker__wrap_initial
    video(ref="video", playsinline, muted, autoplay, class="video-box video-box_initial")
</template>
<script>

export default {
  name: "ClonedVideo",
  props: ['isCameraOn'],
  data () {
    return {
      video: {},
      isVideoActive: true
    }
  },
  watch: {
    isCameraOn: {
      handler () {
        this.toggleCamera()
      }
    }
  },
  mounted () {
    this.startCameraStream()
  },
  methods: {
    toggleCamera () {
      this.isVideoActive ? this.stopCameraStream() : this.startCameraStream();
    },
    startCameraStream () {
      this.isVideoActive = true;
      const constraints = (window.constraints = {
        audio: false,
        video: true
      });
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(stream => {
          this.$refs.video.srcObject = stream;
        })
        .catch(error => {
          console.log(error);
        });
    },
    stopCameraStream() {
      this.isVideoActive = false;
      let tracks = this.$refs.video.srcObject.getTracks();

      tracks.forEach(track => {
        track.stop();
      });
    }
  }
}
</script>

<style scoped>

</style>
