<template>
    <div>
        <div class="permissManaTool">
            <el-input size="small" placeholder="请输入角色英文名" v-model="role.name">
                <template slot="prepend">ROLE_</template>
            </el-input>
            <el-input size="small" placeholder="请输入角色中文名" v-model="role.nameZh">
            </el-input>
            <el-button type="primary" size="small" icon="el-icon-plus">添加角色</el-button>
        </div>

        <div class="permissManaMain">
            <el-collapse accordion @change="change">
                <el-collapse-item :title="r.nameZh" :name="r.id" v-for="(r,index) in roles" :key="index">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>可访问的资源</span>
                            <el-button style="float: right; padding: 3px 0;color: red" type="text"
                                       icon="el-icon-delete"></el-button>
                        </div>
                        <div>
                            <el-tree
                                    show-checkbox
                                    node-key="id"
                                    ref="tree"
                                    :default-checked-keys="selectedMenus"
                                    :data="allMenus" :props="defaultProps">
                            </el-tree>
                            <div style="display: flex;justify-content: flex-end">
                                <el-button >取消修改</el-button>
                                <el-button type="primary" @click="doUpdate(r.id,index)">确认修改</el-button>
                            </div>
                        </div>
                    </el-card>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PermissMana",
        data() {
            return {
                activeName: '2',
                role: {
                    name: '',
                    nameZh: ''
                },
                roles: [],
                selectedMenus: [],
                allMenus: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                }
            }
        },
        mounted() {
            this.initRoles();
        },
        methods: {

            doUpdate(rid,index){
                console.log(rid);
                let tree = this.$refs[tree][index];
                let selectedKeys = tree.getCheckedKeys(true);
                console.log(selectedKeys);
            },

            initSelectedMenus(rid){
                this.getRequest("/system/basic/permiss/mids/" + rid).then(resp=>{
                    if (resp){
                        this.selectedMenus = resp;
                    }
                })
            },

            change(rid) {
                if (rid) {
                    this.initAllMenus();
                    this.initSelectedMenus(rid);
                }
            },
            initAllMenus() {
                this.getRequest("/system/basic/permiss/meuns").then(resp => {
                    if (resp) {
                        this.allMenus = resp;
                    }
                })
            },
            initRoles() {
                this.getRequest("/system/basic/permiss/").then(resp => {
                    if (resp) {
                        this.roles = resp;
                    }
                })
            }
        }
    }
</script>

<style>
    .permissManaTool {
        display: flex;
        justify-content: flex-start;
    }

    .permissManaTool .el-input {
        width: 300px;
        margin-right: 10px;

    }

    .permissManaMain {
        margin-top: 10px;
        width: 800px
    }
</style>