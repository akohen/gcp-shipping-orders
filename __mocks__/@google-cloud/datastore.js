// eslint-disable-next-line import/prefer-default-export
export function Datastore() {
  return {
    createQuery: () => {},
    runQuery: async () => [[{
      'delivery-date': '2019-04-18T12:30:00.000Z',
      to: 'moon',
      weight: 10,
      'send-date': '2019-04-18T10:59:00.000Z',
      from: 'earth',
    }]],
  };
}
