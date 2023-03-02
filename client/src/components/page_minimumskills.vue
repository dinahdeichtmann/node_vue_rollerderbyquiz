<script setup>
import comp_questionmst from "/src/components/comp_questionmst.vue";
import comp_menu from "/src/components/comp_menu.vue";
import comp_footer from "/src/components/comp_footer.vue";
</script>

<template>
  <v-app>
    <v-container>
      <comp_menu />
      <comp_questionmst />
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
  margin: 10px;
}

.v-btn {
  width: 100px;
}
</style>
