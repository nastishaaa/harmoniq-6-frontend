import { useRef, useEffect } from 'react';
import { useField } from 'formik';
import css from './AddArticleForm.module.css';

export default function AutoResizeTextarea({ name, className, placeholder, id, ...props }) {
  const [field, meta] = useField(name);
  const textareaRef = useRef(null);

  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.minHeight = 'auto';
      textarea.style.minHeight = textarea.scrollHeight + 'px';
    }
  };

  useEffect(() => {
    resizeTextarea();
  }, [field.value]);

  /*useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea && !field.value) {
      textarea.style.height = '393px';
    }
  }, []);*/

  const handleChange = (e) => {
    field.onChange(e);
    resizeTextarea();
  };

  return (
    <>
      <textarea
        {...field}
        {...props}
        id={id}
        ref={textareaRef}
        placeholder={placeholder}
        className={css.textarea}
        onChange={handleChange}
        style={{ overflow: 'hidden' }}
      />
      {meta.touched && meta.error ? (
        <span className={props.errorClassName}>{meta.error}</span>
      ) : null}
    </>
  );
}
/*, resize: 'none', lineHeight: '1.5'*/