export default defineNuxtRouteMiddleware((to, from) => {
  const { status } = useAuth();

  const publicRoutes = ["/auth/login", "/auth/signup", "/auth/confirmation"];
  const privateRoutes = ["/user/settings", "/user/Settings"];

  if (publicRoutes.includes(to.path) && status.value === "authenticated") {
    return navigateTo("/");
  }

  if (privateRoutes.includes(to.path) && status.value !== "authenticated") {
    return navigateTo("/auth/login");
  }
});
