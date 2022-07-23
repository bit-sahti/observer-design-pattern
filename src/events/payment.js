export class PaymentEvent {
  constructor(PaymentReporter) {
    this.PaymentReporter = PaymentReporter
  }

  creditCard(paymentData) {
    console.log(`\na payment from ${paymentData.userName} has ocurred`)

    this.PaymentReporter.notify(paymentData)
  }
}
