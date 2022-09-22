import { cp } from "fs";
import { MongoClient, ServerApiVersion } from "mongodb";
const uri = "mongodb+srv://fsdlasap:wMWGAZFrlpQ4QKuf@fscluster.abqmhln.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  //useNewUrlParser: true,
  // useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

export const operations = {
  addRecord: async (database: string, dataset: string, data: Record<string, any>): Promise<any | undefined> => {
    try {
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
      const records = await client.db(database).collection(dataset).find().toArray();
      return records.length ? records : [];
    } catch (error) {
      console.log("GET RECORDS ERROR:", error);
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
