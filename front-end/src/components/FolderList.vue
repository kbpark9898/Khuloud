<template>
    <div>
        <v-list>
            <v-icon>mdi-folder</v-icon>
            <v-header>Folders</v-header>
            <v-list-item
            v-for="item in items"
            :key="item.files">

            </v-list-item>
        </v-list>
    </div>
</template>

<script>
export default {
    props:{
        
    }
}
</script>

<style>

</style>