export default function ({ app, $axios }) {
  $axios.onRequest((config) => {
    if (process.browser) {
      let token = app.$cookies.get("token");
      if (token) {
        config.headers.common["Authorization"] = `Bearer ${token}`;
      }
    }
  });
}
