<template>
    <v-btn @click="popup = true; fetchFiles()">
        <v-icon icon="mdi-file-clock-outline" class="mr-1"></v-icon>
        Past Uploads
    </v-btn>
    <v-dialog v-model="popup" class="">
        <v-card class="d-flex flex-col align-center py-6 px-6">
            <div v-for="file in files" :key="file.name + file.timestamp" class="d-flex justify-space-between w-100 py-3">
                <div style="margin-top: 6px;">
                    {{ file.name }}
                </div>
                <div class="d-flex flex-row-reverse">
                    <v-btn @click="load(file)" class="ml-3">
                        View
                    </v-btn>
                    <v-btn @click="remove(file)" class="ml-3">
                       Delete 
                    </v-btn>
                    <v-btn @click="download(file)" class="ml-3">
                        Download 
                    </v-btn>

                    <div style="margin-top: 6px;">
                        {{ file.timestamp.toLocaleDateString("en-US") + " " + file.timestamp.toLocaleTimeString() }}
                    </div>
                </div>
            </div>
        </v-card>
    </v-dialog>
</template>

<script>
import { getStorage, ref, listAll, deleteObject, getBlob } from "firebase/storage"
import { firebaseApp } from "../firebase"
import readXlsxFile from 'read-excel-file'

const storage = getStorage(firebaseApp)

export default {
    data() {
        return {
            popup: false,
            files: []
        }
    },
    methods: {
        fetchFiles() {
            this.files = []
            const listRef = ref(storage, `${this.$store.state.user.uid}`)
            listAll(listRef)
                .then(res => {
                    res.prefixes.forEach(ref => {
                        listAll(ref)
                            .then(result => {
                                result.items.forEach(itemRef => {
                                    this.files.push({
                                        timestamp: new Date(Number(ref._location.path_.split("/")[1])),
                                        name: itemRef._location.path_.split("/")[2].split('.')[0],
                                        ref: itemRef
                                    })
                                })
                            })
                    })
                })
                .catch(error => {
                    console.log(error)
                })
        },
        async load (file) {
            return getBlob(file.ref)
                .then(result => {
                    readXlsxFile(result)
                        .then(table => {
                            table.shift()
                            this.$store.commit('changeTable', null)
                            this.$store.commit("changeTable", table)
                            table
                        })
                    return result
                })
        },
        download(file) {
            this.load(file)
                .then(res => {
                    console.log(res)
                    const url = window.URL.createObjectURL(res)
                    const a = document.createElement('a')
                    a.style.display = 'none'
                    a.href = url
                    a.download = file.name
                    document.body.appendChild(a)
                    a.click()
                    window.URL.revokeObjectURL(url)
                })
        },
        remove(file) {
            deleteObject(file.ref) 
                .then(() => {
                    this.fetchFiles() 
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
}
</script>

