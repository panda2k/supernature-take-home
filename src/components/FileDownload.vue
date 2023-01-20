<template>
    <v-btn @click="download()">
        <v-icon icon="mdi-download" class="mr-1"></v-icon>
        Download Sheet
    </v-btn>
</template>

<script>
export default {
    methods: {
        download() {
            const url = window.URL.createObjectURL(this.$store.state.file)
            const a = document.createElement('a')
            a.style.display = 'none'
            a.href = url
            a.download = this.$store.state.file.name
            document.body.appendChild(a)
            a.click()
            window.URL.revokeObjectURL(url)
        },
    }

}
</script>
