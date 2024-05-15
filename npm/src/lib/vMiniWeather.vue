<script setup lang="ts">
import { ref, onBeforeMount, onBeforeUnmount, Ref } from 'vue'
import axios from 'axios'

const props = defineProps({
  url: {
    type: String,
    default: 'https://apia.aidioute.cn/weather/'
  },
  // 用户自行处理 request, url、响应结构等
  customRequest: {
    type: Function,
  },
})
const emit = defineEmits(['notice'])
const isObject = (obj:unknown) => {
  return obj !== null && Object.prototype.toString.call(obj) === '[object Object]'
}
const handleSendError = (data:unknown) => {
  emit('notice', data)
}
const updating = ref(false)

const latitude = ref('')
const longitude = ref('')
const handleGetLocation = () => {
  if (typeof window !== 'undefined' && window.navigator.geolocation) {
    window.navigator.geolocation.getCurrentPosition(
      (result) => {
        latitude.value = result.coords.latitude.toFixed(6)
        longitude.value = result.coords.longitude.toFixed(6)
      },
      (error) => {
        switch (error.code) {
          case 0:
            handleSendError({
              type: 'warning',
              from: 'window.navigator.geolocation',
              msg: '获取位置信息出错！'
            })
            break
          case 1:
            handleSendError({
              type: 'warning',
              from: 'window.navigator.geolocation',
              msg: '阻止该页面获取位置信息！'
            })
            break
          case 2:
            handleSendError({
              type: 'warning',
              from: 'window.navigator.geolocation',
              msg: '浏览器无法确定您的位置！'
            })
            break
          case 3:
            handleSendError({
              type: 'warning',
              from: 'window.navigator.geolocation',
              msg: '获取位置信息超时！'
            })
            break
        }
      }
    )
  } else {
    handleSendError({
      type: 'warning',
      from: 'window.navigator.geolocation',
      msg: '浏览器不支持 HTML5 的定位功能！'
    })
  }
}

const weatherData:Ref<unknown> = ref(null)
const weathercode = ref('d00')
const timer:Ref<number | null> = ref(null)

const handleUpdate = () => {
  if (!updating.value) {
    updating.value = true
    timer.value && clearInterval(timer.value)
    handleGetWeather()
    timer.value = setInterval(() => {
      handleGetWeather()
    }, 30 * 60 * 1000)
  }
}
const handleGetWeather = async () => {
  const url = latitude.value && longitude.value
    ? `${props.url}?location_type=1&lat=${latitude.value}&lng=${longitude.value}&from=vmweather`
    : `${props.url}?location_type=0&from=vmweather`
  try {
    let response
    if (props.customRequest) {
      response = await props.customRequest(url)
    } else {
      response = await axios.get(url)
    }
    if (response?.status === 200) {
      const { data: result } = response
      if (isObject(result) &&
        'code' in result &&
        'data' in result &&
        result.code === 0
      ) {
        if (isObject(result.data) &&
          'location' in result.data &&
          isObject(result.data.location) &&
          'error_msg' in result.data.location
        ) {
          console.log(`获取定位信息失败; status: 200; error: ${result.data.location.error_msg}`)
          handleSendError({
            type: 'warning',
            from: 'server',
            msg: result.data.location.error_msg
          })
        }
        weatherData.value = result.data.weather
        weathercode.value = result.data.weather.weathercode
        updating.value = false
      } else {
        updating.value = false
        if (isObject(result) && 'msg' in result) {
          console.log(`获取天气请求失败; status: 200; error: ${result.msg}`)
          handleSendError({
            type: 'error',
            from: 'server',
            msg: result.msg
          })
        } else {
          console.log('获取天气请求失败; status: 200; error: 服务器异常')
          handleSendError({
            type: 'error',
            from: 'server',
            msg: '服务器异常'
          })
        }
      }
    } else {
      updating.value = false
      console.log(`获取天气请求失败; status: ${response?.status};`)
      handleSendError({
        type: 'error',
        from: 'axios.error',
        msg: '网络请求失败'
      })
    }
  } catch (err:any) {
    console.log(err)
    updating.value = false
    console.log(`获取天气请求失败; status: ${err.response.status};`)
    handleSendError({
      type: 'error',
      from: 'axios.error',
      msg: '网络请求失败'
    })
  }
}

onBeforeMount(() => {
  handleGetLocation()
  handleUpdate()
})
onBeforeUnmount(() => {
  timer.value && clearInterval(timer.value)
})
</script>

<template>
  <div class="v-weather" @click="handleUpdate"
       :style="`cursor: ${updating? 'not-allowed': 'pointer'}; user-select: none;`">
    <span v-if="updating">更新中...</span>
    <slot v-if="!updating" :weather="weatherData" :icon="weathercode"></slot>
  </div>
</template>
