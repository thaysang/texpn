
const db = {
    users:[
        {
            "id": 0,
            "username": "admin",
            "password": "$2b$10$0idwBPrksZRQ/YIrwnUH9OCKqvyu0to4.E3/g4GnCxm2YSx9.gpRm"
          },
          {
            "id": 1,
            "username": "zshop",
            "password": "$2b$10$LCr3bpHFdH.l3l/HCZcZZe8dmzGZfBlo/01IWiNVeoWmL8PvwccHO"
          }
    ],
    products:[
        {
            id:0,
            name:"Broccoli",
            price:3.99,
            img:"http://vegetable-shop.surge.sh/img/broccoli.jpg"
        },
        {
            id:0,
            name:"Carrots",
            price:4.99,
            img:"http://vegetable-shop.surge.sh/img/carrots.jpg"
        },
    ]
}

module.exports = db