import {pool} from "../../db";
import {QueryResult} from "pg";
import path from "path";

const imageDir = 'files';

function getImagePath(restaurantId: number, filename: string): string {
    return path.join(imageDir, restaurantId.toString(), filename);
}

export {getImagePath};