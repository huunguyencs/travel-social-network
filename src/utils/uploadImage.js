export const checkSizeImage = (file) => {
    if (!file)
        return "Tệp không tồn tại!";
    if (file.size > 2 * 1024 * 1024) // 2mb
        return "Kích thước ảnh lớn nhất là 2Mb!";
    const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!validImageTypes.includes(file.type))
        return "Định dạng không phù hợp (hỗ trợ jpeg, png và jpg)!"
    return "";
}

export const uploadImages = async (images) => {
    let imageArr = [];
    for (const image of images) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "");
        formData.append("cloud_name", "");

        try {
            const data = await fetch("", {
                method: "POST",
                body: formData
            })
            const res = await data.json();
            imageArr.push({ public_id: res.public_id, url: res.secure_url });
        }
        catch (err) {

        }
    }
    return imageArr;
}