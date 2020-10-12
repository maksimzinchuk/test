<template lang="pug">
  router-link.room(to="/")
    .room__edit Edit
    .room__container
      h2.room__title Комната 1
      .room__links.disable-scrollbars
        p.room__link linkSD
        p.room__link linkHD
        p.room__link linkFHD
        p.room__link linkSD
        p.room__link linkHD
        p.room__link linkFHD
        p.room__link linkSD
        p.room__link linkHD
        p.room__link linkFHD
      p.room__quantity Количество выступлений: 1
</template>

<script>
export default {
name: "Room"
}
</script>
