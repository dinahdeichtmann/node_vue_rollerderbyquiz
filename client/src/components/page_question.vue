<script setup>
import comp_question from "/src/components/comp_question.vue";
import comp_footer from "/src/components/comp_footer.vue";
import comp_menu from "/src/components/comp_menu.vue";
</script>

<template>
  <v-app>
    <v-container>
      <comp_menu />
      <comp_question />
      <comp_footer />
    </v-container>
  </v-app>
</template>

<style scoped>
.v-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.v-btn {
  width: 100px;
}
</style>
