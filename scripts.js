// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwOMls1BBMzcDZYzJbrjC2T71EqQN0dXQ",
  authDomain: "challenge-mixer.firebaseapp.com",
  projectId: "challenge-mixer",
  storageBucket: "challenge-mixer.appspot.com",
  messagingSenderId: "751728360349",
  appId: "1:751728360349:web:90c24c2af745598abfcd74",
  measurementId: "G-GQDFK66P3H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = firebase.auth();
const db = firebase.firestore();
const challengeTitle = document.getElementById("challenge-title");
const signInButton = document.getElementById("sign-in");
const signOutButton = document.getElementById("sign-out");
const addChallengeContainer = document.getElementById(
  "add-challenge-container"
);

auth.onAuthStateChanged((user) => {
  if (user) {
    signInButton.style.display = "none";
    signOutButton.style.display = "block";
    addChallengeContainer.style.display = "block";
  } else {
    signInButton.style.display = "block";
    signOutButton.style.display = "none";
    addChallengeContainer.style.display = "none";
  }
});

function signIn() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
}

function signOut() {
  auth.signOut();
}

function getRandomChallenge() {
  db.collection("challenges")
    .get()
    .then((querySnapshot) => {
      const challenges = querySnapshot.docs.map((doc) => doc.data().text);
      const randomIndex = Math.floor(Math.random() * challenges.length);
      challengeTitle.textContent = challenges[randomIndex];
    })
    .catch((error) => {
      console.log("Error getting challenges:", error);
    });
}

function addChallenge() {
  const newChallenge = document.getElementById("new-challenge");
  if (newChallenge.value.trim() === "") {
    alert("Please enter a challenge.");
    return;
  }

  db.collection("challenges")
    .add({ text: newChallenge.value })
    .then(() => {
      newChallenge.value = "";
      alert("Challenge added successfully!");
    })
    .catch((error) => {
      console.error("Error adding challenge: ", error);
    });
}
