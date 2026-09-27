import CARD_LIST from './card-list.js'; 
import { ATMController } from '../atm-controller.js';
import { Bank } from './bank.js';
import { CashBin } from './cash-bin.js';


test("ATM normal flow", async () => {
    const bank = new Bank(CARD_LIST);
    const cashBin = new CashBin(10000);
    const atm = new ATMController(bank, cashBin);
    const card = { number: '1111111111' };

    atm.insertCard(card);
    await atm.enterPin('1111');
    const accountList = await atm.loadAccount();

    expect(accountList).toEqual([
        { number: '111111', balance: 1000 },
        { number: '222222', balance: 2000 },
        { number: '999837', balance: 9000 },
    ]);
    await atm.selectAccount('111111');
    const balance = atm.getBalance();

    expect(balance).toBe(1000);
});

test("deposit money", async () => {
    const bank = new Bank(CARD_LIST);
    const cashBin = new CashBin(10000);
    const atm = new ATMController(bank, cashBin);
    const card= CARD_LIST[2];
    const depositAmount = 500;

    atm.insertCard(card);
    await atm.enterPin(CARD_LIST[2].pin);
    await atm.loadAccount();
    await atm.selectAccount(CARD_LIST[2].accountList[0].number);
    await atm.deposit(depositAmount);

    const balance = atm.getBalance();
    expect(balance).toBe(CARD_LIST[2].accountList[0].balance + depositAmount);
});

test("withdraw money", async () => {
    const bank = new Bank(CARD_LIST);
    const cashBin = new CashBin(10000);
    const atm = new ATMController(bank, cashBin);
    const card= CARD_LIST[3];
    const withdrawAmount = 500;

    atm.insertCard(card);
    await atm.enterPin(CARD_LIST[3].pin);
    await atm.loadAccount();
    await atm.selectAccount(CARD_LIST[3].accountList[0].number);
    await atm.withdraw(withdrawAmount);

    const balance = atm.getBalance();
    expect(balance).toBe(CARD_LIST[3].accountList[0].balance - withdrawAmount);
});

test("impossible withdraw money", async () => {
    const bank = new Bank(CARD_LIST);
    const cashBin = new CashBin(10000);
    const atm = new ATMController(bank, cashBin);
    const card= CARD_LIST[3];
    const withdrawAmount = 10000;
    
    atm.insertCard(card);
    await atm.enterPin(CARD_LIST[3].pin);
    await atm.loadAccount();
    await atm.selectAccount(CARD_LIST[3].accountList[0].number);        
    await expect(atm.withdraw(withdrawAmount)).rejects.toThrow("Insufficient funds");
});

test("unexisting account", async () => {
    const bank = new Bank(CARD_LIST);
    const cashBin = new CashBin(10000);
    const atm = new ATMController(bank, cashBin);
    const card= CARD_LIST[3];
    
    atm.insertCard(card);
    await atm.enterPin(CARD_LIST[3].pin);
    await atm.loadAccount();
    await expect(atm.selectAccount('000000')).rejects.toThrow("Account number 000000 not found");
});

test("unexisting card", async () => {
    const bank = new Bank(CARD_LIST);
    const cashBin = new CashBin(10000);
    const atm = new ATMController(bank, cashBin);
    const card= { number: '0000000000' };
    
    atm.insertCard(card);
    await expect(atm.enterPin('0000')).rejects.toThrow("Card 0000000000 not found");
});