import UploadForm from "../../components/UploadForm/UploadForm.jsx";
import css from "./UploadPhotoPage.module.css";

const UploadPhotoPage = () => {
  return (
    <div className={css.container}>
      <UploadForm />
    </div>
  );
};

export default UploadPhotoPage;
