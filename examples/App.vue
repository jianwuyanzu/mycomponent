<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
    mounted() {
        console.log(process.env.VUE_APP_URL)
    },
}
</script>

<style lang="scss">

</style>
