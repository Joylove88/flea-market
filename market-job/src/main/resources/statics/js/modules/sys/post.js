(function () {
  var vm = window.vm = new Vue({
    el: '.aui-wrapper',
    i18n: window.SITE_CONFIG.i18n,
    mixins: [window.SITE_CONFIG.mixinViewModule],
    data: function () {
      return {
        mixinViewModuleOptions: {
          getDataListURL: '/sys/post/page',
          getDataListIsPage: true,
          deleteURL: '/sys/post',
          deleteIsBatch: true
        },
        dataForm: {
          postCode: '',
          postName: '',
          status: ''
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
          <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmitHandle()" :label-width="$i18n.locale === \'en-US\' ? \'120px\' : \'80px\'">\
            <el-form-item :label="$t(\'post.postCode\')" prop="postCode">\
              <el-input v-model="dataForm.postCode"></el-input>\
            </el-form-item>\
            <el-form-item :label="$t(\'post.postName\')" prop="postName">\
              <el-input v-model="dataForm.postName"></el-input>\
            </el-form-item>\
            <el-form-item :label="$t(\'post.sort\')" prop="sort">\
              <el-input-number v-model="dataForm.sort" :min="0"></el-input-number>\
            </el-form-item>\
            <el-form-item :label="$t(\'post.status\')" prop="status">\
              <ren-radio-group v-model="dataForm.status" dict-type="post_status"></ren-radio-group>\
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
          postCode: '',
          postName: '',
          sort: 0,
          status: 1
        }
      }
    },
    computed: {
      dataRule: function () {
        return {
          postCode: [
            { required: true, message: this.$t('validate.required'), trigger: 'blur' }
          ],
          postName: [
            { required: true, message: this.$t('validate.required'), trigger: 'blur' }
          ],
          sort: [
            { required: true, message: this.$t('validate.required'), trigger: 'blur' }
          ],
          status: [
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
        self.dataForm.deptId = ''
        self.$nextTick(function () {
          self.$refs['dataForm'].resetFields();
          if (self.dataForm.id) {
            self.getInfo();
          }
        })
      },
      // 获取信息
      getInfo: function () {
        self.$http.get('/sys/post/' + self.dataForm.id).then(function (res) {
          if (res.data.code !== 0) {
            return self.$message.error(res.data.msg);
          }
          self.dataForm = _.assignIn({}, self.dataForm, res.data.data);
        }).catch(function () {});
      },
      // 表单提交
      dataFormSubmitHandle: _.debounce(function () {
        self.$refs['dataForm'].validate(function (valid) {
          if (!valid) {
            return false;
          }
          self.$http[!self.dataForm.id ? 'post' : 'put']('/sys/post', self.dataForm).then(function (res) {
            if (res.data.code !== 0) {
              return self.$message.error(res.data.msg);
            }
            self.$message({
              message: self.$t('prompt.success'),
              type: 'success',
              duration: 500,
              onClose: function () {
                self.visible = false
                self.$emit('refresh-data-list')
              }
            })
          }).catch(function () {});
        })
      }, 1000, { 'leading': true, 'trailing': false })
    }
  }
};