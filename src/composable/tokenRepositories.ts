import router from "@/router";

export default function tokenRepositories(token: string) {
  if (token) {
    localStorage.setItem('token', token)
    router.push('/biz/index').then()
  }
}
