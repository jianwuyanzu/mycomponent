<!--
* data: {  prop数据
    fileList: [ 初始化显示文件数组
        { url: '' 展示文件地址 type: '' 文件类型 图片image } 
    ],
    maxLength: 10 最大文件数
}
-->
<template>
    <div class="choseFiles">
        <div class="choseFiles_body">
            <div class="fileList" v-for="(x, index) in data.fileList" :key="index" @click="previewFile(index)">
                <img v-if="x.type == 'image'" :src="x.url">

                <img src="./img/close.png" class="delete" @click.stop="deleteFile(index)">
            </div>
            <div class="fileList" v-if="data.fileList.length <= data.maxLength">
                <img src="./img/border.png" @click="choseFile">
            </div>
        </div>

        <input type="file" v-show="false" id="choseFile" :multiple="data.multiple ? data.multiple : false" @change="fileChange($event)">

        <preview :data="previewData"></preview>
    </div>

    
</template>

<script>
export default {
    name: 'choseFiles',
    props: {
        data: {
            type: Object,
            default: {
                fileList: [],
                multiple: false
            }
        }
    },
    data(){
        return{
            previewData: {}
        }
    },
    methods: {
        // 添加图片点击事件
        choseFile(){
            document.getElementById('choseFile').click();
        },
        // input change事件
        fileChange(event){
            console.log(event.target.files)
            let files = event.target.files
            for(let x in files){
                if(x == 'length'){
                    break;
                }else{
                    let blob = new Blob([files[x]]);

                    this.data.fileList.push({
                        file: files[x],
                        blob: blob,
                        type: files[x].type.split('/')[0],
                        url: URL.createObjectURL(files[x])
                    })
                    console.log(this.data)
                }
            }
        },
        // 预览文件
        previewFile(index){
            // this.previewData.files = Object.assign({}, this.data.fileList);
            this.previewData.files = [...this.data.fileList];
            this.$set(this.previewData, 'index', index);
        },
        // 删除图标点击事件
        deleteFile(index){
            console.log(index)
            this.data.fileList.splice(index, 1);
        }
    },
    mounted(){

        document.getElementById('choseFile').addEventListener('click', function(e){
            this.value = '';
            e.stopPropagation();
        }, false)
    }
}
</script>

<style lang="scss" scoped>
.choseFiles_body{
    display: flex;
    flex-wrap: wrap;
    .fileList{
        position: relative;
        // width: 33%;
        margin-right: 0.1rem;
        height: 2rem;
        text-align: center;
        margin-bottom: 0.3rem;
        >img{
            width: 2rem;
            height: 100%;
        }
        .delete{
            position: absolute;
            width: 0.4rem;
            height: 0.4rem;
            right: 0;
            top: -0.1rem;
            border-radius: 50%;
        }
    }
}
</style>
