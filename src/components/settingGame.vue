<template lang="pug">
section.my-12.flex.justify-center.space-x-12
 label select time 
 select(v-model="timeSelected")
  option(value=60) 1min
  option(value=120) 2min
  option(value=180) 3min
div.flex.justify-center 
 button(@click="clicked()").border-2.border-sky-500.py-1.px-4(class='hover:bg-sky-100') start 
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: "GameSetting",
  data(){
    return{
      timeSelected:60
    }
  },
  computed: {
  },
  methods: {
    clicked() {
      this.$store.dispatch("start_game",this.timeSelected);
    },
  },
};
</script>

<style></style>
