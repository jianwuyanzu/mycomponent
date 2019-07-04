<template>
    <div class="slidVER">
        <el-card class="card">
            <div slot="header">
                <span class="FS18">滑动验证slidVer 此插件目前只能纯前端验证，仅供学习交流</span>
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
                <div>
                    <span>滑动验证</span>
                    <slid-ver class="slidVer" @fail="fail" @success="success"></slid-ver>
                </div>
                <div>
                    <span>滑动拼图验证</span>
                    <slid-ver class="slidVer" type="slid_image" @fail="fail" @success="success"></slid-ver>
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
                attr: 'type',
                des: '验证类型',
                type: 'string',
                optional: 'slid/slid_image',
                default: 'slid'
            }
        ], eventsList = [
            {
                eventName: 'fail',
                des: '验证失败时触发',
                attr: ''
            },{
                eventName: 'success',
                des: '验证成功时触发',
                attr: ''
            }
        ], functionList = [
            {
                funName: 'reset',
                des: '重置',
                attr: ''
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
        fail(){
            console.log('fail');
        },
        success(){
            console.log('success')
        }
    }
}
</script>

<style lang="scss" scoped>
.slidVER{
    .card{
        flex: 1;
        // min-height: 500px;
    }
    .el-table{
        margin-bottom: 20px;
    }
    .modal{
        display: flex;
        align-items: center;
        justify-content: space-around;
        flex-wrap: wrap;
        .slidVer{
            width: 300px;
            // height: 50px;
        }
    }
}
</style>
