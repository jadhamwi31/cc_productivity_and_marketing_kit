export function secToTimer(sec: number) {
  let o = new Date(0);
  let p = new Date(sec * 1000);
  return new Date(p.getTime() - o.getTime()).toISOString().split('T')[1].split('Z')[0];
}
