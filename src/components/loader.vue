<template lang="pug">
h1.text-center loading{{dot}}
</template>

<script>
let TIMER;
export default {
  data() {
    return {
      dot: " . ",
    };
  },
  created() {
    TIMER = setInterval(() => {
      this.dot += " . ";
    }, 300);
  },
  unmounted() {
    clearInterval(TIMER);
  },
};
</script>

<style></style>
