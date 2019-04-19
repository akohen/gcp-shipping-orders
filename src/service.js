import { Datastore } from '@google-cloud/datastore';

const datastore = new Datastore();

export async function list(req, res, next) {
  try {
    const query = datastore.createQuery('Order');
    const [entities] = await datastore.runQuery(query);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(entities));
  } catch (err) {
    next(err);
  }
}

export async function get(req, res, next) {
  try {
    const taskKey = datastore.key(['Order', Number(req.params.id)]);
    const [entity] = await datastore.get(taskKey);
    if (!entity) next(new Error('Not found'));
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(entity));
  } catch (err) {
    next(err);
  }
}

export function create(req, res) {
  function validateParams(params) {
    const allowedDestinations = ['earth', 'moon', 'mars'];
    if (!allowedDestinations.includes(params.from)
      || !allowedDestinations.includes(params.to)
      || params.to === params.from) throw new Error('Destination error');
    if (Number.isNaN(Number(params.weight))) { throw new Error('Incorrect weight'); }
  }
  validateParams(req.body);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify('OK'));
}
