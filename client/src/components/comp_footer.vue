<script setup>
// import { onMounted, ref } from "vue";
</script>

<template>
  <div class="clear"></div>
  <div class="footer">
    <v-bottom-navigation :elevation="3" grow>
      © Roller Derby Rules - 2023
    </v-bottom-navigation>
  </div>

  <div></div>
</template>

<style scoped>
@media only screen and (max-width: 600px) {
  div.footer {
    display: none;
  }
}
.clear {
  clear: both;
  height: 60px;
}

@media only screen and (min-width: 600px) {
  .footer {
    display: none;
  }
}
</style>
