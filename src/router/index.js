import Vue from 'vue'
import VueRouter from 'vue-router'
const Layout = () => import('../components/Layout')
const Index = () => import('../views/Index');
const StudentList = () => import('../views/student/StudentList')
const StudentUpdate = () => import('../views/student/StudentUpdate')
const StudentAdd = () => import('../views/student/StudentAdd')
const ClassesList = () => import('../views/classes/ClassesList')

Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    component:Layout,
    redirect: 'index',
  },
  {
    path: '/index',
    component: Index
  },
  {
    path: '/student/list',
    component: StudentList,
  },
  {
    path: '/student/add',
    component: StudentAdd,
  },
  {
    path: '/student/update',
    component: StudentUpdate,
  },
  {
    path: '/classes/list',
    component: ClassesList,
  },
]

const router = new VueRouter({
  routes
})

export default router
