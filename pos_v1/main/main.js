'use strict';

function parseItem(input) {
  let split = input.split('-');
  return {barcode: split[0], count: parseInt(split[1] || 1)};
}

function initShoppingCart(input, items) {
  let shoppingItems = [];
  input.forEach(inputItem => {
    let shoppingItem = parseItem(inputItem);
    let find = shoppingItems.filter(element => {
      return element.barcode === shoppingItem.barcode;
    })[0];
    if (find) {
      find.count += shoppingItem.count;
    } else {
      shoppingItems.push(shoppingItem);
    }
  });
  return shoppingItems.map(element => {
    let find = items.filter(item => {
      return item.barcode === element.barcode;
    })[0];
    return {item: find, count: element.count};
  });
}

let cart = initShoppingCart(['ITEM000003-5', 'ITEM000001', 'ITEM000003-2'], loadAllItems());
console.log(cart);

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
