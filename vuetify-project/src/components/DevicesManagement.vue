<template>
  <v-container class="fill-height">
    <v-responsive
      class="align-centerfill-height mx-auto"
      max-width="900"
    >
      <v-card flat>
        <v-card-text>
          <v-container fluid>
            <v-row>
              <template v-for="(sw, index) in devices" :key="index">
                <v-col
                  cols="12"
                  md="3"
                  sm="3"
                >
                    <v-card
                      class="mx-auto"
                      max-width="368"
                    >
                      <v-card-item :title="`${devices[index].name}`">
                      </v-card-item>

                      <v-card-text class="py-0">
                        <v-row align="center" no-gutters>
                          <v-col
                            class="text-h6"
                            cols="6"
                          >
                            {{devices[index]?.stateTB?.dienap ?? '0.0'}}<sup class="units" style="color: #059e8a">VDC</sup>
                          </v-col>

                          <v-col class="text-right" cols="6">
                            <v-icon
                              :color="`${devices[index]?.stateTB?.state??0==0?'red':'green'}`"
                              :icon="`${devices[index]?.stateTB?.state??0==0?'mdi-cloud-off-outline':'mdi-cloud-check-variant-outline'}`"
                              size="68"
                            ></v-icon>
                          </v-col>
                        </v-row>
                      </v-card-text>
                      <v-divider></v-divider>
                      <v-card-actions>
                        <v-switch
                          v-model="devices[index].LedStatus"
                          color="success"
                          :label="`${devices[index].LedStatus==1 ? 'ON' : 'OFF'}`"
                          false-value="0"
                          true-value="1"
                          hide-details
                          inset
                          @change="changeState(index)"
                        ></v-switch>
                      </v-card-actions>
                    </v-card>

                </v-col>
              </template>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-responsive>
  </v-container>
</template>

<script setup>
  import firebase from 'firebase/compat/app';
  import { initializeApp } from "firebase/app";
  import {
    getDatabase,
    ref as fbRef,
    get,
    set,
    onValue,
    child,
    onChildAdded,
    onChildChanged,
    onChildRemoved,
  } from "firebase/database";
  import { ref, watch, onMounted } from 'vue';

  const firebaseConfig = {
    apiKey: "AIzaSyDc--387sq_sqsmMWzTIzQvZd-g4-aVMKY",
    authDomain: "gsmtest-9f523.firebaseapp.com",
    databaseURL: "https://gsmtest-9f523-default-rtdb.firebaseio.com",
    projectId: "gsmtest-9f523",
    storageBucket: "gsmtest-9f523.appspot.com",
    messagingSenderId: "30656126464",
    appId: "1:30656126464:web:a925a0e4d20a5a32a442e5",
  };

  // Initialize Firebase
  const fbApp = initializeApp(firebaseConfig);
  // // Initialize Realtime Database and get a reference to the service
  const fbDb = getDatabase(fbApp);
  const fbDbRef = fbRef(fbDb);

  async function getAllDevices() {
    let snapshot = await get(child(fbDbRef, "/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    
    let allDevices = new Array();
    for (var key in snapshot) {
      if (Object.prototype.hasOwnProperty.call(snapshot, key)) {
          var val = snapshot[key];
          allDevices.push({...val, name: key})
      }
    }

    return allDevices;
  };

  const devices = ref(await getAllDevices());

  function changeState(index) {
    let device = devices.value[index];
    // override device object on fb
    set(fbRef(fbDb, `${device.name}/`), device);
  };
</script>
