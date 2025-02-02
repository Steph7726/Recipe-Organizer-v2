import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXHfs546W38_wpb5hKIVatze-StM5NQQE",
  authDomain: "recipe-organizer-f9bc7.firebaseapp.com",
  projectId: "recipe-organizer-f9bc7",
  storageBucket: "recipe-organizer-f9bc7.appspot.com", // Fixed typo
  messagingSenderId: "907283353267",
  appId: "1:907283353267:web:dd265f90d55b7fe3756ac6",
  measurementId: "G-5MVPH1ZKFQ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Firebase Authentication
function login() {
  signInWithPopup(auth, provider)
    .then((result) => {
      alert(`Welcome, ${result.user.displayName}`);
    })
    .catch((error) => console.error(error));
}

function logout() {
  signOut(auth)
    .then(() => alert("Logged out"))
    .catch((error) => console.error(error));
}

// Add Recipe
async function addRecipe() {
  const name = document.getElementById("recipe-name").value;
  const category = document.getElementById("recipe-category").value;
  const ingredients = document
    .getElementById("recipe-ingredients")
    .value.split(",");

  try {
    await addDoc(collection(db, "recipes"), {
      name,
      category,
      ingredients,
    });
    alert("Recipe added!");
    displayRecipes();
  } catch (error) {
    console.error("Error adding recipe:", error);
  }
}

// Display Recipes
async function displayRecipes() {
  const recipeList = document.getElementById("recipe-list");
  recipeList.innerHTML = "";

  try {
    const querySnapshot = await getDocs(collection(db, "recipes"));
    querySnapshot.forEach((doc) => {
      let recipe = doc.data();
      recipeList.innerHTML += `
        <div>
          <h3>${recipe.name}</h3>
          <p>Category: ${recipe.category}</p>
          <p>Ingredients: ${recipe.ingredients.join(", ")}</p>
          <button onclick="deleteRecipe('${doc.id}')">Delete</button>
        </div>
      `;
    });
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
}

// Delete Recipe
async function deleteRecipe(id) {
  try {
    await deleteDoc(doc(db, "recipes", id));
    alert("Recipe deleted!");
    displayRecipes();
  } catch (error) {
    console.error("Error deleting recipe:", error);
  }
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("service-worker.js")
    .then(() => {
      console.log("Service Worker Registered");
    })
    .catch((error) => {
      console.error("Service Worker Registration Failed:", error);
    });
}

// Load Recipes on Page Load
window.onload = () => {
  displayRecipes();
};
