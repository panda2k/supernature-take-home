<template>
    <v-btn @click="click()">
        Login   
    </v-btn>
</template>

<script>
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth } from '../firebase'

const provider = new GoogleAuthProvider()

export default {
    methods: {
        click() {
            signInWithPopup(auth, provider)
                .then(result => {
                    const credential = GoogleAuthProvider.credentialFromResult(result)
                    const token = credential.accessToken
                    const user = result.user
                    console.log(user)
                    this.$store.commit("changeUser", user)
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
}


</script>

