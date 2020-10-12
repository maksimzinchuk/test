<template lang="pug">
  .guest-header
    .guest-header__container
      .guest-header__wrapper
        h1.guest-header__heading AIJ: общение на стенде
        .guest-header__bage
          .guest-header__live-icon
          p.guest-header__live LIVE
      //.spectators
        img(src="../images/Guest/spectators.svg", alt="наблюдатели")
        p.spectators__text 215 человек смотрят эфир
</template>

<script>
export default {
  name: "GuestHeader"
}
</script>
