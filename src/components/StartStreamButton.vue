<template lang="pug">
  .initial__button-container
    button.button(@click="$emit('toggleRoom')") {{ title }}
</template>

<script>
export default {
  name: "StartStreamButton",
  props: ['title']
}
</script>
