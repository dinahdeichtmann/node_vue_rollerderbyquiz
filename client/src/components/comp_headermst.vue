<template v-slot:activator="{ props }">
  <v-container class="d-flex justify-center align-center" height="70px">
    <v-row>
      <div class="d-flex flex-column justify-center">
        <v-progress-circular
          v-if="stopTimerMst === false"
          small
          :rotate="0"
          :size="50"
          :width="7"
          :model-value="timerValue"
          color="primary"
          v-model="timerValue"
        >
          {{ timerValue }}
        </v-progress-circular>
        <v-progress-circular
          v-else
          small
          :rotate="0"
          :size="50"
          :width="7"
          color="primary"
        >
          -
        </v-progress-circular>
      </div>
      <v-card
        value="theme"
        class="d-flex flex-column justify-center align-center px-6 mx-5"
        max-width="300px"
      >
        <p>Question {{ props.numQuestion || "1" }} sur 10</p>
      </v-card>
    </v-row>
  </v-container>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";

let questionTheme = ref();
let currentQuestionTheme = ref();
let interval = ref();
let timerValue = ref(0);
let stopTimerMst = ref(false);
// let nextQuestion = ref(false);

const props = defineProps({
  theme: {
    type: Number,
  },
  numQuestion: {
    type: String || Number,
  },
});

// function print(x) {
//   console.log(x);
// }

//Afficher le thème dans le header
async function fetchTheme() {
  const response = await axios.get(
    `http://localhost:3002/api/themes/?id=${props.theme}`
  );
  return response.data;
}

// const emit = defineEmits(["timer"]);

onMounted(async () => {
  //Timer
  interval.value = setInterval(() => {
    if (timerValue.value === 100) {
      // nextQuestion.value = true;
      stopTimerMst.value = true;
      timerValue.value = 0;
      // const event = new Event("timer");
      // document.dispatchEvent(event);
      // emit("timer");
    }
    timerValue.value += 10;
  }, 1000);

  //Theme
  questionTheme.value = await fetchTheme();
  currentQuestionTheme.value = questionTheme.value[0].theme_name;
});
//_________________________________
</script>

<style scoped>
.menu-mobile {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
</style>
