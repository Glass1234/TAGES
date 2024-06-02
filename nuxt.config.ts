export default defineNuxtConfig({
    ssr: false,
    devtools: {enabled: true},
    build: {
        transpile: ['vuex']
    },
    plugins: [
        '~/plugins/vuex.js'
    ],
    css: ["~/src/assets/css/global.css", "~/src/assets/css/clear.css"],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `@import "~/src/assets/css/variables.scss";`
                }
            }
        },
    },
    app: {
        baseURL: '/TAGES/',
        buildAssetsDir: 'assets'
    }
})