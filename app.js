const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const app = express();
const path = require('path');

const keys = require('./config/keys');
const analyticsRoutes = require('./routes/analytics');
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
const orderRoutes = require('./routes/order');
const positionRoutes = require('./routes/position');

mongoose.connect(keys.mongoURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(e =>
    console.log('error', e),
  );

app.use(passport.initialize({ userProperty: 'user' }));
require('./middleware/passport')(passport);

app.use(require('morgan')('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('cors')());


app.use('/api/analytics', analyticsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/position', positionRoutes);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist/client'));

  app.get('*', (req, res) => {
    res.sendFile(
      path.resolve(__dirname, 'client', 'dist', 'client', 'index.html'),
    );
  });
}

module.exports = app;
