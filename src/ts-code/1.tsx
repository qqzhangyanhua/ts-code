import {
  defineComponent,
  defineAsyncComponent,
  h,
  resolveComponent,
  KeepAlive,
  ref,
  computed,
  unref,
  reactive,
  nextTick,
  onMounted,
} from 'vue';
import './create-public.less';
import { useTickFormStore } from '/@/store/modules/tick';
import { useRouter } from 'vue-router';
import { Button, message } from 'ant-design-vue';
import Icon from '/@/components/Icon';
import CheckBidder from './components/check-bidder';
import BindingDocument from './components/binding-document';
import ModelTerms from './components/model-terms';
import DocumentDrawing from './components/document-drawing';
import { useMenuSetting } from '/@/hooks/setting/useMenuSetting';
import { useHeaderSetting } from '/@/hooks/setting/useHeaderSetting';
import { biddingForm, getTickFormId, putTableList, submitBidding } from '/@/api/project-tick';

interface TSubmitForm {
  biddingDeclareFormId: number | string;
  tendererNotice: any;
  tenderDoc: any;
  techDoc: any;
}
export default defineComponent({
  name: 'CreatePublic',
  components: {
    BindingModel: defineAsyncComponent(() => import('./components/binding-model')),
    CheckBidder,
    BindingDocument,
    EvaluationMethod: defineAsyncComponent(() => import('./components/evaluation-method')),
    ContractTemplates: defineAsyncComponent(() => import('./components/contract-template')),
    DocumentDrawing,
  },
  setup() {
    const { getShowMenu } = useMenuSetting();
    const { getShowHeader } = useHeaderSetting();
    const getIsUnFold = computed(() => !unref(getShowMenu) && !unref(getShowHeader));
    const tabItem = [
      { name: '招标模式', comp: 'BindingModel' },
      { name: '投标人须知', comp: 'CheckBidder' },
      { name: '技术和图纸', comp: 'BindingDocument' },
      { name: '投标文件', comp: 'DocumentDrawing' },
      { name: '评标办法', comp: 'EvaluationMethod' },
      { name: '合同模板', comp: 'ContractTemplates' },
    ];
    onMounted(() => {
      console.log('onMounted========');
    });
    const userTickStore = useTickFormStore();
    // const { biddingMode } = userTickStore;
    const router = useRouter();
    const isShowModelTerms = reactive({ visible: false });
    router.beforeEach(() => {
      userTickStore.resetActiveTab();
    });
    const biddingMode = reactive({
      type: undefined,
      mode: undefined,
      id: undefined,
      configId: undefined,
    });
    const activeTab = ref(1);
    const toPreview = () => {
      if (biddingMode.id) {
        return;
      }
      console.log('预览==', userTickStore);
    };
    const isEmptyObj = reactive({
      BindingModel: 0,
      CheckBidder: 17,
      BindingDocument: 20,
      DocumentDrawing: 30,
      EvaluationMethod: 0,
      ContractTemplates: 0,
    });
    const isShowValidation = ref(false);
    let submitForm: TSubmitForm = reactive({
      biddingDeclareFormId: '',
      tendererNotice: {},
      tenderDoc: {},
      techDoc: [],
    });
    const onSubmit = () => {
      // 弹框
      // isShowModelTerms.visible = true;
      console.log('提交==111', isEmptyObj);
      for (const key in isEmptyObj) {
        if (isEmptyObj[key] > 0) {
          // saveDraft('submit');
          isShowValidation.value = true;
          // return;
        }
      }

      // 显示未填项目
      saveDraft('submit').then(() => {
        submitBidding({ declareFormId: biddingMode.id }).then(() => {
          console.log('提交成功111111111111111');
        });
      });
      console.log('提交==', submitForm);
    };
    //提交的时候校验是否显示
    const renderValidation = (item) => {
      return isEmptyObj[item.comp] > 0 ? (
        <span style="color: #F72B53">{isEmptyObj[item.comp]}项待完善</span>
      ) : (
        <span>已完善</span>
      );
    };
    // 保存草稿
    const compRef = ref();
    const saveDraft = (type = 'null') => {
      if (!biddingMode.id) {
        return;
      }
      handelChange('save');
      console.log('保存草稿=====', submitForm);

      if (compRef.value?.key) {
        const params: any = {
          tendererNotice:
            Object.keys(submitForm.tendererNotice).length > 0
              ? submitForm.tendererNotice
              : undefined,
          biddingDeclareFormId: biddingMode.id,
          techDocs: submitForm?.techDoc?.groups?.length > 0 ? submitForm.techDoc : undefined,
        };
        return new Promise((resolve, reject) => {
          biddingForm(params)
            .then(() => {
              if (type === 'null') {
                message.success('保存草稿成功');
              }
              resolve('success');
            })
            .catch(() => {
              reject('error');
            });
        });
      }
    };
    const handelOk = () => {
      isShowModelTerms.visible = false;
    };
    // 点击下一步的时候需要把当前实例的值给存取
    const handelChange = (type) => {
      const key = compRef.value?.key;
      console.log('ref============', compRef.value);
      submitForm.biddingDeclareFormId = biddingMode.id!;
      if (key) {
        // 投标人须知
        if (key === 'tendererNotice') {
          submitForm.tendererNotice = compRef.value.draftValue();
          nextTick(async () => {
            const count = await compRef.value.isEmptyNumber();
            console.log('count======', count);
            isEmptyObj.CheckBidder = count;
          });
        }
        // 等于投标文件的时候无论是草稿还是提交都需要把投标文件的值给存取
        if (key === 'tender_doc') {
          submitForm.techDoc = compRef.value.draftValue();
          const count = compRef.value.isEmptyNumber();
          isEmptyObj.DocumentDrawing = count;
          console.log('count======1111111', count);
          if (type === 'save') {
            const params = compRef.value.draftValue();
            putTableList(params).then(() => {
              // 提交成功可以什么也不做
            });
          }
        }
        // 技术文件和图纸
        if (key === 'tech_doc') {
          const techDoc = compRef.value.draftValue();
          const count = compRef.value.isEmptyNumber();
          isEmptyObj.BindingDocument = count;
          submitForm.techDoc = techDoc;
        }
      }
    };

    // 下一步
    const goNext = async () => {
      // userTickStore.goNext();
      if (activeTab.value === 6) {
        return;
      }
      if (!biddingMode.id) {
        const params = {
          mainProjectId: 2,
          patternRuleId: biddingMode.configId,
        };
        const data = await getTickFormId(params);
        biddingMode.id = data.id || 10086;
      }
      activeTab.value++;
      handelChange(null);
    };
    // 上一步
    const goPrevious = () => {
      handelChange(null);
      if (activeTab.value === 1) {
        return;
      }
      activeTab.value--;
      // userTickStore.goBack();
    };
    const handelTabClick = (index) => {
      if (!biddingMode.id) {
            message.error('请先选择类型和模式');
         return;
       }
      activeTab.value = index + 1;
      // userTickStore.setActiveTab(index + 1);
    };
    return () => (
      <div class="ml-4 px-4 pb-x create-public bg-white">
        <div class="create-public-header" style={getIsUnFold.value ? { top: '32px' } : undefined}>
          <div class="flex justify-between">
            <div>
              <h2 class="text-hex-000 text-xl">
                <Icon
                  icon="ant-design:arrow-left-outlined"
                  size="20"
                  class="pr-2 cursor-pointer"
                  onClick={() => router.go(-1)}
                />
                创建招采文件
              </h2>
              <p>项目招采/创建招采文件</p>
            </div>
            <div class="create-public-btn">
              <Button
                type="primary"
                class={`mr-2 ${!biddingMode.id ? 'disabled-ghost' : ''}`}
                onClick={saveDraft.bind(null, 'null')}
              >
                保存草稿
              </Button>
              <Button
                type="primary"
                ghost
                onClick={toPreview}
                class={`mr-2 ${!biddingMode.id ? 'disabled-ghost' : ''}`}
              >
                预览
              </Button>
              <Button
                type="primary"
                ghost
                onClick={onSubmit}
                class={`${!biddingMode.id ? 'disabled-ghost' : ''}`}
              >
                发布
              </Button>
            </div>
          </div>
          <ul class="flex tab-ul">
            {tabItem.map((item, index) => (
              <li
                key={index}
                class={`relative font-medium flex items-center cursor-pointer flex-1 justify-center border-b-2 border-transparent ${
                  activeTab.value === index + 1 ? 'active-tab' : ''
                }${!biddingMode.id ? 'cursor-not-allowed' : ''}`}
                onClick={handelTabClick.bind(this, index)}
              >
                {activeTab.value > index + 1 ? (
                  <Icon icon="ant-design:check-circle-outlined" size="28" color="#47b871" />
                ) : (
                  <span
                    class={`text-hex-0000003f m-1px border min-w-26px w-26px h-26px rounded-1\/2 leading-24px inline-block text-center ${
                      activeTab.value === index + 1 ? 'active-tab-round' : ''
                    }`}
                  >
                    {index + 1}
                  </span>
                )}
                <div class="create-public-tab-text">
                  <p> {item.name}</p>
                  {isShowValidation.value ? renderValidation(item) : null}
                </div>
                {index !== tabItem.length - 1 && (
                  <Icon
                    icon="ant-design:right-outlined"
                    size="20"
                    class="absolute right-0"
                    style="color:#ddd"
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <KeepAlive>
            {h(resolveComponent(tabItem[activeTab.value - 1].comp), {
              ref: compRef,
            })}
          </KeepAlive>
          <div class="create-public-btn">
            <Button
              type="primary"
              onClick={goPrevious}
              ghost
              class={`mr-4  ${activeTab.value < 2 ? 'disabled-ghost' : ''}`}
            >
              上一步
            </Button>
            <Button
              type="primary"
              ghost
              onClick={goNext}
              class={`${activeTab.value === tabItem.length ? 'disabled-ghost' : ''}`}
            >
              下一步
            </Button>
          </div>
        </div>
        <ModelTerms visible={isShowModelTerms} onOk={handelOk} />
      </div>
    );
  },
});
