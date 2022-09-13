<template lang="pug">
.flex.justify-center.space-x-4 
  a.start_link(href="#game" @click="submit_settings") start 
  a.start_link(@click="display_settings=!display_settings") settings
section.settings-container(v-if="display_settings")
  .set
    label select time 
    select(v-model="selectedTime")
      each val, key in {60:'1min',120:'2min',180:'3min'}
        option(value=key)=val
  .set
    label continent 
    select(v-model.number="selectedContinent")
      each val, key in {0:'Africa',1:'Europe',2:'South America'}
        option(value=key)=val
  .set
    label grid 
    select(v-model.number="grid")
      each val,key in {10:"5X4",15:'6X5',15:'7X6'}
        option(value=key)=val
</template>
<script>
// import { mapGetters } from 'vuex'
export default {
  name: "GameSetting",
  data() {
    return {
      selectedTime: 60,
      selectedContinent: 0,
      grid: 10,
      display_settings: false,
    };
  },
  computed: {},
  methods: {
    async submit_settings() {
      const continentIndex = this.selectedContinent,
        FlagsNumber = this.grid;
      await this.$store.dispatch("flags/fetch_flags", {
        continentIndex,
        FlagsNumber,
      });
      await this.$store.dispatch("GAME/start_game", this.selectedTime);
    },
  },
};
</script>

<style>
.settings-container {
  @apply my-10 flex flex-col justify-center items-center space-y-4;
}
.start_link {
  @apply border-2 border-sky-500 py-1 px-4 hover:bg-sky-100;
}
.set {
  /* @apply; */
}
</style>
