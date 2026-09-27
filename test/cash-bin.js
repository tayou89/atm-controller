export class CashBin {
    constructor(cashAmount) {
        this.cash = cashAmount;
    }

    acceptCash = async (amount) => {
        if (amount <= 0) {
            throw new Error('Deposit amount must be greater than zero.');
        }
        this.cash += amount;
        await this.sleep(1000);
        console.log(`Accepted cash deposit of ${amount}`);
    }

    dispenseCash = async (amount) => {
        if (amount <= 0) {
            throw new Error('Withdrawal amount must be greater than zero.');
        }
        if (this.cash < amount) {
            throw new Error('Insufficient cash in the ATM.');
        }
        this.cash -= amount;
        await this.sleep(1000);
        console.log(`Dispensed cash withdrawal of ${amount}`);
    }

    sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}