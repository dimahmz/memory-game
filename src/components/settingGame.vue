<template lang="pug">
section.my-12.flex.justify-center.space-x-12
 label select time 
 select
  option(value='60') 1min
  option(value='120') 2min
  option(value='180') 3min 
</template>

<script>
export default {
 name:'GameSetting'

}
</script>

<style>

</style>