const STATUS = {
    IDLE: 1,
    CARD_INSERTED: 2,
    PIN_ENTERED: 3,
    ACCOUNT_LOADED: 4,
    ACCOUNT_SELECTED: 5,
    TRANSACTION_IN_PROGRESS: 6,
};

export class ATMController {
    constructor(
        bank,
        cashBin,
    ) {
        this.status = STATUS.IDLE;
        this.card = {};
        this.bank = bank;
        this.cashBin = cashBin;
    }

    insertCard = (card) => {
        this.checkStatus(STATUS.IDLE);
        this.status = STATUS.CARD_INSERTED;
        this.card = card;   
    }

    enterPin = async (pin) => {
        this.checkStatus(STATUS.CARD_INSERTED);
        await this.bank.veryfyPin(this.card, pin);
        this.status = STATUS.PIN_ENTERED;
    }

    loadAccount = async () => {
        this.checkStatus(STATUS.PIN_ENTERED);
        this.card.accountList = await this.bank.getAccountList(this.card);
        this.status = STATUS.ACCOUNT_LOADED;
        return this.card.accountList;
    }

    selectAccount = async (accountNumber) => {
        this.checkStatus(STATUS.ACCOUNT_LOADED);
        this.checkAccountNumber(accountNumber); 
        this.card.selectedAccount = this.findAccount(accountNumber);
        this.status = STATUS.ACCOUNT_SELECTED;
    }

    getBalance = () => {
        this.checkStatus(STATUS.ACCOUNT_SELECTED);
        return this.card.selectedAccount.balance;
    }

    findAccount = (accountNumber) => {
        this.checkStatus(STATUS.ACCOUNT_SELECTED);
        this.checkAccountNumber(accountNumber);
        return this.card.accountList.find(account => account.accountNumber === accountNumber);
    }

    deposit = async (amount) => {
        this.checkStatus(STATUS.ACCOUNT_SELECTED);
        await this.cashBin.acceptCash(amount);
        this.status = STATUS.TRANSACTION_IN_PROGRESS;
        await this.bank.deposit(this.card.selectedAccount.number, amount);
        this.status = STATUS.ACCOUNT_SELECTED;
    }

    withdraw = async (amount) => {
        this.checkStatus(STATUS.ACCOUNT_SELECTED);
        this.status = STATUS.TRANSACTION_IN_PROGRESS;
        await this.bank.withdraw(this.card.selectedAccount.number, amount);
        await this.cashBin.dispenseCash(amount);
        this.status = STATUS.ACCOUNT_SELECTED;
    }

    ejectCard = () => {
        this.checkStatus(STATUS.CARD_INSERTED);
        this.status = STATUS.IDLE;
        this.card = {};
    }

    checkAccountNumber = (accountNumber) => {
        if (!this.card.accountList) {
            throw new Error('Account list not loaded. Please load account list first.');
        }
        for (const account of this.card.accountList) {
            if (account.accountNumber === accountNumber) {
                return true;
            }
        }
        throw new Error(`Account number ${accountNumber} not found in the account list.`);
    }

    checkStatus = (status) => {
        const currentStatus = this.getStatusName(this.status);
        const expectedStatus = this.getStatusName(this.status);

        if (this.status < status) {
            throw new Error(`Invalid Status. Current State: ${currentStatus}. Expected State: ${expectedStatus}.`);
        }
    }

    getStatusName = (statusNumber) => {
        return Object.keys(STATUS).find(key => STATUS[key] === statusNumber);
    }
}
