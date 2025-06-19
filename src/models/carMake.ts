import mongoose, { Document, Schema, Types } from 'mongoose';

export interface carMake extends Document {
    // id: string;
    country: string;
    brandName: string;
}
const CarMakeSchema = new Schema<carMake>(
  {
    country: {
     type: String, 
     required: true 
    },
    brandName: { 
        type: String, 
        required: true
     },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model<carMake>('carMake', CarMakeSchema);
