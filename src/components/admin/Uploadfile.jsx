import React, { useState } from "react";
import { toast } from "react-toastify";
import Resizer from "react-image-file-resizer";
import { removeFile, uploadFiles } from "../../api/Product";
import useClickbuyStore from "../../store/clickbuy-store";
import { LoaderCircle } from "lucide-react";

const Uploadfile = ({ form, setForm }) => {
  const token = useClickbuyStore((state) => state.token);
  const [isLoading, setIsLoading] = useState(false);
  const handleOnChange = (e) => {
    setIsLoading(true);
    const files = e.target.files;
    if (files) {
      setIsLoading(true);
      let allFiles = form.images; // [] empty array
      for (let i = 0; i < files.length; i++) {
        console.log(files[i]);

        // Validate
        const file = files[i];
        if (!file.type.startsWith("image/")) {
          toast.error(`ไฟล์ ${file.name} ไม่ใช่รูปภาพน้าา อย่าเอ๋อ`);
          continue;
        }
        // Image Resize
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (data) => {
            // endpoint Backend
            uploadFiles(token, data)
              .then((res) => {
                console.log(res);

                allFiles.push(res.data);
                setForm({
                  ...form,
                  images: allFiles,
                });
                setIsLoading(false);
                toast.success("อัพโหลดรูปภาพสำเร็จ");
              })
              .catch((err) => {
                console.log(err);
                setIsLoading(false);
                toast.error("อัพโหลดรูปภาพไม่สำเร็จ");
              });
          },
          "base64"
        );
      }
    }
  };

  const handleDelete = (public_id) => {
    const images = form.images;
    removeFile(token, public_id)
      .then((res) => {
        const filterImages = images.filter((item) => {
          return item.public_id !== public_id;
        });

        console.log(filterImages);
        setForm({
          ...form,
          images: filterImages,
        });
        toast.error("ลบรูปภาพสำเร็จ");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="my-4">
      <div className="flex mx-4 gap-4 my-4">
        {isLoading && <LoaderCircle className="w-16 h-16 animate-spin" />}

        {form.images?.map((item, index) => (
          <div className="relative" key={index}>
            <img
              className="w-32 h-32 rounded-xl hover:scale-105"
              src={item.url}
            />
            <span
              onClick={() => handleDelete(item.public_id)}
              className="absolute top-0 right-0 p-1 bg-white text-red-500  rounded-md cursor-pointer"
            >
              X
            </span>
          </div>
        ))}
      </div>

      <div>
        <input onChange={handleOnChange} type="file" name="images" multiple />
      </div>
    </div>
  );
};

export default Uploadfile;
