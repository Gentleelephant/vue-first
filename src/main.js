import Vue from 'vue'
import App from './App.vue'
import ElementUI, {Message} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import router from './router';
import store from './store';
import {deleteRequest, getRequest, postKeyValueRequest, postRequest, putRequest} from "@/utils/api";
import {initMenu} from "@/utils/menus";
import 'font-awesome/css/font-awesome.min.css'
Vue.config.productionTip = false;

// size:'mini'  设置控件全局为mini
Vue.use(ElementUI);

// 路由守卫,防止用户在其他页面刷新之后不会再次调用initMenu方法导致导航栏消失,如果没有登陆则跳转到登陆页面
router.beforeEach((to, from, next) => {

    if (to.path==='/'){
        next();
    }else {
        // 如果sessionStorage中存入了用户信息说明已经登录可以往下走，否则跳转到登陆页面
        if(window.sessionStorage.getItem("user")){
            initMenu(router,store);
            next();
        }else{
            // 实现了如果用户输入某个地址，访问时没有权限，然后跳转到登录页登录之后跳转到刚才用户想要访问的页面
            Message.error("请登录再访问！");
            next('/?redirect=' + to.path);  // 重定向
        }

    }
});

// 制作插件
Vue.prototype.postRequest=postRequest;
Vue.prototype.getRequest=getRequest;
Vue.prototype.deleteRequest=deleteRequest;
Vue.prototype.postKeyValueRequest=postKeyValueRequest;
Vue.prototype.putRequest=putRequest;


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
