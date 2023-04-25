const { ObjectId } = require("mongodb");
class CommentService {
    constructor(client) {
        this.Comment = client.db().collection("comment");
    }

    extractData(payload){
        const comment = {
            post_id: payload.post_id,
            username: payload.username,
            time: payload.time,
            message: payload.message,
            //ui_url: payload.ui_url
        };
        return comment;
    }
    async create(payload){
        const comment = this.extractData(payload);
        const result = await this.Comment.findOneAndUpdate(
            comment,
            {$set: {ui_url: comment.ui_url === true}},
            {returnDocument: "after",upsert: true}
        );
        return result;
    }
    // async find(filter) {
    //     const cursor = await this.Contact.find(filter);
    //     return await cursor.toArray();
    // }
    async find(){
        const cursor = await this.Comment.find();
        return await cursor.toArray();
    }
    async findById(id){
        return await this.Comment.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id): null,
        });
    }
    async findByPostId(id){
        // return await this.Comment.find({
        //     post_id:id
        // });
        const cursor = await this.Comment.find({post_id:id});
        return await cursor.toArray();
    }
    async delete(id){
        const result = await this.Comment.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id): null,
        });
        return 'deleted';
    }
}

module.exports = CommentService;