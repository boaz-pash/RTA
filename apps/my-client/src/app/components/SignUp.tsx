import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useSignUpMutation } from '../../utils/graphql/hooks/useSignUpMutation';
import { Link } from 'react-router-dom';

interface SignUpFormData {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignUpFormData>();
  const [createUser, { loading, error }] = useSignUpMutation();
  const password = watch('password');

  const onSubmit: SubmitHandler<SignUpFormData> = async (formData) => {
    try {
      const result = await createUser({
        variables: {
          userName: formData.userName,
          email: formData.email,
          password: formData.password,
        },
      });

      if (result.data?.insertUser) {
        console.log('User created:', result.data.insertUser);
        // Optionally, you can perform additional actions
      } else {
        console.error('User creation failed');
      }
    } catch (mutationError) {
      if (mutationError instanceof Error) {
        console.error('Error creating user:', mutationError.message);
      }
    }
  };

  return (
    <div className="bg-blue-600 text-white py-20">
      <form
        className="max-w-md mx-auto mt-8 p-8 bg-white rounded-md shadow-lg border border-gray-300"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-3xl mb-6 text-center text-gray-800 font-semibold">
          Sign Up
        </h2>

        <div className="mb-4">
          <label
            htmlFor="userName"
            className="block text-gray-600 text-sm font-medium mb-2"
          >
            User Name
          </label>
          <input
            {...register('userName', { required: 'User name is required' })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
          {errors.userName && (
            <span className="text-red-500">{errors.userName.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-600 text-sm font-medium mb-2"
          >
            Email
          </label>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: /^\S+@\S+$/i,
            })}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-600 text-sm font-medium mb-2"
          >
            Password
          </label>
          <input
            {...register('password', { required: 'Password is required' })}
            type="password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-gray-600 text-sm font-medium mb-2"
          >
            Confirm Password
          </label>
          <input
            {...register('confirmPassword', {
              validate: (value) =>
                value === password || 'Passwords do not match',
            })}
            type="password"
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          />
          {errors.confirmPassword && (
            <span className="text-red-500">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>

        <p className="text-center text-gray-600 text-sm mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </p>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
          disabled={loading}
        >
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>

        {error && <p className="text-red-500 mt-2">Error: {error.message}</p>}
      </form>
    </div>
  );
};

export default SignUp;
