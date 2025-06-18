import express, { Express, Request, Response, NextFunction } from 'express';
import logger from './utils/logger';
import { dev, port } from './utils/helpers';
import carDealerRoutes from "./routes/carDealerRoutes";
import carMakeRoutes from "./routes/carMakeRoutes";
import carRotes from "./routes/carRotes";

import { OK, INTERNAL_SERVER_ERROR } from './utils/http-status';


const app: Express = express();

// Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/carDealer", carDealerRoutes );
app.use("/api/carMaker", carMakeRoutes );
app.use("/api/cars", carRotes );

// app.use('/api/lists', listRoutes);
// app.use('/api/lists/:listId/items', itemRoutes);


// Basic route
app.get('/', (req: Request, res: Response) => {
  res
    .status(OK)
    .json({ message: 'Cars - Welcome!' });
});


// Start server
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
