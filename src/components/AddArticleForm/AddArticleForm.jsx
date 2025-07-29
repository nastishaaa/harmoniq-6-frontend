import { Formik, Form, Field, ErrorMessage} from 'formik';
import { useId } from "react";
import * as Yup from "yup";
import { useDispatch } from 'react-redux';
//import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { addArticle } from '../../redux/addArticle/addArticleOperations.js';
import css from './AddArticleForm.module.css'

export default function AddArticleForm () {
const dispatch = useDispatch();
const navigate = useNavigate();

const ArticleFormSchema = Yup.object().shape({
  articlename: Yup.string().min(3, "Too Short!").max(48, "Too Long!").required("Required"),
  articletext: Yup.string().min(100, "Too Short!").max(4000, "Too Long!").required("Required"),
  articleimg:  Yup.mixed().required('Image is required')
      .test('fileSize', 'File too large', value => value && value.size <= 1 * 1024 * 1024)
      .test('fileType', 'Unsupported file format', value =>
        value && ['image/jpeg', 'image/png', 'image/webp'].includes(value.type)
      ),
});

const initialValues = {
  articlename: "",
  articletext: "",
  articleimg: null,
  publishDate: new Date(),
};

const handleSubmit = async (values, actions) => {
  const formData = new FormData();
  formData.append('articlename', values.articlename);
  formData.append('articletext', values.articletext);
  formData.append('articleimg', values.articleimg);

  try {
    const resultAction = await dispatch(addArticle(formData));

    if (addArticle.fulfilled.match(resultAction)) {
      alert.success('Article published successfully!');
       navigate(`/articles/${resultAction.payload._id}`);
      actions.resetForm();
    } else {
      alert.error(resultAction.payload || 'Something went wrong');
    }
  } catch (error) {
    alert.error('Unexpected error', error);
  }
};

const articlenameId = useId();
const articleDateId = useId();

    return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={ArticleFormSchema}>
        {({ setFieldValue, values }) => (
      <Form className={css.form}>
        <div className = {css.formImg}> 
         <label htmlFor="fileInput" class={css.photoLabel}> 
       <input className={css.fieldImg} id="fileInput" hidden  type="file" name="articleimg" accept="image/*" onChange={(event) => {setFieldValue("articleimg", event.currentTarget.files[0]);}}/>
        <div class={css.uploadBox}>
        <svg width="99" height="83" viewBox="0 0 99 83" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M67.9741 47.7115C67.9741 56.2879 59.703 63.2404 49.5001 63.2404C39.2972 63.2404 31.0261 56.2879 31.0261 47.7115C31.0261 39.1352 39.2972 32.1827 49.5001 32.1827C59.703 32.1827 67.9741 39.1352 67.9741 47.7115Z" stroke="#070707" />
  <path d="M1.46777 69.125L1.46778 31.2764C1.46778 24.9158 7.60195 19.7596 15.1688 19.7596C20.3584 19.7596 25.1026 17.2949 27.4234 13.3932L30.5286 8.17302C33.0979 3.85351 38.3501 1.12498 44.0954 1.125L54.9049 1.12503C60.6502 1.12505 65.9023 3.85359 68.4716 8.17307L71.5768 13.3933C73.8976 17.2951 78.6418 19.7597 83.8314 19.7597C91.3983 19.7597 97.5324 24.9159 97.5324 31.2765V69.125C97.5324 76.1666 90.7414 81.875 82.3643 81.875H16.6359C8.25876 81.875 1.46777 76.1666 1.46777 69.125Z" stroke="#070707" />
        </svg>
       </div>
       </label>
       <ErrorMessage name="articleimg" component="span" className={css.error} />
       </div>
       <div className={css.formTitle}>
        <label htmlFor={articlenameId} className={css.formTitleLabel}>Title</label>
        <Field className={css.fieldTitle} type="text" name="articlename" id={articlenameId} />
        <ErrorMessage name="articlename" component="span" className={css.error}/>
        </div>
        <div className={css.formArticle}> 
       <Field as="textarea" className={css.fieldArticleField} name="articletext" />
        <ErrorMessage name="articletext" component="span" className={css.error}/>
        </div>
        <div className={css.formDatePublish}>
       <label htmlFor={articleDateId} className={css.formTitleLabel}>Publish date</label>
       <DatePicker className={css.formDate} id={articleDateId} selected={values.publishDate} onChange={(date) => setFieldValue("publishDate", date)}showTimeSelect
        dateFormat="MMMM d, yyyy h:mm aa"/>
       <ErrorMessage name="publishDate" component="span" className={css.error} />
      </div>
      <button className={css.btnFormArticle} type="submit">Publish Article</button>
    </Form>
        )}
    </Formik>
    );
};