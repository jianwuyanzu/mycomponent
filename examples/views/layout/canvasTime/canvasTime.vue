<template>
    <div class="CANVASTIME">
        <el-card class="card">
            <div slot="header">
                <span class="FS18">canvas时钟(canvas-time)</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="modal = true;">示例</el-button>
            </div>
            <div>
                <h3>canvas-time Attributes</h3>
                <el-table :data="attributesList" border>
                    <el-table-column prop="attr" label="参数"></el-table-column>
                    <el-table-column prop="des" label="说明"></el-table-column>
                    <el-table-column prop="type" label="类型"></el-table-column>
                    <el-table-column prop="optional" label="可选值"></el-table-column>
                    <el-table-column prop="default" label="默认值"></el-table-column>
                </el-table>

                <h3>canvas-time Events</h3>
                <el-table :data="eventsList" border>
                    <el-table-column prop="funName" label="事件名"></el-table-column>
                    <el-table-column prop="des" label="说明"></el-table-column>
                    <el-table-column prop="attr" label="参数"></el-table-column>
                </el-table>
            </div>
        </el-card>

        <el-dialog title="示例" :visible.sync="modal" :fullscreen="true">
            <div class="modal">
                <div>
                    <span>conti</span>
                    <canvas-time></canvas-time>
                </div>
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
        let attributesList = [
            {
                attr: 'type',
                des: '时钟类型',
                type: 'string',
                optional: 'conti',
                default: 'conti'
            },{
                attr: 'size',
                des: 'canvas宽高',
                type: 'number',
                optional: '',
                default: '200'
            },{
                attr: 'bg_color',
                des: '背景色',
                type: 'string',
                optional: '',
                default: '#ffffff'
            },{
                attr: 'indicate',
                des: '是否显示表盘',
                type: 'boolean',
                optional: 'true/false',
                default: 'true'
            },{
                attr: 'indicate_color',
                des: '表盘颜色',
                type: 'string',
                optional: '',
                default: '#333333'
            },{
                attr: 'clockHand_type',
                des: '表针类型',
                type: 'string',
                optional: 'none/border',
                default: 'none'
            },{
                attr: 'clockHand_color',
                des: '表针颜色',
                type: 'string',
                optional: '',
                default: '#9d9d5c'
            },{
                attr: 'clockHand_point_color',
                des: '表针连接点颜色',
                type: 'string',
                optional: '',
                default: '#666600'
            },{
                attr: 'clockHand_secType',
                des: '秒针移动方式',
                type: 'boolean',
                optional: 'true/false',
                default: 'true'
            },{
                attr: 'timeAdd_color',
                des: '具体时间颜色',
                type: 'string',
                optional: '',
                default: '#333333'
            },{
                attr: 'time_24h',
                des: '是否24小时制',
                type: 'Boolean',
                optional: 'true/false',
                default: 'true'
            },{
                attr: 'timeAdd_color',
                des: '具体日期颜色',
                type: 'string',
                optional: '',
                default: '#999999'
            }
        ], 
        eventsList = [];
        return {
            attributesList: attributesList,
            eventsList: eventsList,
            modal: false,
        }
    }
}
</script>

<style lang="scss" scoped>
.CANVASTIME{
    .card{
        flex: 1;
        // min-height: 500px;
    }
    .el-table{
        margin-bottom: 20px;
    }
    .modal{
        display: flex;
    }
}
</style>
