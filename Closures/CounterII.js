/**
 * @param {integer} init
 * @return { increment: Function, decrement: Function, reset: Function }
 */
var createCounter = function(init) {
    let temp = init
    return {
        increment: () => ++temp,
        decrement: () => --temp,
        reset: () => temp = init
    }
};