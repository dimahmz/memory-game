<template lang="pug">
section(id="game").mb-8.mx-auto.max-w-600.p-8.border-2.flex.flex-wrap.gap-4.justify-center
 ScoreBare(v-if="start").w-full
 .card.w-28.h-28.inline-block(:class='{ rotateY180: Cards_data[i].flip }' v-for='(card_data , i) in Cards_data' :key='i')
  Card(:data='card_data' :index='i')

</template>

<script>
import { mapGetters } from "vuex";
import Card from "./card.vue";
import ScoreBare from "./scoreBare.vue";
import BeforeStart from "./beforeStart.vue";
export default {
  name: "gameBoard",
  components: { Card, ScoreBare, BeforeStart },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("GAME", {
      Cards_data: "get_images",
      start: "get_start_game",
    }),
  },
  created() {
    this.$store.dispatch("GAME/fetch_images");
    // this.$store.dispatch("GAME/fetch_flags");
  },
};
</script>

<style></style>
