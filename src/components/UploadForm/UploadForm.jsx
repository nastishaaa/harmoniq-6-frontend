import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import css from "./UploadForm.module.css";
import uploadIcon from "../../assets/icons/photo.svg";
import { registerThunk } from "../../redux/register/operation.js";
import { selectUserData } from "../../redux/register/selector.js";
import { setAuth } from "../../redux/auth/slice.js";
import { clearUserData } from "../../redux/register/slice.js";

const validationSchema = Yup.object().shape({
  avatar: Yup.mixed()
    .required("Please select a photo.")
    .test(
      "fileSize",
      "File must be at most 1MB.",
      (value) => !value || value.size <= 1024 * 1024
    )
    .test(
      "fileType",
      "Only images are allowed.",
      (value) => !value || value.type.startsWith("image/")
    ),
});

const UploadForm = () => {
  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector(selectUserData);

  useEffect(() => {
    if (!userData.name || !userData.email || !userData.password) {
      toast.error("Incomplete registration data");
      navigate("/register");
    }
  }, [userData, navigate]);

  const handlePreview = (file) => {
    if (!file) {
      setPreview(null);
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    if (!values.avatar) {
      toast.error("Please select a photo before submitting.");
      setSubmitting(false);
      return;
    }

    try {
      const resultAction = await dispatch(
        registerThunk({ ...userData, avatar: values.avatar })
      );

      if (registerThunk.fulfilled.match(resultAction)) {
        const { token, user } = resultAction.payload;

        localStorage.setItem("token", token);
        dispatch(setAuth({ user, token }));

        toast.success("Registration successful!");
        dispatch(clearUserData());
        // Поміняти після реалізації роуту
        navigate("/home-authorised");
      } else {
        toast.error(resultAction.payload || "Registration failed.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Unexpected error during registration.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Formik
        initialValues={{ avatar: null }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting, values }) => (
          <Form className={`${css.form} ${preview ? css.formExpanded : ""}`}>
            <h1 className={css.title}>Upload your photo</h1>

            {preview ? (
              <img src={preview} alt="Preview" className={css.previewImage} />
            ) : (
              <label htmlFor="file-upload" className={css.customUpload}>
                <img src={uploadIcon} alt="Upload" className={css.icon} />
              </label>
            )}

            <input
              id="file-upload"
              type="file"
              name="avatar"
              accept="image/*"
              onChange={(e) => {
                const file = e.currentTarget.files[0];
                if (!file) return;

                if (!file.type.startsWith("image/")) {
                  toast.error("Only image files are allowed");
                  return;
                }
                if (file.size > 1024 * 1024) {
                  toast.error("File too large (max 1MB)");
                  return;
                }

                setFieldValue("avatar", file);
                handlePreview(file);
              }}
              className={css.hidden}
            />

            <button
              className={`${css.btn} ${values.avatar ? css.active : ""}`}
              type="submit"
              disabled={isSubmitting}
            >
              Save
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default UploadForm;
