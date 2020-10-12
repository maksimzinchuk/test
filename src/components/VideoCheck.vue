<template lang="pug">
div
  .video-settings
    p.video-settings__text Подключиться с видео
    div(@click="$emit('toggleLocalCamera')", :class="[!isCameraOn ? 'toggle_inactive' : '', 'toggle']")
      .toggle__round
    p.video-settings__text Подключиться без видео
  .mic-settings
    MicVolume
</template>

<script>
import MicVolume from "./MicVolume";
export default {
  name: "VideoCheck",
  props: ['isCameraOn'],
  components: {
    MicVolume
  }
}
</script>
