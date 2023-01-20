<template>
    <v-app-bar :elevation="2">
        <v-app-bar-title>
            Itinerary Dashboard
        </v-app-bar-title>
        <div class="d-flex flex-row-reverse pr-6">
            <div>
                <Login v-if="this.$store.state.user == null"/>
                <div v-else style="margin-top: 6px;">
                    {{ this.$store.state.user.displayName }}
                </div>
            </div>
            <div class="px-8">
                <FileUpload />
            </div>
            <div v-if="this.$store.state.user"> 
                <ViewUploaded />
            </div>
        </div>
    </v-app-bar> 
</template>

<script>
import FileUpload from './FileUpload.vue'
import Login from './Login.vue'
import ViewUploaded from './ViewUploaded.vue'

export default {
    components: {
        FileUpload,
        Login,
        ViewUploaded
    }
}

</script>

