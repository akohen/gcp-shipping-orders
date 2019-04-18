import express from 'express';
import { list, get, create } from './service';

const app = express();
const port = process.env.PORT || 8082;

app.get('/orders', list);
app.get('/orders/:id', get);
app.post('/orders', create);

app.listen(port, () => {
  console.log(`Orders service listening on ${port}`);
});
