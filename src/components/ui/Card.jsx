
import {  BiCode, BiBook, BiGroup, BiCalendar } from "react-icons/bi";

import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { DELETE_Course } from "../../../graphql/mutations/course.mutation";
import toast from "react-hot-toast";
import { GET_AUTHENTICATED_USER } from "../../../graphql/queries/user.query";
import { useQuery } from "@apollo/client";

const getColorForCourseCode = (courseCode) => {
	// A simple hash function to convert the course code into a number
	const hash = courseCode.split('').reduce((acc, char) => {
	return char.charCodeAt(0) + ((acc << 5) - acc);
	}, 0);
  
	// Use the hash number to generate a color gradient
	const gradientIndex = Math.abs(hash) % colorGradients.length;
	return colorGradients[gradientIndex];
  };
  
  // Define an array of color gradients
  const colorGradients = [
	"from-red-500 via-pink-500 to-purple-500",       // Red to Pink to Purple
	"from-green-500 via-teal-500 to-cyan-500",       // Green to Teal to Cyan
	"from-blue-500 via-sky-500 to-indigo-500",       // Blue to Sky to Indigo
	"from-yellow-500 via-amber-500 to-orange-500",   // Yellow to Amber to Orange
	"from-lime-500 via-green-600 to-emerald-500",    // Lime to Green to Emerald
	"from-violet-500 via-fuchsia-500 to-pink-600",   // Violet to Fuchsia to Pink
	"from-orange-600 via-red-700 to-pink-700",       // Orange to Red to Pink
	"from-cyan-600 via-light-blue-500 to-blue-700",  // Cyan to Light Blue to Blue
	"from-purple-600 via-violet-700 to-fuchsia-700", // Purple to Violet to Fuchsia
	"from-gray-500 via-cool-gray-600 to-blue-gray-500" // Gray to Cool Gray to Blue Gray
  ];
  
  
  
const Card = ({ course }) => {
	let {courseCode,courseName,section,semester} = course;
	const cardClass = getColorForCourseCode(semester.toLowerCase())|| "from-gray-400 to-gray-200";
	const [deleteCourse , {loading}] =useMutation(DELETE_Course,
		{refetchQueries:["GetCourses"],
	});
        courseName = courseName[0].toUpperCase()+courseName.slice(1);

		const handeleDelete = async () =>{
			try{
				console.log("this is id ",course._id);
				await deleteCourse({variables: {courseId : course._id}});
				toast.success("deleted sucefully");
			}catch(error){
				console.error("Error deleting Course :",error);
				toast.error(error.message);
			}
		}	
		const {data:authuser} = useQuery(GET_AUTHENTICATED_USER);
		let profile = authuser?.authUser?.profilePicture;
	return (
		<div className={`rounded-md p-4 bg-gradient-to-br ${cardClass}`}>
			<div className='flex flex-col gap-3'>
				<div className='flex flex-row items-center justify-between'>
					<h2 className='text-lg font-bold text-white'>Course</h2>
					<div className='flex items-center gap-2'>
						{!loading &&<  FaTrash className={"cursor-pointer"} onClick={handeleDelete} title="delete"/>}
						{loading&& < div className = 'w-6 h-6 border-t-2 border-b-2 round-full animated-spin'></div> }

						<Link to={`/course/${course._id}`} title="Edit">
							<HiPencilAlt className='cursor-pointer' size={20} />
						</Link>
					</div>
				</div>
				<p className='text-white flex items-center gap-1'>
					<BiCode />
					Course code:  {courseCode}
				</p>
				<p className='text-white flex items-center gap-1'>
					<BiBook />
					Course Name: {courseName} 
				</p>
				<p className='text-white flex items-center gap-1'>
					<BiGroup />
					section : {section}
				</p>
				<p className='text-white flex items-center gap-1'>
					<BiCalendar />
					semester : {semester}
				</p>
				<div className='flex justify-between items-center'>
					<span></span>
					<img
						src={profile}
						className='h-8 w-8 border rounded-full'
						alt=''
					/>
				</div>
			</div>
		</div>
	);
};
export default Card;