<template>
    <div class="ESCAPE">
        <el-card class="escape-card">
            <div slot="header">
                <span class="FS18">粒子逃脱(escape)</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="escapeModal = true;">示例</el-button>
            </div>
            <div>
                <h3>Escape Attributes</h3>
                <el-table :data="attributesList" border>
                    <el-table-column prop="attr" label="参数"></el-table-column>
                    <el-table-column prop="des" label="说明"></el-table-column>
                    <el-table-column prop="type" label="类型"></el-table-column>
                    <el-table-column prop="optional" label="可选值"></el-table-column>
                    <el-table-column prop="default" label="默认值"></el-table-column>
                </el-table>

                <h3>Escape Events</h3>
                <el-table :data="eventsList" border>
                    <el-table-column prop="funName" label="事件名"></el-table-column>
                    <el-table-column prop="des" label="说明"></el-table-column>
                    <el-table-column prop="attr" label="参数"></el-table-column>
                </el-table>
            </div>
        </el-card>

        <el-dialog title="示例" :visible.sync="escapeModal" :fullscreen="true">
            <div class="escapeModal">
                <escape></escape>
            </div>
            <!-- <span slot="footer" class="dialog-footer">
                <el-button @click="escapeModal = false">取 消</el-button>
                <el-button type="primary" @click="escapeModal = false">确 定</el-button>
            </span> -->
        </el-dialog>
    </div>
</template>

<script>
export default {
    data(){
        let attributesList = [], eventsList = [];
        return {
            attributesList: attributesList,
            eventsList: eventsList,
            escapeModal: false,
        }
    }
}
</script>

<style lang="scss" scoped>
.ESCAPE{
    .escape-card{
        flex: 1;
        // min-height: 500px;
    }
    .el-table{
        margin-bottom: 20px;
    }
    .escapeModal{
        // height: 100%;
        height: 550px;
    }
}
</style>
