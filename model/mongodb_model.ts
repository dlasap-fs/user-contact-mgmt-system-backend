import { cp } from "fs";
import { MongoClient, ObjectId, ServerApiVersion, UpdateResult } from "mongodb";
const uri = "mongodb+srv://fsdlasap:wMWGAZFrlpQ4QKuf@fscluster.abqmhln.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  //useNewUrlParser: true,
  // useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

export const operations = {
  addRecord: async (database: string, dataset: string, data: Record<string, any>): Promise<any | undefined> => {
    try {
      await client.connect();
      return (
        (await client.db(database).collection(dataset).insertOne(data)) || {
          acknowledged: false,
          insertedId: null,
        }
      );
    } catch (error) {
      console.log("ADD RECORD ERROR:", error);
    } finally {
      client.close();
    }
  },
  getRecords: async (database: string, dataset: string, options?: any) => {
    try {
      const { limit = 50, skip = 0 } = options ?? {};
      await client.connect();
      const records = await client.db(database).collection(dataset).find().limit(limit).skip(skip).toArray();
      return records.length ? records : [];
    } catch (error) {
      console.log("GET RECORDS ERROR:", error);
    } finally {
      client.close();
    }
  },
  getRecord: async (database: string, dataset: string, id: string, options?: any) => {
    try {
      await client.connect();
      const record = await client
        .db(database)
        .collection(dataset)
        .findOne({ _id: new ObjectId(id) });
      console.log({ record }, id);
      return record;
    } catch (error) {
      console.log("GET RECORD ERROR:", error);
    } finally {
      client.close();
    }
  },
  updateRecord: async (database: string, dataset: string, id: string, data: Record<string, any>, options?: any) => {
    try {
      await client.connect();
      const filter = { _id: new ObjectId(id) };
      const update_params = {
        $set: {
          ...data,
          updated_date: new Date(),
        },
      };
      const record: any = await client.db(database).collection(dataset).updateOne(filter, update_params, options);
      return record?.acknowledged
        ? record
        : {
            acknowledged: false,
            updatedId: null,
          };
    } catch (error) {
      console.log("UPDATE RECORD ERROR:", error);
    } finally {
      client.close();
    }
  },
  deleteRecord: async (database: string, dataset: string, id: string, options?: any) => {
    try {
      await client.connect();
      const query = { _id: new ObjectId(id) };

      const record: any = await client.db(database).collection(dataset).deleteOne(query);
      return record?.acknowledged
        ? record
        : {
            acknowledged: false,
            deletedId: null,
          };
    } catch (error) {
      console.log("DELETE RECORD ERROR:", error);
    } finally {
      client.close();
    }
  },
};
// const exec = async () => {
//   console.log(await operations.getRecords("cms_db", "records"));
//   const record = {
//     first_name: "test2",
//     last_name: "test2",
//     delivery_address: { physical_address: "test2", billing_address: "test2" },
//     created_date: new Date(),
//     updated_date: new Date(),
//   };
// //   console.log(await operations.addRecord("cms_db", "records", record));
// };

// exec();
