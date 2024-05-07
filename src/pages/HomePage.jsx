

import Cards from "../components/ui/Cards.jsx";
import CourseForm from "../components/CourseForm.jsx";

import { MdLogout } from "react-icons/md";
import { LOGOUT } from "../../graphql/mutations/user.mutation.js";
import { useMutation,useQuery } from "@apollo/client";
import toast from "react-hot-toast";
import { GET_AUTHENTICATED_USER } from "../../graphql/queries/user.query";


const HomePage = () => {
	
	const {data:authuser} = useQuery(GET_AUTHENTICATED_USER);
	let profile = authuser?.authUser?.profilePicture;
	let admin = authuser?.authUser?.isAdmin;
	
	
	const [logout,{loading,client}]=useMutation(LOGOUT , {refetchQueries:["GetAuthenticatedUser"],});
	const handleLogout =async() => {
		try{
			await logout();
		localStorage.removeItem("token");
        client.resetStore().then(()=>window.location="/login")
		}catch(error){
			console.error("Error logging out:".error);
			toast.error(error.message);
		}
	};

	

	return (
		<>
			<div className='flex flex-col gap-6 items-center max-w-7xl mx-auto z-20 relative justify-center'>
				<div className='flex items-center'>
					<p className='md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text'>
						Your Course Dashboard
					</p>
					<img
						src={profile}
						className='w-11 h-11 rounded-full border cursor-pointer'
						alt='Avatar'
					/>
					{/* Insert new button here */}
					{admin == true && <a
  href="/admin"
  className='mx-2 p-2 rounded bg-gradient-to-r from-gray-500 to-pink-500 text-white hover:bg-blue-700 transition duration-300 inline-flex items-center justify-center font-bold'
  style={{ width: '80px', height: '40px', borderRadius: '105px'  }}
>
  Admin
</a> }


					{!loading && <MdLogout className='mx-2 w-5 h-5 cursor-pointer' onClick={handleLogout} />}
					{/* loading spinner */}
					{loading && <div className='w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin'></div>}
				</div>
				<div className='flex flex-wrap w-full justify-center items-center gap-6'>
					<CourseForm />
				</div>
				<Cards />
			</div>
		</>
	);
};
export default HomePage;