<template>
  <a-layout class="layout">
    <a-layout-header>
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="horizontal" :style="{ lineHeight: '64px' }">
        <a-menu-item key="1"><router-link to="/dataShow">数据可视化</router-link></a-menu-item>
        <a-menu-item key="2"><router-link to="/ups">用户画像分析</router-link></a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 25px 50px">
      <upload-btn></upload-btn>
      <div :style="{
        background: '#fff', marginTop: '10px', padding: '24px' , minHeight: '280px' }"><router-view /></div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      弹幕直播教学后台系统
    </a-layout-footer>
  </a-layout>
</template>
<script lang="ts">
import UploadBtn from './components/Upload.vue'
import { defineComponent, provide, ref } from 'vue';
import * as echarts from 'echarts'
import router from '@/router';
export default defineComponent({
  components: {
    UploadBtn
  },
  setup() {
    const selectedKeys = ref<string[]>(['1'])
    router.push('/')
    provide('echarts', echarts)
    return {
      selectedKeys
    };
  },
});
</script>
<style>
.site-layout-content {
  min-height: 280px;
  padding: 24px;
  background: #fff;
}

#components-layout-demo-top .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

[data-theme='dark'] .site-layout-content {
  background: #141414;
}
</style>
