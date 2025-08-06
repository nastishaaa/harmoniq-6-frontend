import { useState } from "react";
import { API } from "../../redux/authorization/operations";

export const useDeleteSavedArticle = () => {
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteArticle = async (articleId) => {
    setIsDeleting(true);
    try {
      await API.delete(`/users/me/saved-articles/${articleId}`);
    } catch (error) {
      console.error("Error deleting saved article:", error);
      throw error;
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteArticle, isDeleting };
};
