<template lang="pug">
img.object-cover.block.back-card(:src='`https://countryflagsapi.com/svg/${flag.imgPathNum}`' )
img.object-cover.block.front-card( @click="filpCard()" src='/images/back-image.jpg' alt='back image')
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "card",
  props: {
    index: Number,
    flag: Object,
  },
  computed: {
    ...mapGetters("GAME", { enableClick: "get_enable_click" }),
  },
  methods: {
    async filpCard() {
      if (this.enableClick) {
        await this.$store.dispatch("GAME/flip_image", this.index);
        // this.enableClick = false;
      }
    },
  },
};
</script>

<style></style>
