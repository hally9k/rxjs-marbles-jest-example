const { Observable } = require('rxjs/Observable')
const delay = require('rxjs/add/operator/delay')
const { marbles } = require('rxjs-marbles')
const delayer = require('./delayer')

describe('Delayer', () => {
	it(
		'should work as expected...',
		marbles(m => {
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

			const expected = m.hot('^a-b--c---|', values)

			m.expect(delayer(m.hot('^a-b--c---d|', values))).toBeObservable(expected)
		})
	)
})
