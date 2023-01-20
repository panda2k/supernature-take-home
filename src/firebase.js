import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyBGK0-QbgJyAAngDiB_WtgXEBcrH9Q8X3Y",
    authDomain: "supernature-take-home.firebaseapp.com",
    projectId: "supernature-take-home",
    storageBucket: "supernature-take-home.appspot.com",
    messagingSenderId: "677815181268",
    appId: "1:677815181268:web:1b9aebf96b4b7b12884041",
    measurementId: "G-CJ6PJWXFX1"
}

const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth()

export { firebaseApp, auth }

