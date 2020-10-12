<template lang="pug">
div
  form.auth
    .auth__wrapper
      h1.auth__title Login
      .auth__content
        label.auth__label Email
        input(required, v-model="email", type="email", placeholder="email").auth__input
        label.auth__label Password
        input(required, v-model="password", type="password", placeholder="password").auth__input
        button.auth__button(@click.prevent="login") Login
</template>

<script>
export default {
  name: 'Auth',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      if (this.email === this.$parent.mockAccount.email && this.password === this.$parent.mockAccount.password) {
        this.$emit('authenticated', true)
        this.$router.replace({ name: 'Rooms' })
      } else {
        console.log('Неверный логин или пароль')
      }
    }
  }
}
</script>
