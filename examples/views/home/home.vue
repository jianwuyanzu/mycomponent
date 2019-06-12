<template>
    <div class="home customScrollbar">
        <background class="home_back"></background>
    </div>
</template>

<script>
import background from './components/background/background'
export default {
    components: {
        background
    }
}
</script>

<style scoped lang="scss">
.home{
    text-align: center;
    .home_back{
        width: 100vw;
        height: 100vh;
        position: fixed;
        left: 0;
        top: 0;
    }
}
</style>
