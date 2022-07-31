<template lang="pug">
div.absolute.h-screen.w-full.bg-slate-200.grid.place-items-center
 .w-80.h-64.bg-slate-500.rounded.border.border-sky-500.relative.z-50.grid.place-items-center.text-white
  p.text-center congradulationsb you've won!
  div.absolute.bottom-3.w-full.grid.place-items-center
   button.border-2.border-sky-500.py-1.px-4(class='hover:bg-sky-100') play again
   button.border-2.border-sky-500.py-1.px-4(class='hover:bg-sky-100') close
</template>

<script>
export default {
 name:'Result',

}
</script>

<style>

</style>