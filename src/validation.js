import { Datastore } from '@google-cloud/datastore';

const datastore = new Datastore();

const allowedDestinations = [
  'sun', 'mercury',
  'venus', 'earth',
  'moon', 'mars',
  'jupiter', 'uranus',
  'neptune', 'pluto',
];

const allowedParams = ['from', 'to', 'weight', 'send-date', 'delivery-date', 'status'];

const allowedStatuses = ['SENT', 'DELIVERED'];

function parseDate(date) {
  if (Number.isNaN(Date.parse(date))) throw new Error('Incorrect Date');
  return new Date(date);
}

export function validateParams(params) {
  if (!allowedDestinations.includes(params.from)
    || !allowedDestinations.includes(params.to)
    || params.to === params.from) throw new Error('Destination error');
  if (Number.isNaN(Number(params.weight))) { throw new Error('Incorrect weight'); }
  return {
    key: datastore.key('Order'),
    data: {
      'send-date': new Date(Date.now()), // using Date.now() to make unit testing a bit easier
      'delivery-date': null,
      from: params.from,
      to: params.to,
      weight: Number(params.weight),
      status: 'SENT',
    },
  };
}

export function validatePatch(params) {
  const patch = {};
  allowedParams.forEach((p) => {
    if (params[p]) patch[p] = params[p];
  });

  if (params.from && !allowedDestinations.includes(params.from)) throw new Error('Destination error');
  if (params.to && !allowedDestinations.includes(params.to)) throw new Error('Destination error');
  if (params.from && params.to && params.from === params.to) throw new Error('Destination error');
  if (params.weight && Number.isNaN(Number(params.weight))) { throw new Error('Incorrect weight'); }
  if (params.status && !allowedStatuses.includes(params.status)) { throw new Error('Incorrect status'); }
  if (params['send-date']) { patch['send-date'] = parseDate(params['send-date']); }
  if (params['delivery-date']) { patch['delivery-date'] = parseDate(params['delivery-date']); }

  return patch;
}
