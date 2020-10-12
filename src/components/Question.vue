<template lang="pug">
  div
    .question(v-for="(question, key) in questions", :key="question.key")
      .question__wrapper
        h2.question__name {{ question.name }}
        p.question__text(ref="question") {{ question.question }}
        .question__actions
          p.question__button.question__button_accept(@click="acceptDialog(question)") Принять
          p.question__button.question__button_decline Отклонить
</template>

<script>
export default {
name: "Question",
  props: ['questions'],
  methods: {
    acceptDialog (question) {
      this.$emit('accept', question)
    }
  }
}
</script>
