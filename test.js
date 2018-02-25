const { Observable } = require('rxjs/Observable')
const delay = require('rxjs/add/operator/delay')
const { marbles } = require('rxjs-marbles')
const delayer = require('./delayer')

describe('Delayer', () => {
	it(
		'should complete when it receives a payload with a delay value of 4 seconds or greater.',
		marbles(m => {
			console.log = null

			Observable.prototype.delay = jest
				.fn()
				.mockImplementationOnce(() => m.cold('a|', values))
				.mockImplementationOnce(() => m.cold('b|', values))
				.mockImplementationOnce(() => m.cold('c|', values))
				.mockImplementationOnce(() => m.cold('d|', values))

			const values = {
				a: { value: 'alpha', delay: 1000 },
				b: { value: 'beta', delay: 2000 },
				c: { value: 'charlie', delay: 3000 },
				d: { value: 'delta', delay: 4000 }
			}

			const producer = m.hot('^a-b--c---d|', values)
			const expected = m.hot('^a-b--c---|', values)

			const observable = delayer(producer)

			m.expect(observable).toBeObservable(expected)
		})
	)
})
