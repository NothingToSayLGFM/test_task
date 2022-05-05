export default function (context) {
  if (context.app.$cookies.get("token")) {
    return context.redirect({ name: "index" });
  }
}
