import express from 'express';
import next from 'next';
import cookieParser from 'cookie-parser';
import db, { connectToDB } from './db';
import authRouter from './routes/auth';
import buildRelations from './db/buildRelations';
import logger from './utils/logger';
import User from './models/User';

const dev = process.env.NODE_ENV !== 'production';
const port = process.env.PORT || 3000;

(async () => {
    try {
        await connectToDB();
        logger.log('Successfully connected to the database');

        buildRelations();

        await db.sync({ logging: false, alter: true });
        logger.log('All models were synchronized successfully');

        const nextApp = next({ dev });
        const handle = nextApp.getRequestHandler();

        nextApp.prepare().then(() => {
            const app = express();

            app.use(express.json());
            app.use(cookieParser());

            app.use('/api/auth', authRouter);

            app.all('*', (req, res) => {
                return handle(req, res);
            });

            app.listen(3000, () => {
                logger.log('Server running on port ' + port);
            });
        });
    } catch (err) {
        logger.error(err);
    }
})();
