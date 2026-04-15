import mongoose from 'mongoose';

const codeSessionSchema = new mongoose.Schema({
  roomId: { type: String, required: true },
  code: { type: String, default: '' },
  language: { type: String, default: 'javascript' },
  lastEditedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default mongoose.model('CodeSession', codeSessionSchema);
