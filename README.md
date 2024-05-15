<h1 align="center">基于Vue3.x开发，Vite打包的迷你实时天气预报组件</h1>

<div align="center">

<img src='https://raw.githubusercontent.com/hjiachuang/vue3-mini-weather/master/weather.png' />

![GitHub watchers](https://img.shields.io/github/watchers/hjiachuang/vue3-mini-weather?style=social) ![GitHub stars](https://img.shields.io/github/stars/hjiachuang/vue3-mini-weather?style=social) ![GitHub forks](https://img.shields.io/github/forks/hjiachuang/vue3-mini-weather?style=social)
<br />
![GitHub package.json version](https://img.shields.io/github/package-json/v/hjiachuang/vue3-mini-weather?style=flat-square) ![GitHub](https://img.shields.io/github/license/hjiachuang/vue3-mini-weather?style=flat-square) ![GitHub open issues](https://img.shields.io/github/issues/hjiachuang/vue3-mini-weather?style=flat-square) ![GitHub closed issues](https://img.shields.io/github/issues-closed/hjiachuang/vue3-mini-weather) ![GitHub last commit](https://img.shields.io/github/last-commit/hjiachuang/vue3-mini-weather?style=flat-square) ![GitHub top language](https://img.shields.io/github/languages/top/hjiachuang/vue3-mini-weather?style=flat-square)

</div>

#### 项目展示
[vue3-mini-weather展示页](https://apia.aidioute.cn/resource/vue-mini-weather/)

> 从`vue-mini-weather`迁移过来的基于`vue3.x`框架开发，`Vite`打包的一款迷你天气预报展示的小组件，目前只支持中国大陆的天气预报，原因在更新公告中有，有问题请提[issue](https://github.com/hjiachuang/vue3-mini-weather/issues)

#### 目录结构
```
-npm                    // 这个文件夹是上传到npm仓库的，也就是npm i vue3-mini-weather下载的内容就是这个文件夹里的内容
  -npm
  -src
    -lib
  ...
-public
  favicon.ico
-src                    // 项目源文件，跟npm里的就是少了个App.vue和main.ts而已
  -lib
  App.vue
  main.ts
...
```

#### 📦 安装

  **2023.03.10** 

  **注意：因为刚上传更新到npm仓库没多久，可能其他镜像源还没有同步过去，所以要下载只能切换npm源。**

```bash
npm i vue3-mini-weather --save
```

```javascript
// 1. 全局引入

//main.js 项目入口文件
import { createApp } from 'vue'
import App from './App.vue'
import weather from 'vue3-mini-weather'

createApp(App).use(weather).mount('#app')


//app.vue 项目文件
<template>
  <v-mini-weather>
    <template #default="{weather, icon}">
      <!--插入图标-->
      <v-mini-weather-icon :icon="icon"></v-mini-weather-icon>
      <!--DIY内容-->
      <span>{{weather.cityname}}/{{weather.weather}}/{{weather.temp}}</span>
    </template>
  </v-mini-weather>
</template>

// 2. 局部引入 
//app.vue 项目文件
<template>
  <v-mini-weather>
    <template #default="{weather, icon}">
      <!--插入图标-->
      <v-mini-weather-icon :icon="icon"></v-mini-weather-icon>
      <!--DIY内容-->
      <span>{{weather.cityname}}/{{weather.weather}}/{{weather.temp}}</span>
    </template>
  </v-mini-weather>
</template>

<script setup>
import { vMiniWeather, vMiniWeatherIcon } from 'vue3-mini-weather'
</script>

```

#### 📝 参数说明
```javascript
// v-mini-weather参数

url: {     // 天气小组件调用的天气查询API
  type: String,
  default: 'https://apia.aidioute.cn/weather/'
},

// 自定义请求，可用于模拟数据、格式化接口参数等
// 返回 示例： Promise.resolve({ status: 200, data: {...} }), 与默认 api 一致 
customRequest: {
  type: (url) => Promise<any>
}

// v-mini-weather-icon参数

icon: {     // 天气图标编号
  type: String,
  default: 'd00' // 默认白天-晴
}
type: {     // 天气图标类型 -- fill / line
  type: String,
  default: 'fill'
}
```

#### 📖 更新

* **版本0.1.2**
  
  更新时间：2023.03.10

  1. `icon`参数有时候带`d`和`n`，导致图标组件报错，找不到对应图标，所以不显示，加了个判断，自动加减`d`和`n`。

* **版本0.1.1**
  
  更新时间：2022.11.15

  1. 从js迁移到ts，添加了.d.ts文件。
  2. 修改图标比例，之前版本的图标不协调，有些大有些小，重新改了。
  3. `v-mini-weather`默认还导出了一个参数icon，直接传给`v-mini-weather-icon`就可以了，详见上面的使用方法
  4. `v-mini-weather-icon`组件添加一个props参数: `type`，见上面的参数说明。

* **版本0.1.0**
  
  更新时间：2022.10.17

  1. 从vue-mini-weather迁移过来的，具体内容看[vue-mini-weather](https://github.com/hjiachuang/vue-mini-weather)，这里不再重复赘述。

#### 📝 说明

* 项目使用到了开源的天气动态icon，来源于[basmilius](https://github.com/basmilius/weather-icons)

* 获取天气的前提是需要获取您当前的位置信息，默认使用HTML5的定位功能，如果定位失败的话，则采用IP地址定位的方式获取位置信息，再获取天气信息。

#### 📝 依赖

* [axios](https://github.com/axios/axios)

* [lottie-web](https://github.com/airbnb/lottie-web)

#### 📝 License

[MIT](https://github.com/hjiachuang/vue-mini-weather/blob/master/LICENSE)

Copyright © 2022-present [hjiachuang](https://github.com/hjiachuang).
