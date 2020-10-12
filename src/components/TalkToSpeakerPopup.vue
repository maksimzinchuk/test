<template lang="pug">
  .popup
    .popup__container
      div(:class="[videoCheck ? 'popup__window_check' : '', 'popup__window']")
        img.popup__close(src="../images/Guest/cross.svg", alt="крестик", @click="$emit('close')")
        .popup__wrapper
          div.popup__check-wrapper(v-if="videoCheck")
            p.popup__title.popup__title_check Когда настанет ваша очередь вы подключитесь к видеочату со спикером. Настройте своё изображение.
            slot
          div(v-if="!videoCheck")
            h1.popup__header Пообщаться со спикером
            p.popup__title Заполните форму для того, чтобы встать в очередь и обсудить со спикером ваш вопрос
            .form
              form(@submit.prevent="sendQuestion")
                .form__item
                  input.form__input(placeholder="ФИО", v-model="name", type="text", required)
                  input.form__input(placeholder="Должность", v-model="job", type="text", required)
                .form__item
                  input.form__input(placeholder="Компания", v-model="company", type="text", required)
                  input.form__input(placeholder="E-Mail", v-model="email", type="email", required)
                .form__item
                  textarea.form__text-input(v-model="question", required)
                .form__wrapper
                  p.form__policy
                    |Нажимая на кнопку «Задать вопрос» вы
                    br
                    |соглашаетесь с&nbsp;
                    span
                     a политикой конфиденциальности
                  .form__button
                    button.button Задать вопрос

</template>

<script>
export default {
  name: "TalkToSpeakerPopup",
  data () {
    return {
      videoCheck: true,
      name: '',
      job: '',
      company: '',
      email: '',
      question: ''
    }
  },
  methods: {
    sendQuestion () {
      this.$emit('question', this.question);
      this.videoCheck = true;
    }
  }
}
</script>
