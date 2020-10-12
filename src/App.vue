<template>
  <div>
    <router-view @authenticated="setAuthenticated" />
  </div>
</template>
<script>
export default {
  name: 'App',
  data () {
    return {
      authenticated: true,
      mockAccount: {
        email: 'test@email.com',
        password: 'password'
      }
    }
  },
  mounted () {
    if (!this.authenticated) {
      this.$router.replace({ name: 'Auth'});
    }
  },
  methods: {
    setAuthenticated (status) {
      this.authenticated = status;
    }
  }
}
</script>

<style scoped>

</style>
