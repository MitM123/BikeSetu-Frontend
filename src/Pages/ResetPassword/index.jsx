import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Input } from '../../UIs/shadcn-ui/input';
import { Button } from '../../UIs/shadcn-ui/button';
import Global from '../../Utils/Global';
import { Loader2, CheckCircle, XCircle, LockIcon } from 'lucide-react'; // Import icons

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await Global.httpGet(`/auth/verify-reset-password-link/${token}`);
        setStatus(response.isValid ? 'valid' : 'invalid');
      } catch (error) {
        toast.error('Invalid or expired reset link');
        setStatus('invalid');
      }
    };

    verifyToken();
  }, [token]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setIsResetting(true);
    try {
      await Global.httpPost('/auth/reset-password', {
        token,
        newPassword
      });
      toast.success('Password reset successfully');
      navigate('/login');
    } catch (error) {
      toast.error(error.message || 'Failed to reset password');
    } finally {
      setIsResetting(false);
    }
  };

  const statusConfig = {
    loading: {
      icon: <Loader2 className="w-16 h-16 animate-spin text-blue-500" />,
      title: "Verifying Reset Link",
      message: "Please wait while we validate your reset link...",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-700",
    },
    invalid: {
      icon: <XCircle className="w-16 h-16 text-red-500" />,
      title: "Invalid Reset Link",
      message: "The password reset link is invalid or has expired.",
      bgColor: "bg-red-50 dark:bg-red-900/20",
      borderColor: "border-red-200 dark:border-red-700",
    },
    valid: {
      icon: <LockIcon className="w-16 h-16 text-green-500" />,
      title: "Reset Your Password",
      message: "Please enter your new password below.",
      bgColor: "bg-green-50 dark:bg-green-900/20",
      borderColor: "border-green-200 dark:border-green-700",
    },
  };

  const { icon, title, message, bgColor, borderColor } = statusConfig[status];

  return (
    <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 h-[93vh]">
      <div className={`w-full max-w-md p-8 ${bgColor} rounded-lg shadow-lg border ${borderColor} transition-all duration-300 ease-in-out`}>
        <div className="flex flex-col items-center space-y-4">
          {icon}
          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200">
            {title}
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400">
            {message}
          </p>
          {status === 'valid' && (
            <form onSubmit={handleResetPassword} className="w-full mt-4">
              <div className="mb-4">
                <Input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              <div className="mb-6">
                <Input
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isResetting}>
                {isResetting ? 'Resetting...' : 'Reset Password'}
              </Button>
            </form>
          )}
          {status === 'invalid' && (
            <Button onClick={() => navigate('/login')} className="mt-4">
              Return to Login
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;