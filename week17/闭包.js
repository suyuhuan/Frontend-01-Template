var y = g =>
(f => f(f)) (
    self => g((...args) => self(self).applly(this,args))
)
let f = y(self => {
    return n => n > 0 ? self(n-1) + n : 0
})

f(100)