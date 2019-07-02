<template>
    <div class="SILDVER">
        <el-card class="card">
            <div slot="header">
                <span class="FS18">滑动验证sildVer</span>
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
                <sild-ver class="sildVer"></sild-ver>
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
        let attributesList = [], eventsList = [], functionList = [];
        return {
            attributesList: attributesList,
            eventsList: eventsList,
            functionList: functionList,
            modal: false,
            url: ''
        }
    }
}
</script>

<style lang="scss" scoped>
.SILDVER{
    .card{
        flex: 1;
        // min-height: 500px;
    }
    .el-table{
        margin-bottom: 20px;
    }
    .modal{
        .sildVer{
            width: 300px;
            height: 50px;
        }
    }
}
</style>
