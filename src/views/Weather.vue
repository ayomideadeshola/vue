<script setup>
import { ref, onMounted } from "vue"

const API_KEY = "6a799a3c98711910ee49517e86cd8736"

const city = ref("")
const weather = ref(null)
const loading = ref(false)
const error = ref("")

const getWeatherByCity = async () => {
    if (!city.value) return

    loading.value = true
    error.value = ""

    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${API_KEY}`
        )

        const data = await res.json()

        if (data.cod !== 200) {
            error.value = "City not found"
            weather.value = null
        } else {
            weather.value = data
        }
    } catch (err) {
        error.value = "Failed to fetch weather"
    }

    loading.value = false
    city.value = ""
}

const getCurrentLocation = () => {
    loading.value = true

    navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude
        const lon = position.coords.longitude

        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        )

        const data = await res.json()
        weather.value = data
        loading.value = false
    })
}

const toCelsius = (k) => Math.round(k - 273.15)

onMounted(() => {
    getCurrentLocation()
})
</script>

<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-500 to-gary-700 flex items-center justify-center p-6">

        <div class="bg-white/10 backdrop-blur-lg rounded-xl shadow-lg w-full max-w-md p-6 text-white">

            <h1 class="text-2xl font-bold mb-4 text-center">
                Weather App
            </h1>

            <div class="flex gap-2 mb-6">
                <input v-model="city" @keyup.enter="getWeatherByCity" placeholder="Search city..."
                    class="flex-1 px-3 py-2 rounded text-gray-100" />

                <button @click="getWeatherByCity" class="bg-white text-blue-600 px-4 py-2 rounded font-semibold">
                    Search
                </button>
            </div>

            <div v-if="loading" class="text-center py-10">
                Loading weather...
            </div>

            <div v-if="error" class="text-red-300 text-center mb-4">
                {{ error }}
            </div>

            <div v-if="weather && !loading">

                <div class="text-center mb-6">
                    <h2 class="text-xl font-bold">
                        {{ weather.name }}, {{ weather.sys.country }}
                    </h2>

                    <p class="text-5xl font-bold mt-2">
                        {{ toCelsius(weather.main.temp) }}°C
                    </p>

                    <p class="capitalize mt-2 text-lg">
                        {{ weather.weather[0].description }}
                    </p>
                </div>

                <div class="grid grid-cols-2 gap-4 text-sm">

                    <div class="bg-white/10 p-3 rounded">
                        Humidity
                        <p class="font-bold">{{ weather.main.humidity }}%</p>
                    </div>

                    <div class="bg-white/10 p-3 rounded">
                        Pressure
                        <p class="font-bold">{{ weather.main.pressure }} hPa</p>
                    </div>

                    <div class="bg-white/10 p-3 rounded">
                        Weather
                        <p class="font-bold">{{ weather.weather[0].main }}</p>
                    </div>

                    <div class="bg-white/10 p-3 rounded">
                        Wind
                        <p class="font-bold">{{ weather.wind.speed }} m/s</p>
                    </div>

                </div>

            </div>

        </div>

    </div>
</template>