import Vue from "vue";
import 'element-ui/lib/theme-chalk/index.css'
import {Input,Scrollbar,Message,Notification} from 'element-ui'

Vue.prototype.$message=Message
Vue.prototype.$notify=Notification

Vue.use(Input)
Vue.use(Scrollbar)
