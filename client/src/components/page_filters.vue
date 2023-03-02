<script setup>
import { ref, onMounted } from "vue";
import feathers from "@feathersjs/client";
import rest from "@feathersjs/rest-client";
import { selectedThemes } from "/src/state";
import comp_menu from "/src/components/comp_menu.vue";
import comp_footer from "/src/components/comp_footer.vue";

const app = feathers();
const restClient = rest("http://localhost:3002");

app.configure(restClient.fetch(window.fetch.bind(window)));

const status = ref("");
const themeList = ref([]);

onMounted(async () => {
  themeList.value = await app.service("/api/themes").find({
    query: {
      id: {
        $in: [1, 2, 3, 4, 5],
      },
    },
  });
});
const favourites = ref([]);
const nbQuestions = ref();
const chrono = ref();

async function selectFilters() {
  const referee = await app.service("/api/themes").find({
    query: {
      theme_number: {
        $in: [6],
      },
    },
  });
  selectedThemes.value = await app.service("/api/themes").find({
    query: {
      theme_number: {
        $in: favourites.value.length ? favourites.value : [1, 2, 3, 4, 5],
      },
    },
  });
  if (status.value == "officials") {
    selectedThemes.value.push(referee[0]);
  }
  selectedThemes.value.nbQuestions = nbQuestions.value;
  selectedThemes.value.chrono = chrono.value;
}
</script>

<template>
  <v-app>
    <comp_menu />
    <v-container class="filter-container">
      <v-container>
        <h1>Entrainement</h1>
      </v-container>
      <v-container>
        <input
          v-model="status"
          type="radio"
          name="status"
          value="player"
          checked
        /><label name="status" class="ma-2">Joueur</label>
        <input
          v-model="status"
          type="radio"
          name="status"
          value="officials"
        /><label name="status" class="ma-2">Arbitre</label>
      </v-container>
      <v-container>
        <v-select
          elevation="3"
          v-model="favourites"
          :items="themeList"
          label="Themes"
          multiple
          hint="Selectionne les themes
            abordés dans le questionnaire"
          persistent-hint
          item-title="theme_name"
          item-value="id"
        ></v-select>
      </v-container>
      <v-container>
        <v-expansion-panels>
          <input v-model="chrono" type="checkbox" name="status" value="False" />
          <label name="status" class="d-flex ma-4"
            >Chronomètre: 20 secondes par question !</label
          >
          <v-divider></v-divider>
        </v-expansion-panels>
      </v-container>
      <v-container>
        <v-text-field
          label="Nombre de questions"
          v-model="nbQuestions"
        ></v-text-field>
      </v-container>
      <v-container>
        <v-btn @click="selectFilters"
          ><router-link to="/quizz" class="button-valid"
            ><span>Valider</span>
          </router-link></v-btn
        >
      </v-container>
    </v-container>
    <comp_footer />
  </v-app>
</template>

<style scoped>
.button-valid {
  text-decoration: none;
  color: black;
}
.filter-container {
  max-width: 600px;
}
</style>
