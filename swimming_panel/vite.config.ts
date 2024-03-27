import neoComponents, { transformAssetUrls } from "@vizrt/components-vite-plugin"

export default defineConfig({
  plugins: [
    vue({ template: { transformAssetUrls } }), // Image loading
    neoComponents({ autoImport: true }), // Auto-import is enabled by default
  ],
})