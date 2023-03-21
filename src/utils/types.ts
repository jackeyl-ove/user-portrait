import echarts, { LegendComponentOption, RadarSeriesOption } from "echarts";
import { TitleComponentOption } from "echarts/components";

export interface userType {
  id: string,
  name: string,
  age: number,
  sex: string,
  background: string,
  inLive: string,
  outLive: string,
  media: string,
  pNum: number,
  bullet: string
}
export interface userOptionsValueType {
  id: string | undefined,
  name: string | undefined,
  age: number | undefined,
  sex: string | undefined,
  background: string | undefined,
}
export interface userArrayType {
  age: Array<Object>,
  sex: Array<Object>,
  background: Array<Object>,
}

export type EChartsOption = echarts.ComposeOption<
  TitleComponentOption | LegendComponentOption | RadarSeriesOption
>;

export type EChartsLineOption = echarts.EChartsOption;