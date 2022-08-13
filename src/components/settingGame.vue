<template lang="pug">
section.my-12.flex.justify-center.space-x-12
 label select time 
 select(v-model="timeSelected")
  option(value=600) 1min
  option(value=12) 2min
  option(value=30) 3min
div.flex.justify-center 
 a(href="#game" class='hover:bg-sky-100' @click="clicked()").border-2.border-sky-500.py-1.px-4 start 
</template>

<script>
// import { mapGetters } from 'vuex'
export default {
  name: "GameSetting",
  data() {
    return {
      timeSelected: 6,
    };
  },
  computed: {},
  methods: {
    clicked() {
      this.$store.dispatch("GAME/start_game", this.timeSelected);
    },
  },
};
</script>

<style></style>
