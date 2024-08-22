import { Stack, Typography } from '@mui/material';
import { IUser } from '@/api/services';

interface UserInfoProps {
  className?: string;
  showAvatar?: boolean;
  user?: IUser | null;
}

const UserInfo = ({
  showAvatar = false,
  user,
  ...restOfProps
}: UserInfoProps) => {
  const fullName = [user?.first_name || '', user?.last_name || '']
    .join(' ')
    .trim();
  const userPhoneOrEmail = user?.email;

  return (
    <Stack
      alignItems="center"
      minHeight="fit-content"
      marginBottom={2}
      {...restOfProps}
    >
      <Typography sx={{ mt: 1 }} variant="h6">
        {fullName || 'Current User'}
      </Typography>
      <Typography variant="body2">
        {userPhoneOrEmail || 'Loading...'}
      </Typography>
    </Stack>
  );
};

export default UserInfo;
