# Function

## after

```
_.after(n, func);
```

创建一个函数，当这个函数被调用 n 或更多次之后，将马上触发 func。

+ 返回一个新函数
+ 新函数执行 n 次或更多次后，立即执行 func
+ 限定 func 函数什么时候调用
+ 回调函数

## ary

```
_.ary(func, [n = func.length])
```

创建一个调用 func 的函数。调用func时最多接受 n个参数，忽略多出的参数。

+ 返回一个新函数
+ 新函数调用 func 函数
+ func 执行时，最多接受 n 个参数
+ n 默认是 func 的形参个数

> function.length 函数形参个数

## before

```
_.before(n, func);
```

创建一个调用 func 的函数，通过 this 绑定和创建函数的参数调用 func，
调用次数不超过 n 次。
之后再调用这个函数，将返回一次最后调用 func 的结果。

+ 返回一个新函数
+ 新函数调用 func 函数，调用次数不超过 n 次
+ 之后调用，将返回最后一次调用 func 的结果
+ 限定 func 函数调用次数
+ 不超过 n 次，可以调用 n - 1 次

## bind

```
_.bind(func, thisArg, [partials]);
```

绑定函数执行上下文，可以传递附加参数
