export default function (n = 0) {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
