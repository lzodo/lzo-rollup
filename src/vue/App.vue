<template>
  <div>
    <button @click="add">递增{{ count }}</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
let count = ref(0);
const add = () => {
  console.log(count.value++);
};
</script>

<style lang="scss" scoped></style>
