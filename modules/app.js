import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  get,
  set,
  onValue,
  child,
  onChildAdded,
  onChildChanged,
  onChildRemoved,
} from "firebase/database";

export class App {
  constructor() {
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
    const app = initializeApp(firebaseConfig);
    // Initialize Realtime Database and get a reference to the service
    const db = getDatabase(app);

    const devicesRef = ref(db, "/");

    this.firebaseApp = app;
    this.database = db;
    this.devicesRef = devicesRef;

    onChildAdded(devicesRef, (data) => {
      this.addDeviceElement(
        data.key,
        data.val().text,
        data.val().author
      );
    });

    onChildChanged(devicesRef, (data) => {
      this.setDeviceValues(
        data.key,
        data.val().text,
        data.val().author
      );
    });

    onChildRemoved(devicesRef, (data) => {
      this.deleteDevice(postElement, data.key);
    });
  }

  addDeviceElement(key, text, author) {

  }

  setDeviceValues(key, text, author) {

  }

  deleteDevice(key, text, author) {

  }

  async getAllDevices() {
    const dbRef = ref(getDatabase());
    let snapshot = await get(child(dbRef, "/"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          // console.log(snapshot.val());
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
  }

  buildInnerHtml(allDevices){
    // let innerHtml = `<div class="wrapper">`;
    let innerHtml = `<div class="row row-cols-1 row-cols-md-4 g-4">`;
    
    let count=0
    while (count < 1){
      count++;
      for (const element of allDevices) {
        innerHtml += `<div class="col"><div class="card h-100">`;
        let elementHtml = `<div class="card-header">Tên thiết bị: ${element.name}</div>`
        elementHtml += `
        <div class="card-body">
          <div class="card-title toggle-btn" id="unact" style="display: block;">
            <div class="inner-circle">
            <i class="toggle-on" style="font-size: 2rem; color: cornflowerblue;"></i>
              <button type="button" class="btn toggle-btn active btn-outline-dark">Bật/Tắt: ${element.LedStatus==0? `OFF` : `ON` }</button>
              <div class="card-text" style="color: #059e8a">
                <span class="dht-labels" style="color: #059e8a">Điện áp:</span>
                ${element.stateTB?.dienap || "0.0"}
                <sup class="units" style="color: #059e8a">VDC</sup>
              </div>
              ${element.LedStatus==0 ?
                `<div class="card-text fa-solid fa-earth-americas fa-3x" style="color: #e0101a;" id="online">OFFLINE</div>` :
                `<div class="card-text fa-solid fa-earth-americas fa-3x" style="color: #3dc417;" id="online">ONLINE</div>`}
            </div>
          </div>
        </div>
        `
        elementHtml += "</div></div>"
        innerHtml += elementHtml
      };

    }

    // innerHtml += `</div>`;
    // innerHtml += `</div></div>`;

    return innerHtml;
  }
}
