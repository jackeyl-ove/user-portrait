import { userType } from "./types"
import moment from "moment"

export function useFilterData(condition: any, baseData: Array<userType | undefined>): Array<userType | undefined> {
  const temp: Array<userType | undefined> = []
  baseData.forEach((item) => {
    if (!item) return
    if ((condition.id && item.id.toString().includes(condition.id as string | '')) || !condition.id) {
      if ((condition.name && item.name.includes(condition.name as string | '')) || !condition.name) {
        if ((condition.age && judgeAge(item.age) === condition.age) || !condition.age) {
          if ((condition.sex && judgeSex(item.sex) === condition.sex) || !condition.sex) {
            if ((condition.background && judgeBGC(item.background) === condition.background) || !condition.background) {
              temp.push(item)
            }
          }
        }
      }
    }
  })
  return temp
}

export function judgeAge(age: number) {
  let status
  if (age <= 16) {
    status = 1
  } else if (age > 16 && age <= 20) {
    status = 2
  } else if (age > 21 && age <= 30) {
    status = 3
  } else {
    status = 0
  }
  return status
}

export function judgeSex(sex: string) {
  let status
  switch (sex) {
    case '男':
    case 'man':
      status = 1
      break;
    case '女':
    case 'woman':
      status = 2
      break;
    default:
      status = 0
      break;
  }
  return status
}

export function judgeBGC(background: string) {
  let status
  switch (background) {
    case '中专':
      status = 1
      break;
    case '大专':
      status = 2
      break;
    case '本科':
      status = 3
      break;
    case '硕士':
      status = 4
      break;
    case '博士':
      status = 5
      break;
    default:
      status = 0
      break;
  }
  return status
}

export function analyseConcentration(age: number, time: number, sex: string | null, weekday: number, beginH: number, beginM: number) {
  let score = 0
  const scores: Array<any> = [0,0,0,0,0]

  // 年龄
  if (age <= 19) {
    scores[0] = age
    score += age
  } else {
    scores[0] = 19 - (age - 19)
    score += 19 - (age - 19)
  }

  // 性别
  if (sex && sex === '女') {
    scores[1] = 2
    score += 2
  } else {
    scores[1] = 1
    score += 1
  }

  // 时长
  if (time <= 120) {
    scores[2] = Math.floor(time / 2)
    score += Math.floor(time / 2)
  } else {
    scores[2] = Math.floor((120 - (time - 120)) / 2)
    score += Math.floor((120 - (time - 120)) / 2)
  }

  // 星期因素
  if (weekday <= 5) {
    scores[3] = 6 - weekday
    score += 6 - weekday
  } else {
    scores[3] = 1
    score += 1
  }

  // 开始时间
  let beginMinute: number
  if (beginH < 9 && beginH >= 7) {
    beginMinute = (beginH - 7) * 60 + beginM
    scores[4] = 6 - Math.floor(beginMinute/20)
    score += Math.floor(beginMinute/20)
  } else if (beginH < 11 && beginH >= 9) {
    beginMinute = (beginH - 9) * 60 + beginM
    scores[4] = 6 - Math.floor(beginMinute/20)
    score += 6 - Math.floor(beginMinute/20)
  } else if (beginH < 17 && beginH >= 14) {
    beginMinute = (beginH - 14) * 60 + beginM
    scores[4] = 6 - Math.floor(beginMinute/20)
    score += 6 - Math.floor(beginMinute/20)
  } else {
    scores[4] = 1
    score += 1
  }
  

  return {
    text: separateConcentration(score),
    score: score,
    scoreArr: scores
  }
}

function separateConcentration(score: number) {
  const status = ['离散状态', '漫不经心', '认真听课', '聚精会神']
  if (score <= 35) {
    return status[0]
  } else if (score > 35 && score <= 50) {
    return status[1]
  } else if (score > 50 && score <= 70) {
    return status[2]
  } else if (score > 70) {
    return status[3]
  }
}

export function analyseActivity(pNum: number, time: string) {
  let score = 0
}