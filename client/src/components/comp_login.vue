<template>
  <div>
    <v-row justify="center">
      <v-btn value="rules" @click="dialog = true">
        <v-icon>mdi-account</v-icon>
      </v-btn>
      <v-dialog v-model="dialog">
        <v-card>
          <v-card-title> Authentification </v-card-title>
          <v-card-text>
            <v-btn color="primary" class="ma-2" @click="creerCompte = true">
              Créer un compte
            </v-btn>
            <v-btn color="primary" class="ma-2" @click="seConnecter = true">
              Se connecter
            </v-btn>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" variant="text" @click="dialog = false">
              Retour
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="creerCompte">
        <v-card>
          <v-card-title>
            <span class="text-h5"></span>
          </v-card-title>
          <v-sheet width="300" class="mx-auto">
            <v-form ref="form" method="post" action="/login">
              <v-text-field
                v-model="creationCompte.email"
                label="Email"
                required
              ></v-text-field>
              <v-text-field
                v-model="creationCompte.playerName"
                label="Nom de joueur.oueuse"
              ></v-text-field>
              <v-text-field v-model="teamCreate" label="Équipe"></v-text-field>
              <v-text-field
                v-model="creationCompte.pwd"
                label="Mot de passe"
                :rules="[rules.min]"
                :append-icon="showPwdCreate ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPwdCreate ? 'text' : 'password'"
                @click:append="showPwdCreate = !showPwdCreate"
                required
              ></v-text-field>
              <v-text-field
                v-model="creationCompte.pwdConfirm"
                label="Confirmer le mot de passe"
                :append-icon="showPwdCreate ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPwdCreate ? 'text' : 'password'"
                @click:append="showPwdCreate = !showPwdCreate"
                required
              ></v-text-field>

              <div class="d-flex flex-column">
                <v-btn color="success" class="mt-4" block @click="create">
                  Créer mon compte
                </v-btn>
              </div>
            </v-form>
          </v-sheet>
          <v-card-actions>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="creerCompte = false"
            >
              Retour
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-dialog v-model="seConnecter">
        <v-card>
          <v-card-title></v-card-title>
          <v-sheet width="300" class="mx-auto">
            <v-form ref="form">
              <v-text-field
                v-model="connexionCompte.email"
                label="Email"
                required
              ></v-text-field>
              <v-text-field
                v-model="connexionCompte.pwd"
                label="Mot de passe"
                :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPwd ? 'text' : 'password'"
                @click:append="showPwd = !showPwd"
                required
              ></v-text-field>
              <v-text-field
                v-model="connexionCompte.pwdConfirm"
                label="Confirmer le mot de passe"
                :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPwd ? 'text' : 'password'"
                @click:append="showPwd = !showPwd"
                required
              ></v-text-field>

              <div class="d-flex flex-column">
                <v-btn color="success" class="mt-4" block @click="connect">
                  Se connecter
                </v-btn>

                <v-btn
                  color="warning"
                  class="mt-4"
                  block
                  @click="forgottenPwd = true"
                >
                  Mot de passe oublié
                </v-btn>
                <v-form
                  ref="form"
                  v-if="forgottenPwd === true"
                  method="post"
                  action="/forgottenPwd"
                >
                  <v-text-field
                    v-model="emailForgottenPwd"
                    label="Email"
                    class="mt-4"
                    required
                  ></v-text-field>
                  <v-btn color="success" block @click="reinitialize">
                    Réinitialiser le mot de passe
                  </v-btn>
                </v-form>
              </div>
            </v-form>
          </v-sheet>
          <v-card-actions>
            <v-btn
              color="primary"
              variant="text"
              @click="
                seConnecter = false;
                forgottenPwd = false;
              "
            >
              Retour
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
const dialog = ref();
const creerCompte = ref();
const seConnecter = ref();
const rules = reactive({
  min: (v) => v.length >= 8 || "Minimum 8 caractères",
});
const showPwd = ref(false);
const showPwdCreate = ref(false);
const forgottenPwd = ref(false); //afficher le champ email et bouton réinitialiser pwd

const creationCompte = reactive({}); //objet formulaire création compte
const connexionCompte = reactive({}); //objet formulaire connexion compte
const emailForgottenPwd = ref();
</script>
