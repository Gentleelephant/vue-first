<template>
  <div id="uesrtext">
    <textarea placeholder="按 Ctrl + Enter 发送" v-model="content" v-on:keyup="addMessage"></textarea>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import '../../utils/stomp'
import '../../utils/sockjs'


export default {
  name: 'uesrtext',
  data () {
    return {
      content:''
    }
  },
  methods: {
  	addMessage (e) {
  		if (e.ctrlKey && e.keyCode ===13 && this.content.length) {
  		  let msgObj = {};
  		  msgObj.to = 'libai';
  		  msgObj.content = this.content;
  		  this.$store.state.stomp.send('/ws/chat',{},msgObj);
          this.$store.commit('addMessage',this.content);
          this.content='';
  		}
  	}
  }
}
</script>

<style lang="scss" scoped>
#uesrtext {
	position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 30%;
  border-top: solid 1px #DDD;
  > textarea {
  	padding: 10px;
  	width: 100%;
  	height: 100%;
  	border: none;
  	outline: none;
  }
}
</style>
