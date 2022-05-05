export default function ({ app, $axios, redirect }) {
  $axios.onRequest((config) => {
    if (process.browser) {
      let token = app.$cookies.get("token");
      if (token) {
        config.headers.common["Authorization"] = `Bearer ${token}`;
      }
    }
  });
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status);
    if (code === 401) {
      redirect("/login/");
    }
  });
}
