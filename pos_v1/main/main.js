'use strict';

function parseItem(input) {
  let split = input.split('-');
  return {barcode: split[0], count: parseFloat(split[1] || 1)};
}

function initShoppingCart(input, items) {
  let shoppingItems = [];
  input.forEach(inputItem => {
    const shoppingItem = parseItem(inputItem);
    const find = shoppingItems.filter(element => {
      return element.barcode === shoppingItem.barcode;
    })[0];
    if (find) {
      find.count += shoppingItem.count;
    } else {
      shoppingItems.push(shoppingItem);
    }
  });
  return shoppingItems.map(element => {
    const find = items.filter(item => {
      return item.barcode === element.barcode;
    })[0];
    return {item: find, count: element.count};
  });
}

function applyPromise(cartItems, promotions) {
  return cartItems.map(cartItem => {
    const promotion = promotions.filter(promotion => {
      return promotion.barcodes.indexOf(cartItem.item.barcode) > -1;
    });
    if (promotion == 0) {
      return normalPromise(cartItem);
    }
    switch (promotion[0].type) {
      case 'BUY_TWO_GET_ONE_FREE':
        return buyTwoGetOneFreePromise(cartItem);
      default:
        return normalPromise(cartItem);
    }
  })
}

function buyTwoGetOneFreePromise(cartItem) {
  const saved = cartItem.item.price * Math.floor(cartItem.count / 3);
  return Object.assign({}, cartItem, {total: cartItem.count * cartItem.item.price - saved, saved: saved});
}

function normalPromise(cartItem) {
  return Object.assign({}, cartItem, {total: cartItem.count * cartItem.item.price, saved: 0});
}

function printReceipt(receiptItems) {
  let receipt = '';
  let total = 0;
  let saved = 0;
  receipt += '***<没钱赚商店>收据***\n';
  receiptItems.forEach(receiptItem => {
    receipt += formatReceiptItem(receiptItem);
    total += receiptItem.total;
    saved += receiptItem.saved;
  });
  receipt += '----------------------\n';
  receipt += `总计：${formatPrice(total)}\n`;
  receipt += `节省：${formatPrice(saved)}\n`;
  receipt += '**********************';
  return receipt;

}

function main(input) {
  let shoppingCart = initShoppingCart(input, loadAllItems());
  const receipt = printReceipt(applyPromise(shoppingCart, loadPromotions()));
  console.log(receipt);
}

function formatPrice(total) {
  return `${parseFloat(total).toFixed(2)}(元)`;
}

function formatReceiptItem(receiptItem) {
  return `名称：${receiptItem.item.name}，数量：${receiptItem.count + receiptItem.item.unit}，单价：${formatPrice(receiptItem.item.price)}，小计：${formatPrice(receiptItem.total)}\n`;
}
