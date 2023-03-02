<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import comp_explications from "/src/components/comp_explications.vue";
// import { stopTimer } from "/src/state";
// import feathers from "@feathersjs/client";
// const app = feathers();

const currentChoices = ref();
const selected = ref();
let message = ref();
const snackbar = ref(false);
let nextQuestion = ref(false);
let count = ref();
// let currentQuestionId = ref();
// const dialog = ref();

const props = defineProps({
  id_question: {
    type: [String, Number],
    required: true,
  },
});

async function fetchChoices() {
  const response = await axios.get(
    `http://localhost:3002/api/choices/?question_id=${props.id_question}`
  );
  //console.log(response.data);
  return response.data;
}

// async function fetchChoices() {
//   const response = await app.service("/api/choices").find({
//     query: {
//       question_id: props.id_question,
//     },
//   });

//   return response.data;
// }

onMounted(async () => {
  currentChoices.value = await fetchChoices();
});

function checkAnswer(selected, currentChoices) {
  const userAnswer = [];
  const correctAnswer = [];
  let comboValue = sessionStorage.getItem("comboValue") || 0;
  if (typeof selected !== "undefined") {
    for (const elt of selected) {
      if (elt.iscorrect === true) {
        userAnswer.push(elt.iscorrect);
      }
    }
    for (const elt of currentChoices) {
      if (elt.iscorrect === true) {
        correctAnswer.push(elt.iscorrect);
      }
    }
    if (userAnswer.length === correctAnswer.length) {
      message.value = "Bravo, c'est une bonne réponse !";
      comboValue++;
    } else {
      message.value = "Dommage ! Encore un peu d'entraînement";
      comboValue = 0;
    }
    setTimeout(() => {
      nextQuestion.value = true;
    }, 1500);
  } else {
    message.value = "Veuillez sélectionner une réponse";
  }
  sessionStorage.setItem("comboValue", comboValue);
  count.value = sessionStorage.getItem("comboValue");
  //console.log(count.value);
}

//Simuler le clic sur le bouton Valider grâce un évènement global
// document.addEventListener(
//   "timerOut",
//   () => {
//     checkAnswer(selected.value, currentChoices.value), isAnswered();
//   },
//   false
// );

//Faire remonter la valeur du badge au parent comp_question
const emit = defineEmits(["createBadge", "isAnswered"]);
function createBadge() {
  emit("createBadge", count.value);
  count.value = sessionStorage.getItem("comboValue");
}
//Faire remonter le booléen à comp-question pour afficher le bouton "suivant"
function isAnswered() {
  emit("isAnswered", nextQuestion.value);
}
</script>

<template>
  <div class="text-left" v-if="nextQuestion === false">
    <br />
    <div
      class="background"
      v-for="choice in currentChoices"
      v-bind:key="choice.value"
    >
      <label class="pointer">
        <v-card class="pa-4 ma-2" width="450px" min-height="50px">
          <input
            type="checkbox"
            v-model="selected"
            :true-value="[]"
            :value="choice"
            class="visually-hidden"
          />
          <span class="ma-2">{{ choice.answer }}</span></v-card
        ></label
      >
    </div>
    <br />
    <div class="text-center">
      <v-btn
        :disabled="!selected"
        dark
        color="blue"
        @click.once="
          snackbar = true;
          // stopTimer = true;
          checkAnswer(selected, currentChoices);
          isAnswered();
          createBadge();
        "
      >
        Valider
      </v-btn>
      <v-snackbar v-model="snackbar" vertical centered>
        <pre>{{ message }}</pre>
        <template v-slot:actions>
          <v-btn color="blue" variant="text" @click="snackbar = false">
            Retour
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </div>

  <!-- APRES AVOIR CLIQUÉ SUR LE BOUTON VALIDER -->

  <div class="text-left" v-else>
    <br />
    <div v-for="choice in currentChoices" v-bind:key="choice.value">
      <v-card
        class="pa-4 ma-1"
        width="500px"
        min-height="50px"
        v-if="choice.iscorrect === true"
        color="green"
      >
        <input
          type="checkbox"
          disabled
          v-model="selected"
          :true-value="[]"
          :value="choice"
          class="visually-hidden"
        />
        <label class="ma-2">{{ choice.answer }}</label>
      </v-card>
      <v-card
        class="pa-4 ma-1"
        width="500px"
        min-height="50px"
        v-else
        color="red"
      >
        <input
          type="checkbox"
          disabled
          v-model="selected"
          :true-value="[]"
          :value="choice"
          class="visually-hidden"
        />
        <label class="ma-2">{{ choice.answer }}</label>
      </v-card>
    </div>
    <br />
    <comp_explications :currentQuestionId="props.id_question" />
  </div>
</template>

<style scoped>
:checked + span {
  font-weight: bold;
}

/* Pour cacher la box
/* .visually-hidden {
  opacity: 0;
} */
.pointer {
  cursor: pointer;
}
</style>
