<template>
  <v-app>
    <v-fab v-if="userLoggedIn"
        class="position-fixed top-200 left-100 right-10 pa-10 w-100"
        color="cyan-accent-2"
        icon="mdi-logout"
        location="bottom right"
        size="60"
        style="z-index: 1000;"
        @click="signOutUser"
      ></v-fab>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
  import { initializeApp as initializeApp } from "firebase/app";
  import { getAuth, signOut  } from "firebase/auth";
  import { useRouter } from "vue-router";
  import { useAppStore } from "./stores/app"
  import { ref, computed, onMounted } from 'vue';

  const router = useRouter()

  const firebaseConfig = {
    apiKey: "AIzaSyDc--387sq_sqsmMWzTIzQvZd-g4-aVMKY",
    authDomain: "gsmtest-9f523.firebaseapp.com",
    databaseURL: "https://gsmtest-9f523-default-rtdb.firebaseio.com",
    projectId: "gsmtest-9f523",
    storageBucket: "gsmtest-9f523.appspot.com",
    messagingSenderId: "30656126464",
    appId: "1:30656126464:web:a925a0e4d20a5a32a442e5",
  };

  const fbApp = initializeApp(firebaseConfig);
  const auth = getAuth();
  const appStore = useAppStore()
  // const userLoggedIn = ref(false);

  function initApp() {
    auth.onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var uid = user.uid;
        var phoneNumber = user.phoneNumber;
        var providerData = user.providerData;
        user.getIdToken().then(function(accessToken) {
          console.log(accessToken)
        });
        appStore.setFbLogedInUser(user);
        // userLoggedIn.value = true;
        router.push("/");
      } else {
        // User is signed out.
        router.push("/signin");
      }
    }, function(error) {
      console.log(error);
    });
  };

  function signOutUser() {
    // [START auth_sign_out]
    signOut(auth).then(() => {
      // Sign-out successful.
      appStore.setFbLogedInUser(undefined);
    }).catch((error) => {
      appStore.setFbLogedInUser(undefined);
      console.log(error);
    });
    // [END auth_sign_out]
  }

  onMounted(() => {
    initApp()
  })

  const userLoggedIn = computed(() => {
    return appStore.getFbLogedInUser?.uid != undefined;
  })
</script>
