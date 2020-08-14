<template>
    <div>
        <el-form :rules="rules"
                 ref="loginForm"
                 :model="loginForm"
                 v-loading="loading"
                 class="loginContainer">  <!--ref相当于一个名字-->
            <h3 class="loginTitle">系统登陆</h3>
            <el-form-item prop="username">
                <el-input type="text" v-model="loginForm.username" auto-complete="off" placeholder="username"/>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="loginForm.password" auto-complete="off"
                          placeholder="password">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button round type="primary" style="width: 100%" @click="submitLogin">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

    export default {
        name: "Login",
        data: function () {
            return {
                loading: false,

                loginForm: {
                    username: 'admin',
                    password: '123'
                },

                /*用户名和密码的校规则表*/
                rules: {
                    username: [{required: true, message: '请输入用户名', trigger: 'blur'}],
                    password: [{required: true, message: '请输入密码', trigger: 'blur'}]
                }
            }
        },
        methods: {
            submitLogin() {
                this.$refs['loginForm'].validate((valid) => {
                    if (valid) {
                        this.loading = true;
                        this.postKeyValueRequest('/doLogin', this.loginForm).then(resp => {
                            this.loading = false;
                            if (resp) {
                                // 把登录成功的数据进行保存
                                window.sessionStorage.setItem("user", JSON.stringify(resp.obj));
                                let path = this.$route.query.redirect;
                                // 登陆后跳转到用户刚才没登陆时输入的地址
                                this.$router.replace((path === '/' || path === undefined) ? '/home' : path);
                            }
                        })

                    } else {
                        this.$message.error("请输入所有字段");
                    }
                });
            }
        }
    }
</script>

<style>
    .loginContainer {
        border-radius: 24px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 25px 25px 15px 15px; /*上 右 下 左*/
        background-color: aliceblue;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6; /*加阴影*/
    }

    .loginTitle {
        color: black;
        text-align: center;
        margin: 10px auto 20px auto;
    }

</style>