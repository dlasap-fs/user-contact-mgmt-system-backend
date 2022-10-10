import { operations } from "../model/mongodb_model";
module.exports = {
  getCMS: async (database: string, dataset: string, id: string) => {
    try {
      const data = await operations.getRecord(database, dataset, id);
      return data ?? "No record found.";
    } catch (error: any) {
      return {
        success: false,
        message: error,
      };
    }
  },
  getAllCMS: async (database: string, dataset: string, options?: any) => {
    try {
      const data = await operations.getRecords(database, dataset, options);
      return data;
    } catch (error: any) {
      return {
        success: false,
        message: error,
      };
    }
  },
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
  updateCMS: async (database: string, dataset: string, data: Record<string, any>) => {
    try {
      const { id, ...params } = data;
      const { acknowledged, matchedCount } = await operations.updateRecord(database, dataset, id, params);
      return acknowledged && matchedCount
        ? {
            success: true,
            message: "Successfully updated record.",
            updated_id: id,
            count: 1,
          }
        : {
            success: false,
            message: "Updating record failed.",
            count: 0,
          };
    } catch (error: any) {
      return {
        success: false,
        message: JSON.stringify(error),
      };
    }
  },
  deleteCMS: async (database: string, dataset: string, id: string) => {
    try {
      const { acknowledged, deletedCount } = await operations.deleteRecord(database, dataset, id);
      return acknowledged && deletedCount
        ? {
            success: true,
            message: "Successfully deleted record.",
            updated_id: id,
            count: 1,
          }
        : {
            success: false,
            message: "Deleting record failed.",
            count: 0,
          };
    } catch (error: any) {
      return {
        success: false,
        message: JSON.stringify(error),
      };
    }
  },
};
