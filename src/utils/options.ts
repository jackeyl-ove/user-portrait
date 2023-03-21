import { EChartsLineOption, EChartsOption } from './types'
export const intialradarChart: EChartsOption = {
  legend: {
    data: ['待分析用户']
  },
  radar: {
    // shape: 'circle',
    indicator: [
      { name: '年龄', max: 19 },
      { name: '性别', max: 2 },
      { name: '观看时长', max: 60 },
      { name: '星期因素', max: 5 },
      { name: '上课时间', max: 6 },
    ]
  },
}
export const radarChartOPtion: EChartsOption = {
  legend: {
    data: ['待分析用户']
  },
  radar: {
    // shape: 'circle',
    indicator: [

      { name: '年龄', max: 19 },
      { name: '性别', max: 2 },
      { name: '观看时长', max: 60 },
      { name: '星期因素', max: 5 },
      { name: '上课时间', max: 6 },
    ]
  },
  series: [
    {
      type: 'radar',
      data: [
        {
          value: [],
          name: '待分析用户'
        }
      ]
    }
  ]
};

export const intialxyChart: EChartsLineOption = {
  xAxis: {
    type: 'category',
    data: ['第1段', '第2段', '第3段', '第4段', '第5段', '第6段', '第7段']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [0,0,0,0,0,0,0],
      type: 'line'
    }
  ]
}
export const xyOPtion: EChartsLineOption = {
  xAxis: {
    type: 'category',
    data: ['第1段', '第2段', '第3段', '第4段', '第5段', '第6段', '第7段']
  },
  yAxis: {
    type: 'value'
  },
  series: []
};