# Practica-nodepop

Práctica que pertenece al módulo de Backend con Node.

El servicio NODEPOP mantiene anuncios de compra o venta de artículos y permite buscar como poner filtros por varios criterios, por tanto la API a desarrollar deberá proveer los métodos necesarios para esto. Se ha usado Node, EXPRESS, mongoose y Node js. 

Para instalar dependencias:

```sh
npm install
```

Para inicializar base de datos:


```sh
npm run init-db
```

Para iniciar App en modo desarrollo:


```sh
npm run dev
```

Para iniciar App en modo producción:
```sh
npm start
```
_____________________________________________________________________________________________________________________________________
## API Methods
Api de NODEPOP esta basada en principios REST y usa los métodos HTTP tanto por GET como por POST. 
El formato  que utiliza la API para enviar y recibir respuestas es en JSON.

GET productos :

Retorna una lista de todos los productos
```sh
http://localhost:3000/api/products
```

GET lista por tag :
Filtra productos cuyo campo tag contenga nintendo 
```sh
http://localhost:3000/api/products?tags=nintendo 
```

GET lista por tipo de anuncio :
Filtra productos por tipo en venta si el parámetro es true o si es false
```sh
http://localhost:3000/api/products?onSale=true
```

GET rango de precio :
Devuelve los productos cuyo precio esté entre 20 y 350
```sh
http://localhost:3000/api/products?price=20-350
```
Si el precio inicial es mayor que el final, devuelve una lista vacía
```sh
http://localhost:3000/api/products?price=30-40
```

GET búsqueda nombre :
Devuelve los productos cuyo nombre empiece por “st”
```sh
http://localhost:3000/api/products?name=st
```

GET lista de tags :
Devuelve una lista con los tags que existen en ese momento
```sh
http://localhost:3000/api/products/tags
```

GET  imagen :
Devuelve la imagen de un producto
```sh
http://localhost:3000/images/products/switch.png
```

POST añadir un producto :
Crea un nuevo producto y lo guarda en la base de datos
```sh
http://localhost:3000/api/products
```


