const mongoose = require('mongoose');

const getConnection = async () => {

    try {
        const url = 'mongodb://eliana27:E12345678@cluster0-shard-00-00.pxilg.mongodb.net:27017,cluster0-shard-00-01.pxilg.mongodb.net:27017,cluster0-shard-00-02.pxilg.mongodb.net:27017/ing-web-api?ssl=true&replicaSet=atlas-x87v4v-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0'

        //'mongodb+srv://eliana27:E12345678@cluster0.pxilg.mongodb.net/ing-web-api?retryWrites=true&w=majority&appName=Cluster0'
        await mongoose.connect(url);

        console.log('conexion exitosa'); 

    } catch(error) {
        console.log(error);
    }
}   
    module.exports = getConnection;

