<template>
  <v-card id="signInForm">
    <v-form ref="form" >
      <v-container>
        <v-row no-gutters>
          <v-col>
            <v-alert color="error" :value="responseStatus !== ''">{{
              responseStatus
            }}</v-alert>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field
              v-model="email"
              label="Email"
              type="email"
              required
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row no-gutters>
          <v-col>
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-form>

    <v-card-actions>
      <v-container>
        <v-row justify="end" align="center" class="ma-0">
          <v-col cols="auto" class="ma-0 pa-0">
            <v-btn color="primary" @click="signInWithEmailPassword">Log in</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import firebase from 'firebase/compat/app';
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { ref } from 'vue';
import { useAppStore } from '../stores/app'
import { useRouter } from "vue-router";
import { firebaseConfig } from '@root/firebaseConfig';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = getAuth();
const email= ref('');
const password= ref('');
const responseStatus=ref("");

const appStore = useAppStore()
const router = useRouter()

function signInWithEmailPassword() {
  // [START auth_signin_password]
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // User signed in successfully
      const user = userCredential.user;
      console.log("User signed in:", user);
      responseStatus.value = `User signed in ${user}`
      appStore.setFbLogedInUser(user);
      // Redirect to the desired page or perform other actions
      router.push("/")
    })
    .catch((error) => {
      // Handle sign-in errors
      responseStatus.value = `Sign-in error: ${error.code}, ${error.message}`
      appStore.setFbLogedInUser(undefined);
    });
  // [END auth_signin_password]
}

function signUpWithEmailPassword() {
  // [START auth_signup_password]
  const { getAuth, createUserWithEmailAndPassword } = require("firebase/auth");

  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  // [END auth_signup_password]
}

function sendEmailVerification() {
  // [START auth_send_email_verification]
  const { getAuth, sendEmailVerification } = require("firebase/auth");

  const auth = getAuth();
  sendEmailVerification(auth.currentUser)
    .then(() => {
      // Email verification sent!
      // ...
    });
  // [END auth_send_email_verification]
}

function sendPasswordReset() {
  const email = "sam@example.com";

  // [START auth_send_password_reset]
  const { getAuth, sendPasswordResetEmail } = require("firebase/auth");

  const auth = getAuth();
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  // [END auth_send_password_reset]
}

</script>