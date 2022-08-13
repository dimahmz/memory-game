<template lang="pug">
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
    }),
  },
};
</script>
