<template>
  <div class="ups-index">
    <h1>用户画像</h1>
    <a-table :columns="upsColumns" :data-source="tableData" bordered :scroll="{ y: 230 }" :pagination="{ pageSize: 10 }"
      size="middle">
      <template #bodyCell="{ record, column }">
        <template v-if="column.key === 'action'">
          <a-button type="primary" @click="() => analyse(record)">
            <a-anchor-link href="#concentrationDom" class="anchor" title="用户画像绘制" />
          </a-button>
        </template>
      </template>
    </a-table>
    <!-- <a-button type="primary" style="margin-top: 10px;" @click="analyseAll"> 群体用户画像绘制 </a-button> -->
    <a-divider />
    <a-row a-row type="flex" justify="space-between" style="margin-bottom: 20px;">
      <a-col :span="11">
        <a-card class="analyse-card" :loading="analyseLoading" title="专注度" hoverable>
          <div id="concentrationDom" style="height: 400px;width: 100%;"></div>
          <div v-if="resultConcentration !== ''">
            该生状态为：<span class="result-word">{{ resultConcentration }}</span>
            <div></div>
            专注度为： <span class="result-word-pencent">{{ resultConcentrationPercent }}%</span>
          </div>
        </a-card>
      </a-col>

      <a-col :span="11">
        <a-card class="analyse-card" :loading="analyseLoading" title="弹幕活跃度" hoverable>
          <div id="activityDom" style="height: 400px;width: 100%;"></div>
          <div v-if="resultActivity !== ''">
            弹幕总数为： <span class="result-word-pencent">{{ resultActivity }}</span>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts">
import { defineComponent, inject, onMounted, ref, watch } from 'vue'
import moment from 'moment'
import { upsColumns } from '../../utils/states'
import { userType } from '@/utils/types'
import { useStore } from 'vuex'
import { analyseConcentration } from '@/utils/methods'
import { radarChartOPtion, intialradarChart, intialxyChart, xyOPtion } from '@/utils/options'
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  LegendComponent,
  GridComponent,
} from 'echarts/components';
import { RadarChart, LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

echarts.use([TitleComponent, LegendComponent, RadarChart, CanvasRenderer, LineChart, GridComponent, UniversalTransition]);

export default defineComponent({
  setup() {
    const tableData = ref<Array<userType | undefined>>([])
    const store = useStore()
    const analyseLoading = ref<Boolean>(false)
    const resultActivity = ref<string>('')
    const resultConcentration = ref<string | undefined>('')
    const resultConcentrationPercent = ref<number | undefined>(undefined)
    const concentrationChart = ref<any>(null)
    const activeChart = ref<any>(null)

    watch(() => store.state.userData, (newValue) => {
      if (newValue instanceof Promise) reset()
      tableData.value = []
    })

    onMounted(() => {
      const concentrationChartTemp = echarts.init(document.getElementById('concentrationDom') as HTMLElement);
      const activeChartTemp = echarts.init(document.getElementById('activityDom') as HTMLElement);
      concentrationChart.value = concentrationChartTemp
      concentrationChart.value.setOption(intialradarChart, true)
      activeChart.value = activeChartTemp
      activeChart.value.setOption(intialxyChart, true)
    })

    const reset = () => {
      store.state.userData.then((res: any) => {
        tableData.value = res || []
      })
    }
    // 个体分析
    const analyse = (data: userType) => {
      const bullet = data.bullet.split(';').map((item) => Number(item))
      const time = moment.duration(moment(data.outLive).diff(moment(data.inLive)))
      const {
        text,
        score,
        scoreArr
      } = analyseConcentration(data.age, time.minutes(), data.sex, moment(data.inLive).weekday(), moment(data.inLive).hours(), moment(data.inLive).minutes())
      setTimeout(() => {
        resultConcentration.value = text
        radarChartOPtion.legend = { data: [data.name] }
        radarChartOPtion.series = [
          {
            type: 'radar',
            data: [
              {
                value: scoreArr,
                name: data.name
              }
            ]
          }
        ]
        concentrationChart.value.clear()
        concentrationChart.value.setOption(radarChartOPtion, true)
        resultConcentrationPercent.value = score / 80 * 100

        resultActivity.value = data.pNum.toString()
        console.log(bullet);
        
        xyOPtion.xAxis = {
          type: 'category',
          data: bullet.map((item, index) => `第${index+1}段20分钟`)
        }
        xyOPtion.series = [
          {
            data: bullet,
            type: 'line'
          }
        ]
        activeChart.value.clear()
        activeChart.value.setOption(xyOPtion, true)
      }, 500)
    }

    // 群体分析
    // const analyseAll = () => {
    //   const length = tableData.value.length
    //   let AVELiveTime = 0
    //   let AVEAge = 0
    //   tableData.value.forEach((item: userType | undefined) => {
    //     if (!item) return
    //     AVELiveTime += moment.duration(moment(item.outLive).diff(moment(item.inLive))).minutes()
    //     AVEAge += item.age
    //   })
    //   analyseLoading.value = true
    //   setTimeout(() => {
    //     resultConcentration.value = analyseConcentration(Math.ceil(AVEAge / length), Math.ceil(AVELiveTime / length), null, null)
    //     analyseLoading.value = false
    //   }, 1000)
    // }

    if (store.state.dataReady) reset()
    return {
      moment,
      upsColumns,
      tableData,
      analyse,
      // analyseAll,
      analyseLoading,
      resultConcentration,
      resultActivity,
      resultConcentrationPercent,
    }
  },
})
</script>
<style>
.ups-index {
  width: 85%;
  margin: auto;
}

.have-not-analyse {
  color: rgb(101, 102, 102);
  font-size: 30px;
  text-align: center;
  margin-top: 10%;
}

.analyse-card {
  /* height: 700px; */
}

.result-word {
  font-weight: 700;
  font-size: 20px;
  text-align: center;
  color: rgb(3, 40, 107);
}

.result-word-pencent {
  font-weight: 700;
  font-size: 20px;
  text-align: center;
  color: rgb(167, 26, 49);
}

.anchor {
  width: 100%;
  height: 100%;
  padding: 0!important;
}
.ant-anchor-link-title {
  color: white;
  line-height: 16px;
}
</style>
