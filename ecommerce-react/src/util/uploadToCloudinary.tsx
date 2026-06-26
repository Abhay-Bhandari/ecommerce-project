const uploadToCloudinary = async (pics: any) => {
  const cloud_name = "dqfp4czbe";
  const upload_preset = "shipsite";

  if (pics) {
    const data = new FormData();
    data.append("file", pics);
    data.append("upload_preset", upload_preset);
    data.append("cloud_name", cloud_name);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dqfp4czbe/upload",
      {
        method: "post",
        body: data,
      },
    );

    const fileData = await res.json();
    return fileData.url;
  } else {
    console.log("No image uploaded");
  }
};

export default uploadToCloudinary;
