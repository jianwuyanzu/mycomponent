<template>
    <div class="AUTOGRAPH">
        <el-card class="card">
            <div slot="header">
                <span class="FS18">签名canvasAutoGraph</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="modal = true;">示例</el-button>
            </div>
            <div>
                <h3>Attributes</h3>
                <el-table :data="attributesList" border>
                    <el-table-column prop="attr" label="参数"></el-table-column>
                    <el-table-column prop="des" label="说明"></el-table-column>
                    <el-table-column prop="type" label="类型"></el-table-column>
                    <el-table-column prop="optional" label="可选值"></el-table-column>
                    <el-table-column prop="default" label="默认值"></el-table-column>
                </el-table>

                <h3>Function</h3>
                <el-table :data="functionList" border>
                    <el-table-column prop="funName" label="方法名"></el-table-column>
                    <el-table-column prop="des" label="说明"></el-table-column>
                    <el-table-column prop="attr" label="参数"></el-table-column>
                </el-table>

                <h3>Events</h3>
                <el-table :data="eventsList" border>
                    <el-table-column prop="eventName" label="事件名"></el-table-column>
                    <el-table-column prop="des" label="说明"></el-table-column>
                    <el-table-column prop="attr" label="参数"></el-table-column>
                </el-table>
            </div>
        </el-card>

        <el-dialog title="示例" :visible.sync="modal" :fullscreen="true">
            <div class="modal">
                <div class="buttonGroup">
                    <el-button type="primary" size="small" @click="clear()">清除</el-button>
                    <el-button type="primary" size="small" @click="toDataURL()">确认</el-button>
                    <el-button type="primary" size="small" @click="insertImg()">插入</el-button>
                </div>
                <div class="broad">
                    <canvasAutoGraph class="canvasAutoGraph" ref="canvasAutoGraph"></canvasAutoGraph>
                    <img :src="url">
                </div>
                
            </div>
            <!-- <span slot="footer" class="dialog-footer">
                <el-button @click="modal = false">取 消</el-button>
                <el-button type="primary" @click="modal = false">确 定</el-button>
            </span> -->
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        let attributesList = [
            {
                attr: 'bg_color',
                des: '画布背景',
                type: 'string',
                optional: '',
                default: '#f5f5f5'
            },{
                attr: 'pen_color',
                des: '画笔颜色',
                type: 'string',
                optional: '',
                default: '#000000'
            },{
                attr: 'lineWidth',
                des: '线条宽度',
                type: 'Number',
                optional: '',
                default: '2'
            },
        ], eventsList = [], functionList = [
            {
                funName: 'clear',
                des: '重置画布',
                attr: '',
            },{
                funName: 'getData',
                des: '获取画布内容，返回一个promise对象',
                attr: '',
            },{
                funName: 'insertImg',
                des: '插入一张图片',
                attr: '同canvas.drawImage(img)',
            }
        ];
        return {
            attributesList: attributesList,
            eventsList: eventsList,
            functionList: functionList,
            modal: false,
            url: ''
        }
    },
    methods: {
        clear(){
            this.$refs.canvasAutoGraph.clear();
        },
        toDataURL(){
            this.$refs.canvasAutoGraph.getData().then((res)=>{
                // console.log(res)
                this.url = res.base64;
            })
        },
        insertImg(){
            let img = new Image();
            img.crossOrigin = "anonymous"; // 关键 跨域
            img.src = require('@/assets/logo.png');
            img.onload = ()=>{
                // console.log(img)
                this.$refs.canvasAutoGraph.insertImg(img);
            }
            img.onerror = (err) => {
                // console.log(err)
                this.$message({
                    message: '加载图片失败',
                    type: 'error'
                });
            }            
        }
    }
}
</script>

<style lang="scss" scoped>
.AUTOGRAPH{
    .card{
        flex: 1;
        // min-height: 500px;
    }
    .el-table{
        margin-bottom: 20px;
    }
    .modal{
        // height: 100%;
        height: 550px;
        .buttonGroup{
            margin-bottom: 20px;
        }
        .canvasAutoGraph{
            width: 500px;
            height: 500px;
        }
        .broad{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
        }
    }
}
</style>
