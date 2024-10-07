export default defineNuxtRouteMiddleware((to, from) => {
  const { status } = useAuth();

  const publicRoutes = [
    "/auth/login",
    "/auth/signup",
    "/auth/confirmation",
    "/auth/Login",
    "/auth/Signup",
  ];
  const privateRoutes = [
    "/user/settings",
    "/user/Settings",
    "/user/myjobs",
    "/user/MyJobs",
  ];

  // Eğer kullanıcı giriş yapmamışsa ve private route'lara gitmeye çalışıyorsa logine yönlendir
  if (
    status.value !== "authenticated" &&
    privateRoutes.some((route) => to.path.startsWith(route))
  ) {
    return navigateTo("/auth/login"); // Logine yönlendir
  }

  // Eğer kullanıcı giriş yapmışsa ve public route'lara gitmeye çalışıyorsa anasayfaya yönlendir
  if (
    status.value === "authenticated" &&
    publicRoutes.some((route) => to.path.startsWith(route))
  ) {
    return navigateTo("/"); // Anasayfaya yönlendir
  }
});
