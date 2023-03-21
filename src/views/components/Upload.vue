<template>
  <div>
    <a-upload v-model:file-list="fileList" name="file" :customRequest="requestXLS" :beforeUpload="beforeUP"
      @change="handleChange" accept="xls,xlsx" maxCount="1" @remove="removeFile">
      <a-button type="primary">
        <upload-outlined></upload-outlined>
        导入数据
      </a-button>
    </a-upload>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { UploadOutlined } from '@ant-design/icons-vue';
import xlsx from 'xlsx'
import { message, UploadChangeParam } from 'ant-design-vue';
import { useStore } from 'vuex'

export default defineComponent({
  components: {
    UploadOutlined,
  },
  setup() {
    const fileList = ref([]);
    const store = useStore()
    
    const requestXLS = (file: any) => {
      console.log(file.data);
    }
    const beforeUP = async (file: any) => {
      await store.dispatch('SetUserData', readExcelFile(file, 0))
      return false
    }
    const handleChange = (info: UploadChangeParam) => {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    };

    const readFile = (file: File) => {
      return new Promise(resolve => {
        let reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = ev => {
          resolve(ev.target?.result);
        }
      });
    }
    const readExcelFile = async (file: File, sheetIndex: number) => {
      let data = await readFile(file);
      let workbook = xlsx.read(data, { type: 'binary' });
      let worksheet = workbook.Sheets[workbook.SheetNames[sheetIndex]];
      data = xlsx.utils.sheet_to_json(worksheet);
      return data;
    }

    const removeFile = async ()=>{
      await store.dispatch('SetUserData', [])
      return true
    }

    return {
      fileList,
      handleChange,
      requestXLS,
      beforeUP,
      removeFile
    }
  },
})
</script>
<style></style>
