export default function ({ route, redirect }) {
  console.log(3);
  if (route.path !== "/" && route.path.endsWith("/")) {
    const { path, query, hash } = route;
    const nextPath = path.replace(/\/+$/, "") || "/";
    const nextRoute = { path: nextPath, query, hash };

    redirect(nextRoute);
  }
}
