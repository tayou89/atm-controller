export class Bank {
    constructor(cardList) {
        this.cardList = cardList;
    }

    getAccountList = async (card) => {
        const card = this.findCard(card.cardNumber);

        this.sleep(1000);
        return card.accountList;
    }

    veryfyPin = async (card, pin) => {
        const card = this.findCard(card.cardNumber);

        this.sleep(1000);
        if (card.pin !== pin) {
            throw new Error(`Invalid PIN for card ${card.cardNumber}`);
        }
    }

    deposit = async (accountNumber, amount) => {
        const account = this.findAccount(accountNumber);

        account.balance += amount;
        await this.sleep(1000);
        console.log(`Deposited ${amount} to account ${accountNumber}`);
    }

    withdraw = async (accountNumber, amount) => {
        const account = this.findAccount(accountNumber);

        if (account.balance < amount) {
            throw new Error(`Insufficient funds in account ${accountNumber}`);
        }
        account.balance -= amount;
        this.sleep(1000);
        console.log(`Withdrew ${amount} from account ${accountNumber}`);
    }

    getBalance = async (accountNumber) => {
        const account = this.findAccount(accountNumber);

        this.sleep(1000);
        return account.balance;
    }

    findCard = (cardNumber) => {
        const card = this.cardList.find(card => card.cardNumber === cardNumber);

        if (!card) {
            throw new Error(`Card ${cardNumber} not found`);
        }
        return card;
    }

    findAccount = (accountNumber) => {
        for (const card of this.cardList) {
            for (const account of card.accountList) {
                if (account.accountNumber === accountNumber) {
                    return account;
                }
            }
        }
        throw new Error(`Account ${accountNumber} not found`);
    }

    sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
