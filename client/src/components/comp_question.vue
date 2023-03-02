<script setup>
import { onMounted, ref } from "vue";
import comp_choices from "/src/components/comp_choices.vue";
import comp_header from "/src/components/comp_header.vue";
import feathers from "@feathersjs/client";
import rest from "@feathersjs/rest-client";

import { selectedThemes } from "../state";
// import { stopTimer } from "/src/state";

const app = feathers();
const restClient = rest("http://localhost:3002");

app.configure(restClient.fetch(window.fetch.bind(window)));

// async function fetchQuestion() {
//   fetch("http://localhost:3000/api/questions")
//     .then((data) => {
//       return data;
//     })
//     .catch((err) => {
//       console.log(err, "error fetchQuestion");
//     });
// }

// const currentQuestion = reactive({
//   questions: [],
// });

let currentQuestionText = ref();
let currentQuestionImage = ref();
let currentQuestionVideo = ref();
let currentQuestionId = ref();
let currentQuestionThemeId = ref();
let displaySuivant = ref();
let combo = ref();

// Gestion des questions
async function fetchQuestion() {
  const response = await app.service("/api/questions").find({
    query: {
      theme_parent_id: {
        $in: selectedThemes.value.map((theme) => theme.theme_parent_id),
      },
    },
  });
  return response;
}
onMounted(async () => {
  initQuiz();
});

async function initQuiz() {
  const questionList = await fetchQuestion();
  const randomIndex = Math.floor(Math.random() * questionList.length);
  currentQuestionText.value = questionList[randomIndex].text;
  currentQuestionImage.value = questionList[randomIndex].image;
  currentQuestionVideo.value = questionList[randomIndex].video;
  currentQuestionThemeId.value = questionList[randomIndex].theme_id;
  currentQuestionId.value = questionList[randomIndex].id;
}

// Gestion du badge combo
function createBadge(count) {
  combo.value = count;
}

// Gestion du bouton suivant
function isAnswered() {
  setTimeout(() => {
    displaySuivant.value = true;
  }, 1500);
}
// function change() {
//   displaySuivant.value = false;
// }
</script>

<template v-slot:activator="{ props }">
  <v-container class="d-flex justify-center align-center">
    <comp_header
      :key="currentQuestionId"
      :comboBadge="combo"
      :theme="currentQuestionThemeId"
      class="d-flex flex-column justify-center align-center"
    />
    <v-container class="d-flex justify-center align-center">
      <v-hover v-slot="{ isHovering, props }">
        <v-card
          class="pa-4"
          width="500px"
          min-height="50px"
          :elevation="isHovering ? 12 : 2"
          v-bind="props"
        >
          <p>
            {{ currentQuestionText }}
          </p>
        </v-card>
      </v-hover>
    </v-container>
    <v-container
      v-if="currentQuestionImage || currentQuestionVideo"
      class="d-flex justify-center align-center"
    >
      <v-card min-height="50px" width="500px">
        <a href class="media-question">
          <v-img :src="currentQuestionImage" />
        </a>
      </v-card>
    </v-container>
    <v-container>
      <comp_choices
        :key="currentQuestionId"
        v-if="currentQuestionId"
        class="d-flex flex-column justify-center align-center"
        :id_question="currentQuestionId"
        @createBadge="createBadge"
        @isAnswered="isAnswered"
      />
      <div v-if="displaySuivant === true" class="text-center">
        <v-btn
          @click="
            stopTimer = false;
            initQuiz();
            // change();
          "
          dark
          color="blue"
          class="ma-6"
        >
          Suivant</v-btn
        >
      </div>
    </v-container>
  </v-container>
</template>

<style scoped></style>
