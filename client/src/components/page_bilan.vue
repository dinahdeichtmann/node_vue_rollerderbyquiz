<script setup>
import comp_menu from "/src/components/comp_menu.vue";
import comp_footer from "/src/components/comp_footer.vue";
import score from "/src/components/comp_score.vue";
</script>

<template>
  <v-app>
    <v-container>
      <comp_menu></comp_menu>
      <score />
      <div class="btn">
        <router-link to="/mst">
          <v-btn dark color="blue">Recommencer</v-btn>
        </router-link>
        <router-link to="/">
          <v-btn color="blue">Enregistrer</v-btn>
        </router-link>
      </div>
      <comp_footer></comp_footer>
    </v-container>
  </v-app>
</template>

<style scoped>
.v-container {
  border: soliid grey 1px;
  width: 500px;
  padding: 25px;
  opacity: 1;
}

div.btn {
  border: soliid black 1px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

a {
  text-decoration: none;
}

.v-btn {
  width: 150px;
}
</style>

<!-- body {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(to bottom right, gray, white);
}
.container {
  border-radius: 10px;
  width: 500px;
  background-color: rgba(255, 255, 255, 0.3);
  color: #222;
  padding: 25px;
} -->
