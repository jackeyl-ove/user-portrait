import { userArrayType, userOptionsValueType } from './types'

export const selectOptions:userArrayType = {
  age: [
    {
      label: '0-16岁',
      value: 1
    },{
      label: '17-20岁',
      value: 2
    },{
      label: '21-30岁',
      value: 3
    }
  ],
  sex:[
    {label:'男',value: 1},
    {label:'女',value: 2},
  ],
  background:[
    {label:'中专',value: 1},
    {label:'大专',value: 2},
    {label:'本科',value: 3},
    {label:'硕士',value: 4},
    {label:'博士',value: 5},
  ]
}

export const selectValue:userOptionsValueType = {
  id:undefined,
  name:undefined,
  age: undefined,
  sex: undefined,
  background: undefined
}

export const columns = [
  {
    title: '学号',
    dataIndex: 'id',
  },
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
  },
  {
    title: '性别',
    dataIndex: 'sex',
  },
  {
    title: '学历',
    dataIndex: 'background',
  },
  {
    title: '进入直播间时间',
    dataIndex: 'inLive',
    key: 'inLive'
  },
  {
    title: '退出直播间时间',
    dataIndex: 'outLive',
    key: 'outLive'
  },
  {
    title: '观看媒体',
    dataIndex: 'media',
  },
  {
    title: '弹幕数量',
    dataIndex: 'pNum',
  },
];

export const upsColumns = [
  {
    title: '学号',
    dataIndex: 'id',
  },
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
  },
  {
    title: '性别',
    dataIndex: 'sex',
  },
  {
    title: '学历',
    dataIndex: 'background',
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action'
  }
];