<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import comp_choicesmst from "/src/components/comp_choicesmst.vue";
import comp_headermst from "/src/components/comp_headermst.vue";

let currentQuestionText = ref();
let currentQuestionImage = ref();
let currentQuestionVideo = ref();
let currentQuestionId = ref();
let currentQuestionThemeId = ref();
let displaySuivant = ref();
let numeroQuestion = ref();

// Gestion des questions
async function fetchQuestion() {
  const response = await axios.get("http://localhost:3002/api/questions");
  return response.data;
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

// Numéro question
function incrementNumQuestion() {
  let numQuestion = sessionStorage.getItem("numQuestion") || 1;
  numQuestion++;
  sessionStorage.setItem("numQuestion", numQuestion);
  numeroQuestion.value = numQuestion;
  console.log(numeroQuestion.value);
}

// Gestion du bouton suivant
function isAnswered() {
  setTimeout(() => {
    displaySuivant.value = true;
  }, 1500);
}
function change() {
  displaySuivant.value = false;
}
</script>

<template v-slot:activator="{ props }">
  <v-container class="d-flex justify-center align-center">
    <comp_headermst
      :key="currentQuestionId"
      :numQuestion="numeroQuestion"
      :theme="currentQuestionThemeId"
      class="d-flex flex-column justify-center align-center"
    />
    <v-container class="d-flex justify-center align-center ma-4">
      <v-hover v-slot="{ isHovering, props }">
        <v-card
          class="pa-4"
          width="500px"
          min-height="50px"
          :elevation="isHovering ? 12 : 2"
          v-bind="props"
        >
          <p>{{ currentQuestionText }}</p>
        </v-card>
      </v-hover>
      <!-- <v-btn @click="print(stopTimerMst)" dark color="blue"> PRINT</v-btn>
      <v-btn @click="stopTimer = false" dark color="blue"> PRINTBIS</v-btn> -->
    </v-container>
    <v-container
      v-if="currentQuestionImage || currentQuestionVideo"
      class="d-flex justify-center align-center ma-4"
    >
      <v-card min-height="50px" width="500px">
        <a href class="media-question">
          <v-img :src="currentQuestionImage" />
        </a>
      </v-card>
    </v-container>
    <v-container>
      <comp_choicesmst
        :key="currentQuestionId"
        v-if="currentQuestionId"
        class="d-flex flex-column justify-center align-center ma-4"
        :id_question="currentQuestionId"
        :numQuestion="numeroQuestion"
        @isAnswered="isAnswered"
      />
      <div
        v-if="displaySuivant === true && numeroQuestion !== 10"
        class="text-center"
      >
        <v-btn
          @click="
            // stopTimerMst = false;
            initQuiz();
            change();
            incrementNumQuestion();
          "
          dark
          color="blue"
        >
          Suivant</v-btn
        >
      </div>
      <div
        v-if="displaySuivant === true && numeroQuestion === 10"
        class="text-center"
      >
        <router-link to="/bilan"
          ><v-btn @click="print('toto')" dark color="blue">
            Afficher le bilan du test</v-btn
          ></router-link
        >
      </div>
    </v-container>
  </v-container>
</template>

<style scoped></style>
