<template>
    <div>
        <el-container>
            <el-header class="homeHeader">
                <div class="title">项目</div>
                <div>
                    <el-button icon="el-icon-bell" type="text" style="margin-right: 8px;color: yellow" size="normal" @click="goChat"></el-button>
                    <el-dropdown class="userInfo" @command="commandHandler">
                      <span class="el-dropdown-link">
                          <!--获得用户名-->
                        {{user.name}}
                          <i>
                              <!--头像-->
                              <img v-bind:src="user.userface" alt="">
                          </i>
                      </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="userinfo">个人中心</el-dropdown-item>
                            <el-dropdown-item command="setting">设置</el-dropdown-item>
                            <!--                        <el-dropdown-item disabled>双皮奶</el-dropdown-item>   &lt;!&ndash;禁用&ndash;&gt;-->
                            <el-dropdown-item divided command="logout">注销</el-dropdown-item>    <!--分割线-->
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-header>
            <el-container>
                <!--左边导航栏-->
                <el-aside width="200px">
                    <el-menu router v-for="(item,index) in routes" :key="index">
                        <el-submenu index="index" v-if="!item.hidden">
                            <template slot="title" v-if="!item.hidden">
                                <i style="color: yellowgreen;margin-right: 5px" :class="item.iconCls"></i>
                                <span>{{item.name}}</span>
                            </template>
                                <el-menu-item :index="child.path" v-for="(child,indexj) in item.children" :key="indexj">{{child.name}}</el-menu-item>
                                <!--<el-menu-item index="/test2">选项2</el-menu-item>-->
                            </el-submenu>
                    </el-menu>
                </el-aside>
                <!--左边导航栏的视图跳转-->
                <el-main>
                    <!--面包屑-->
                    <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path!=='/home'">
                        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
                    </el-breadcrumb>
                    <div class="homeWelcome" v-if="this.$router.currentRoute.path==='/home'">
                        欢迎来到微人事
                    </div>
                    <router-view class="homeRouterView"/>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return{
                user :JSON.parse(window.sessionStorage.getItem("user"))
            }
        },

        computed:{
            routes(){
                // console.log(this.$store.state.routes);
                return this.$store.state.routes;
            }
        },

        methods: {
            goChat(){
                this.$router.push("/chat");
            },

            // menuClick(index){
            //     // console.log(index);
            //     // console.log(indexpath);
            //
            //     this.$router.push(index);
            //
            // },

            commandHandler(cmd){
                if (cmd==='logout'){
                    this.$confirm('此操作将注销登录, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        this.getRequest("/logout");            // 发送注销请求
                        window.sessionStorage.removeItem("user");  // 删除存储的用户信息
                        this.$store.commit('initRoutes',[]);    // 删除用户的信息
                        this.$router.replace("/");

                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消操作'
                        });
                    });
                }
            }

        }
    }
</script>

<style>

    .homeRouterView {
        margin-top: 10px;
    }

    .homeHeader {
        background-color: olivedrab;
        display: flex;
        align-items: center; /*竖直居中*/
        justify-content: space-between;
        padding: 0px 15px;
        box-sizing: border-box;
    }

    .homeHeader .title {
        font-size: 30px;
        font-family: 华文行楷;
        color: #ffffff;
    }

    .homeHeader .userInfo{
        /*边指针为手指*/
        cursor: pointer;
    }

    .homeHeader .el-dropdown-link img{
        width: 48px;
        height: 48px;
        border-radius: 24px;
        margin-left: 8px;
    }

    .homeHeader .el-dropdown-link{
        display: flex;
        align-items: center;
    }

    .homeWelcome{
        text-align: center;
        font-size: 30px;
        font-family: 华文行楷;
        color: yellowgreen;
        padding-top: 50px;;
    }

</style>