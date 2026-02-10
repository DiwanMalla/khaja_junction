export type MenuItem = {
  id: string;
  name: string;
  price: number;
  description?: string;
  popular?: boolean;
  category?: string;
  image?: string; 
};

export type MenuCategory = {
  name: string;
  items: MenuItem[];
};

export const MENU_DATA: MenuCategory[] = [
  {
    name: "Momo Mania 🥟",
    items: [
      { id: "momo-c-j", name: "Chicken Jhol Momo", price: 16.0, description: "Dumplings drowned in a rich, tangy sesame soul.", popular: true, image: "/momo-jhol.png" },
      { id: "momo-c-s", name: "Chicken Steam Momo", price: 14.0, description: "Juicy chicken dumplings served with homemade tomato achaar.", popular: true, image: "/momo-steam.png" },
      { id: "momo-c-f", name: "Chicken Fried Momo", price: 15.0, description: "Crispy golden fried dumplings served with spicy sauce.", image: "/momo-fried.png" },
      { id: "momo-c-c", name: "Chicken Chilly Momo", price: 17.0, description: "Fried momo tossed in spicy chili sauce, capsicum, and onions.", image: "/momo-fried.png" },
      { id: "momo-b-s", name: "Buff Steam Momo", price: 14.0, description: "Authentic buffalo meat dumplings with traditional spices.", image: "/momo-steam.png" },
      { id: "momo-b-j", name: "Buff Jhol Momo", price: 16.0, description: "Buff dumplings in our signature sesame jhol soup.", image: "/momo-jhol.png" },
      { id: "momo-v-s", name: "Veg Steam Momo", price: 12.0, description: "Mixed vegetable filling, light and healthy.", image: "/momo-steam.png" },
      { id: "momo-v-f", name: "Veg Fried Momo", price: 13.0, description: "Crispy vegetable dumplings.", image: "/momo-fried.png" },
    ]
  },
  {
    name: "Street Food Specials 🔥",
    items: [
      { id: "laphing", name: "Laphing (Dry/Soup)", price: 10.0, description: "Spicy cold mung bean jelly noodles. A Tibetan street food classic.", popular: true, image: "/placeholder.png" },
      { id: "chatpat", name: "Chatpat", price: 8.0, description: "Spicy, tangy puffed rice mixture with fresh herbs and zesty spices.", image: "/placeholder.png" },
      { id: "sausage", name: "Fried Sausage", price: 8.0, description: "Crispy fried sausage served with spicy dip.", image: "/placeholder.png" },
      { id: "lollipop", name: "Chicken Lollipop", price: 14.0, description: "Spicy, crispy chicken drumettes (6 pcs).", image: "/placeholder.png" },
      { id: "chhoila", name: "Chicken Chhoila", price: 16.0, description: "Grilled spiced chicken marinated with garlic, ginger and mustard oil.", image: "/khaja-set.png" },
      { id: "sekuwa-p", name: "Pork Sekuwa", price: 18.0, description: "Charcoal-grilled marinated pork skewers (2 sticks).", image: "/khaja-set.png" },
    ]
  },
  {
    name: "Noodles & Rice 🍜",
    items: [
      { id: "cm-c", name: "Chicken Chowmein", price: 15.0, description: "Wok-tossed noodles with chicken and veggies.", popular: true, image: "/chowmein-c.png" },
      { id: "cm-b", name: "Buff Chowmein", price: 16.0, description: "Spicy noodles with buffalo meat.", image: "/chowmein-c.png" },
      { id: "cm-v", name: "Veg Chowmein", price: 13.0, description: "Stir-fried noodles with seasonal vegetables.", image: "/chowmein-c.png" },
      { id: "fr-c", name: "Chicken Fried Rice", price: 15.0, description: "Classic fried rice with egg and chicken.", image: "/placeholder.png" },
      { id: "fr-b", name: "Buff Fried Rice", price: 16.0, description: "Savory fried rice with spiced buffalo meat.", image: "/placeholder.png" },
      { id: "thukpa", name: "Chicken Thukpa", price: 16.0, description: "Hearty noodle soup with chicken and herbs.", image: "/placeholder.png" },
    ]
  },
  {
    name: "Sets & Combos 🍱",
    items: [
      { id: "khaja-set", name: "Newari Khaja Set", price: 22.0, description: "Beaten rice, chhoila, alu tama, black eyed peas, and achaar.", popular: true, image: "/khaja-set.png" },
      { id: "bhutan-set", name: "Bhutan Set", price: 20.0, description: "Traditional goat innards stir-fry served with beaten rice and accompaniments.", image: "/khaja-set.png" },
      { id: "thali-c", name: "Chicken Thali Set", price: 20.0, description: "Rice, daal, chicken curry, vegetable curry, pickle, papad & dessert.", image: "/khaja-set.png" },
      { id: "thali-m", name: "Mutton Thali Set", price: 22.0, description: "Rice, daal, goat curry, vegetable curry, pickle, papad & dessert.", image: "/khaja-set.png" },
    ]
  },
  {
    name: "Drinks 🥤",
    items: [
      { id: "coke", name: "Coke / Sprite / Fanta", price: 3.5, description: "375ml Can", image: "/placeholder.png" },
      { id: "water", name: "Mineral Water", price: 3.0, description: "600ml Bottle", image: "/placeholder.png" },
      { id: "lassi", name: "Mango Lassi", price: 6.0, description: "Sweet yogurt drink with mango pulp.", image: "/placeholder.png" },
      { id: "tea", name: "Masala Tea", price: 4.5, description: "Hot spiced milk tea.", image: "/placeholder.png" },
    ]
  }
];
