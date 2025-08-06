import { Formik, Form, Field, ErrorMessage} from 'formik';
import { useId } from "react";
import * as Yup from "yup";
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { addArticle } from '../../redux/addArticle/addArticleOperations.js';
import css from './AddArticleForm.module.css';
import AutoResizeTextarea from './AutoResizeTextarea.jsx';

export default function AddArticleForm () {
const dispatch = useDispatch();
const navigate = useNavigate();


const ArticleFormSchema = Yup.object().shape({
  title: Yup.string()
  .min(3, "The title must be at least 3 characters long")
  .max(48, "The title must not exceed 48 characters")
  .required("The article title is required"),
  desc: Yup.string()
  .min(100, "The description must be at least 100 characters long")
  .max(4000, "The description must not exceed 4000 characters")
  .required("The article description is required"),
  img:  Yup.mixed().required('The article image is required')
      .test('fileSize', 'File too large', value => value && value.size <= 1 * 1024 * 1024)
      .test('fileType', 'Unsupported file format', value =>
        value && ['image/jpeg', 'image/png', 'image/webp'].includes(value.type)
      ),
});

const initialValues = {
  title: "",
  desc: "",
  img: null,
  date: new Date(),
};

const handleSubmit = async (values, actions) => {
  const formData = new FormData();
  formData.append('title', values.title);
  formData.append('desc', values.desc);
  formData.append('img', values.img);
  formData.append('date', values.date.toISOString());

  console.log('DATA', formData);
  console.log('Formik values:', values);
console.log('Description value:', values.desc);
for (const [key, value] of formData.entries()) {
  console.log(`${key}:`, value);
}
  

  try {
    const resultAction = await dispatch(addArticle(formData));
    console.log(resultAction.payload); 
    
    if (addArticle.fulfilled.match(resultAction)) {
      toast.success('Article published successfully!');
      //const newArticleId = resultAction.payload._id;
      navigate(`/articles/${resultAction.payload._id}`);
    //navigate(`/articles/${newArticleId}`);
      actions.resetForm();
    } else {
      toast.error(resultAction.payload || 'Something went wrong');
    }
  } catch (error) {
    toast.error('Unexpected error', error);
  }
};

const articlenameId = useId();

  return (
    <div className={css.formContainer}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={ArticleFormSchema}>
        {({ setFieldValue }) => (
      <Form className={css.form}>
        <div className={css.formLayout}>
        <div className = {css.formImg}> 
         <label htmlFor="fileInput" className={css.photoLabel}> 
       <input className={css.fieldImg} id="fileInput" hidden  type="file" name="img" accept="image/*" onChange={(event) => {setFieldValue("img", event.currentTarget.files[0]);}}/>
       <Field name="img">
    {({ form }) =>
      form.values.img ? (
        <img
          src={URL.createObjectURL(form.values.img)}
          alt="Preview"
          className={css.previewImg}
        />
      ) : (
        <div className={css.uploadBox}>
          <svg width="99" height="83" viewBox="0 0 99 83" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M67.9741 47.7115C67.9741 56.2879 59.703 63.2404 49.5001 63.2404C39.2972 63.2404 31.0261 56.2879 31.0261 47.7115C31.0261 39.1352 39.2972 32.1827 49.5001 32.1827C59.703 32.1827 67.9741 39.1352 67.9741 47.7115Z" stroke="#070707" />
            <path d="M1.46777 69.125L1.46778 31.2764C1.46778 24.9158 7.60195 19.7596 15.1688 19.7596C20.3584 19.7596 25.1026 17.2949 27.4234 13.3932L30.5286 8.17302C33.0979 3.85351 38.3501 1.12498 44.0954 1.125L54.9049 1.12503C60.6502 1.12505 65.9023 3.85359 68.4716 8.17307L71.5768 13.3933C73.8976 17.2951 78.6418 19.7597 83.8314 19.7597C91.3983 19.7597 97.5324 24.9159 97.5324 31.2765V69.125C97.5324 76.1666 90.7414 81.875 82.3643 81.875H16.6359C8.25876 81.875 1.46777 76.1666 1.46777 69.125Z" stroke="#070707" />
          </svg>
        </div>
      )
    }
  </Field>
       </label>
       <ErrorMessage name="img" component="span" className={css.errorImg} />
       </div>
       <div className={`${css.formTitle} ${css.formGroup}`}>
        <label htmlFor={articlenameId} className={css.formTitleLabel}>Title</label>
        <Field className={`${css.fieldTitle} ${css.erroTitle}`} placeholder="Enter the title" type="text" name="title" id={articlenameId} />
        <ErrorMessage name="title" component="span" className={css.errorImg}/>
        </div>
        <div className={`${css.formArticle} ${css.formGroup}`}> 
       <AutoResizeTextarea  name="desc" id="articletext" placeholder="Enter a text" className={`${css.fieldArticleField} ${css.fieldTError}`} />
        </div>
        </div>
      <button className={css.btnFormArticle} type="submit">Publish Article</button>
    </Form>
        )}
    </Formik>
      </div>
    
    );
};