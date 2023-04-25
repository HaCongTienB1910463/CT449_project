const { ObjectId } = require("mongodb");
class ContactService {
    constructor(client) {
        this.Contact = client.db().collection("contacts");
    }

    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractContactData(payload){
        const contact = {
            username: payload.username,
            pass: payload.pass,
            url: payload.url,
            // phone: payload.phone,
            // favorite: payload.favorite,
        };
        // Objects.keys(contact).forEach(
        //     (key)=>contact[key] === undefined && delete contact[key]
        // );
        return contact;
    }

    async create(payload){
        const contact = this.extractContactData(payload);
        //if(this.findByUserName(username)) return false;
        const result = await this.Contact.findOneAndUpdate(
            contact,
            {$set: {url: contact.url === true}},
            {returnDocument: "after",upsert: true}
        );
        return result;
    }
    
    // async find(filter) {
    //     const cursor = await this.Contact.find(filter);
    //     return await cursor.toArray();
    // }

    async findById(id){
        return await this.Contact.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id): null,
        });
    }

    async findByUserName(name){
        return await this.Contact.findOne({
            username:name
        });
    }

    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractContactData(payload);
        const result = await this.Contact.findOneAndUpdate(
            filter,
            { $set: update },
            { returnDocument: "after" }
        );
        return update;
    }
}

module.exports = ContactService;