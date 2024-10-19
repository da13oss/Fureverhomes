import mongoose from 'mongoose';

const shelterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    website: String,
    description: String,
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

// Create a 2dsphere index on the location field
shelterSchema.index({ location: '2dsphere' });

const Shelter = mongoose.model('Shelter', shelterSchema);

export default Shelter;