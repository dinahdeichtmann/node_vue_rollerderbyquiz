<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { bilan } from "/src/state";

// import comp_explications from "/src/components/comp_explications.vue";
// import feathers from "@feathersjs/client";

// const app = feathers();

const currentChoices = ref();
const selected = ref();
let message = ref();
const snackbar = ref(false);
let nextQuestion = ref(false);

const props = defineProps({
  id_question: {
    type: [String, Number],
    required: true,
  },
  numQuestion: {
    type: [String, Number],
  },
});

async function fetchChoices() {
  const response = await axios.get(
    `http://localhost:3002/api/choices/?question_id=${props.id_question}`
  );
  return response.data;
}

onMounted(async () => {
  currentChoices.value = await fetchChoices();
});

function checkAnswer(selected, currentChoices) {
  const userAnswer = [];
  const correctAnswer = [];
  let result = {
    questionNumber: props.numQuestion || 1,
    questionId: props.id_question,
  };
  if (typeof selected !== "undefined") {
    for (const elt of selected) {
      if (elt.iscorrect === true) {
        userAnswer.push(elt.iscorrect);
      }
    }
    for (const elt of currentChoices) {
      if (elt.iscorrect === true) {
        correctAnswer.push(elt.answer);
      }
    }
    if (userAnswer.length === correctAnswer.length) {
      message.value = "Réponse bien enregistrée";
      result.isCorrect = true;
      result.listOfCorrectAnswer = correctAnswer;
    } else {
      message.value = "Réponse bien enregistrée";
      result.isCorrect = false;
      result.listOfCorrectAnswer = correctAnswer;
    }
    setTimeout(() => {
      nextQuestion.value = true;
    }, 1500);
  } else {
    message.value = "Veuillez sélectionner une réponse";
  }
  bilan.value.push(result);
  if (props.numQuestion === 10) {
    sessionStorage.setItem("bilan", JSON.stringify(bilan.value));
  }
}

//Faire remonter la valeur du badge au parent comp_question
const emit = defineEmits(["isAnswered"]);
//Faire remonter le booléen à comp-question pour afficher le bouton "suivant"
function isAnswered() {
  emit("isAnswered", nextQuestion.value);
}

// document.addEventListener(
//   "timer",
//   () => {
//     checkAnswer(selected.value, currentChoices.value), isAnswered();
//   },
//   false
// );

// function print(x) {
//   console.log(x);
// }

// function printbis(bis) {
//   console.log(bis);
// }
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
        <v-card class="pa-4 ma-1" width="500px" min-height="50px">
          <input
            :disabled="stopTimerMst"
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
    <div id="valider" class="text-center">
      <!-- <v-btn dark color="blue" @click.once="print(bilan)"> PRINT </v-btn> -->
      <v-btn
        :disabled="!selected"
        dark
        color="blue"
        @click.once="
          snackbar = true;
          checkAnswer(selected, currentChoices);
          isAnswered();
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
      <v-card class="pa-4 ma-1" width="500px" min-height="50px">
        <input
          type="checkbox"
          disabled
          v-model="selected"
          :true-value="[]"
          :value="choice"
          class="visually-hidden"
        />
        <label>{{ choice.answer }}</label>
      </v-card>
    </div>
    <br />
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
