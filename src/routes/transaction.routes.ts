import { Router } from 'express';
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import GetTransactionsAndBalance from '../services/GetTransactionsAndBalanceService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {    
    const getTransactionsAndBalance = new GetTransactionsAndBalance(transactionsRepository);

    const transactionsAndBalance = getTransactionsAndBalance.execute();

    return response.json(transactionsAndBalance);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;

    const createTransaction = new CreateTransactionService(transactionsRepository);

    const transaction = createTransaction.execute({ title, value, type });

    response.json(transaction);
    
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
