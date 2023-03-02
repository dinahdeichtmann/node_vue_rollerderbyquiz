<template>
  <v-card max-width="100%" class="mx-auto">
    <v-container>
      <v-row dense>
        <v-col cols="12">
          <v-card color="#385F73" theme="dark">
            <v-card-title class="text-h5"> Faire un quizz ! </v-card-title>
            <div class="quizz-nav">
              Choisissez vos préférences puis démarrez le quizz.
            </div>
            <v-card-actions>
              <v-btn variant="text">
                <router-link to="/filters">
                  <v-btn class="ml-2" variant="outlined" size="small"
                    >C'est parti</v-btn
                  >
                </router-link>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-card color="#1F7087" theme="dark">
            <div class="card-container">
              <div class="card-officiel">
                <v-card-title class="text-h5"> Test officiel </v-card-title>

                <v-card-subtitle>40 questions</v-card-subtitle>

                <v-card-actions>
                  <v-dialog v-model="dialog" scrollable>
                    <template v-slot:activator="{ props }">
                      <v-btn color="primary" v-bind="props"> Démarrez </v-btn>
                    </template>
                    <v-card width="60%">
                      <v-card-title>Avant de vous lancer...</v-card-title>
                      <v-divider></v-divider>
                      <v-card-text style="height: 300px">
                        <p>
                          Ce test comporte 20 questions avec un temps limité
                          pour répondre... bla bla bla
                        </p>
                        <v-divider></v-divider>
                        <v-btn class="ml-2" variant="outlined" size="small">
                          <router-link to="/mst">C'est parti !</router-link>
                        </v-btn>
                      </v-card-text>
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
                </v-card-actions>
              </div>
              <div class="card-officiel">
                <v-avatar class="ma-3" size="125" rounded="0">
                  <v-img
                    src="https://www.lommerollergirls.com/wp-content/uploads/2020/01/82210789_3279393668743746_6956333666318417920_o.jpg"
                  ></v-img>
                </v-avatar>
              </div>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
const dialog = ref();
</script>

<style scoped>
.quizz-nav {
  color: rgba(234, 232, 228, 0.85);
  margin-right: 20px;
  margin-left: 20px;
}
.card-container {
  display: flex;
  justify-content: space-between;
}

a {
  text-decoration: none;
  border: none;
  color: white;
}
a:visited {
  text-decoration: none;
  border: none;
}
</style>
