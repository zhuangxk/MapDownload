<template>
  <n-popover
    ref="popover"
    trigger="click"
    width="800"
  >
    <template #trigger>
      <span
        class="btn"
        title="样式配置"
      >
        样式配置
      </span>
    </template>
    <div class="style-box">
      <div class="form">
        <n-form
          ref="formRef"
          :label-width="80"
          :model="formValue"
          size="small"
        >
          <n-form-item
            label="要素"
            path="featureType"
          >
            <n-select 
              v-model:value="formValue.featureType"
              :options="featureTypeOptions"
            />
          </n-form-item>
          <n-form-item
            label="属性"
            path="elementType"
          >
            <n-select 
              v-model:value="formValue.elementType"
              :options="elementTypeOptions"
            />
          </n-form-item>
          <div style="margin-bottom: 24px">
            --- ---  ---- 样式  -  ---------
          </div>
          <n-form-item label="是否可见">
            <n-switch
              v-model:value="formValue.stylers.visibility"
              checked-value="on"
              unchecked-value="off"
            />
          </n-form-item>
          <n-form-item
            label="颜色"
          >
            <n-color-picker
              v-model:value="formValue.stylers.color"
              :show-alpha="true"
              :modes="['hex']"
            />
          </n-form-item>
          <n-form-item
            label="色相"
          >
            <n-color-picker
              v-model:value="formValue.stylers.hue"
              :modes="['hex']"
            />
          </n-form-item>
          <n-form-item
            label="亮度"
          >
            <n-slider
              v-model:value="formValue.stylers.lightness"
              :step="1"
              :max="100"
              :min="-100"
            />
          </n-form-item>
          <n-form-item
            label="饱和度"
          >
            <n-slider
              v-model:value="formValue.stylers.saturation"
              :step="1"
              :max="1000"
              :min="-1000"
            />
          </n-form-item>
          <n-form-item
            label="宽度 （只对点和线要素有效）"
          >
            <n-slider
              v-model:value="formValue.stylers.weight"
              :step="1"
              :max="8"
            />
          </n-form-item>
          <n-form-item>
            <n-button
              attr-type="button"
              type="primary"
              @click="handleAddClick"
            >
              添加规则
            </n-button>
          </n-form-item>
        </n-form>
      </div>
      <div style="flex:1">
        <div class="config-bar">
          <span
            class="btn"
            title="样式配置"
            @click="downloadJSON"
          >
            下载配置
          </span>
          <span
            class="btn"
            title="样式配置"
          >
            加载配置
          </span>
        </div>
        <div class="list-box">
          <div
            v-for="(item, index) in styleList"
            :key="index"
            class="list-item"
          >
            <span>
              {{ featureTypeMap[item.featureType] }} 
            </span>
            <span>
              {{ elementTypeMap[item.elementType] }}
            </span>
            <span
              class="btn"
              @click="handleDel(index)"
            >
              删除
            </span>
          </div>
        </div>
      </div>
    </div>
  </n-popover>
</template>

<script>
import {defineComponent, ref} from 'vue';
import {featureTypeOptions , elementTypeOptions } from '/@/utils/baiduStyle.js';
import { useMessage } from 'naive-ui';
import { cloneDeep } from 'lodash';
export default defineComponent({
  name: 'BaiduStyle',
  components: {
  },
  props: {
  },
  emits: ['preview'],

  setup(prop, {emit}) {
    const styleList = ref([]);

    const popover = ref();
    const message = useMessage();
    function convertArrayToObject(arr) {
      return arr.reduce((obj, item) => {
        obj[item.value] = item.label;
        return obj;
      }, {});
    }
    const featureTypeMap = convertArrayToObject(featureTypeOptions);
    const elementTypeMap = convertArrayToObject(elementTypeOptions);
    function downloadJSON() {
      var jsonStr = JSON.stringify(styleList.value, null, 2);
      var blob = new Blob([jsonStr], {type: 'application/json'});
      var url = URL.createObjectURL(blob);

      var a = document.createElement('a');
      a.href = url;
      a.download = 'style.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
    const formValue = ref({
      featureType: '',
      elementType: '',
      stylers: {
        visibility: 'on',
        color: '',
        hue: '',
        lightness: 1,
        saturation: 1,
        weight: '',
      },
    });
    return {
      featureTypeOptions,
      featureTypeMap,
      elementTypeOptions,
      elementTypeMap,
      popover,
      formValue,
      styleList,
      downloadJSON,
      handleAddClick(){
        const index = styleList.value.findIndex(i=>i.elementType == formValue.value.elementType 
          && i.featureType == formValue.value.featureType );
        if(!formValue.value.featureType) return;
        if(!formValue.value.elementType) return;
        if(index > -1){
          message.warning('已经存在样式');
          return;
        }
        styleList.value.push(cloneDeep(formValue.value));
        emit('preview', styleList.value);
      },
      handleDel(index){
        if (index > -1 && index < styleList.value.length) {
          styleList.value.splice(index, 1);
          emit('preview', styleList.value);
        }
      },
    };
  },
  data() {
    return {
    };
  },
  computed: {
  },
  mounted() {
  },
  methods: {
  },
});
</script>
<style lang="scss" scoped>

.style-box{
  display: flex;
  .form{
    width: 300px;
  }
}

.config-bar{
  display: flex;
  justify-content: flex-end;
  gap: 24px;
}


.list-box{
  padding: 12px;
  max-height: 800px;
  overflow: scroll;
  flex: 1;
  width: 100%;
}
.list-item{
  display: flex;
  gap: 16;
  justify-content: space-between;
  margin-left: 24px;
  margin-top: 8px;
}

.btn {
  cursor: pointer;
  color: #2080f0;
}
</style>

