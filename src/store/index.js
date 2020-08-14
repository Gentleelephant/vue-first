import Vue from 'vue'
import Vuex from 'vuex';
import {getRequest} from "@/utils/api";
import "../utils/stomp"
import "../utils/sockjs"

Vue.use(Vuex);
const now = new Date();

const store = new Vuex.Store({
    state:{
        routes:[],
        sessions:[],
        hrs: [],
        currentSessionId: -1,
        filterKey:'',
        stomp: null
    },
    mutations:{
        // 到时候使用不用传state，只需要传data
        initRoutes(state,data){
            state.routes = data;
        },
        changeCurrentSessionId (state,id) {
            state.currentSessionId = id;
        },
        addMessage (state,msg) {
            state.sessions[state.currentSessionId-1].messages.push({
                content:msg,
                date: new Date(),
                self:true
            })
        },
        INIT_DATA (state) {
            // TODO 浏览器本地的历史聊天记录
            // let data = localStorage.getItem('vue-chat-session');
            // //console.log(data)
            // if (data) {
            //     state.sessions = JSON.parse(data);
            // }
        },
        INIT_HR(state,data){
            state.hrs = data;
        }
    },
    actions:{
        // websocket连接
        connect (context) {
              context.state.stomp = Stomp.over(new SockJS());
              context.state.stomp.connect({},success=>{
                  context.state.stomp.subscribe('/user/queue/chat',msg=>{
                      console.log("AAAAAAA"+msg.body);
                  })
              }),error=>{

              }
        },
        initData (context) {
            context.commit('INIT_DATA');
            getRequest("/chat/hrs").then(resp=>{
                if (resp){
                    context.commit('INIT_HR',resp);
                }
            })
        }
    }
});


store.watch(function (state) {
    return state.sessions
},function (val) {
    console.log('CHANGE: ', val);
    localStorage.setItem('vue-chat-session', JSON.stringify(val));
},{
    deep:true/*这个貌似是开启watch监测的判断,官方说明也比较模糊*/
});


export default store;