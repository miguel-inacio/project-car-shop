import express from 'express';
import carRoutes from './Routes/CarRoutes';
import CarValidation from './Middlewares/CarValidation';

const app = express();
app.use(express.json());

app.use('/cars', carRoutes);

app.use(CarValidation.notFound);

export default app;
