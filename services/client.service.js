import ClientRepository from "../repositories/client.repository.js";

async function createClient(client) {
    return ClientRepository.insertClient(client);
}

export default {
    createClient,
};
