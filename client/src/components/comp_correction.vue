<script setup>
// IMPORTS
import { reactive, ref, watch, toRefs } from "vue";
import axios from "axios";

// CONSTANTS
const bilan = JSON.parse(sessionStorage.bilan);
const state = reactive({
  results: bilan,
});

const question = ref("");
const reponse = ref("");
const raisonnement = ref("");
const remarque = ref("");

const props = defineProps({
  questionNumber: {
    type: [String, Number],
    required: true,
  },
});

const { questionNumber } = toRefs(props);

watch(questionNumber, () => hotReload(questionNumber), {
  immediate: true,
});

// FUNCTIONS
async function fetchQuestion(questionId) {
  const response = await axios.get(
    `http://localhost:3002/api/questions?id=${questionId}`
  );
  return response.data[0].text;
}

async function fetchRaisonnement(questionId) {
  const response = await axios.get(
    `http://localhost:3002/api/questions?id=${questionId}`
  );
  return response.data[0].raisonnement;
}

async function fetchRemarque(questionId) {
  const response = await axios.get(
    `http://localhost:3002/api/questions?id=${questionId}`
  );
  return response.data[0].remarque;
}

async function hotReload(questionNumber) {
  const index = questionNumber.value - 1;
  const questionId = state.results[index].questionId;
  const answerList = state.results[index].listOfCorrectAnswer;

  function formatAnswerList() {
    if (answerList.length > 1) {
      return answerList.map((answer) => "<li>" + answer + "</li>").join("");
    } else {
      return answerList.join("");
    }
  }

  question.value = await fetchQuestion(questionId);
  reponse.value = formatAnswerList();
  raisonnement.value = await fetchRaisonnement(questionId);
  remarque.value = await fetchRemarque(questionId);
}
</script>

<template>
  <div>
    <h4>{{ question }}</h4>
    <hr />
    <div class="reponse">
      <h4>Réponse</h4>
      <p v-html="reponse"></p>
    </div>
    <template v-if="raisonnement">
      <div class="raisonnement">
        <h4>Raisonnement</h4>
        <p>{{ raisonnement }}</p>
      </div>
    </template>
    <template v-if="remarque">
      <div class="remarque">
        <h4>Remarque</h4>
        <p>{{ remarque }}</p>
      </div>
    </template>
  </div>
</template>

<style scoped>
.correction {
  padding: 10px;
}
hr {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
