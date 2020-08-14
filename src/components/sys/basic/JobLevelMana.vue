<template>
    <div>
        <div>
            <el-input size="small" v-model="addjl.name" style="width: 250px;" prefix-icon="el-icon-plus"
                      placeholder="职称添加..."></el-input>
            <el-select v-model="addjl.titleLevel" placeholder="请选择职称等级" size="small" style="margin-left: 10px">
                <el-option
                        v-for="item in titleLevels"
                        :key="item"
                        :label="item"
                        :value="item">
                </el-option>
            </el-select>
            <el-button icon="el-icon-plus" type="primary" style="margin-left: 5px" size="small"
                       @click="addJobLevel"></el-button>
        </div>

        <div style="margin-top: 5px">
            <el-table
                    :data="jls"
                    border
                    stripe
                    size="small"
                    @selection-change="handleSelectionChange"
                    style="width: 80%;">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="id"
                        label="编号"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="职称名称"
                        width="150">
                </el-table-column>
                <el-table-column
                        prop="titlelevel"
                        label="职称级别">
                </el-table-column>
                <el-table-column
                        prop="createDate"
                        label="创建时间">
                </el-table-column>
                <el-table-column
                        label="是否启用">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.enabled" type="success">已启用</el-tag>
                        <el-tag v-else type="info">未启用</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                                size="mini"
                                @click="showEditView(scope.row)">编辑
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.row)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="danger" size="small" style="margin-top: 10px" :disabled="multipleSelection.length === 0" @click="deleteMany">批量删除</el-button>
        </div>
        <el-dialog
                title="修改职称"
                size="small"
                :visible.sync="dialogVisible"
                width="30%">
            <div>
                <table>
                    <tr>
                        <td>
                            <el-tag>职称名称</el-tag>
                        </td>
                        <td>
                            <el-input size="small" v-model="updateJl.name"></el-input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <el-tag>职称级别</el-tag>
                        </td>
                        <td>
                            <el-input size="small" v-model="updateJl.titleLevel"></el-input>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <el-tag>是否启用</el-tag>
                        </td>
                        <td>
                            <el-switch
                                    v-model="updateJl.enabled"
                                    active-text="启用"
                                    inactive-text="禁用"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949">
                            </el-switch>
                        </td>
                    </tr>
                </table>
            </div>
            <span slot="footer" class="dialog-footer">
    <el-button size="small" @click="dialogVisible = false">取 消</el-button>
    <el-button size="small" type="primary" @click="doUpdate">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "JobLevelMana",
        data() {
            return {
                updateJl: {
                    name: '',
                    titleLevel: '',
                    enabled: false
                },
                dialogVisible: false,
                addjl: {
                    name: '',
                    titleLevel: ''
                },
                jls: [],
                titleLevels: [
                    '正高级',
                    '副高级',
                    '中级',
                    '初级',
                    '员级',
                ],
                multipleSelection: []

            }
        },
        mounted() {
            this.initJls();
        },
        methods: {
            deleteMany() {
                this.$confirm('此操作将永久删除【' +this .multipleSelection.length+ '】条记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids = '?';
                    this.multipleSelection.forEach(item=>{
                        ids += 'ids=' + item.id + '&'
                    });
                    this.deleteRequest("/system/basic/joblevel/many" + ids).then(resp=>{
                        if (resp){
                            this.initJls();
                            this.dialogVisible=false;
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleSelectionChange(val){
                this.multipleSelection = val;
            },
            doUpdate(){
                this.putRequest("/system/basic/joblevel/",this.updateJl).then(resp=>{
                    if (resp){
                        this.initJls();
                        this.dialogVisible = false;
                    }
                })
            },
            showEditView(data) {
                Object.assign(this.updateJl,data);
                this.dialogVisible = true;
            },
            handleDelete(data) {
                this.$confirm('此操作将永久删除该职称, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let deleteId = {id: data.id};
                    this.deleteRequest("/system/basic/joblevel/", deleteId).then(resp => {
                        if (resp) {
                            this.initJls();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            initJls() {
                this.getRequest("/system/basic/joblevel/").then(resp => {
                    if (resp) {
                        this.jls = resp;
                    }
                })
            },
            addJobLevel() {
                if (this.addjl.name && this.addjl.titleLevel) {
                    this.postRequest("/system/basic/joblevel/", this.addjl).then(resp => {
                        if (resp) {
                            this.initJls();
                            this.addjl = {
                                name: '',
                                titleLevel: ''
                            }
                        }
                    })
                } else {
                    this.$message.error("不能包含空值");
                }

            }
        }
    }
</script>

<style scoped>

</style>