import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { Input } from '../../UIs/shadcn-ui/input';
import { Button } from '../../UIs/shadcn-ui/button';
import Global from '../../Utils/Global';
import { Loader2, ArrowLeft, Mail, RefreshCw } from 'lucide-react'; // Added RefreshCw icon

export function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await sendResetLink();
    };

    const sendResetLink = async () => {
        setStatus('loading');
        try {
            await Global.httpPost('/auth/send-reset-password-link', { email });
            setStatus('success');
            toast.success('Reset link sent to your email!');
        } catch (error) {
            setStatus('error');
            toast.error(error.message || 'Failed to send reset link');
        }
    };

    const handleTryAgain = () => {
        setStatus('idle');
    };

    const statusConfig = {
        idle: {
            icon: <Mail className="w-16 h-16 text-blue-500" />,
            title: "Forgot your password?",
            message: "Enter your email to get a reset link",
            bgColor: "bg-blue-50 dark:bg-blue-900/20",
            borderColor: "border-blue-200 dark:border-blue-700",
        },
        loading: {
            icon: <Loader2 className="w-16 h-16 animate-spin text-blue-500" />,
            title: "Sending Reset Link",
            message: "Please wait while we send the reset link to your email...",
            bgColor: "bg-blue-50 dark:bg-blue-900/20",
            borderColor: "border-blue-200 dark:border-blue-700",
        },
        success: {
            icon: <Mail className="w-16 h-16 text-green-500" />,
            title: "Reset Link Sent",
            message: "Check your email for the password reset link",
            bgColor: "bg-green-50 dark:bg-green-900/20",
            borderColor: "border-green-200 dark:border-green-700",
        },
        error: {
            icon: <Mail className="w-16 h-16 text-red-500" />,
            title: "Error",
            message: "Failed to send reset link. Please try again.",
            bgColor: "bg-red-50 dark:bg-red-900/20",
            borderColor: "border-red-200 dark:border-red-700",
        },
    };

    const { icon, title, message, bgColor, borderColor } = statusConfig[status];

    return (
        <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 h-[92vh]">
            <div className={`w-full max-w-md p-8 ${bgColor} rounded-lg shadow-lg border ${borderColor} transition-all duration-300 ease-in-out`}>
                <div className="flex flex-col items-center space-y-4">
                    {icon}
                    <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-200">
                        {title}
                    </h2>
                    <p className="text-center text-gray-600 dark:text-gray-400">
                        {message}
                    </p>
                    {(status === 'idle' || status === 'error') && (
                        <form onSubmit={handleSubmit} className="w-full mt-4">
                            <div className="mb-4">
                                <Input
                                    type="email"
                                    placeholder="Your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full"
                                />
                            </div>
                            <Button type="submit" className="w-full">
                                {status === 'error' ? (
                                    <>
                                        <RefreshCw className="w-4 h-4 mr-2" />
                                        Try Again
                                    </>
                                ) : (
                                    'Reset password'
                                )}
                            </Button>
                        </form>
                    )}
                    <div className="flex items-center justify-center w-full mt-4">
                        {status !== 'loading' && (
                            <Link 
                                to="/login" 
                                className="flex items-center text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}