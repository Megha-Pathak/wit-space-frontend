import axios from "axios";

const API_URL = "https://xlpyxuiddk.execute-api.ap-south-1.amazonaws.com/dev";
const UPLOAD_IMAGE = "/upload";

export async function uploadImage(uploadImageUrl) {
  const payload = {
    url: uploadImageUrl,
  };
  return await axios.post(API_URL + UPLOAD_IMAGE, payload);
}
