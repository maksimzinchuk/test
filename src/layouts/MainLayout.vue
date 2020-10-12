<template lang="pug">
  div.header__container
    .header__wrapper
      h1.header__title AIJ: общение на стенде - интерфейс спикера
      router-link.header__exit(v-if="$parent.authenticated", to="/auth", v-on:click.native="logout", replace) Выйти

    router-view
</template>

<script>

export default {
  name: 'MainLayout',
  methods: {
    logout () {
      this.$emit('authenticated', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  &__wrapper {
    padding: 0 100px;
    display: flex;
    flex-direction: row;
    height: 70px;
    background: #F3F3F3;
    align-items: center;
    justify-content: center;
  }

  &__title {
    margin: 0;
    padding: 0;
    font-style: normal;
    font-weight: 550;
    font-size: 24px;
    line-height: 125%;
    color: #237BFF;
    margin-left: auto;
  }

  &__exit {
    margin: 0;
    padding: 0;
    font-style: normal;
    font-weight: 550;
    font-size: 16px;
    line-height: 125%;
    color: #E48EA5;
    margin-left: auto;
    text-decoration: none;
  }
}
</style>
