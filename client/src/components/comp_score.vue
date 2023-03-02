<script setup>
// IMPORTS
import { ref, reactive } from "vue";
import correction from "/src/components/comp_correction.vue";
import blank from "/src/components/comp_correction_blank.vue";

// VARIABLES
const bilan = JSON.parse(sessionStorage.bilan);
const state = reactive({
  results: bilan,
});

const note = ref(gradeResults(state));
const surCombien = ref(state.results.length);
const pourcentage = ref((note.value * 100) / surCombien.value);

let questionNumber = ref(0);

// FUNCTIONS
function gradeResults(resultObject) {
  let grade = 0;

  for (let result of resultObject.results) {
    if (result.isCorrect === true) {
      grade += 1;
    }
  }
  return grade;
}

function getQuestionNumber(question) {
  questionNumber.value = question;
  //console.log("FROM COMP_SCORE: " + questionNumber.value);
  return questionNumber.value;
}
</script>

<template>
  <div class="score">
    <v-progress-circular
      :size="200"
      :width="15"
      :model-value="pourcentage"
      color="#616161"
      >{{ note }} / {{ surCombien }}</v-progress-circular
    >
    <div class="pastilles">
      <template
        v-for="question of state.results"
        :key="question.questionNumber"
      >
        <div
          class="pastille"
          :class="{
            correctAnswer: question.isCorrect,
            incorrectAnswer: !question.isCorrect,
          }"
          @click="getQuestionNumber(question.questionNumber)"
        >
          {{ question.questionNumber }}
        </div>
      </template>
    </div>
  </div>
  <blank v-if="questionNumber == 0" class="blank"></blank>
  <correction
    :questionNumber="questionNumber"
    v-else
    class="correction"
  ></correction>
</template>

<style>
.score {
  border: 1px soliid white;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.v-progress-circular {
  border: 1px soliid yellow;
  margin-bottom: 30px;
  font-size: 40px;
}

.blank {
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid grey 2px;
  border-radius: 10px;
  height: 350px;
  margin-top: 20px;
  margin-bottom: 20px;
  color: #222;
  background-color: grey;
}

.correction {
  display: flex;
  flex-direction: column;
  border: solid rgba(137, 95, 4, 0.5) 2px;
  border-radius: 10px;
  height: 350px;
  margin-top: 20px;
  margin-bottom: 20px;
}

div.pastilles {
  border: 1px soliid red;
  border-radius: 10px;
  background-image: linear-gradient(to bottom right, lightgray, white);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  height: 100px;
  margin: 0;
}

div.pastille {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2px;
  height: 30px;
  width: 30px;
  padding: 5px;
  border-radius: 50%;
  cursor: pointer;
  opacity: 0.8;
}

.correctAnswer {
  border: 2px solid forestgreen;
  color: forestgreen;
}

.correctAnswer:hover {
  border: 2px solid forestgreen;
  background-color: forestgreen;
  color: white;
  opacity: 1;
}

.incorrectAnswer {
  border: 2px solid tomato;
  color: tomato;
}

.incorrectAnswer:hover {
  border: 2px solid tomato;
  background-color: tomato;
  color: white;
  opacity: 1;
}
</style>
