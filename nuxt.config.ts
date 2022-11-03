// https://v3.nuxtjs.org/api/configuration/nuxt.config
import { defineNuxtConfig } from 'nuxt'
export default defineNuxtConfig({
    modules: ['@nuxtjs/tailwindcss'],
    target: "static",
    mode: "spa",
    ssr:false,
    css: [
        "~/assets/style/dna.css"
    ],
    colorMode:{
        dataValue:"luxury"
    },
    app: {
        head: {
            htmlAttrs:{"data-theme": "halloween",}
        }
    }
});