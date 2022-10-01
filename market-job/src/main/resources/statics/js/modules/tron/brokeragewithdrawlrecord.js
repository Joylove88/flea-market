(function () {
    var vm = window.vm = new Vue({
        el: '.aui-wrapper',
        i18n: window.SITE_CONFIG.i18n,
        mixins: [window.SITE_CONFIG.mixinViewModule],
        data: function () {
            return {
                mixinViewModuleOptions: {
                    getDataListURL: '/tron/brokeragewithdrawlrecord/page',
                    getDataListIsPage: true,
                    exportURL: '/tron/brokeragewithdrawlrecord/export',
                    deleteURL: '/tron/brokeragewithdrawlrecord',
                    deleteIsBatch: true
                },
                dataForm: {
                    withdrawlStatus: '',
                    authStatus: ''
                }
            }
        },
        methods: {
            withdrawCheckFail: function (id) {
                var self = this;
                self.$confirm(self.$t('prompt.info', {'handle': self.$t(' 提现审核 ')}), self.$t('prompt.title'), {
                    confirmButtonText: self.$t('confirm'),
                    cancelButtonText: self.$t('cancel'),
                    type: 'warning'
                }).then(function () {
                    self.$http['post']('/tron/brokeragewithdrawlrecord/checkFail', {"id": id}).then(function (res) {
                        if (res.data.code !== 0) {
                            return self.$message.error(res.data.msg);
                        }
                        self.$message({
                            message: self.$t('prompt.success'),
                            type: 'success',
                            duration: 500,
                            onClose: function () {
                                self.query();
                            }
                        });
                    }).catch(function () {
                    });
                }).catch(function () {
                });
            },
            withdrawCheckSuccess: function (id) {
                var self = this;
                self.$confirm(self.$t('prompt.info', {'handle': self.$t(' 提现审核 ')}), self.$t('prompt.title'), {
                    confirmButtonText: self.$t('confirm'),
                    cancelButtonText: self.$t('cancel'),
                    type: 'warning'
                }).then(function () {
                    self.$http['post']('/tron/brokeragewithdrawlrecord/checkSuccess', {"id": id}).then(function (res) {
                        if (res.data.code !== 0) {
                            return self.$message.error(res.data.msg);
                        }
                        self.$message({
                            message: self.$t('prompt.success'),
                            type: 'success',
                            duration: 500,
                            onClose: function () {
                                self.query();
                            }
                        });
                    }).catch(function () {
                    });
                }).catch(function () {
                });
            },
            withdrawReward: function (id) {
                var self = this;
                self.$confirm(self.$t('prompt.info', {'handle': self.$t(' 重新返奖 ')}), self.$t('prompt.title'), {
                    confirmButtonText: self.$t('confirm'),
                    cancelButtonText: self.$t('cancel'),
                    type: 'warning'
                }).then(function () {
                    self.$http['post']('/tron/brokeragewithdrawlrecord/reward', {"id": id}).then(function (res) {
                        if (res.data.code !== 0) {
                            return self.$message.error(res.data.msg);
                        }
                        self.$message({
                            message: self.$t('prompt.success'),
                            type: 'success',
                            duration: 500,
                            onClose: function () {
                                self.query();
                            }
                        });
                    }).catch(function () {
                    });
                }).catch(function () {
                });
            }
        },
        components: {
            'add-or-update': fnAddOrUpdateComponent()
        },
        beforeCreate: function () {
            vm = this;
        }
    });
})();

/**
 * add-or-update组件
 */
function fnAddOrUpdateComponent() {
    var self = null;
    return {
        template: '\
      <el-dialog :visible.sync="visible" :title="!dataForm.id ? $t(\'add\') : $t(\'update\')" :close-on-click-modal="false" :close-on-press-escape="false" :fullscreen="true">\
        <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmitHandle()" label-width="120px">\
          <el-form-item label="登陆名" prop="loginName">\
            <el-input v-model="dataForm.loginName" placeholder="登陆名"></el-input>\
          </el-form-item>\
          <el-form-item label="钱包地址" prop="walletAddress">\
            <el-input v-model="dataForm.walletAddress" placeholder="钱包地址"></el-input>\
          </el-form-item>\
          <el-form-item label="交易类型。TRX / USDT" prop="transType">\
            <el-input v-model="dataForm.transType" placeholder="交易类型。TRX / USDT"></el-input>\
          </el-form-item>\
          <el-form-item label="可提现佣金" prop="canWithdrawlBrokerage">\
            <el-input v-model="dataForm.canWithdrawlBrokerage" placeholder="可提现佣金"></el-input>\
          </el-form-item>\
          <el-form-item label="提现佣金" prop="applyWithdrawlBrokerage">\
            <el-input v-model="dataForm.applyWithdrawlBrokerage" placeholder="提现佣金"></el-input>\
          </el-form-item>\
          <el-form-item label="提现时间" prop="applyTime">\
            <el-input v-model="dataForm.applyTime" placeholder="提现时间"></el-input>\
          </el-form-item>\
          <el-form-item label="审核状态(1待审核, 2-审核通过, 3-审核驳回)" prop="authStatus">\
            <el-input v-model="dataForm.authStatus" placeholder="审核状态(1待审核, 2-审核通过, 3-审核驳回)"></el-input>\
          </el-form-item>\
          <el-form-item label="审核说明" prop="authExplain">\
            <el-input v-model="dataForm.authExplain" placeholder="审核说明"></el-input>\
          </el-form-item>\
          <el-form-item label="审核时间" prop="authTime">\
            <el-input v-model="dataForm.authTime" placeholder="审核时间"></el-input>\
          </el-form-item>\
          <el-form-item label="审核人" prop="author">\
            <el-input v-model="dataForm.author" placeholder="审核人"></el-input>\
          </el-form-item>\
          <el-form-item label="提现状态(1提现成功, 2提现失败)" prop="withdrawlStatus">\
            <el-input v-model="dataForm.withdrawlStatus" placeholder="提现状态(1提现成功, 2提现失败)"></el-input>\
          </el-form-item>\
          <el-form-item label="创建人" prop="createUser">\
            <el-input v-model="dataForm.createUser" placeholder="创建人"></el-input>\
          </el-form-item>\
          <el-form-item label="创建时间" prop="createTime">\
            <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>\
          </el-form-item>\
          <el-form-item label="更新人" prop="updateUser">\
            <el-input v-model="dataForm.updateUser" placeholder="更新人"></el-input>\
          </el-form-item>\
          <el-form-item label="更新时间" prop="updateTime">\
            <el-input v-model="dataForm.updateTime" placeholder="更新时间"></el-input>\
          </el-form-item>\
          <el-form-item label="交易记录id" prop="tronTxId">\
            <el-input v-model="dataForm.tronTxId" placeholder="交易记录id"></el-input>\
          </el-form-item>\
          <el-form-item label="出账时间" prop="transferTime">\
            <el-input v-model="dataForm.transferTime" placeholder="出账时间"></el-input>\
          </el-form-item>\
          <el-form-item label="出账地址" prop="systemBackWalletAddress">\
            <el-input v-model="dataForm.systemBackWalletAddress" placeholder="出账地址"></el-input>\
          </el-form-item>\
        </el-form>\
        <template slot="footer">\
          <el-button @click="visible = false">{{ $t(\'cancel\') }}</el-button>\
          <el-button type="primary" @click="dataFormSubmitHandle()">{{ $t(\'confirm\') }}</el-button>\
        </template>\
      </el-dialog>\
    ',
        data: function () {
            return {
                visible: false,
                dataForm: {
                    id: '',
                    loginName: '',
                    walletAddress: '',
                    transType: '',
                    canWithdrawlBrokerage: '',
                    applyWithdrawlBrokerage: '',
                    applyTime: '',
                    authStatus: '',
                    authExplain: '',
                    authTime: '',
                    author: '',
                    withdrawlStatus: '',
                    createUser: '',
                    createTime: '',
                    updateUser: '',
                    updateTime: '',
                    tronTxId: '',
                    transferTime: '',
                    systemBackWalletAddress: ''
                }
            }
        },
        computed: {
            dataRule: function () {
                return {
                    loginName: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'}
                    ],
                    walletAddress: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'}
                    ],
                    transType: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'}
                    ],
                    canWithdrawlBrokerage: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'}
                    ],
                    applyWithdrawlBrokerage: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'}
                    ],
                    applyTime: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'}
                    ],
                    authStatus: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'}
                    ],
                    authExplain: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'}
                    ],
                    authTime: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'}
                    ],
                    author: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'}
                    ],
                    withdrawlStatus: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'}
                    ],
                    createUser: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'}
                    ],
                    createTime: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'}
                    ],
                    updateUser: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'}
                    ],
                    updateTime: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'}
                    ],
                    tronTxId: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'}
                    ],
                    transferTime: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'}
                    ],
                    systemBackWalletAddress: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'}
                    ]
                }
            }
        },
        beforeCreate: function () {
            self = this;
        },
        methods: {
            init: function () {
                self.visible = true;
                self.$nextTick(function () {
                    self.$refs['dataForm'].resetFields();
                    if (self.dataForm.id) {
                        self.getInfo();
                    }
                });
            },
            // 获取信息
            getInfo: function () {
                self.$http.get('/tron/brokeragewithdrawlrecord/' + self.dataForm.id).then(function (res) {
                    if (res.data.code !== 0) {
                        return self.$message.error(res.data.msg);
                    }
                    self.dataForm = _.merge({}, self.dataForm, res.data.data);
                }).catch(function () {
                });
            },
            // 表单提交
            dataFormSubmitHandle: _.debounce(function () {
                self.$refs['dataForm'].validate(function (valid) {
                    if (!valid) {
                        return false;
                    }
                    self.$http[!self.dataForm.id ? 'post' : 'put']('/tron/brokeragewithdrawlrecord', self.dataForm).then(function (res) {
                        if (res.data.code !== 0) {
                            return self.$message.error(res.data.msg);
                        }
                        self.$message({
                            message: self.$t('prompt.success'),
                            type: 'success',
                            duration: 500,
                            onClose: function () {
                                self.visible = false;
                                self.$emit('refresh-data-list');
                            }
                        });
                    }).catch(function () {
                    });
                });
            }, 1000, {'leading': true, 'trailing': false})
        }
    }
};