// Load initial data to database

const readline = requiere('readLine');

const Product = require('./models/Product');

async function main() {
    const continuar = await pregunta('¿Quieres borrar la base de datos?(S/N)');
    if (!continuar) {
        process.exit();
    }

    const connection = require('./lib/conectMongoose');

    await initProducts();
    connection.close();
};

main().catch(err => console.log('Ha habido un error'));

async function initProducts() {
    //delete
    const result = await Product.deleteMany();
    console.log(`Eliminados ${result.deletedCount} productos`);

    //create initian products
    const inserted = await Product.insertMany([
        { name: "Switch", onSale: true, price: 350, image: "switch.png", tags: ["game", "nintendo", "electronics", "videoconsole", "portable", "tv connection"] },
        { name: "Switch Lite", onSale: true, price: 299, image: "switchlite.png", tags: ["game", "nintendo", "electronics", "videoconsole", "portable"] },
        { name: "Playstation 5", onSale: false, price: 700, image: "playstation.png", tags: ["playstation", "electronics", "videoconsole", "tv connection"] },
        { name: "Xbox", onSale: false, price: 400, image: "xbox.png", tags: ["game", "xbox", "electronics", "videoconsole", "tv connection"] },
        { name: "Maquina Arcade", onSale: true, price: 1000, image: "arcade.png", tags: ["retro", "game", "electronics", "console"] }
    ]);

};

function pregunta(texto) {
    return new Promise((resolve, reject) => {
        const interface = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        interface.question(texto, res => {
            interface.close();
            if (res.toLowerCase() === 's') {
                resolve(true);
                return;
            }
            resolve(false)
        })
    });
};

