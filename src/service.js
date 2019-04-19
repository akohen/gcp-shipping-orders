import { Datastore } from '@google-cloud/datastore';

const datastore = new Datastore();

function validateParams(params) {
  const allowedDestinations = [
    'sun', 'mercury',
    'venus', 'earth',
    'moon', 'mars',
    'jupiter', 'uranus',
    'neptune', 'pluto',
  ];
  if (!allowedDestinations.includes(params.from)
    || !allowedDestinations.includes(params.to)
    || params.to === params.from) throw new Error('Destination error');
  if (Number.isNaN(Number(params.weight))) { throw new Error('Incorrect weight'); }
  return {
    key: datastore.key('Order'),
    data: {
      'send-date': new Date(Date.now()), // using Date.now() to make unit testing a bit easier
      'delivery-date': new Date(Date.now() + 604800000),
      from: params.from,
      to: params.to,
      weight: Number(params.weight),
    },
  };
}

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
