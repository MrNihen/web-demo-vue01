
<template>
    <v-app>

      <main>
        <v-data-table
                :headers="headers"
                :items="students"
                sort-by="calories"
                class="elevation-1"
                style="width:100%"
        >
            <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-toolbar-title>学生展示</v-toolbar-title>
                    <v-divider
                            class="mx-4"
                            inset
                            vertical
                    ></v-divider>

                    <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                    color="primary"
                                    dark
                                    class="mb-2"
                                    v-bind="attrs"
                                    v-on="on"
                            >添加学生</v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="headline">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="student.sname" label="姓名"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="student.sex" label="性别"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="student.age" label="年龄"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="student.addr" label="住址"></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="student.cid" label="班级"></v-text-field>
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
                <v-icon
                        small
                        class="mr-2"
                        @click="editItem(item)"
                >
                    mdi-pencil
                </v-icon>
                <v-icon
                        small
                        @click="deleteItem(item)"
                >
                    mdi-delete
                </v-icon>
            </template>
            <template v-slot:no-data>
                <v-btn color="primary" @click="findStudents">重置</v-btn>
            </template>
        </v-data-table>
      </main>
    </v-app>
</template>

<script>
    export default {
        name:'StudentList',
        data: () => ({
            dialog: false,
            headers: [
                {
                    text: '学号',
                    align: 'start',
                    sortable: false,
                    value: 'sid',
                },
                { text: '姓名', value: 'sname' },
                { text: '性别', value: 'sex' },
                { text: '年龄', value: 'age' },
                { text: '住址', value: 'addr' },
                { text: '所在班级', value: 'cname' },
                { text: '操作', value: 'actions', sortable: false },
            ],
            students: [],
            editedIndex: -1,
            student: {
                sname: '',
                sex: '',
                age: 0,
                addr: '',
                cid: 0,
            },
            defaultItem: {
                sname: '',
                sex: '',
                age: 0,
                addr: '',
                cid: 0,
            },
        }),

        computed: {
            formTitle () {
                return this.editedIndex === -1 ? '新建' : '编辑'
            },
        },

        watch: {
            dialog (val) {
                val || this.close()
            },
        },

        created () {
            //1.查询所有学生
            this.findStudents();
        },
        methods: {
            //1.查询学生列表
            findStudents(){
                this.axios.get("student/list").then(response=>{
                    this.students = response.data.data;
                })
            },
            editItem (item) {
                this.editedIndex = this.students.indexOf(item)
                this.student = Object.assign({}, item)
                this.dialog = true
            },

            deleteItem (item) {
                const index = this.students.indexOf(item)
                confirm('Are you sure you want to delete this item?') && this.students.splice(index, 1)
            },

            close () {
                this.dialog = false
                this.$nextTick(() => {
                    this.student = Object.assign({}, this.defaultItem)
                    this.editedIndex = -1
                })
            },

            save () {
                if (this.editedIndex > -1) {
                    Object.assign(this.students[this.editedIndex], this.editedItem)
                } else {
                    this.students.push(this.editedItem)
                }
                this.close()
            },
        },
    }
</script>

<style scoped>

</style>


