import { jest } from '@jest/globals'

import { Marketing } from '../src/subscribers/marketing.js'
import { Logistic } from '../src/subscribers/logistics.js'
import { PaymentReporter } from '../src/reporters/payment.js'
import { PaymentEvent } from '../src/events/payment.js'

describe('Observer Pattern test suite', () => {
  it('#PaymentEvent reporter -> should notify observers', () => {
    const reporter = new PaymentReporter()

    const observer = {
      update: jest.fn(),
    }

    const data = 'hey'

    reporter.subscribe(observer)
    reporter.notify(data)

    expect(observer.update).toHaveBeenCalled()
  })

  it('#PaymentEvent reporter -> should not notify unsubscribed observers', () => {
    const reporter = new PaymentReporter()

    const observer = {
      update: jest.fn(),
    }

    const data = 'hey'

    reporter.subscribe(observer)
    reporter.unsubscribe(observer)
    reporter.notify(data)

    expect(observer.update).not.toHaveBeenCalled()
  })

  it('#PaymentEvent reporter -> should notify reporters after a credit card transaction', () => {
    const reporter = new PaymentReporter()
    const payment = new PaymentEvent(reporter)

    const PaymentReporterNotifierSpy = jest.spyOn(
      payment.PaymentReporter,
      payment.PaymentReporter.notify.name
    )

    const data = {
      id: Date.now(),
      userName: 'Thais',
    }

    payment.creditCard(data)

    expect(PaymentReporterNotifierSpy).toHaveBeenCalledWith(data)
  })

  it('#All -> should notify all subscribers after a credit card payment', () => {
    const reporter = new PaymentReporter()
    const marketing = new Marketing()
    const logistic = new Logistic()

    const marketingUpdateSpy = jest.spyOn(marketing, marketing.update.name)
    const logisticUpdateSpy = jest.spyOn(logistic, logistic.update.name)

    reporter.subscribe(logistic)
    reporter.subscribe(marketing)

    const payment = new PaymentEvent(reporter)

    const data = {
      id: Date.now(),
      userName: 'Thais',
    }

    payment.creditCard(data)

    expect(marketingUpdateSpy).toHaveBeenCalledWith(data)
    expect(logisticUpdateSpy).toHaveBeenCalledWith(data)
  })
})
