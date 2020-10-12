<template lang="pug">
  div
    p.video-settings__text Проверка микрофона
    .mic-level
      span(:style="{width: instant + '%'}").mic-level__levels
</template>

<script>
import { SoundMeter } from "../plugins/micVolumeCheck";

export default {
  name: "MicVolume",
  data () {
    return {
      soundMeter: null,
      instant: 0
    }
  },
  mounted () {
    setTimeout(() => {
      this.setup()
    }, 1000)
  },
  methods: {
    async setup () {
      const context = new AudioContext()
      this.soundMeter = new SoundMeter(context)
      const stream = await navigator.mediaDevices.getUserMedia({audio: true, video: false})
      this.soundMeter.connectToSource(stream)
      this.update()
    },
    update () {
      requestAnimationFrame(this.update)
      this.soundMeter.update()
      this.instant = this.soundMeter.instant
    }
  }
}
</script>
