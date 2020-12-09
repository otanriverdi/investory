import {Request, Response} from 'express';
import {Connection} from 'typeorm';

export type MyContext = {
  req: Request;
  res: Response;
  db: Connection;
  user: string | null;
};
