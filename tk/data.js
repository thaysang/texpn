const db = {
    users: [
        
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

export const allProducts = () => {
    return db.products
}

export const findOne = ({username}) => {
    return db.users.find((obj)=>obj.username === username)
}