<template>
    <v-app>

<!--        mx-auto : 就是这玩意儿搞了半天，加这个颜色不生效-->
        <v-card
            class="overflow-hidden"
            height="400"
    >
        <v-app-bar
                color="deep-purple"
                dark
        >
            <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

            <v-toolbar-title>Title</v-toolbar-title>
        </v-app-bar>

        <v-navigation-drawer
                v-model="drawer"
                absolute
                temporary
        >
<!--开始-->
                <v-card
                        class="mx-auto"
                        width="300"
                >
                    <v-list>
                        <v-list-item>
                            <v-list-item-icon>
                                <v-icon>mdi-home</v-icon>
                            </v-list-item-icon>

                            <v-list-item-title>Home</v-list-item-title>
                        </v-list-item>

                        <v-list-group
                                :value="true"
                                prepend-icon="mdi-account-circle"
                        >
                            <template v-slot:activator>
                                <v-list-item-title>Users</v-list-item-title>
                            </template>

                            <v-list-group
                                    :value="true"
                                    no-action
                                    sub-group
                            >
                                <template v-slot:activator>
                                    <v-list-item-content>
                                        <v-list-item-title>Admin</v-list-item-title>
                                    </v-list-item-content>
                                </template>

                                <v-list-item
                                        v-for="([title, icon], i) in admins"
                                        :key="i"
                                        link
                                >
                                    <v-list-item-title v-text="title"></v-list-item-title>

                                    <v-list-item-icon>
                                        <v-icon v-text="icon"></v-icon>
                                    </v-list-item-icon>
                                </v-list-item>
                            </v-list-group>

                            <v-list-group
                                    no-action
                                    sub-group
                            >
                                <template v-slot:activator>
                                    <v-list-item-content>
                                        <v-list-item-title>Actions</v-list-item-title>
                                    </v-list-item-content>
                                </template>

                                <v-list-item
                                        v-for="([title, icon], i) in cruds"
                                        :key="i"
                                        link
                                >
                                    <v-list-item-title v-text="title"></v-list-item-title>

                                    <v-list-item-icon>
                                        <v-icon v-text="icon"></v-icon>
                                    </v-list-item-icon>
                                </v-list-item>
                            </v-list-group>
                        </v-list-group>
                    </v-list>
                </v-card>
        </v-navigation-drawer>
    </v-card>
    </v-app>
</template>

<script>
    export default {
        data: () => ({
            drawer: false,
            group: null,
            admins: [
                ['Management', 'mdi-account-multiple-outline'],
                ['Settings', 'mdi-cog-outline'],
            ],
            cruds: [
                ['Create', 'mdi-plus-outline'],
                ['Read', 'mdi-file-outline'],
                ['Update', 'mdi-update'],
                ['Delete', 'mdi-delete'],
            ],
        }),
    }
</script>

<style scoped>

</style>