import mongoose, { Document, Schema, Types } from 'mongoose';

export interface carDealer extends Document {
    // id: string;
    name: string;
    email: string;
    city: string;
}
const CarDealerSchema = new Schema<carDealer>(
  {
    name: {
     type: String, 
     required: true 
    },
    email: { 
        type: String, 
        required: true
     },
      city: { 
        type: String, 
        required: true
     },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<carDealer>('carDealer', CarDealerSchema);