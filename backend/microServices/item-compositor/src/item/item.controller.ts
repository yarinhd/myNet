import { Request, Response } from 'express';
import { ItemManager } from './item.manager';

export default class ItemController {
    static async getItems(req: Request, res: Response): Promise<void> {
        res.json(await ItemManager.getItems(req.query as any));
    }

    static async createItem(req: Request, res: Response): Promise<void> {
        res.json(await ItemManager.createItem(req.body));
    }

    static async updateItem(req: Request, res: Response): Promise<void> {
        res.json(await ItemManager.updateItem(req.params.itemId, req.body));
    }
}
