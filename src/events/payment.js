export class Payment {
    constructor(paymentSubject) {
        this.paymentSubject = paymentSubject
    }

    creditCard(paymentData) {
        console.log(`\na payment from ${paymentData.userName} has ocurred`)

        this.paymentSubject.notify(paymentData)
    }
}