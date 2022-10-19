import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'redux/hooks';
import { getStoredUser } from 'utils/helper';

export const useCurrentUser = () => {
  const { id } = useParams();
  const storedId = getStoredUser()._id;
  const { loggedInUser } = useAppSelector((state) => state);
  const userId = loggedInUser._id || storedId;

  return id === userId;
};
