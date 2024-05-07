// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        // List your html files here, e.g:
        index: resolve(__dirname, "index.html"),
        about: resolve(__dirname, "about.html"),
        contact: resolve(__dirname, "contact.html"),
        history: resolve(__dirname, "history.html"),
        logged_about: resolve(__dirname, "logged-about.html"),
        logged_index: resolve(__dirname, "logged-index.html"),
        logged_signup: resolve(__dirname, "logged-signup.html"),
        measure: resolve(__dirname, "measure.html"),
        profile: resolve(__dirname, "profile.html"),
        settings: resolve(__dirname, "settings.html"),
        user: resolve(__dirname, "user.html"),
      },
    },
  },
  // Public base path could be set here too:
  // base: '/~username/my-app/',
});