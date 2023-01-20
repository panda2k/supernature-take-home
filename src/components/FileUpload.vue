<template>
    <div>
        <input id="upload" type="file" class="d-none" accept=".xlsx" @change="handleFile"/>
        <v-btn @click="openUpload()">
            <v-icon icon="mdi-upload" class="mr-1"></v-icon>
            {{ this.uploading ? `Uploading (${this.progress}%)` : "Upload Sheet" }}
        </v-btn>
    </div>
</template>

<script>
import readXlsxFile from 'read-excel-file'
import { getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { firebaseApp } from '../firebase'

const storage = getStorage(firebaseApp)

export default {
    data() {
        return {
            uploading: false,
            progress: 0
        }
    },
    methods: {
        openUpload() {
            document.getElementById("upload").click();
        },
        async handleFile(e) {
            const files = e.target.files
            if (!files.length) {
                return
            }
            try {
                const table = await readXlsxFile(files[0])
                // remove the header column
                table.shift()
                this.$store.commit('changeTable', null)
                this.$store.commit('changeTable', table)

                if (this.$store.state.user) {
                    this.uploading = true
                    const fileRef = ref(storage, 
                        `${this.$store.state.user.uid}/${Date.now()}/${files[0].name}`
                    )
                    const task = uploadBytesResumable(fileRef, files[0])
                    task.on('state_changed', snapshot => {
                        this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    })
                }

            } catch (error) {
                console.log("error uploading")           
                console.log(error)
            }

            this.uploading = false
            this.progress = 0
        }
    }
}

</script>

