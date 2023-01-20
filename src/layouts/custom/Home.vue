<template>
    <v-app>
        <v-main>
            <div>
                <MenuBar />
                <Table class="mx-5 mt-6" v-if="this.$store.state.table" :itinerary="this.$store.state.table" />
            </div>
        </v-main>
    </v-app>
</template>

<script>
import MenuBar from '../../components/MenuBar.vue'
import Table from '../../components/Table.vue'

export default {
    components: {
        MenuBar,
        Table
    },
}

</script>

