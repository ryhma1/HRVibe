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
        login_signup: resolve(__dirname, "login-signup.html"),
        measure: resolve(__dirname, "measure.html"),
        profile: resolve(__dirname, "profile.html"),
        user: resolve(__dirname, "user.html"),
        // frameworks js files
        jquery: resolve(__dirname, "static-assets/js/jquery.min.js"),
        dropotron: resolve(__dirname, "static-assets/js/jquery.dropotron.min.js"),
        scrollex: resolve(__dirname, "static-assets/js/jquery.scrollex.min.js"),
        browser: resolve(__dirname, "static-assets/js/browser.min.js"),
        breakpoints: resolve(__dirname, "static-assets/js/breakpoints.min.js"),
        util: resolve(__dirname, "static-assets/js/util.js"),
        main: resolve(__dirname, "static-assets/js/main.js"),
      },
    },
  },
  // Public base path could be set here too:
  // base: '/~username/my-app/',
});
