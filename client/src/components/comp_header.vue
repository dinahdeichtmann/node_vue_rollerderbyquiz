<template v-slot:activator="{ props }">
  <v-container class="d-flex justify-center align-center" height="70px">
    <v-row>
      <div class="d-flex flex-column justify-center space-between">
        <v-progress-circular
          v-if="stopTimer === false"
          small
          :rotate="0"
          :size="50"
          :width="7"
          :model-value="timerValue"
          color="primary"
          v-model="timerValue"
          @change="print(timerValue)"
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
        class="d-flex flex-column justify-center align-center px-6 mx-1"
        max-width="300px"
      >
        <p>Thème : {{ currentQuestionTheme }}</p>
      </v-card>
      <v-btn class="text-none" stacked>
        <v-badge color="purple">
          <template v-slot:badge>
            <span>{{ props.comboBadge }}</span>
          </template>
          <v-icon large>mdi-trophy</v-icon>
        </v-badge>
      </v-btn>
    </v-row>
  </v-container>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
// import { stopTimer } from "/src/state";

let questionTheme = ref();
let currentQuestionTheme = ref();
let interval = ref();
let timerValue = ref(0);
let stopTimer = ref(false);

function print(x) {
  console.log(x);
}

const props = defineProps({
  comboBadge: {
    type: Number,
  },
  theme: {
    type: Number,
  },
});

//Afficher le thème dans le header
async function fetchTheme() {
  const response = await axios.get(
    `http://localhost:3002/api/themes/?id=${props.theme}`
  );
  return response.data;
}

onMounted(async () => {
  //Timer
  interval.value = setInterval(() => {
    if (timerValue.value === 100) {
      stopTimer.value = true;
      // const event = new Event("timerOut");
      // document.dispatchEvent(event);
      return (timerValue.value = 0);
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
