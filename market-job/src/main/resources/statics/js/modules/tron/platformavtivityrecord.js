(function () {
    var vm = window.vm = new Vue({
        el: '.aui-wrapper',
        i18n: window.SITE_CONFIG.i18n,
        mixins: [window.SITE_CONFIG.mixinViewModule],
        data: function () {
            return {
                mixinViewModuleOptions: {
                    getDataListURL: '/tron/platformavtivityrecord/page',
                    getDataListIsPage: true,
                    exportURL: '/tron/platformavtivityrecord/export',
                    deleteURL: '/tron/platformavtivityrecord',
                    deleteIsBatch: true
                },
                dataForm: {
                    rewardStatus: ''
                }
            }
        },
        methods: {
            reward: function (id) {
                var self = this;
                self.$confirm(self.$t('prompt.info', {'handle': self.$t(' 重新返奖 ')}), self.$t('prompt.title'), {
                    confirmButtonText: self.$t('confirm'),
                    cancelButtonText: self.$t('cancel'),
                    type: 'warning'
                }).then(function () {
                    self.$http['post']('/tron/platformavtivityrecord/reward', {"setId": id}).then(function (res) {
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
      <el-dialog :visible.sync="visible" :title="!dataForm.setId ? $t(\'add\') : $t(\'update\')" :close-on-click-modal="false" :close-on-press-escape="false" :fullscreen="true">\
        <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmitHandle()" label-width="120px">\
          <el-form-item label="用户名" prop="userName">\
            <el-input v-model="dataForm.userName" placeholder="用户名"></el-input>\
          </el-form-item>\
          <el-form-item label="交易类型。TRX / USDT" prop="transType">\
            <el-input v-model="dataForm.transType" placeholder="交易类型。TRX / USDT"></el-input>\
          </el-form-item>\
          <el-form-item label="会员钱包地址" prop="memberWalletAddress">\
            <el-input v-model="dataForm.memberWalletAddress" placeholder="会员钱包地址"></el-input>\
          </el-form-item>\
          <el-form-item label="返奖状态。0返奖失败 1返奖成功" prop="rewardStatus">\
            <el-input v-model="dataForm.rewardStatus" placeholder="返奖状态。0返奖失败 1返奖成功"></el-input>\
          </el-form-item>\
          <el-form-item label="返奖金额" prop="rewardAmount">\
            <el-input v-model="dataForm.rewardAmount" placeholder="返奖金额"></el-input>\
          </el-form-item>\
          <el-form-item label="系统出账钱包地址" prop="systemBackWalletAddress">\
            <el-input v-model="dataForm.systemBackWalletAddress" placeholder="系统出账钱包地址"></el-input>\
          </el-form-item>\
          <el-form-item label="返奖时波场交易记录id" prop="backTronTxId">\
            <el-input v-model="dataForm.backTronTxId" placeholder="返奖时波场交易记录id"></el-input>\
          </el-form-item>\
          <el-form-item label="创建时间" prop="createTime">\
            <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>\
          </el-form-item>\
          <el-form-item label="创建用户" prop="createUser">\
            <el-input v-model="dataForm.createUser" placeholder="创建用户"></el-input>\
          </el-form-item>\
          <el-form-item label="更新时间" prop="updateTime">\
            <el-input v-model="dataForm.updateTime" placeholder="更新时间"></el-input>\
          </el-form-item>\
          <el-form-item label="最后更新用户" prop="updateUser">\
            <el-input v-model="dataForm.updateUser" placeholder="最后更新用户"></el-input>\
          </el-form-item>\
          <el-form-item label="出账时间(转账给用户时间)" prop="transferTime">\
            <el-input v-model="dataForm.transferTime" placeholder="出账时间(转账给用户时间)"></el-input>\
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
                    setId: '',
                    userName: '',
                    transType: '',
                    memberWalletAddress: '',
                    rewardStatus: '',
                    rewardAmount: '',
                    systemBackWalletAddress: '',
                    backTronTxId: '',
                    createTime: '',
                    createUser: '',
                    updateTime: '',
                    updateUser: '',
                    transferTime: ''
                }
            }
        },
        computed: {
            dataRule: function () {
                return {
                    userName: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'}
                    ],
                    transType: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'}
                    ],
                    memberWalletAddress: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'}
                    ],
                    rewardStatus: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'}
                    ],
                    rewardAmount: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'}
                    ],
                    systemBackWalletAddress: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'}
                    ],
                    backTronTxId: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'}
                    ],
                    createTime: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'}
                    ],
                    createUser: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'}
                    ],
                    updateTime: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'}
                    ],
                    updateUser: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'}
                    ],
                    transferTime: [
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
                    if (self.dataForm.setId) {
                        self.getInfo();
                    }
                });
            },
            // 获取信息
            getInfo: function () {
                self.$http.get('/tron/platformavtivityrecord/' + self.dataForm.setId).then(function (res) {
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
                    self.$http[!self.dataForm.setId ? 'post' : 'put']('/tron/platformavtivityrecord', self.dataForm).then(function (res) {
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