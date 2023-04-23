import { initApp } from 'shared-atom';
import { config } from './config';
import { AppRouter } from './router';
import { RPCServer } from './rpc.server';

initApp(process, config, AppRouter, RPCServer);
