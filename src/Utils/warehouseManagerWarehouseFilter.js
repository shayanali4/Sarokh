import { filter } from 'underscore';
import { warehouseDetailsApi } from '../Api/generalApi';

export const warehouseFilter = async (data, field, secondField) => {

    try {
        let user = JSON.parse(localStorage.getItem('user'));
        const apiResponse = await warehouseDetailsApi(user.warehouseId);
        const result = filter(data, function (doc) {
            return doc[field] === apiResponse[secondField];
        });

        return result;

    }
    catch (ex) {
        throw ex;
    }
};