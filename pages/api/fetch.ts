interface Data {}

export default async function dataFetch() {
  const res = await fetch('http://localhost:3333/api/category')
  const result = await res.json()
  return result
}
