const { ObjectId } = require("mongodb");
class PostService {
    constructor(client) {
        this.Post = client.db().collection("posts");
    }

    extractData(payload){
        const post = {
            username: payload.username,
            time: payload.time,
            message: payload.message,
            url: payload.url,
        };
        return post;
    }
    async create(payload){
        const post = this.extractData(payload);
        //if(this.findByUserName(username)) return false;
        const result = await this.Post.findOneAndUpdate(
            post,
            {$set: {ui_url: post.ui_url === true}},
            {returnDocument: "after",upsert: true}
        );
        return post;
    }
    // async find(filter) {
    //     const cursor = await this.Contact.find(filter);
    //     return await cursor.toArray();
    // }
    async find(){
        const cursor = await this.Post.find();
        return await cursor.toArray();
    }
    async findById(id){
        return await this.Post.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id): null,
        });
    }
    async delete(id){
        const result = await this.Post.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id): null,
        });
        return 'deleted';
    }
}

module.exports = PostService;