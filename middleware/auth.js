export default function (context) {
  console.log(1);
  if (context.$cookies.get("token")) {
    console.log(2);
    return context.redirect("/");
  }
}
