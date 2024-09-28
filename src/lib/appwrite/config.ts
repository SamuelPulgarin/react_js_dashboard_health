import { Client, Account} from 'appwrite';

export const client = new Client();

client
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject("66f81f960023bd9e19ea");

export const account = new Account(client);
export { ID } from 'appwrite';
