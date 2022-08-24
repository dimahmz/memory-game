<template lang="pug">
div
  div(v-if="seeGame" href="#game" @click='replay()').btn again
  section.my-1.flex.justify-center.space-x-12.border-2.border-sky-500.py-1
    label time
    input(disabled v-model="time")
    label score 
    input(disabled v-model="score")
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "soreBAr",
  computed: {
    ...mapGetters("GAME", {
      time: "get_time",
      score: "get_score",
      seeGame: "get_see_game",
    }),
  },
  methods: {
    replay() {
      this.$store.dispatch("GAME/paly_again");
    },
  },
};
</script>
<style scoped>
.btn {
  @apply inline-block mx-auto border-2 border-sky-500 py-1 px-4 hover:bg-sky-100;
}
</style>
