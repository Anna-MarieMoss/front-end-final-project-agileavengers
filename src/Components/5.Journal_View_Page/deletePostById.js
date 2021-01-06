import React, { useState, useEffect } from 'react';

//Backend URL
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

// // delete post by journal post id

function DeletebyJournalId() {
  const [deleteJournalId, setDeleteJournalId] = useState(null);

  function handleDelete(postId) {
    setDeleteJournalId(postId);
  }

  useEffect(() => {
    async function deleteJournalIdFromDB() {
      const requestOptions = {
        method: 'DELETE',
      };
      console.log(requestOptions);
      fetch(`${BACKEND_URL}/posts/${deleteJournalId}`, requestOptions);
      setDeleteJournalId(null);
    }
    deleteJournalId && deleteJournalIdFromDB();
  }, [deleteJournalId]);
}

export default DeletebyJournalId;
