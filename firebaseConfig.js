const firebaseConfig = {
    apiKey: "AIzaSyB7IVQ4yiqS_DvZc-7SgVQO8LdVCyO2SCw",
    authDomain: "giamsattudien.firebaseapp.com",
    databaseURL: "https://giamsattudien-default-rtdb.firebaseio.com",
    projectId: "giamsattudien",
    storageBucket: "giamsattudien.appspot.com",
    messagingSenderId: "554091071071",
    appId: "1:554091071071:web:02febdb64b6abeef063dea",
    measurementId: "G-NC4QZCTBTF"
  };

//   const firebaseConfig = {
//     apiKey: "${{ secrets.API_KEY }}",
//     authDomain: "${{ secrets.AUTH_DOMAIN }}",
//     databaseURL: "${{ secrets.DATABASE_URL }}",
//     projectId: "${{ secrets.PROJECT_ID }}",
//     storageBucket: "${{ secrets.STORAGE_BUCKET }}",
//     messagingSenderId: "${{ secrets.MESSAGING_SENDER_ID }}",
//     appId: "${{ secrets.APP_ID }}",
//     measurementId: "${{ secrets.MEASUREMENT_ID }}"
//   };


const testEmail = {
    username: "testuser@gmail.com",
    password: "test123@"
}

export {
    firebaseConfig,
    testEmail
}