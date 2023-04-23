import { initApp } from 'shared-atom';
import { config } from './config';
import { ItemCron } from './item/item.cron';
import { AppRouter } from './router';
import { RPCServer } from './rpc.server';

const { stopFunc } = ItemCron.initPriorityDecay();
initApp(process, config, AppRouter, RPCServer, stopFunc);
