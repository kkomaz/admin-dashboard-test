import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import clientRoutes from './routes/client.js';
import generalRoutes from './routes/general.js';
import managementRoutes from './routes/management.js';
import salesRoutes from './routes/sales.js';
// data imports
import Product from './models/Product.js';
import ProductStat from './models/ProductStat.js';
// import User from './models/User.js';
import { dataProduct, dataProductStat } from './data/index.js';

/* Config */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());

// Cross origin request
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/client', clientRoutes);
app.use('/general', generalRoutes);
app.use('/management', managementRoutes);
app.use('/sales', salesRoutes);

// Show walkthrough of mongodb database - talk about collections
// connect your application

// Mongoose Setup
const PORT = process.env.PORT || 9000;
mongoose
  .set('strictQuery', false)
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`SERVER CONNECTED TO PORT ${PORT}`));

    /* ONLY ADD ONE TIME */
    // User.insertMany(dataUser);
    // { _id: ObjectId('63701cc1f03239b7f700000e') }
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
  })
  .catch((error) => console.log(`${error} - did not connect`));
