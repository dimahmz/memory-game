<template lang="pug">
section.my-12.flex.justify-center.space-x-12
 label select time 
 select(v-model="selectedTime")
  each val, key in {60:'1min',120:'2min',180:'3min'}
    option(value=key)=val
  //- option(value=60) 1min
  //- option(value=120) 2min
  //- option(value=180) 3min
 label continent 
 select(v-model.number="selectedContinent")
  each val, key in {0:'Africa',1:'Europe',2:'South America'}
    option(value=key)=val
 label grid 
 select(v-model="grid")
  each val in ['4X4','10X10','8X8']
    option(value=val)=val
div.flex.justify-center 
 a(href="#game" class='hover:bg-sky-100' @click="clicked()").border-2.border-sky-500.py-1.px-4 start 
</template>

<script>
// import { mapGetters } from 'vuex'
export default {
  name: "GameSetting",
  data() {
    return {
      selectedTime: 60,
      selectedContinent: 0,
      grid: "4X4",
    };
  },
  computed: {},
  methods: {
    async clicked() {
      await this.$store.dispatch("flags/fetch_flags", this.selectedContinent);
      await this.$store.dispatch("GAME/start_game", this.selectedTime);
    },
  },
};
</script>

<style></style>
