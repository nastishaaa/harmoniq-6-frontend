import { useState } from "react";
import { API } from "../../redux/authorization/operations";

export const useSaveArticle = () => {
  const [isSaving, setIsSaving] = useState(false);

  const saveArticle = async (articleId) => {
    setIsSaving(true);
    try {
      await API.post(`/users/me/saved-articles/${articleId}`);
    } catch (error) {
      console.error("Error saving article:", error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  return { saveArticle, isSaving };
};
