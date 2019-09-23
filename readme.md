# Marker app
Una aplicacion web que utiliza Node.js, Express, LowDB y javascript Vanilla para mostrar un listado de marcadores en un mapa y poder agregar mas marcadores al mismo

# Uso
Para utilizar la app, una vez instalado node y las dependencias, ejecutar:

```
npm start
```

Esto iniciara el servidor y podras utilizar la app en el puerto 3000, luego podras ir a `http://localhost:3000/` para ver la aplicacion.

# Desarrollo
Para correr el servidor en desarrollo se utiliza `nodemon` el cual permite recargar el codigo automaticamente de node una vez cambiado los archivos. Para eso es posible correr

```
npm run dev
```

Tambien se encontrara en el puerto 3000, y yendo a `http://localhost:3000/` se podra ver.
Los cambios del backend se veran reflejados automaticamente, para el frontend hace falta hacer recarga manualmente

# Node version
```
v11.5.0
```
La misma puede ser instalada siguiendo las guias oficiales de node en (https://nodejs.org/en/download/)


# Dependencias
Para instalar las depencias, se dispone del archivo `package.json`, el cual puede utilizar mediante el siguiente comando para instalar las dependencias:

```
npm install
```