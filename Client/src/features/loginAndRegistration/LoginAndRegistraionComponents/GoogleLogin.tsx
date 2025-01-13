import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';


function GoogleLogin() {
    const googleLogin = useGoogleLogin({
        onSuccess: (response) => {
            console.log("Google login successful", response);
        },
        onError: (error) => {
            console.error("Google login error", error);
        },
        flow: "auth-code",
	});


	return (
		<button
			id="google"
			type="button"
            onClick={googleLogin}
			className="p-3 border-2 border-primary hover:bg-gray-300 from-primary to-secondary text-black h-12 rounded-xl font-medium transition-colors flex items-center justify-center space-x-2 mt-1 mb-3"
		>
			<FcGoogle className="w-6 h-6" />
			<span>Continue with Google</span>
		</button>
	);
}

export default GoogleLogin;
