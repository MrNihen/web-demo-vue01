<template>
            <v-app>
                <v-navigation-drawer
                        v-model="drawer"
                        app
                        left
                >
                    <v-card
                            max-width="500"
                            class="mx-auto"
                    >
                        <v-toolbar
                                color="indigo"
                                dark
                        >
                            <v-app-bar-nav-icon ></v-app-bar-nav-icon>

                            <v-toolbar-title>后台导航</v-toolbar-title>

                            <v-spacer></v-spacer>

                            <v-btn icon @click.stop="drawer = !drawer">
                                <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn>
                        </v-toolbar>

                        <v-list>
                            <v-list-group
                                    v-for="item in items"
                                    :key="item.title"
                                    v-model="item.active"
                                    :prepend-icon="item.action"
                                    no-action
                            >
                                <template v-slot:activator>
                                    <v-list-item-content>
                                        <v-list-item-title v-text="item.title"></v-list-item-title>
                                    </v-list-item-content>
                                </template>

                                <v-list-item
                                        v-for="subItem in item.items"
                                        :key="subItem.title"
                                        :to="item.path+subItem.path"
                                        :active-class="($route.path == item.path+subItem.path) ? 'v-list-item--active':''"
                                >
                                    <v-list-item-content>
                                        <v-list-item-title v-text="subItem.title" :key="subItem.title"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list-group>
                        </v-list>
                    </v-card>
                </v-navigation-drawer>

                <v-app-bar
                        app
                        color="indigo"
                        dark
                >
                    <v-app-bar-nav-icon  @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                    <v-toolbar-title>前后端开发示例</v-toolbar-title>
                </v-app-bar>

                <v-main style="padding:0">
                    <v-container
                            class="fill-height"
                            fluid
                    >
                        <v-row
                                align="center"
                        >
                            <v-col class="text-center">
                                <template>
                                    <router-view/>
                                </template>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-main>
                <v-footer
                        color="indigo"
                        app
                >
                    <v-spacer></v-spacer>
                    <span class="white--text">泽林教育 &copy; {{ new Date().getFullYear() }}</span>
                </v-footer>
            </v-app>

</template>

<script>

    export default {
        name: "Layout",
        data(){
            return {
                drawer:true,
                items: [
                    {
                        action: 'mdi-home',
                        title: '后台首页',
                        path:'/',
                        items: [
                            { title: '首页' ,path:'index'},
                        ],
                    },
                    {
                        action: 'mdi-account-circle',
                        title: '学生管理',
                        active: true,
                        path:'/student',
                        items: [
                            { title: '学生列表',path:'/list' },
                            { title: '学生添加' ,path:'/add'},
                            { title: '学生修改',path:'/update' },
                        ],
                    },
                    {
                        action: 'mdi-school',
                        title: '班级管理',
                        path:'/classes',
                        items: [
                            { title: '班级列表' ,path:'/list'},
                        ],
                    },
                ],
            }
        },
        created() {

        },
        methods: {
            revDrawer(){
                this.drawer = !this.drawer;
            }
        },
        watch: {     //监听当前路由的变化，如果变化让对应菜单项自动打开
            $route(to, from) {
                console.log(to.path);
                for (let i in this.items) {
                    let item = this.items[i];
                    for (let j in item.items) {
                        let sub = this.items[i].items[j];
                        if (item.path + sub.path == to.path) {
                            //console.log(item.path + sub.path);
                            item.active = true;
                            return;
                        }
                    }
                }
            },
            drawer(n,o){
                console.log("new:" + n + ",old:" + o);
            }
        }
    }
</script>

<style scoped>
    element.style{
        padding:0 !important;
    }
    main.v-main{
        padding:0 !important;
    }
</style>