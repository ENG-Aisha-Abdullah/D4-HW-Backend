import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import logger from './utils/logger';
import dotenv from 'dotenv';
import { dev, port } from './utils/helpers';
import carDealerRoute from "./routes/carDealerRoutes";
import carMakeRoute from "./routes/carMakeRoutes";
import carRote from "./routes/carRotes";
import { OK, INTERNAL_SERVER_ERROR } from './utils/http-status';


// Load environment variables
dotenv.config();

const app: Express = express();

// Middleware
// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('tiny', {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.use("/api/carDealer", carDealerRoute );
app.use("/api/carMaker", carMakeRoute );
app.use("/api/cars", carRote );


// Basic route
app.get('/', (req: Request, res: Response) => {
  res
    .status(OK)
    .json({ message: 'Cars - Welcome!' });
});

// Basic error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error('Error:', err.message);
  res
    .status(INTERNAL_SERVER_ERROR)
    .json({
      success: false,
      message: 'Something went wrong!',
      error: dev ? err.message : undefined
    });
});

// Start server
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
