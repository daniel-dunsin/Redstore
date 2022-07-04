export const getTotal = (cart)=>{
    const total = cart.reduce((acc, curr)=>{
        const {amount, price} = curr;
        acc.totalPrice += parseInt((parseFloat(price) * parseFloat(amount)).toFixed(2));
        acc.totalItems += parseFloat(amount);
        acc.tax = (acc.totalPrice * 0.1).toFixed(2);
        acc.subtotal = acc.totalPrice - acc.tax;
        return acc;
    }, {
        totalPrice:0,
        totalItems:0,
        tax: 0,
        subtotal: 0
    });
    return total;
}