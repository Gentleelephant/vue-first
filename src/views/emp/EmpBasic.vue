<template>
    <div>
        <div style="display: flex;justify-content: space-between">
            <div>
                <el-input placeholder="请输入员工名进行搜索,可以直接回车..." size="small" prefix-icon="el-icon-search"
                          v-model="search"
                          style="width: 300px;margin-right: 10px"></el-input>
                <el-button icon="el-icon-search" type="primary" size="small" style="margin-right: 5px">搜索</el-button>
<!--                <el-button type="primary" size="small" @click="showAdvanceSearchView = !showAdvanceSearchView">-->
<!--                    <i class="fa fa-angle-double-down" aria-hidden="true"></i>-->
<!--                    高级搜索-->
<!--                </el-button>-->
            </div>
            <div>
                <el-upload
                        class="upload-demo"
                        :show-file-list="false"
                        :before-upload="beforeUpload"
                        :on-success="onSuccess"
                        :on-error="onError"
                        :disabled="importDataDisable"
                        style="display: inline-flex;margin-right: 5px"
                        action="/emp/basic/import">
                    <el-button :disabled="importDataDisable" type="success" size="small" :icon="importDataBtnIcon">
                        {{importDataBtnText}}
                    </el-button>
                </el-upload>

                <el-button type="success" size="small" icon="el-icon-download" @click="exportDate">
                    导出数据
                </el-button>
                <el-button type="primary" icon="el-icon-plus" size="small" @click="showAddEmpView">
                    添加用户
                </el-button>
            </div>
        </div>
        <div style="margin-top: 10px">
            <el-table
                    :data="emps"
                    border
                    v-loading="loading"
                    stripe
                    style="width: 100%">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="name"
                        label="姓名"
                        fixed
                        align="left"
                        width="90">
                </el-table-column>
                <el-table-column
                        prop="workID"
                        label="工号"
                        align="left"
                        width="85">
                </el-table-column>
                <el-table-column
                        prop="gender"
                        label="性别"
                        align="left"
                        width="85">
                </el-table-column>
                <el-table-column
                        prop="birthday"
                        width="95"
                        align="left"
                        label="出生日期">
                </el-table-column>
                <el-table-column
                        prop="idCard"
                        width="150"
                        align="left"
                        label="身份证号">
                </el-table-column>
                <el-table-column
                        prop="wedlock"
                        width="70"
                        align="left"
                        label="婚姻状况">
                </el-table-column>
                <el-table-column
                        prop="nation.name"
                        width="50"
                        align="left"
                        label="民族">
                </el-table-column>
                <el-table-column
                        prop="nativePlace"
                        width="80"
                        align="left"
                        label="籍贯">
                </el-table-column>
                <el-table-column
                        prop="politicsstatus.name"
                        width="85"
                        align="left"
                        label="政治面貌">
                </el-table-column>
                <el-table-column
                        prop="email"
                        width="180"
                        align="left"
                        label="电子邮件">
                </el-table-column>
                <el-table-column
                        prop="phone"
                        width="100"
                        align="left"
                        label="电话号码">
                </el-table-column>
                <el-table-column
                        prop="address"
                        width="220"
                        align="left"
                        label="联系地址">
                </el-table-column>
                <el-table-column
                        prop="department.name"
                        width="100"
                        align="left"
                        label="所属部门">
                </el-table-column>
                <el-table-column
                        prop="position.name"
                        width="85"
                        align="left"
                        label="职位">
                </el-table-column>
                <el-table-column
                        prop="jobLevel.name"
                        width="85"
                        align="left"
                        label="职称">
                </el-table-column>
                <el-table-column
                        prop="engageForm"
                        width="85"
                        align="left"
                        label="聘用形式">
                </el-table-column>
                <el-table-column
                        prop="tiptopDegree"
                        label="最高学历">
                </el-table-column>
                <el-table-column
                        prop="specialty"
                        width="85"
                        align="left"
                        label="专业">
                </el-table-column>
                <el-table-column
                        prop="school"
                        width="120"
                        align="left"
                        label="毕业院校">
                </el-table-column>
                <el-table-column
                        prop="beginDate"
                        width="95"
                        align="left"
                        label="入职日期">
                </el-table-column>
                <el-table-column
                        prop="conversionTime"
                        width="95"
                        align="left"
                        label="转正日期">
                </el-table-column>
                <el-table-column
                        prop="beginContract"
                        width="95"
                        align="left"
                        label="合同起始日期">
                </el-table-column>
                <el-table-column
                        prop="endContract"
                        width="95"
                        align="left"
                        label="合同截至日期">
                </el-table-column>
                <el-table-column
                        prop="contractTerm"
                        width="100"
                        align="left"
                        label="合同期限">
                    <template slot-scope="scope">
                        <el-tag>{{scope.row.contractTerm}}年</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        fixed="right"
                        width="240"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button @click="showEditEmpView(scope.row)" size="mini">编辑</el-button>
                        <el-button type="primary" size="mini">高级资料</el-button>
                        <el-button @click="deleteEmp(scope.row)" type="danger" size="mini">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页-->
            <div style="display: flex;justify-content: flex-end">
                <el-pagination
                        background
                        @current-change="currentChange"
                        @size-change="sizeChange"
                        layout="sizes, prev, pager, next, jumper, ->, total, slot"
                        :total="total">
                </el-pagination>
            </div>
        </div>
        <el-dialog
                :title="title"
                :visible.sync="dialogVisible"
                width="80%">
            <div>
                <el-form :model="emp" :rules="rules" ref="empForm">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="姓名:" prop="name">
                                <el-input size="small" style="width: 150px;" prefix-icon="el-icon-edit"
                                          v-model="emp.name" placeholder="请输入员工姓名"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="性别:" prop="gender">
                                <el-radio-group v-model="emp.gender">
                                    <el-radio label="男">男</el-radio>
                                    <el-radio label="女">女</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="出生日期:" prop="birthday">
                                <el-date-picker
                                        v-model="emp.birthday"
                                        size="mini"
                                        type="date"
                                        style="width: 150px"
                                        value-format="yyyy-MM-dd"
                                        placeholder="出生日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="政治面貌:" prop="politicId">
                                <el-select v-model="emp.politicId" placeholder="政治面貌" size="mini" style="width: 200px">
                                    <el-option
                                            v-for="item in politicsstatus"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="民族:" prop="nationId">
                                <el-select v-model="emp.nationId" placeholder="民族" size="mini" style="width: 150px">
                                    <el-option
                                            v-for="item in nations"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <el-col :span="5">
                            <el-form-item label="籍贯:" prop="nativePlace">
                                <el-input size="small" style="width: 120px;" prefix-icon="el-icon-edit"
                                          v-model="emp.nativePlace" placeholder="请输入员工籍贯"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="电子邮箱:" prop="email">
                                <el-input size="small" style="width: 150px;" prefix-icon="el-icon-message"
                                          v-model="emp.email" placeholder="请输入电子邮箱"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="7">
                            <el-form-item label="联系地址:" prop="address">
                                <el-input size="small" style="width: 200px;" prefix-icon="el-icon-edit"
                                          v-model="emp.address" placeholder="请输入联系地址"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="职位:" prop="posId">
                                <el-select v-model="emp.posId" placeholder="职位" size="mini" style="width: 150px">
                                    <el-option
                                            v-for="item in positions"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>

                        <el-col :span="5">
                            <el-form-item label="职称:" prop="jobLevelId">
                                <el-select v-model="emp.jobLevelId" placeholder="职称" size="mini" style="width: 150px">
                                    <el-option
                                            v-for="item in joblevels"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="所属部门:" prop="departmentId">
                                <el-popover
                                        placement="right"
                                        title="请选择部门"
                                        width="200"
                                        trigger="manual"
                                        v-model="popVisible">
                                    <el-tree default-expand-all :data="allDeps" :props="defaultProps"
                                             @node-click="handleNodeClick"></el-tree>
                                    <div slot="reference" @click="showDeptView" style="width: 150px;
                                    display: inline-flex;
                                    font-size: 13px;
                                    border: 1px solid #dedede;
                                    cursor: pointer;
                                    height: 26px;
                                    align-items: center;
                                    padding-left: 8px;
                                    box-sizing: border-box;
                                    border-radius: 5px">{{inputDepName}}
                                    </div>
                                </el-popover>

                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="电话号码:" prop="phone">
                                <el-input size="small" style="width: 200px;" prefix-icon="el-icon-phone"
                                          v-model="emp.phone" placeholder="phone"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="工号:" prop="workID">
                                <el-input size="small" style="width: 150px;" prefix-icon="el-icon-edit" disabled
                                          v-model="emp.workID" placeholder="部门"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="学历:" prop="tiptopDegree">
                                <el-select v-model="emp.tiptopDegree" placeholder="职称" size="mini" style="width: 150px">
                                    <el-option
                                            v-for="item in tiptopDegrees"
                                            :key="item"
                                            :label="item"
                                            :value="item">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="毕业院校:" prop="workID">
                                <el-input size="small" style="width: 150px;" prefix-icon="el-icon-edit"
                                          v-model="emp.school" placeholder="毕业院校名称"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="专业名称:" prop="specialty">
                                <el-input size="small" style="width: 200px;" prefix-icon="el-icon-edit"
                                          v-model="emp.specialty" placeholder="专业名称"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="入职日期:" prop="beginDate">
                                <el-date-picker
                                        v-model="emp.beginDate"
                                        size="mini"
                                        type="date"
                                        style="width: 130px"
                                        value-format="yyyy-MM-dd"
                                        placeholder="入职日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="转正日期:" prop="conversionTime">
                                <el-date-picker
                                        v-model="emp.conversionTime"
                                        size="mini"
                                        type="date"
                                        style="width: 130px"
                                        value-format="yyyy-MM-dd"
                                        placeholder="出生日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="合同起始日期:" prop="beginContract">
                                <el-date-picker
                                        v-model="emp.beginContract"
                                        size="mini"
                                        type="date"
                                        style="width: 130px"
                                        value-format="yyyy-MM-dd"
                                        placeholder="合同起始日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="合同终止日期:" prop="endContract">
                                <el-date-picker
                                        v-model="emp.endContract"
                                        size="mini"
                                        type="date"
                                        style="width: 130px"
                                        value-format="yyyy-MM-dd"
                                        placeholder="合同终止日期">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="身份证号:" prop="idCard">
                                <el-input size="small" style="width: 180px;" prefix-icon="el-icon-edit"
                                          v-model="emp.idCard" placeholder="身份证号"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="聘用形式:" prop="engageForm">
                                <el-radio-group v-model="emp.engageForm">
                                    <el-radio label="劳动合同">劳动合同</el-radio>
                                    <el-radio label="劳务合同">劳务合同</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="婚姻状况:" prop="gender">
                                <el-radio-group v-model="emp.wedlock">
                                    <el-radio label="已婚">已婚</el-radio>
                                    <el-radio label="未婚">未婚</el-radio>
                                    <el-radio label="离异">离异</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="doAddEmp">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "EmpBasic",
        data() {
            return {
                title: '',
                allDeps: [],
                popVisible: false,
                tiptopDegrees: ['本科', '大专', '硕士', '博士', '高中', '初中', '小学', '其他'],
                positions: [],
                emps: [],
                importDataBtnText: '导入数据',
                importDataBtnIcon: 'el-icon-upload2',
                importDataDisable: false,
                nations: [],
                joblevels: [],
                politicsstatus: [],
                showAdvanceSearchView: false,
                search: '',
                loading: false,
                total: 0,
                page: 1,
                size: 10,
                inputDepName: '',
                dialogVisible: false,
                emp: {
                    id: null,
                    name: "江南一点雨",
                    gender: "男",
                    birthday: "1990-01-01",
                    idCard: "610122199001011256",
                    wedlock: "已婚",
                    nationId: null,
                    nativePlace: "陕西",
                    politicId: null,
                    email: "laowang@qq.com",
                    phone: "18565558897",
                    address: "深圳市南山区",
                    departmentId: null,
                    jobLevelId: null,
                    posId: null,
                    engageForm: "劳务合同",
                    tiptopDegree: "本科",
                    specialty: "信息管理与信息系统",
                    school: "深圳大学",
                    beginDate: "2018-01-01",
                    workState: "在职",
                    workID: "",
                    contractTerm: 2,
                    conversionTime: "2018-04-01",
                    notWorkDate: null,
                    beginContract: "2018-01-01",
                    endContract: "2020-01-01",
                    workAge: null,
                    salary: null
                },
                rules: {
                    name: [{required: true, message: '请输入姓名', trigger: 'blur'}],
                    gender: [{required: true, message: '请输入性别', trigger: 'blur'}],
                    birthday: [{required: true, message: '请输入出生日期', trigger: 'blur'}],
                    // 注意：如果是从网上复制的正则表达式，WebStorm会给\多加一个\,也就是说如果原本是\d那么会变成\\d,这个地方要注意
                    idCard: [{required: true, message: '请输入身份证号码', trigger: 'blur'}, {
                        pattern: /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
                        message: '身份证号格式不正确',
                        trigger: 'blur'
                    }],
                    wedlock: [{required: true, message: '请输入婚姻状况', trigger: 'blur'}],
                    nationId: [{required: true, message: '请输入民族', trigger: 'blur'}],
                    nativePlace: [{required: true, message: '请输入籍贯', trigger: 'blur'}],
                    politicId: [{required: true, message: '请输入政治面貌', trigger: 'blur'}],
                    email: [{required: true, message: '请输入邮箱地址', trigger: 'blur'}, {type: 'email', message: '邮箱格式不正确'}],
                    phone: [{required: true, message: '请输入电话号码', trigger: 'blur'}],
                    address: [{required: true, message: '请输入员工地址', trigger: 'blur'}],
                    departmentId: [{required: true, message: '请输入部门名称', trigger: 'blur'}],
                    jobLevelId: [{required: true, message: '请输入职称', trigger: 'blur'}],
                    posId: [{required: true, message: '请输入职位', trigger: 'blur'}],
                    engageForm: [{required: true, message: '请输入聘用形式', trigger: 'blur'}],
                    tiptopDegree: [{required: true, message: '请输入聘用学历', trigger: 'blur'}],
                    specialty: [{required: true, message: '请输入专业', trigger: 'blur'}],
                    school: [{required: true, message: '请输入毕业院校', trigger: 'blur'}],
                    beginDate: [{required: true, message: '请输入入职日期', trigger: 'blur'}],
                    workState: [{required: true, message: '请输入工作状态', trigger: 'blur'}],
                    workID: [{required: true, message: '请输入工号', trigger: 'blur'}],
                    contractTerm: [{required: true, message: '请输入合同期限', trigger: 'blur'}],
                    conversionTime: [{required: true, message: '请输入转正日期', trigger: 'blur'}],
                    notWorkDate: [{required: true, message: '请输入离职日期', trigger: 'blur'}],
                    beginContract: [{required: true, message: '请输入合同起始日期', trigger: 'blur'}],
                    endContract: [{required: true, message: '请输入合同截至日期', trigger: 'blur'}],
                    workAge: [{required: true, message: '请输入工龄', trigger: 'blur'}],
                }
            }
        },
        mounted() {
            this.initEmps();
            this.initData();
        },
        methods: {
            exportDate(){
                window.open('/emp/basic/export','_parent')
            },
            onError(){
                this.importDataBtnText='导入数据';
                this.importDataBtnIcon = 'el-icon-upload2';
                this.importDataDisable = false;
            },
            onSuccess(){
                this.importDataBtnText='导入数据';
                this.importDataBtnIcon = 'el-icon-upload2';
                this.importDataDisable = false;
                this.initEmps();
            },
            beforeUpload(){
                this.importDataBtnText='正在导入';
                this.importDataBtnIcon = 'el-icon-loading';
                this.importDataDisable = true;
            },
            emptyEmp(){
                this.emp = {
                        id: null,
                        name: "",
                        gender: "",
                        birthday: "",
                        idCard: "",
                        wedlock: "",
                        nationId: null,
                        nativePlace: "",
                        politicId: null,
                        email: "",
                        phone: "",
                        address: "",
                        departmentId: null,
                        jobLevelId: null,
                        posId: null,
                        engageForm: "",
                        tiptopDegree: "",
                        specialty: "",
                        school: "",
                        beginDate: "",
                        workID: "",
                        contractTerm: null,
                        conversionTime: "",
                        notWorkDate: null,
                        beginContract: "",
                        endContract: "",
                        workAge: null,
                        salary: null
                };
                this.inputDepName = ""
            },
            showEditEmpView(data){
                this.initPositions();
                this.title = "编辑员工信息";
                this.emp = data;
                this.inputDepName = data.department.name;
                this.dialogVisible = true;
            },
            deleteEmp(data){
                this.$confirm('此操作将永久删除该【'+data.name+'】, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest("/emp/basic/"+data.id).then(resp=>{
                        if (resp){
                            this.initEmps();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            doAddEmp() {
                // 用id来判断是编辑还是添加
                if (this.emp.id) {

                    this.$refs['empForm'].validate(valid => {
                        if (valid) {
                            this.putRequest("/emp/basic/", this.emp).then(resp => {
                                if (resp) {
                                    this.dialogVisible = false;
                                    this.initEmps();
                                }
                            })
                        }
                    });

                }else {

                    // 登陆之前先进行校验
                    this.$refs['empForm'].validate(valid => {
                        // 校验成功再提交
                        if (valid) {
                            this.postRequest("/emp/basic/", this.emp).then(resp => {
                                if (resp) {
                                    this.dialogVisible = false;
                                    this.initEmps();
                                }
                            })
                        }
                    });
                }


            },
            handleNodeClick(data) {
                this.inputDepName = data.name;
                this.emp.departmentId = data.id;
                this.popVisible = !this.popVisible;

            },
            showDeptView() {
                this.popVisible = !this.popVisible;
            },
            getMaxWorkID() {
                this.getRequest('/emp/basic/maxWorkID').then(resp => {
                    if (resp) {
                        this.emp.workID = resp.obj;
                    }
                })
            },
            initPositions() {
                this.getRequest('/emp/basic/positions').then(resp => {
                    if (resp) {
                        this.positions = resp;
                    }
                })
            },

            initData() {
                if (!window.sessionStorage.getItem("nations")) {
                    this.getRequest('/emp/basic/nations').then(resp => {
                        if (resp) {
                            this.nations = resp;
                            window.sessionStorage.setItem("nations", JSON.stringify(resp));
                        }
                    })
                } else {
                    this.nations = JSON.parse(window.sessionStorage.getItem("nations"));
                }

                if (!window.sessionStorage.getItem("joblevels")) {
                    this.getRequest('/emp/basic/joblevels').then(resp => {
                        if (resp) {
                            this.joblevels = resp;
                            window.sessionStorage.setItem("joblevels", JSON.stringify(resp));
                        }
                    })
                } else {
                    this.joblevels = JSON.parse(window.sessionStorage.getItem("joblevels"));
                }

                if (!window.sessionStorage.getItem("politicsstatus")) {
                    this.getRequest('/emp/basic/politicsstatus').then(resp => {
                        if (resp) {
                            this.politicsstatus = resp;
                            window.sessionStorage.setItem("politicsstatus", JSON.stringify(resp));
                        }
                    })
                } else {
                    this.politicsstatus = JSON.parse(window.sessionStorage.getItem("politicsstatus"))
                }

                if (!window.sessionStorage.getItem("deps")) {
                    this.getRequest('/emp/basic/deps').then(resp => {
                        if (resp) {
                            this.allDeps = resp;
                            window.sessionStorage.setItem("deps", JSON.stringify(resp));
                        }
                    })
                } else {
                    this.allDeps = JSON.parse(window.sessionStorage.getItem("deps"));
                }
            },

            initEmps() {
                this.loading = true;
                this.getRequest("/emp/basic/?page=" + this.page + "&size=" + this.size).then(resp => {
                    this.loading = false;
                    if (resp) {
                        this.emps = resp.data;
                        this.total = resp.total;
                    }
                })
            },
            currentChange(currentPage) {
                this.page = currentPage;
                this.initEmps();
            },
            sizeChange(currentSize) {
                this.size = currentSize;
                this.initEmps();
            },
            showAddEmpView() {
                this.emptyEmp();
                this.title = "添加员工";
                this.initPositions();
                this.getMaxWorkID();
                this.dialogVisible = true
            }

        }
    }
</script>

<style scoped>

</style>