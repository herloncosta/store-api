import SaleRepository from "../repositories/sale.repository.js";
import ClientRepository from "../repositories/client.repository.js";
import ProductRepository from "../repositories/product.repository.js";

async function createSale(sale) {
    let error = "";
    if (!(await ClientRepository.getClient(sale.client_id))) {
        error = "O client_id informado não existe.";
    }

    if (!(await ProductRepository.getProduct(sale.product_id))) {
        error += "O product_id informado não existe.";
    }

    if (error) {
        throw new Error(error);
    }

    return await SaleRepository.insertSale(sale);
}

async function getSales() {
    return await SaleRepository.getSales();
}

async function getSale(id) {
    return await SaleRepository.getSale(id);
}

async function updateSale(sale) {
    let error = "";
    if (!(await ClientRepository.getClient(sale.client_id))) {
        error = "O client_id informado não existe.";
    }

    const product = await ProductRepository.getProduct(sale.product_id);

    if (!product) {
        error += "O product_id informado não existe.";
    }

    if (error) {
        throw new Error(error);
    }

    if (product.stock > 0) {
        sale = SaleRepository.insertSale(sale);
        // remove produto do estoque
        product.stock--;
        // atualiza estoque
        await ProductRepository.updateProduct(product);
        return sale;
    } else {
        throw new Error("O produto informado não está disponível em estoque.");
    }
}

async function deleteSale(id) {
    const sale = await SaleRepository.getSale(id);
    if (sale) {
        const product = ProductRepository.getProduct(sale.product_id);
        await SaleRepository.deleteSale(id);
        // devolve o produto para o estoque
        product.stock++;
        // atualiza o estoque
        await ProductRepository.updateProduct(product);
    } else {
        throw new Error("O id da venda informada não existe.");
    }
}

export default {
    createSale,
    getSales,
    getSale,
    updateSale,
    deleteSale,
};
