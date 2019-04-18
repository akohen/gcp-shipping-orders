export function list(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify([]));
}

export function get(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({}));
}

export function create(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({}));
}