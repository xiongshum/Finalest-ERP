import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
const index = () =>import(/* webpackChunkName: "group-index" */'../components/index')
// 登录
const login = () =>import('../components/login')
// 注册
const register = () =>import('../components/register')
// 404
const page404 = () =>import('../components/page404')
// home
const home = () =>import(/* webpackChunkName: "group-index" */'../components/home/home')

const shortData = () =>import('../components/dataTemplate/shortData')
const midData = () =>import('../components/dataTemplate/midData')
const longData = () =>import('../components/dataTemplate/longData')

const repository = () =>import('../components/wareHouse/repository')
const repositoryList = () =>import('../components/wareHouse/repositoryList')
const repositoryData = () =>import('../components/wareHouse/repositoryData')
const repositoryModify = () =>import('../components/wareHouse/repositoryModify')

const supplierEdit = () =>import('../components/supplierData/supplierEdit')
const goodsData = () =>import('../components/goodsData/goodsData')
const storeData = () =>import('../components/storeInformation/storeData')
const storeBasicInfor = () =>import('../components/storeInformation/storeBasicInfor')

const customer = () =>import(/* webpackChunkName: "group-customer" */'../components/customerInfor/customer')
const customerList = () =>import(/* webpackChunkName: "group-customer" */'../components/customerInfor/customerList')
const customerDetail = () =>import('../components/customerInfor/customerDetail')
const customerModify = () =>import('../components/customerInfor/customerModify')

//采购管理
const order = () =>import(/* webpackChunkName: "group-order" */'../components/purchaseOrder/order')
const orderDetails = () =>import('../components/purchaseOrder/orderDetails')
const orderList = () =>import(/* webpackChunkName: "group-order" */'../components/purchaseOrder/orderList')

const supplierList = () =>import('../components/supplierData/supplierList')
const userInfoDetail = () =>import('../components/user/userInfoDetail')
const userList = () =>import('../components/user/userList')
const userDataList = () =>import('../components/user/userDataList')

const tenantManagement = () =>import('../components/tenantManagement/tenantManagement')
const tenantManagementAdd = () =>import('../components/tenantManagement/tenantManagementAdd')
//集团管理
const groupManage = () =>import(/* webpackChunkName: "group-group" */'../components/groupManage/groupManage')
const groupManageList = () =>import(/* webpackChunkName: "group-group" */'../components/groupManage/groupManageList')
//组织管理
const OuManage = () =>import(/* webpackChunkName: "group-manage" */'../components/groupManage/OuManage')
const OuManageList = () =>import(/* webpackChunkName: "group-manage" */'../components/groupManage/OuManageList')
const OuManageDetail = () =>import('../components/groupManage/OuManageDetail')
const OuManageModify = () =>import('../components/groupManage/OuManageModify')
const OuManageSee = () =>import('../components/groupManage/OuManageSee')
// 2.0单据模板
const bill = () =>import(/* webpackChunkName: "group-bill" */'../components/template2.0/bill')
const billDetails = () =>import('../components/template2.0/billDetails')
const billList = () =>import(/* webpackChunkName: "group-bill" */'../components/template2.0/billList')
// 菜单管理
const menu = () =>import(/* webpackChunkName: "group-menu" */'../components/menu/menu')
const menuDetail = () =>import('../components/menu/menuDetail')
const menuList = () =>import(/* webpackChunkName: "group-menu" */'../components/menu/menuList')
const addLangulage = () =>import('../components/menu/addLangulage')

Vue.use(Router)
const routes = [
  { path: '*', component: page404},
  { path: '/', redirect: '/login' },
  { path: '/login', component: login,name:'login' },
  { path: '/register', component: register,name:'register' },
  { path: '/index', component: index,name:'index',
  beforeEnter: (to, from, next) => {//如果未登录,index路由包括其子路由会自动跳转/login
    store.commit('username');    
    if(store.state.username!=null){
      if(store.state.username.length>1){//多账号登录
        window.localStorage.clear();
        let flag=false;
        let x='';
        let names=[];
        for(let i=0;i<store.state.username.length;i++){
            let name=store.state.username[i].name;
            console.log(name)
            names.push(name);
          }
        if(store.state.alerts){
           x=prompt("当前登录"+names.length+"个账号,分别是："+names.join(',')+"请输入您将要登录的账号或者关闭浏览器重新登录或者注销账号重新登录");
        }
        if(x!=null && x!=""){
          let token='';
          let username='';
          for(let e=0;e<store.state.username.length;e++){
              let name=store.state.username[e].name;
              if(x==name){//vuex里面存在用户名和sessionStorage里面key值相等
                token=store.state.username[e].accessToken;
                username=name;
                flag=true;
                break;
              }else{
                flag=false;
              }
          }
          if(flag){
            store.state.alerts=false;
            store.state.name=x;
            store.state.accessToken=token;
            next();
          }else{
            store.state.alerts=true;
            alert('用户名错误');
            next('/login')
          }
        }else{
          alert('用户名不能为空');
        }
      }else if(store.state.username.length==1){
        store.state.name=store.state.username[0].name;
        store.state.accessToken=store.state.username[0].accessToken;
        next();
      }else{
        next('/login')
      }
    }else{
      next('/login')
    }
  },
children:[
  { path: '/home', component: home,name:'home' },
  { path: '/shortData', component: shortData,name:'shortData' },
  { path: '/longData', component: longData,name:'longData' },
  { path: '/midData', component: midData,name:'midData' },
  { path: '/repository', component: repository,name:'repository',redirect: function(){//仓库管理
    let name='repository';
    let activeRouter=store.state.activeRouter;
    for(let i=0;i<activeRouter.length;i++){
        if(activeRouter[i].name==name){
          return activeRouter[i].url;
          break;
        }
    }
  }
  ,children:[
      { path: '/repository/repositoryList/:id', component: repositoryList,name:'repositoryList' },
      { path: '/repository/repositoryData/:id', component: repositoryData,name:'repositoryData' }, 
      { path: '/repository/repositoryModify/:id', component: repositoryModify,name:'repositoryModify' },
  ]},
  { path: '/supplierEdit/:id', component: supplierEdit,name:'supplierEdit'},
  { path: '/goodsData/:id', component: goodsData,name:'goodsData' },
  { path: '/storeData/:id', component: storeData,name:'storeData' },
  { path: '/storeBasicInfor/:id', component: storeBasicInfor,name:'storeBasicInfor' },

  { path: '/customer', component: customer,name:'customer',redirect: function(){//客户管理
    let name='customer';
    let activeRouter=store.state.activeRouter;
    for(let i=0;i<activeRouter.length;i++){
        if(activeRouter[i].name==name){
          return activeRouter[i].url;
          break;
        }
    }
  },children:[  
      { path: '/customer/customerList/:id', component: customerList,name:'customerList' },
      { path: '/customer/customerDetail/:id', component: customerDetail,name:'customerDetail' },
      { path: '/customer/customerModify/:id', component: customerModify,name:'customerModify' },
  ]},

  { path: '/order', component: order,name:'order',redirect: function(){//采购管理
    let name='order';
    let activeRouter=store.state.activeRouter;
    for(let i=0;i<activeRouter.length;i++){
        if(activeRouter[i].name==name){
          return activeRouter[i].url;
          break;
        }
    }
  },children:[
      { path: '/order/orderDetails/:id', component: orderDetails,name:'orderDetails' },
      { path: '/order/orderList/:id', component: orderList,name:'orderList' },
  ]},

  { path: '/bill', component: bill,name:'bill',redirect: function(){//单据开单模板
    let name='bill';
    let activeRouter=store.state.activeRouter;
    for(let i=0;i<activeRouter.length;i++){
        if(activeRouter[i].name==name){
          return activeRouter[i].url;
          break;
        }
    }
  },children:[
      { path: '/bill/billDetails/:id', component: billDetails,name:'billDetails' },
      { path: '/bill/billList/:id', component: billList,name:'billList' },
  ]},
  { path: '/groupManage', component: groupManage,name:'groupManage',redirect: function(){//集团管理
    let name='groupManage';
    let activeRouter=store.state.activeRouter;
    for(let i=0;i<activeRouter.length;i++){
        if(activeRouter[i].name==name){
          return activeRouter[i].url;
          break;
        }
    }
  },children:[
      { path: '/groupManage/groupManageList/:id', component: groupManageList,name:'groupManageList' },
  ]},
  { path: '/OuManage', component: OuManage,name:'OuManage',redirect: function(){//组织管理
    let name='OuManage';
    let activeRouter=store.state.activeRouter;
    for(let i=0;i<activeRouter.length;i++){
        if(activeRouter[i].name==name){
          return activeRouter[i].url;
          break;
        }
    }
  },children:[
      { path: '/OuManage/OuManageSee/:id', component: OuManageSee,name:'OuManageSee' },
      { path: '/OuManage/OuManageModify/:id', component: OuManageModify,name:'OuManageModify' },
      { path: '/OuManage/OuManageDetail/:id', component: OuManageDetail,name:'OuManageDetail' },
      { path: '/OuManage/OuManageList/:id', component: OuManageList,name:'OuManageList' },
  ]},
  { path: '/menu', component: menu,name:'menu',redirect: function(){//菜单管理
    let name='menu';
    let activeRouter=store.state.activeRouter;
    for(let i=0;i<activeRouter.length;i++){
        if(activeRouter[i].name==name){
          return activeRouter[i].url;
          break;
        }
    }
  },children:[
      { path: '/menu/menuDetail/:id', component: menuDetail,name:'menuDetail' },
      { path: '/menu/menuList/:id', component: menuList,name:'menuList' },
      { path: '/menu/addLangulage/:id', component: addLangulage,name:'addLangulage' },
  ]},
  { path: '/supplierList/:id', component: supplierList,name:'supplierList' },
  { path: '/userInfoDetail/:id', component: userInfoDetail,name:'userInfoDetail' },
  { path: '/userList/:id', component: userList,name:'userList' },
  { path: '/userDataList/:id', component: userDataList,name:'userDataList' },
  { path: '/tenantManagement/:id', component: tenantManagement,name:'tenantManagement' },
  { path: '/tenantManagementAdd/:id', component: tenantManagementAdd,name:'tenantManagementAdd' },
]}
]
const  router=new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes
})
router.beforeEach((to, from, next) => {
 
  store.commit('slidbarData');
  if(from.name=='login'){//如果用户登录，清楚缓存
    store.state.Alive=false;
  }else{
    store.state.Alive=true;
  } 
    
  let ActiveRouter=store.state.ActiveRouter
  if(store.accessToken!=''){
    document.title = to.name
    let activeRouter=store.state.activeRouter;
    let parent='';
    let url='';
    for(let i=0;i<activeRouter.length;i++){
        if(activeRouter[i].name==to.name){
          parent=activeRouter[i].parent;
          url=activeRouter[i].url;
          break
        }
    }
    for(let i=0;i<activeRouter.length;i++){
      if(activeRouter[i].name==parent){
        activeRouter[i].url=url
        break
      }
  }
    
    // if(to.name=='orderDetails'){
    //   store.state.ActiveRouter.order='/order/orderDetails/:id';
    // }else if(to.name=='orderList'){
    //   store.state.ActiveRouter.order='/order/orderList/:id';
    // }
    // else if(to.name=='OuManageDetail'){
    //   store.state.ActiveRouter.OuManage='/OuManage/OuManageDetail/:id';
    // }else if(to.name=='OuManageModify'){
    //   store.state.ActiveRouter.OuManage='/OuManage/OuManageModify/:id';
    // }else if(to.name=='OuManageSee'){
    //   store.state.ActiveRouter.OuManage='/OuManage/OuManageSee/:id';
    // }else if(to.name=='OuManageList'){
    //   store.state.ActiveRouter.OuManage='/OuManage/OuManageList/:id';
    // }
    // else if(to.name=='repositoryList'){
    //   store.state.ActiveRouter.repository='/repository/repositoryList/:id'
    // }else if(to.name=='repositoryData'){
    //   store.state.ActiveRouter.repository='/repository/repositoryData/:id'
    // }else if(to.name=='repositoryModify'){
    //   store.state.ActiveRouter.repository='/repository/repositoryModify/:id'
    // }else if(to.name=='customerList'){
    //   store.state.ActiveRouter.customer='/customer/customerList/:id'
    // }else if(to.name=='customerDetail'){
    //   store.state.ActiveRouter.customer='/customer/customerDetail/:id'
    // }else if(to.name=='billDetails'){
    //   store.state.ActiveRouter.bill='/bill/billDetails/:id'
    // }else if(to.name=='billList'){
    //   store.state.ActiveRouter.bill='/bill/billList/:id'
    // }else if(to.name=='menuDetail'){
    //   store.state.ActiveRouter.menu='/menu/menuDetail/:id'
    // }else if(to.name=='menuList'){
    //   store.state.ActiveRouter.menu='/menu/menuList/:id'
    // }else if(to.name=='addLangulage'){
    //   store.state.ActiveRouter.menu='/menu/addLangulage/:id'
    // }else if(to.name=='groupManageList'){
    //   store.state.ActiveRouter.groupManage='/groupManage/groupManageList/:id'
    // }
    
  } 
   next()
})
export default router
