<template lang="pug">
  div
    .rooms-header
      .rooms-header__wrapper
        h1.rooms-header__title Список пользователей
        router-link.rooms-header__exit(v-if="$parent.authenticated", to="/auth", v-on:click.native="logout", replace) Выйти
    .content
      .title Zeen Online
      .rooms
        .rooms__title Комнаты диалогов со спикером
        .rooms__wrapper
          <Room />
          <EmptyRoom />
          <EmptyRoom />
          <EmptyRoom />

</template>

<script>
import Room from "./../components/Room";
import EmptyRoom from "./../components/EmptyRoom";

export default {
  name: 'RoomSelector',
  components: {
    Room,
    EmptyRoom
  }
}
</script>
