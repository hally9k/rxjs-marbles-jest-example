const delayer = require('./delayer')
const { Subject } = require('rxjs/Subject')
const { Observable } = require('rxjs/Observable')
require('rxjs/add/observable/interval')
require('rxjs/add/operator/take')
require('rxjs/add/operator/delay')

// Producer
const subject = new Subject()

// Observable
const observable = delayer(subject)

observable.subscribe(null, null, () => console.log('complete'))

subject.next({ value: 'alpha', delay: 1000 })
subject.next({ value: 'beta', delay: 2000 })
subject.next({ value: 'charlie', delay: 3000 })
subject.next({ value: 'delta', delay: 4000 })

// Ticker
Observable.interval(1000)
	.take(5)
	.subscribe(() => console.log('.'))
