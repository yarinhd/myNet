import { CronJob } from 'cron';
import { config } from '../config';
import { ItemRepository } from './item.repository';

export class ItemCron {
    static initPriorityDecay(): { stopFunc: any } {
        const priorityDecayJob = new CronJob(
            ItemCron.convertTimerToGMT(config.priority.cron.cronTimer),
            async () => {
                await ItemRepository.decreaseAllPriorities();
                console.log(`priority decay cron ran at ${new Date().toString()}`);
            },
            null,
            true,
            config.priority.cron.cronTimeZone
        );

        return {
            stopFunc: priorityDecayJob.stop,
        };
    }

    private static convertTimerToGMT = (timerStringInGMTPlus3: string) =>
        timerStringInGMTPlus3.replace(/(\d+)/g, (match: string) => {
            const numInGMTFormat = +match - 3;
            return numInGMTFormat === -3 ? '00' : numInGMTFormat.toString();
        });
}
