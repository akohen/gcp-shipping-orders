import { list } from './service';

describe('Orders service', () => {
  test('returns a list of orders', async () => {
    const result = await new Promise((resolve) => {
      list(
        { },
        { setHeader: () => {}, send: v => resolve(v) },
      );
    });
    expect(JSON.parse(result)).toEqual([]);
  });
});
