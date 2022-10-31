export default async function LogApi(email: string, password: string) {
  const res = await fetch('http://localhost:3333/api/auth/login', {
    method: 'POST',
    credentials:'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const result = await res.json()
  return result
}
