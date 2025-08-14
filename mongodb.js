console.log("Starting MongoDB connection...");

const { MongoClient, ObjectId } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

async function connectToDB() {
    const client = await MongoClient.connect(connectionURL);
    console.log("Connected to DB");

    const db = client.db(databaseName);

    // db.collection('users').updateOne({
    //     _id: new ObjectId('67fce93365bdd88b0ab032b9')
    // }, {
    //     $set: {
    //         age: 41
    //     }
    // }).then((res) => {
    //     console.log(res, 'res');
    // }).catch((err) => {
    //     console.log(err, 'err');
    // })

    // db.collection('tasks').updateMany({
    //     completed: false
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // })

    // db.collection('users').deleteMany({
    //     age: 40
    // }).then((res) => {
    //     console.log(res);
    // }).catch((err) => {
    //     console.log(err);
    // })

    db.collection('tasks').deleteOne({
        _id: new ObjectId('68964d191a5ea304d9230c47')
    }).then((res) => {
        console.log(res);
    }).catch((err) => {
        console.log(err);
    })

    // await db.collection('tasks').insertMany([{
    //     description: 'coffee3',
    //     completed: false,
    // }, {
    //     description: 'coffee2',
    //     completed: false,
    // }]).then((res) => {
    //     console.log(res);
    // }).catch((err) => {
    //     console.log(err);
    // })

    // const cursor = db.collection('tasks').find({ description: 'Internal Call', completed: true });
    // const docs = await cursor.toArray();
    // console.log(docs, 'docs');

    //update all if it contains coffee in the description
    // db.collection('tasks').updateMany(
    //     { description: /coffee/i },
    //     { $set: { completed: true } }
    // );

    // db.collection('tasks').updateOne(
    //     { _id: new ObjectId('6895ac9812314844db5defd4') },
    //     { $set: { description: 'Iced coffeeeee' } }
    // )

    // db.collection('tasks').deleteMany(
    //     { description: 'Iced coffeeeee' }
    // )

    // db.collection('tasks').updateOne({ _id: new ObjectId('6895ace3c6c95aa8775ee830') },
    //     [{ $set: { description: "Iced coffee!" } }])

    const counts = await db.collection('users').distinct('name')
    console.log(counts);

}

connectToDB();
