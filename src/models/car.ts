import mongoose, { Document, Schema, Types } from 'mongoose';

export interface Car extends Document {
    // id: string; >> mongo
    carDealerId: Types.ObjectId;
    carMakerId: Types.ObjectId;
    name: string;
    price: string;
    year: string;
    color: string;
    wheelsCount: string;
}

const CarSchema = new Schema<Car>(
    {
        carDealerId: {
            type: Schema.Types.ObjectId,
            ref: "carMake",
            required: true
        },
        carMakerId: {
            type: Schema.Types.ObjectId,
            ref: "carDealer",
            required: true
        },
        name: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        year: {
            type: String,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        wheelsCount: {
            type: String,
            required: true
        },
    },
    {
        timestamps: true
    }
);

export default mongoose.model<Car>('Car', CarSchema);