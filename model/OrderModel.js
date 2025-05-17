export default class OrderModel {
    constructor(oId,orderDate, cId, customerName, phoneNumber, total,cash, balance, discount, items) {
        this.oId = oId;
        this.orderDate = orderDate;
        this.cId = cId;
        this.customerName = customerName;
        this.phoneNumber = phoneNumber;
        this.total = total;
        this.cash = cash;
        this.balance = balance;
        this.discount = discount;
        this.items = items;
    }
}