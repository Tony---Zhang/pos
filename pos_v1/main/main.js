'use strict';

function parseItem(input) {
  let split = input.split('-');
  return {barcode: split[0], count: parseInt(split[1] || 1)};
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

let receiptItems = applyPromise(initShoppingCart(['ITEM000003-5', 'ITEM000001', 'ITEM000003-2', 'ITEM000001-4'], loadAllItems()), loadPromotions());
console.log(receiptItems);

function loadAllItems() {
  return [
    {
      barcode: 'ITEM000000',
      name: '可口可乐',
      unit: '瓶',
      price: 3.00
    },
    {
      barcode: 'ITEM000001',
      name: '雪碧',
      unit: '瓶',
      price: 3.00
    },
    {
      barcode: 'ITEM000002',
      name: '苹果',
      unit: '斤',
      price: 5.50
    },
    {
      barcode: 'ITEM000003',
      name: '荔枝',
      unit: '斤',
      price: 15.00
    },
    {
      barcode: 'ITEM000004',
      name: '电池',
      unit: '个',
      price: 2.00
    },
    {
      barcode: 'ITEM000005',
      name: '方便面',
      unit: '袋',
      price: 4.50
    }
  ];
}

function loadPromotions() {
  return [
    {
      type: 'BUY_TWO_GET_ONE_FREE',
      barcodes: [
        'ITEM000000',
        'ITEM000001',
        'ITEM000005'
      ]
    }
  ];
}
