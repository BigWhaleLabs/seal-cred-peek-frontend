export default function (s: string) {
  return /^0x[a-fA-F0-9]{40}$/.test(s)
}
