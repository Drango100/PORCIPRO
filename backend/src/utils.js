export function ok(res, data = {}, status = 200) {
  return res.status(status).json({ ok: true, ...data });
}
export function fail(res, message = "Error", status = 400) {
  return res.status(status).json({ ok: false, message });
}
export function pick(obj, keys = []) {
  return keys.reduce((acc, k) => (obj[k] !== undefined ? (acc[k] = obj[k], acc) : acc), {});
}
