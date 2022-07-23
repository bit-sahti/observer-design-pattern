import { Marketing } from './subscribers/marketing.js'
import { Logistic } from './subscribers/logistics.js'
import { PaymentReporter } from './reporters/payment.js'
import { PaymentEvent } from './events/payment.js'

const reporter = new PaymentReporter()
const logistic = new Logistic()
const marketing = new Marketing()
const payment = new PaymentEvent(reporter)

const observers = [marketing, logistic]

const data = {
  id: Date.now(),
  userName: 'Jane Doe',
}

observers.forEach(observer => reporter.subscribe(observer))

payment.creditCard(data)

reporter.unsubscribe(marketing)

payment.creditCard(data)
