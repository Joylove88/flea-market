(function () {
    var vm = window.vm = new Vue({
        el: '.aui-wrapper',
        i18n: window.SITE_CONFIG.i18n,
        mixins: [window.SITE_CONFIG.mixinViewModule],
        data: function () {
            return {
                mixinViewModuleOptions: {
                    getDataListURL: '/tron/transrecord/page',
                    getDataListIsPage: true,
                    exportURL: '/tron/transrecord/export',
                    deleteURL: '/tron/transrecord',
                    deleteIsBatch: true
                },
                dataForm: {
                    returnWinStatus: '',
                    settleStatus: ''
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
                    self.$http['post']('/tron/transrecord/reward', {"recordId": id}).then(function (res) {
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
      <el-dialog :visible.sync="visible" :title="!dataForm.recordId ? $t(\'add\') : $t(\'update\')" :close-on-click-modal="false" :close-on-press-escape="false" :fullscreen="true">\
        <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmitHandle()" label-width="120px">\
          <el-form-item label="下注时波场交易记录id" prop="tronTxId">\
            <el-input v-model="dataForm.tronTxId" placeholder="下注时波场交易记录id"></el-input>\
          </el-form-item>\
          <el-form-item label="下注时波场交易BlockHash" prop="tronBlockHash">\
            <el-input v-model="dataForm.tronBlockHash" placeholder="下注时波场交易BlockHash"></el-input>\
          </el-form-item>\
          <el-form-item label="返奖时波场交易记录id" prop="backTronTxId">\
            <el-input v-model="dataForm.backTronTxId" placeholder="返奖时波场交易记录id"></el-input>\
          </el-form-item>\
          <el-form-item label="会员钱包地址" prop="memberWalletAddress">\
            <el-input v-model="dataForm.memberWalletAddress" placeholder="会员钱包地址"></el-input>\
          </el-form-item>\
          <el-form-item label="系统出账钱包地址" prop="systemBackWalletAddress">\
            <el-input v-model="dataForm.systemBackWalletAddress" placeholder="系统出账钱包地址"></el-input>\
          </el-form-item>\
          <el-form-item label="系统钱包地址。会员转账到该地址" prop="systemWalletAddress">\
            <el-input v-model="dataForm.systemWalletAddress" placeholder="系统钱包地址。会员转账到该地址"></el-input>\
          </el-form-item>\
          <el-form-item label="游戏类型。1单双哈希 2大小哈希 3庄闲哈希 4幸运哈希 5十倍对子 6百倍豹子" prop="gameType">\
            <el-input v-model="dataForm.gameType" placeholder="游戏类型。1单双哈希 2大小哈希 3庄闲哈希 4幸运哈希 5十倍对子 6百倍豹子"></el-input>\
          </el-form-item>\
          <el-form-item label="交易类型。TRX / USDT" prop="transType">\
            <el-input v-model="dataForm.transType" placeholder="交易类型。TRX / USDT"></el-input>\
          </el-form-item>\
          <el-form-item label="下注金额" prop="betAmount">\
            <el-input v-model="dataForm.betAmount" placeholder="下注金额"></el-input>\
          </el-form-item>\
          <el-form-item label="下注时间" prop="betTime">\
            <el-input v-model="dataForm.betTime" placeholder="下注时间"></el-input>\
          </el-form-item>\
          <el-form-item label="波场出块时间" prop="blockTime">\
            <el-input v-model="dataForm.blockTime" placeholder="波场出块时间"></el-input>\
          </el-form-item>\
          <el-form-item label="下注中奖后所赔倍数。玩法配置，对应game_set表" prop="betMultiple">\
            <el-input v-model="dataForm.betMultiple" placeholder="下注中奖后所赔倍数。玩法配置，对应game_set表"></el-input>\
          </el-form-item>\
          <el-form-item label="手续费比率(%)。玩法配置，对应game_set表" prop="chargeRatio">\
            <el-input v-model="dataForm.chargeRatio" placeholder="手续费比率(%)。玩法配置，对应game_set表"></el-input>\
          </el-form-item>\
          <el-form-item label="中奖状态。1已中奖 2未中奖且不返回 3未中奖有返还 4低于限额不开奖 5高于限额不开奖 6金额个位数无效不开奖 7内部转账" prop="winStatus">\
            <el-input v-model="dataForm.winStatus" placeholder="中奖状态。1已中奖 2未中奖且不返回 3未中奖有返还 4低于限额不开奖 5高于限额不开奖 6金额个位数无效不开奖 7内部转账"></el-input>\
          </el-form-item>\
          <el-form-item label="结算状态。0未结算 1已结算" prop="settleStatus">\
            <el-input v-model="dataForm.settleStatus" placeholder="结算状态。0未结算 1已结算"></el-input>\
          </el-form-item>\
          <el-form-item label="结算金额" prop="settleAmount">\
            <el-input v-model="dataForm.settleAmount" placeholder="结算金额"></el-input>\
          </el-form-item>\
          <el-form-item label="返奖状态。0返奖失败 1返奖成功 2不返奖" prop="returnWinStatus">\
            <el-input v-model="dataForm.returnWinStatus" placeholder="返奖状态。0返奖失败 1返奖成功 2不返奖"></el-input>\
          </el-form-item>\
          <el-form-item label="备注" prop="remark">\
            <el-input v-model="dataForm.remark" placeholder="备注"></el-input>\
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
                    recordId: '',
                    tronTxId: '',
                    tronBlockHash: '',
                    backTronTxId: '',
                    memberWalletAddress: '',
                    systemBackWalletAddress: '',
                    systemWalletAddress: '',
                    gameType: '',
                    transType: '',
                    betAmount: '',
                    betTime: '',
                    blockTime: '',
                    betMultiple: '',
                    chargeRatio: '',
                    winStatus: '',
                    settleStatus: '',
                    settleAmount: '',
                    returnWinStatus: '',
                    remark: '',
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
                    tronTxId: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'}
                    ],
                    tronBlockHash: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'}
                    ],
                    backTronTxId: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'}
                    ],
                    memberWalletAddress: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'}
                    ],
                    systemBackWalletAddress: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'}
                    ],
                    systemWalletAddress: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'}
                    ],
                    gameType: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'}
                    ],
                    transType: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'}
                    ],
                    betAmount: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'}
                    ],
                    betTime: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'}
                    ],
                    blockTime: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'}
                    ],
                    betMultiple: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'}
                    ],
                    chargeRatio: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'}
                    ],
                    winStatus: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'}
                    ],
                    settleStatus: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'}
                    ],
                    settleAmount: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'}
                    ],
                    returnWinStatus: [
                        {required: true, message: this.$t('validate.required'), trigger: 'blur'}
                    ],
                    remark: [
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
                    if (self.dataForm.recordId) {
                        self.getInfo();
                    }
                });
            },
            // 获取信息
            getInfo: function () {
                self.$http.get('/tron/transrecord/' + self.dataForm.recordId).then(function (res) {
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
                    self.$http[!self.dataForm.recordId ? 'post' : 'put']('/tron/transrecord', self.dataForm).then(function (res) {
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