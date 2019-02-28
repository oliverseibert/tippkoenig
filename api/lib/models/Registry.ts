import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const RegistrySchema = new Schema({
  _id: String,
  showFullscreenAdIOS: {
    type: Boolean,
    default: true
  },
  showFullscreenAdAndroid: {
    type: Boolean,
    default: true
  },
  showBannerAdIOS: {
    type: Boolean,
    default: true
  },
  showBannerAdAndroid: {
    type: Boolean,
    default: true
  },
  showFullscreenAdCounter: {
    type: Number,
    default: 15
  }
});

mongoose.model('Registry', RegistrySchema);

export { RegistrySchema }
