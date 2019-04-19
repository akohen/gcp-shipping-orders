import { list, create } from './service';

const realDateNow = Date.now.bind(global.Date);
const res = r => ({ setHeader: () => {}, send: v => r(JSON.parse(v)) });
const next = r => (e => r(e.message));

beforeAll(() => { global.Date.now = () => 1550520000000; });
afterAll(() => { global.Date.now = realDateNow; });

describe('Orders service', () => {
  test('returns a list of orders', async () => {
    const result = await new Promise((r) => {
      list({}, res(r), next(r));
    });
    expect(result[0].from).toEqual('earth');
  });

  test('can create orders', async () => {
    const result = await new Promise((r) => {
      create({ body: { from: 'earth', to: 'moon', weight: 10 } }, res(r), next(r));
    });
    expect(result.from).toEqual('earth');
    expect(result.to).toEqual('moon');
    expect(result.weight).toEqual(10);
    expect(result['send-date']).toEqual('2019-02-18T20:00:00.000Z');
  });
});
