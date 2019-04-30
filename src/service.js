import { Datastore } from '@google-cloud/datastore';
import { validateParams, validatePatch } from './validation';

const datastore = new Datastore();

export async function list(req, res, next) {
  try {
    const query = datastore.createQuery('Order');
    const [entities] = await datastore.runQuery(query);
    entities.forEach((e) => { e.id = e[Datastore.KEY].id; return e; });
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

export async function create(req, res, next) {
  try {
    const order = validateParams(req.body);
    await datastore.save(order);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(order.data));
  } catch (err) {
    next(err);
  }
}

export async function patch(req, res, next) {
  try {
    const taskKey = datastore.key(['Order', Number(req.params.id)]);
    const [entity] = await datastore.get(taskKey);
    if (!entity) throw new Error('Not found');
    const updated = { ...entity, ...validatePatch(req.body) };
    await datastore.update(updated);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(updated));
  } catch (err) {
    next(err);
  }
}
