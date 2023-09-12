<template>
  <div
    v-loading="loading"
    class="themeForm"
    :element-loading-text="loadingText"
    element-loading-spinner="el-icon-loading"
  >
    <t-director-info-modal/>

    <t-form
      ref="$form"
      :custom-components="components"
      :form-data="form"
      :custom-rules="customRules"
      
    >
      <t-form-field-layout v-if="showLayout" />
    </t-form>
    <div class="themeForm-footer">
      <el-button @click="handleSave">
        暂存
      </el-button>
      <el-button v-if="!fromDraft" @click="handleBack">
        上一步
      </el-button>
      <el-button type="primary" @click="handleNext">
        {{ nextStepText }}
      </el-button>
    </div>
  </div>
</template>

<script>
import TDirectorInfoModal from "@/oneThing/businessComponents/t-directorInfo-modal";

import TFormFieldLayout from '../../components/t-form-layout/TFormFieldLayout';
import TForm from '../../components/t-form';
import { mapGetters, mapMutations, mapState } from 'vuex';
import { projectClient } from '@/client';
import { formatFields, formatFiles } from '../../components/t-form/utils';
import _ from 'lodash';
import { saveInfo } from '../../utils/onething';
import $utils from '@/utils';

const { formatRouteName } = $utils;

export default {
  name: 'ThemeForm',
  components: {
    TFormFieldLayout,
    TForm,
    TDirectorInfoModal,
   
  },
  inject: ['getContainer'],
  provide() {
    return {
      afterRenderDynamicForm: (...args) => this.container.$afterRenderDynamicForm(...args),
    };
  },
  props: {
    fromDraft: {
      default: false,
      type: Boolean,
    },
  },
  data() {
    return {
      isSaveProgress: false,
      container: null,
      loading: false,
    };
  },
  computed: {
    ...mapGetters('users', ['userType']),
    ...mapState('theme', ['themeInfo', 'formDesc', 'updateForm', 'formParams']),
    ...mapGetters('theme', ['guideRules', 'matterIds']),
    ...mapGetters('onething', ['nextStep', 'lastStep']),
    showLayout(){
      return !_.isEmpty(this.formDesc.allfield)
    },
    loadingText() {
      if (this.isSaveProgress) {
        return '加载中';
      }
      return '表单加载中。。。';
    },
    customRules() {
      if (!this.container) {
        return {};
      }
      return this.container.$rules();
    },
    components() {
      if (!this.container) {
        return {};
      }
      return this.container.$components();
    },
    form() {
      return _.pick(this.formDesc, 'allfield');
    },
    nextStepNeedSubmit() {
      // 去掉材料页面时，‘下一步’变为‘提交’
      return this.container && this.container.omitThemeMaterial;
    },
    nextStepText() {
      return this.nextStepNeedSubmit ? '提交' : '下一步';
    },
  },
  created() {
    this.getForm();
  },
  methods: {
    ...mapMutations('theme', ['changeFormDesc', 'updateFormMatterIds', 'saveThemeInfo', 'changeUpdateForm', 'clearThemeState']),
    getForm() {
      const { id } = this.themeInfo;
      this.container = this.getContainer(this.fromDraft);
      this.container.$hitForms(this.matterIds);
      this.loading = true;
      this.getSxFormData(id)
        .then(form => {
          this.changeFormDesc(form);
        })
        .then(() => {
          this.changeUpdateForm(false);
          this.container.$afterRenderForm(() => this.form);
        })
        .catch(e => {
          console.log('e ==>', e);
          this.$message({
            type: 'error',
            message: `表单加载出错，${e}`,
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getSxFormData(sceneid) {
      if (!_.isEmpty(this.formDesc) && !this.updateForm) return Promise.resolve(this.formDesc);
      if (this.fromDraft) {
        return projectClient().getDraftDetail(sceneid)
          .then(res => {
            const {
              packageName: name,
              sceneId: id,
              regionCode,
              matterIds = [],
              ...others
            } = res;
            this.updateFormMatterIds(matterIds);
            sessionStorage.setItem('themeRegionCode', regionCode);
            this.saveThemeInfo({ name, id });
            this.container.$hitForms(matterIds);
            return this.container.$init(others);
          });
      }
      this.container.$hitForms(this.matterIds);
      return projectClient().getSxForm({
        sxIds: this.matterIds.join(),
        rule: encodeURI(JSON.stringify(this.guideRules)),
        sceneid,
      })
        .then(form => this.container.$init(form))
        .then(nextForm => {
          const {
            allfield,
            allfile,
            ...others
          } = nextForm;
          return {
            ...others,
            allfield: formatFields(allfield),
            allfile: formatFiles(allfile),
          };
        })
        .then(nextForm => this.container.$beforeRenderForm(nextForm));
    },
    handleNext() {
      this.$refs.$form.validate()
        .then(() => this.nextStepNeedSubmit && this.submitForm())
        .then(() => {
          this.$router.push({ name: this.nextStep });
        });
    },
    submitForm() {
      return Promise.resolve(this.container.$beforeFormSubmit())
        .then(() => projectClient().submitSx(this.formDesc, this.themeInfo))
        .catch(e => {
          this.$message({
            type: 'error',
            message: `表单提交出错，${e}`,
          });
          throw e;
        });
    },
    handleSave() {
      this.isSaveProgress = true;
      this.loading = true;
      saveInfo(this.formDesc, {
        confirmCallback: () => {
          this.clearThemeState();
          const name = formatRouteName('draftBox', this.userType);
          this.$router.push({
            name,
          });
        },
        cancelCallback: () => {
          this.$router.push({ name: 'onethingSpecialColumn' });
        },
        finallyCallback: () => {
          this.isSaveProgress = false;
          this.loading = false;
        },
      });
    },
    handleBack() {
      this.$router.replace({ name: this.lastStep });
    },
  },
};
</script>

<style lang="scss" scoped>
.themeForm {
  background: #ffffff;
  overflow: hidden;
  .themeForm-footer {
    padding: 0 20px;
    margin: 20px 0;
    text-align: right;
    .el-button{
      line-height: 24px;
      padding: 12px 46px;
    }
    .el-button--default{
      border: 1px solid #4393F5;
      color: #4393F5;
    }
  }
}
</style>
