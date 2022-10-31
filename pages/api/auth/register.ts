export default async function RegApi(
  email: string,
  password: string,
  phone: string,
  username: string,
) {
    const res = await fetch('http://localhost:3333/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            password,
            phone,
            username,
          }),
        })
    const result = await res.json()
    return result
}
