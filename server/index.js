require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

// GET all products
app.get('/api/products', (req, res, next) => {
  const sql = `
    SELECT  "productId", "name", "price",
            "image", "shortDescription"
    FROM    "products"`;
  db.query(sql)
    .then(response => res.json(response.rows))
    .catch(err => next(err));
});

// GET product details by ID
app.get('/api/products/:productId', (req, res, next) => {
  let { productId } = req.params;
  productId = parseInt(productId);

  if (isNaN(productId) || productId < 1) {
    res.status(400).json({ error: 'Id must be a positive integer.', requestedId: productId });
    return;
  }

  const sql = `
    SELECT  *
    FROM    "products"
    WHERE   "productId" = $1`;
  const values = [productId];

  db.query(sql, values)
    .then(response => {
      const product = response.rows[0];
      if (!product) {
        res.status(404).json({ error: 'Id does not exist', requestedId: productId });
        return;
      }
      res.json(response.rows[0]);
    })
    .catch(error => next(error));
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
