import Vue from "vue";
import Router from "vue-router";
import Login from "@/views/Login";
import Home from "@/views/Home";
// import Test1 from "@/views/Test1";
// import Test2 from "@/views/Test2";
import FriendChat from "@/views/chat/FriendChat"
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login,
            hidden: true
        },
        {
            path: '/home',
            name: 'Home',
            component: Home,
            hidden: true,
            meta: {
                roles:['admin','user']
            },
            children: [
                {
                    path: '/chat',
                    name: '在线聊天',
                    component: FriendChat,
                    hidden:true
                }
            ]
        }
        // {
        //     path: '/home',
        //     name: '导航一',
        //     component: Home,
        //     /*嵌套路由*/
        //     children: [
        //         {
        //             path: '/test1',
        //             name: '选项一',
        //             component: Test1
        //         },
        //         {
        //             path: '/test2',
        //             name: '选项二',
        //             component: Test2
        //         }
        //     ]
        // }
    ]
})
