export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(
    name: Item['name'],
    sellIn: Item['sellIn'],
    quality: Item['quality']
  ) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

const MAX_QUALITY = 50;

function handleTicketQuality(item: Item) {
  if (item.sellIn <= 0) {
    item.quality = 0;
  } else if (item.sellIn <= 5) {
    item.quality += 3;
  } else if (item.sellIn <= 10) {
    item.quality += 2;
  } else {
    item.quality += 1;
  }

  if (item.quality > MAX_QUALITY) {
    return MAX_QUALITY;
  }

  return item.quality;
}

function handleQualityDecrease(item: Item, multiplier: 1 | 2) {
  if (item.sellIn <= 0) {
    item.quality -= 2 * multiplier;
  } else {
    item.quality -= 1 * multiplier;
  }

  if (item.quality < 0) {
    return 0;
  }

  return item.quality;
}

function handleAgingItems(item: Item) {
  if (item.sellIn <= 0) {
    item.quality += 2;
  } else {
    item.quality += 1;
  }

  if (item.quality >= MAX_QUALITY) {
    return MAX_QUALITY;
  }

  return item.quality;
}

const agingItems = ['Aged Brie'];
const ticketItems = ['Backstage passes to a TAFKAL80ETC concert'];
const legendaryItems = ['Sulfuras, Hand of Ragnaros'];

const specialItems = [...agingItems, ...ticketItems];

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      const { name, sellIn } = item;

      // legendary items do not change
      if (legendaryItems.includes(name)) {
        continue;
      }

      // specialItems increase in quality instead of decreasing
      if (!specialItems.includes(name)) {
        if (name.includes('Conjured')) {
          this.items[i].quality = handleQualityDecrease(item, 2);
        } else {
          this.items[i].quality = handleQualityDecrease(item, 1);
        }
      } else {
        // handle special case for tickets
        if (ticketItems.includes(name))
          this.items[i].quality = handleTicketQuality(item);
        // handle special case for aging products
        if (agingItems.includes(name)) {
          this.items[i].quality = handleAgingItems(item);
        }
      }
      // each iteration decreases sellIn by 1
      this.items[i].sellIn = sellIn - 1;
    }

    return this.items;
  }
}
