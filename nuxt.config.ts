// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
 modules: ['@nuxtjs/tailwindcss'],
 ssr:false,
 mode:"spa",
 target:"static",
 colorMode:{
    dataValue:"luxury"
 },
 app: {
        head: {
        htmlAttrs:{"data-theme": "halloween",}
    }
    },
})
