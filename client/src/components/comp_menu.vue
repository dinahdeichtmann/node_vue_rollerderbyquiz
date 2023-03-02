<template>
  <div class="menu-desktop">
    <div>
      <!-- -->
      <v-app-bar
        absolute
        dark
        shrink-on-scroll
        prominent
        src="https://img.freepik.com/free-vector/white-background-with-triangle-patterns_1017-18410.jpg?w=2000"
        fade-img-on-scroll
        scroll-target="#scrolling-techniques-8"
      >
        <v-app-bar-title class="secondary text-h6 d-flex justify-start px-10"
          >Roller Derby Rules</v-app-bar-title
        >

        <v-spacer></v-spacer>

        <v-btn icon @click="clearSession()">
          <router-link to="/" class="decoration"
            ><v-icon>mdi-home</v-icon></router-link
          >
        </v-btn>

        <v-btn icon @click="clearSession()">
          <router-link to="/rules" class="decoration"
            ><v-icon>mdi-card-text</v-icon></router-link
          >
        </v-btn>

        <v-btn value="profil" @click="clearSession()">
          <comp_login />
        </v-btn>
      </v-app-bar>
      <v-sheet
        id="scrolling-techniques-3"
        class="overflow-y-auto"
        max-height="600"
      >
        <v-container style="height: 100px"></v-container>
      </v-sheet>
    </div>
  </div>
  <div class="menu-mobile">
    <v-bottom-navigation :elevation="3" grow>
      <v-btn value="Home" @click="clearSession()">
        <router-link to="/" class="decoration">
          <v-icon>mdi-home</v-icon>
          Home
        </router-link>
      </v-btn>

      <v-btn value="rules" @click="clearSession()">
        <router-link to="/rules" class="decoration">
          <v-icon>mdi-card-text</v-icon>
          Règles
        </router-link>
      </v-btn>
      <!-- Gestion du bouton PROFIL -->
      <v-btn value="profil">
        <router-link to="" class="decoration" @click="clearSession()">
          <v-icon>mdi-account</v-icon>
          <comp_login />
          <p>Profil</p>
        </router-link>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script setup>
import comp_login from "/src/components/comp_login.vue";
function clearSession() {
  sessionStorage.clear();
}
</script>

<style scoped>
.v-app-bar {
  background-color: rgba(224, 201, 111, 0.869);
  opacity: 0.8;
}
.v-icon {
  color: rgba(137, 95, 4, 0.89);
}
.decoration {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: rgba(137, 95, 4, 0.89);
}

@media only screen and (min-width: 600px) {
  div.menu-mobile {
    display: none;
  }
}
@media only screen and (max-width: 600px) {
  div.menu-desktop {
    display: none;
  }
}
</style>
