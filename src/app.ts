import express, { Application, Request, Response } from 'express';
import { coreRouter } from './api/coreRouter';
import { systemRouter } from './api/systemRouter';

export const createApp = (): Application => {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use('/', systemRouter);

    app.use('/api', coreRouter);

    return app;
};