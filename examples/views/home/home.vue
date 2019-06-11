<template>
    <div class="home">
        <div class="main">
            <div class="main_head">
                <background class="main_head_back"></background>
            </div>
        </div>
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
    .main{
        width: 80%;
        min-height: 100vh;
        height: auto;
        margin: auto;
        .main_head{
            width: 100%;
            height: 500px;
            .main_head_back{
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>
