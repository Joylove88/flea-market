(function () {
  var vm = window.vm = new Vue({
    el: '.aui-wrapper',
    i18n: window.SITE_CONFIG.i18n,
    mixins: [window.SITE_CONFIG.mixinViewModule],
    data: function () {
      return {
        mixinViewModuleOptions: {
          getDataListURL: '/sys/whiteip/page',
          getDataListIsPage: true,
          exportURL: '/sys/whiteip/export',
          deleteURL: '/sys/whiteip',
          deleteIsBatch: true
        },
        dataForm: {
          id: ''
        }
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
function fnAddOrUpdateComponent () {
  var self = null;
  return {
    template: '\
      <el-dialog :visible.sync="visible" :title="!dataForm.id ? $t(\'add\') : $t(\'update\')" :close-on-click-modal="false" :close-on-press-escape="false" :fullscreen="true">\
        <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmitHandle()" label-width="120px">\
          <el-form-item label="IP" prop="ip">\
            <el-input v-model="dataForm.ip" placeholder="IP"></el-input>\
          </el-form-item>\
          <el-form-item label="状态  0：停用   1：正常" prop="status">\
            <el-input v-model="dataForm.status" placeholder="状态  0：停用   1：正常"></el-input>\
          </el-form-item>\
          <el-form-item label="备注" prop="remark">\
            <el-input v-model="dataForm.remark" placeholder="备注"></el-input>\
          </el-form-item>\
          <el-form-item label="更新者" prop="updater">\
            <el-input v-model="dataForm.updater" placeholder="更新者"></el-input>\
          </el-form-item>\
          <el-form-item label="更新时间" prop="updateDate">\
            <el-input v-model="dataForm.updateDate" placeholder="更新时间"></el-input>\
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
          ip: '',
          status: '',
          remark: '',
          creator: '',
          createDate: '',
          updater: '',
          updateDate: ''
        }
      }
    },
    computed: {
      dataRule: function () {
        return {
          ip: [
            { required: true, message: this.$t('validate.required'), trigger: 'blur' }
          ],
          status: [
            { required: true, message: this.$t('validate.required'), trigger: 'blur' }
          ],
          remark: [
            { required: true, message: this.$t('validate.required'), trigger: 'blur' }
          ],
          updater: [
            { required: true, message: this.$t('validate.required'), trigger: 'blur' }
          ],
          updateDate: [
            { required: true, message: this.$t('validate.required'), trigger: 'blur' }
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
        self.$http.get('/sys/whiteip/' + self.dataForm.id).then(function (res) {
          if (res.data.code !== 0) {
            return self.$message.error(res.data.msg);
          }
          self.dataForm = _.merge({}, self.dataForm, res.data.data);
        }).catch(function () {});
      },
      // 表单提交
      dataFormSubmitHandle: _.debounce(function () {
        self.$refs['dataForm'].validate(function (valid) {
          if (!valid) {
            return false;
          }
          self.$http[!self.dataForm.id ? 'post' : 'put']('/sys/whiteip', self.dataForm).then(function (res) {
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
          }).catch(function () {});
        });
      }, 1000, { 'leading': true, 'trailing': false })
    }
  }
};