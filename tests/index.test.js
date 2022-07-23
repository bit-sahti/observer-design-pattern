import { jest } from '@jest/globals'

import { PaymentSubject } from "../src/subjects/paymentSubjects.js"
import { Payment } from "../src/events/payment.js"
import { Marketing } from '../src/observers/marketing.js'
import { Logistic } from '../src/observers/logistics.js'

describe('Observer Pattern test suite', () => {
    it('#Payment Subject -> should notify observers', () => {
        const subject = new PaymentSubject()

        const observer = {
            update: jest.fn()
        }

        const data = 'hey'

        subject.subscribe(observer)
        subject.notify(data)

        expect(observer.update).toHaveBeenCalled()
    })

    it('#Payment Subject -> should not notify unsubscribed observers', () => {
        const subject = new PaymentSubject()

        const observer = {
            update: jest.fn()
        }

        const data = 'hey'

        subject.subscribe(observer)
        subject.unsubscribe(observer)
        subject.notify(data)

        expect(observer.update).not.toHaveBeenCalled()
    })

    it('#Payment Subject -> should notify subjects after a credit card transaction', () => {
        const subject = new PaymentSubject()
        const payment = new Payment(subject)

        const paymentSubjectNotifierSpy = jest.spyOn(
            payment.paymentSubject,
            payment.paymentSubject.notify.name
        )

        const data = {
            id: Date.now(),
            userName: 'Thais'
        }

        payment.creditCard(data)

        expect(paymentSubjectNotifierSpy).toHaveBeenCalledWith(data)
    })

    it('#All -> should notify all subscribers after a credit card payment', () => {
        const subject = new PaymentSubject()
        const marketing = new Marketing()
        const logistic = new Logistic()

        const marketingUpdateSpy = jest.spyOn(marketing, marketing.update.name)
        const logisticUpdateSpy = jest.spyOn(logistic, logistic.update.name)

        subject.subscribe(logistic)
        subject.subscribe(marketing)

        const payment = new Payment(subject)

        const data = {
            id: Date.now(),
            userName: 'Thais'
        }
        
        payment.creditCard(data)

        expect(marketingUpdateSpy).toHaveBeenCalledWith(data)
        expect(logisticUpdateSpy).toHaveBeenCalledWith(data)
    })
})