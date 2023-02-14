import express from 'express';
import carRoutes from './Routes/CarRoutes';
import VehicleValidation from './Middlewares/VehicleValidation';
import motorcycleRoutes from './Routes/MotorcycleRoutes';

const app = express();
app.use(express.json());

app.use('/cars', carRoutes);

app.use('/motorcycles', motorcycleRoutes);

app.use(VehicleValidation.notFound);

export default app;
