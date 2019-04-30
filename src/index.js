import express from 'express';
import bodyParser from 'body-parser';
import {
  list, get, create, patch,
} from './service';

const app = express();
const port = process.env.PORT || 8082;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/orders', list);
app.get('/orders/:id', get);
app.post('/orders', create);
app.patch('/orders/:id', patch);
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
  res.status(400);
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify({ error: err.message }));
});

app.listen(port, () => {
  console.log(`Orders service listening on ${port}`);
});
