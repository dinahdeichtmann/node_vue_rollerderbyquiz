<script setup>
import comp_menu from "/src/components/comp_menu.vue";
import comp_carroussel from "/src/components/comp_carroussel.vue";
import comp_nav_page from "/src/components/comp_nav_page.vue";
import comp_footer from "/src/components/comp_footer.vue";
</script>

<template>
  <v-app>
    <v-container>
      <comp_menu />
      <comp_carroussel max-width="500px" />
      <comp_nav_page max-width="500px" />
      <comp_footer />
    </v-container>
  </v-app>
</template>

<style scoped>
.comp_menu {
  position: fixed;
  top: 0;
}
</style>
