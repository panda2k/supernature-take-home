<template>
    <v-table> 
        <thead>
            <th class="text-left">
                Name
            </th>
            <th class="text-left">
                Product
            </th>
            <th class="text-left">
                Cost
            </th>
            <th class="text-left">
                Count
            </th>
        </thead>
        <tbody>
            <tr v-for="item in itinerary" :key="item[0] + item[1]">
                <td class="px-0"> {{ item[0] }} </td>
                <td class="px-0"> {{ item[1] }} </td>
                <td class="px-0"> {{ item[2] }} </td>
                <td class="px-0"> {{ item[3] }} </td>
            </tr>
        </tbody>
    </v-table>
</template>
<script>
export default {
    props: {
        itinerary: Object
    }
}
</script>

