import { promises as fs} from 'fs'

class IDGenerator {
    constructor() {
        this.counter = 0;
        this.usedIDs = new Set();
    }

    generateUniqueID() {
        let newID;
        do {
            newID = ++this.counter; 
        } while (this.usedIDs.has(newID)); 

        this.usedIDs.add(newID); 
        return newID;
    }
}

class Cart {
    constructor(id, products = []){
        this.id = id;
        this.products = products;
    }
}

class CartManager {
    constructor(){
        this.route = "carts.json"
        this.carts = [];
        this.idGenerator = new IDGenerator();
    }

    async reset() {
        this.carts = [];
        await this.writeCarts();
    }

    async readCarts(){
        try {
            const content = await fs.readFile(this.route, "utf-8");
            const cartsJson = JSON.parse(content); 
            this.carts = cartsJson;
        } catch (error) {
            console.error("Error al leer el archivo JSON:", error);
        }
    };

    async writeCarts(){
        const cartsJson = JSON.stringify(this.carts, null, 2);
        await fs.writeFile(this.route, cartsJson);
    };

    async getCartById(id){
        await this.readCarts();
        const cartFound = this.carts.find(cart => cart.id === Number(id))
        if(cartFound){
            console.log(cartFound)
            await this.writeCarts();
            return cartFound;
        }else{
            throw new Error("There isn't a cart with that id")
        }
    }

    async createCart(){
        await this.readCarts();
        const id = this.idGenerator.generateUniqueID();
        const cart = new Cart(id);
        this.carts.push(cart);
        await this.writeCarts();
        return cart;
    }

    async addProductsInCart(cartId, productId, quantity = 1){
        await this.readCarts();
        const cartIndex = this.carts.findIndex(cart => cart.id === cartId);
        if (cartIndex !== -1) {
            const existingProductIndex = this.carts[cartIndex].products.findIndex(
                (product) => product.product === productId
            );

            if (existingProductIndex !== -1) {
                this.carts[cartIndex].products[existingProductIndex].quantity += quantity;
            } else {
                this.carts[cartIndex].products.push({ product: productId, quantity });
            }

            await this.writeCarts();
            return this.carts[cartIndex];
        } else {
            throw new Error("There isn't a cart with that id");
        }
    }
}

export const manager = new CartManager();