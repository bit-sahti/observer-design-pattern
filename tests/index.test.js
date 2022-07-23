import { jest } from '@jest/globals'

import { PaymentSubject } from "../src/subjects/paymentSubjects.js"
import { Payment } from "../src/events/payment.js"

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
    
    it.todo('#All -> should notify subscribers after a credit card payment')
})