<template lang="pug">
h1 an error occurred please try later or refech page 
button(@click="refresh()") refrech
</template>

<script>
export default {
  refresh() {
    window.location.reload();
  },
};
</script>

<style></style>
