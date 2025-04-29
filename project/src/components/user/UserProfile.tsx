import React, { useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Tooltip from '../common/Tooltip';
import { HelpCircle, Upload } from 'lucide-react';

const userSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  email: z.string().email('Неверный формат email. Пример: user@example.com'),
});

type UserFormData = z.infer<typeof userSchema>;

const UserProfile: React.FC = () => {
  const { user, updateUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
  });

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateUser({ avatarUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: UserFormData) => {
    updateUser(data);
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Личный кабинет</h2>
      
      <div className="flex items-center mb-8">
        <div className="relative">
          <div 
            className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden cursor-pointer"
            onClick={handleAvatarClick}
          >
            {user?.avatarUrl ? (
              <img src={user.avatarUrl} alt="Аватар" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Upload className="w-8 h-8 text-gray-400" />
              </div>
            )}
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleAvatarChange}
          />
        </div>
        
        <Tooltip
          content="Нажмите для загрузки аватара. Допустимые форматы: JPG, PNG. Оптимальный размер: 256x256px"
          position="right"
        >
          <button className="ml-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
            <HelpCircle size={20} />
          </button>
        </Tooltip>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Имя пользователя
          </label>
          <input
            {...register('name')}
            className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Email
          </label>
          <input
            {...register('email')}
            className="w-full px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Сохранить изменения
        </button>
      </form>
    </div>
  );
};

export default UserProfile;