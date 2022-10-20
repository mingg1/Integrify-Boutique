import { useAppDispatch } from 'redux/hooks';
import { toggleBanUser } from 'redux/slices/usersSlice';

interface BanButtonProps {
  id: string;
  banned: boolean;
  authToken: string;
}

const BanButton = ({ id, banned, authToken }: BanButtonProps) => {
  const dispatch = useAppDispatch();
  const toggleBanned = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    dispatch(toggleBanUser({ id, banned: !banned, authToken }));
  };

  return (
    <button onClick={toggleBanned} className={banned ? 'banned' : 'unbanned'}>
      {banned ? 'banned' : 'unbanned'}
    </button>
  );
};
export default BanButton;
