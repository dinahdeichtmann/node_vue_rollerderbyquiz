<script setup>
// IMPORTS
import { ref, onMounted } from "vue";
import axios from "axios";

// CONSTANTS
const dialog = ref();
const questionId = props.currentQuestionId;
const reponse = ref("");
const raisonnement = ref("");
const remarque = ref("");

// PROPS
const props = defineProps({
  currentQuestionId: {
    type: [String, Number],
    required: true,
  },
});

// FUNCTIONS
async function fetchReponse(questionId) {
  const choices = await axios.get(
    `http://localhost:3002/api/choices?question_id=${questionId}&iscorrect=true`
  );

  const answerList = [];

  for (const choice of choices.data) {
    answerList.push(choice.answer);
  }

  return answerList;
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

onMounted(async () => {
  const answerList = await fetchReponse(questionId);

  reponse.value = answerList
    .map((answer) => "<li>" + answer + "</li>")
    .join("");

  raisonnement.value = await fetchRaisonnement(questionId);
  remarque.value = await fetchRemarque(questionId);
});
</script>

<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" scrollable>
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props"> Voir les explications </v-btn>
      </template>
      <v-card min-width="400px">
        <v-card-title>Voici quelques détails supplémentaires :</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="size">
          <h3>Réponse</h3>
          <p v-html="reponse"></p>
        </v-card-text>
        <template v-if="raisonnement">
          <v-card-text class="size">
            <h3>Raisonnement</h3>
            <p>{{ raisonnement }}</p>
          </v-card-text>
        </template>
        <template v-if="remarque">
          <v-card-text class="size">
            <h3>Remarque</h3>
            <p>{{ remarque }}</p>
          </v-card-text>
        </template>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn
            color="blue-darken-1"
            class="align-center"
            variant="text"
            @click="dialog = false"
          >
            Retour
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<style scoped></style>
