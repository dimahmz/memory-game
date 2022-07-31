<template lang="pug">
section.my-4.mx-auto.max-w-600.p-16.border-2.flex.flex-wrap.gap-4.justify-center
 .card.w-28.h-28.inline-block(:class='{ rotateY180: Cards_data[i].flip }' v-for='(card_data , i) in Cards_data' :key='i')
  Card(:data='card_data' :index='i')

</template>

<script>
import { mapGetters } from "vuex";
import Card from "./card.vue";
export default {
  name: "gameBoard",
  components: { Card },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({ Cards_data: "get_images" }),
  },
  created() {
    this.$store.dispatch("fetch_images");
  },
};
</script>

<style></style>
