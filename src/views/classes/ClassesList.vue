<template>
    <v-app>
        <v-main>
            <v-data-table :headers="headers" :items="classess" sort-by="calories" class="elevation-1">
                <template v-slot:top>
                    <v-toolbar flat>
                        <v-toolbar-title>班级展示</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="dialog" max-width="500px">
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">添加班级</v-btn>
                            </template>
                            <v-card>
                                <v-card-title><span class="text-h5">{{ formTitle }}</span></v-card-title>
                                <v-card-text>
                                    <v-container>
                                        <v-row>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="classes.cid"
                                                              label="Dessert name"></v-text-field>
                                            </v-col>
                                            <v-col cols="12" sm="6" md="4">
                                                <v-text-field v-model="classes.cname"
                                                              label="Calories"></v-text-field>
                                            </v-col>
                                        </v-row>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="close">取消</v-btn>
                                    <v-btn color="blue darken-1" text @click="save">保存</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                    <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                    <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
                </template>
                <template v-slot:no-data>
                    <v-btn color="primary" @click="findClasses">重置</v-btn>
                </template>
            </v-data-table>
        </v-main>
    </v-app>
</template>
<script> export default {
    name: 'ClassesList',
    data: () => ({
        dialog: false,
        dialogDelete: false,
        headers: [{
            text: '班级编号',
            align: 'start',
            sortable: false,
            value: 'cid',
        },
            { text: '班级名称', value: 'cname' },
            { text: '操作', value: 'actions', sortable: false },
        ],
        classess: [],
        editedIndex: -1,
        classes: {
            cid:0,
            cname: '',

        },
        defaultItem: {
            cid:0,
            cname: '',
        },
        desserts: [],
        editedIndex: -1,
        editedItem: {
            cid:0,
            cname: '',},
        defaultItem: {
            cid:0,
            cname: '',},
    }),
    computed: {
        formTitle() {
            return this.editedIndex === -1 ? '新建班级' : '修改班级'
        },
    },
    watch: {
        dialog(val) {
            val || this.close()
        },
        dialogDelete(val) {
            val || this.closeDelete()
        },
    },
    created() {
        this.findClasses();
    },
    methods: {

            //1.查询学生列表
        findClasses(){
                this.axios.get("classes/list").then(response=>{
                    this.classess = response.data.data;
                })
            },
            editItem (item) {
                this.editedIndex = this.classess.indexOf(item)
                this.classes = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem (item) {
                const index = this.classess.indexOf(item)
                confirm('你确定要删除它吗?') && this.classess.splice(index, 1)
            },

            close () {
                this.dialog = false
                this.$nextTick(() => {
                    this.classes = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
            },

            save () {
                if (this.editedIndex > -1) {
                    Object.assign(this.classess[this.editedIndex], this.editedItem)
                } else {
                    this.classess.push(this.editedItem)
                }
                this.close()
            },

    }
}</script>
<style scoped></style>
