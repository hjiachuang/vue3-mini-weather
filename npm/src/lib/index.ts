import type { App } from 'vue'
import vMiniWeather from './vMiniWeather.vue'
import vMiniWeatherIcon from './vMiniWeatherIcon/vMiniWeatherIcon.vue'

const install = (Vue:App) => {
    Vue.component('vMiniWeather', vMiniWeather)
    Vue.component('vMiniWeatherIcon', vMiniWeatherIcon)
}

export default install
export {
    vMiniWeather,
    vMiniWeatherIcon
}

console.log('weather install ts...')