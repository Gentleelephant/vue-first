<template>
    <!--职位管理-->
    <div>
        <div>
            <!--@keydown.enter.native="addPosition"时回车添加-->
            <el-input
                    size="small"
                    class="addPosInput"
                    placeholder="添加职位"
                    prefix-icon="el-icon-plus"
                    @keydown.enter.native="addPosition"
                    v-model="pos.name">
            </el-input>
            <el-button icon="el-icon-plus" size="small" type="primary" @click="addPosition">添加</el-button>
        </div>
        <div class="posManaTable">
            <el-table
                    :data="positions"
                    size="small"
                    border
                    stripe
                    @selection-change="handleSelectionChange"
                    style="width: 70%">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="id"
                        label="编号"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="职位名称"
                        width="120">
                </el-table-column>
                <el-table-column
                        prop="createDate"
                        label="创建时间">
                </el-table-column>
                <el-table-column
                        label="是否启用">
                    <template slot-scope="scope">
                        <el-tag size="small" type="success" v-if="scope.row.enabled">已启用</el-tag>
                        <el-tag size="small" type="info" v-else>未启用</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="showEditView(scope.$index, scope.row)">编辑
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index, scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="danger" size="small" style="margin-top: 8px" :disabled="multipleSelection.length === 0" @click="deleteMany">批量删除</el-button>
        </div>
        <el-dialog
                title="修改职位"
                :visible.sync="dialogVisible"
                width="30%">
            <div>
                <div>
                    <el-tag>职位名称</el-tag>
                    <el-input class="updatePosInput" size="small" v-model="updatePos.name"></el-input>
                </div>
                <div style="margin-top: 5px">
                    <el-tag>是否启用</el-tag>
                    <el-switch
                            style="margin-left: 8px"
                            active-text="已启用"
                            inactive-text="未启用"
                            v-model="updatePos.enabled">

                    </el-switch>
                </div>
            </div>

            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false" size="small">取 消</el-button>
    <el-button type="primary" size="small" @click="doUpdate">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "PosMana",
        data() {
            return {
                // 用来设置对话框是否可见
                dialogVisible: false,

                // 更新的信息
                updatePos: {
                    name: '',
                    enabled: false
                },

                // 添加的职位名称
                pos: {
                    name: ''
                },

                // 从后端请求来的全部信息
                positions: [],

                multipleSelection: []
            }
        },

        mounted() {
            // 在vue组件挂载之后，初始化数据(从后端请求)
            this.initPositions();
        },
        methods: {
            // 多选删除操作
            deleteMany(){
                this.$confirm('此操作将永久删除【'+ this.multipleSelection.length + '】, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids = '?';
                    this.multipleSelection.forEach(item =>{
                        ids += 'ids=' + item.id + '&'
                    });
                    this.deleteRequest('/system/basic/pos/many' + ids).then(resp=>{
                        if (resp){
                            this.initPositions();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            // 多选时的回调
            handleSelectionChange(val){
                this.multipleSelection = val;
                console.log(this.multipleSelection);
            },
            doUpdate() {
                if (!this.updatePos.name){
                    this.$message.warning("输入不能为空");
                }else{
                    this.putRequest("/system/basic/pos/", this.updatePos).then(resp => {
                        if (resp) {
                            this.initPositions();
                            this.updatePos.name = '';
                            this.dialogVisible = false;
                        }
                    })
                }

            },
            addPosition() {
                if (this.pos.name) {
                    // 发送添加请求
                    this.postRequest("/system/basic/pos/", this.pos).then(resp => {
                        if (resp) {
                            // 重新加载数据
                            this.initPositions();
                            // 清空输入框
                            this.pos.name = '';
                        }
                    })
                } else {
                    this.$message.error('职位名称不能为空');
                }
            },
            showEditView(index, data) {
                // this.updatePos = data;
                // 把data中的数据复制到updatePos中，这样updatePos就不会和data指向同一个地方，导致点击取消数据依旧被修改
                Object.assign(this.updatePos, data);
                this.dialogVisible = true;
            },
            handleDelete(index, data) {
                this.$confirm('此操作将永久删除【' + data.name + '】职位', '是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let deleteId = {id:data.id};
                    this.deleteRequest('/system/basic/pos/', deleteId).then(resp => {
                        console.log(deleteId)
                        if (resp) {
                            this.initPositions();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            // 获得职位的数据
            initPositions() {
                this.getRequest("/system/basic/pos/").then(resp => {
                    if (resp) {
                        this.positions = resp;
                    }
                })
            }
        }
    }
</script>

<style>
    .updatePosInput {
        width: 200px;
        margin-left: 8px;
    }

    .addPosInput {
        width: 300px;
        margin-right: 5px;
    }

    .posManaTable {
        margin-top: 10px;
    }

</style>