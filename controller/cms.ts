import { operations } from "../model/mongodb_model";
module.exports = {
  addCMS: async (database: string, dataset: string, data: Record<string, any>) => {
    try {
      const { acknowledged, insertedId } = await operations.addRecord(database, dataset, data);
      return acknowledged
        ? {
            success: true,
            message: "Successfully added record.",
            inserted_id: insertedId,
            count: 1,
          }
        : {
            success: false,
            message: "Adding record failed.",
            count: 0,
          };
    } catch (error: any) {
      return {
        success: false,
        message: error,
      };
    }
  },
  getAllCMS: async (database: string, dataset: string) => {
    try {
      const data = await operations.getRecords(database, dataset);
      return data;
    } catch (error: any) {
      return {
        success: false,
        message: error,
      };
    }
  },
};
