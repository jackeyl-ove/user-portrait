<template>
  <div class="data-show-index">
    <div>
      <h1>筛选条件</h1>
      <a-row type="flex" justify="space-between" style="margin-bottom: 20px;">
        <a-col flex="50px" style="line-height: 30px;text-align: right;margin:0 10px 0 0;">学号:</a-col>
        <a-col :span="10"><a-input v-model:value="selects.id" placeholder="输入学号" /></a-col>
        <a-col flex="50px" style="line-height: 30px;text-align: right;margin:0 10px 0 0;">姓名:</a-col>
        <a-col :span="10"><a-input v-model:value="selects.name" placeholder="输入姓名" /></a-col>
      </a-row>

      <a-row type="flex" justify="space-between" style="margin-bottom: 20px;">
        <a-col flex="50px" style="line-height: 30px;text-align: right;margin:0 10px 0 0;">年龄:</a-col>
        <a-col :span="6">
          <a-select v-model:value="selects.age" style="width: 100%" placeholder="筛选年龄" :options="options.age"></a-select>
        </a-col>
        <a-col flex="50px" style="line-height: 30px;text-align: right;margin:0 10px 0 20px;">性别：</a-col>
        <a-col :span="6">
          <a-select v-model:value="selects.sex" style="width: 100%" placeholder="筛选性别" :options="options.sex"></a-select>
        </a-col>
        <a-col flex="50px" style="line-height: 30px;text-align: right;margin:0 0 0 20px;">学历：</a-col>
        <a-col :span="6">
          <a-select v-model:value="selects.background" style="width: 100%" placeholder="筛选学历"
            :options="options.background"></a-select>
        </a-col>
      </a-row>
    </div>
    <a-row type="flex" justify="center" style="margin-bottom: 20px;">
      <a-col :span="4"><a-button type="primary" @click="screenUser">筛选</a-button></a-col>
      <a-col ><a-button @click="reset">重置</a-button></a-col>
    </a-row>

    <a-divider />
    <h1>数据展示</h1>
    <a-table class="data-show-table" :columns="columns" :data-source="tableData" bordered>
      <template #bodyCell="{ record, column }">
        <template v-if="column.key === 'inLive'">
          {{ moment(record.inLive).format("YYYY年MM月DD日, hh:mm:ss") }}
        </template>
        <template v-else-if="column.key === 'outLive'">
          {{ moment(record.outLive).format("YYYY年MM月DD日, hh:mm:ss") }}
        </template>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { userArrayType, userOptionsValueType, userType } from '../../utils/types'
import { selectOptions, selectValue as InitialSelectValue, columns } from '../../utils/states'
import { useStore } from 'vuex'
import moment from 'moment'
import { useFilterData } from '@/utils/methods'


export default defineComponent({
  setup() {
    const selects = ref<userOptionsValueType>(InitialSelectValue)
    const Initial = JSON.parse(JSON.stringify(InitialSelectValue))
    const options = ref<userArrayType>(selectOptions)
    const tableData = ref<Array<userType|undefined>>([])
    const store = useStore()

    watch(() => store.state.userData, (newValue) => {
      if(newValue instanceof Promise) reset()
      const temp = JSON.parse(JSON.stringify(Initial))
      selects.value = temp
      tableData.value = []
    })

    const screenUser = ()=>{
      if(tableData.value.length === 0 )return
      store.state.userData.then((res: any) => {
        tableData.value = useFilterData(selects.value, res)
      }) 
      
    }

    const reset = ()=>{
      const temp = JSON.parse(JSON.stringify(Initial))
      selects.value = temp
      store.state.userData.then((res: any) => {
        tableData.value = res || []
      }) 
    }
    
    if(store.state.dataReady) reset()

    return {
      options,
      selects,
      columns,
      tableData,
      moment,
      reset,
      screenUser
    };
  }
})
</script>
<style>
.data-show-index {
  width: 85%;
  margin: auto;
}
</style>