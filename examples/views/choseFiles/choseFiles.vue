<template>
    <chose-files :data="data"></chose-files>
</template>

<script>
export default {
    data(){
        return{
            data: {
                fileList: [
                    // { url: "blob:http://localhost:888/f3aa1859-82a1-4661-afbe-a5427d01ac7c", type: 'image'}
                ],
                maxLength: 10,
                multiple: true
            }
        }
    }
}
</script>

<style>

</style>
