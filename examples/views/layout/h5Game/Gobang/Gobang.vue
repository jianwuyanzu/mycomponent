<template>
    <div class="Gobang">
        <el-card class="Gobang-card">
            <div slot="header">
                <span class="FS18">五子棋(Gobang)</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="GobangModal = true;">示例</el-button>
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

                <h3>Events</h3>
                <el-table :data="eventsList" border>
                    <el-table-column prop="funName" label="事件名"></el-table-column>
                    <el-table-column prop="des" label="说明"></el-table-column>
                    <el-table-column prop="attr" label="参数"></el-table-column>
                </el-table>
            </div>
        </el-card>

        <el-dialog title="示例" :visible.sync="GobangModal" :fullscreen="true">
            <div class="GobangModal">
                <div class="buttonGroup">
                    <el-button type="primary" size="small" @click="reset">重置</el-button>
                </div>
                <Gobang class="test" ref="gobang"></Gobang>
            </div>
            <!-- <span slot="footer" class="dialog-footer">
                <el-button @click="GobangModal = false">取 消</el-button>
                <el-button type="primary" @click="GobangModal = false">确 定</el-button>
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
            GobangModal: false,
        }
    },
    methods: {
        reset(){
            this.$refs.gobang.initGame();
        }
    }
}
</script>

<style lang="scss" scoped>
.Gobang{
    .Gobang-card{
        flex: 1;
        // min-height: 500px;
    }
    .el-table{
        margin-bottom: 20px;
    }
    .GobangModal{
        // height: 100%;
        // height: 550px;
        .buttonGroup{
            text-align: center;
            margin-bottom: 20px;
        }
        .test{
            width: 100%;
            margin: auto;
            -webkit-tap-highlight-color:transparent;
        }
    }
}
</style>
