export default async function api(...args) {
  const res = await fetch(...args);

  return res.json();
}
