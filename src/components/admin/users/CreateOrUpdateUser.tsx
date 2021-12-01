import React from 'react';
import { UserModel } from './UserTableProps';

interface Props {
  roleList: string[];
  selectedUser?: UserModel | null | undefined;
  isUpdate: boolean;
}

const CreateOrUpdateUser = ({
  roleList,
  selectedUser
}: Props) => {
  return (
    <div>

    </div>
  )
}

export default CreateOrUpdateUser;
