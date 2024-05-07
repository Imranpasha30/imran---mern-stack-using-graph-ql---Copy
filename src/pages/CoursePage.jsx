import {useParams} from "react-router-dom"
import {  useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_COURSE } from "../../graphql/queries/course.query";
import { UPDATE_COURSE } from "../../graphql/mutations/course.mutation";
import toast from "react-hot-toast"
import Courseformskeleton  from '../components/ui/skeletons/courseformskeleton.jsx'
const CoursePage = () => {
	const {id} = useParams()
	const {loading,data} = useQuery(GET_COURSE, {
		variables : {id: id},
	})

const [updateCourse,{loading:updatingcourse}] = useMutation(UPDATE_COURSE)

	console.log("course data:",data);
	const [formData, setFormData] = useState({
		courseCode:data?.course.courseCode || "",
    courseName:data?.course.courseName || "",
    section:data?.course.section ||"",
    semester:data?.course.semester || "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log("Data sending to backend:", {
		_id: id,
		input: formData
		});
		try {
		await updateCourse({ // Corrected function name to match the mutation
			variables: {
			id: id,
			input: {
				...formData,
			}
			}
		});
		toast.success('Course Updated Successfully');
		} catch (error) {
		toast.error(`Error Updating the Course: ${error.message}`); // Added .message to get the error message string
		console.log(error);
		}
	} 
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	useEffect( ()=>{
		if (data){
			setFormData({
				courseCode:data?.course.courseCode || "",
    courseName:data?.course.courseName || "",
    section:data?.course.section ||"",
    semester:data?.course.semester || "",
			});
		}
	},[data]);

//  return<courseformskeleton/>;
if (loading) return <Courseformskeleton/>;
	return (
		<div className='h-screen max-w-4xl mx-auto flex flex-col items-center'>
			<p className='md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text'>
				Update Courses
			</p>
			<form className='w-full max-w-lg flex flex-col gap-5 px-3 ' onSubmit={handleSubmit}>
				
				<div className='flex flex-wrap'>
					<div className='w-full'>
						<label
							className='block uppercase tracking-wide text-white text-xs font-bold mb-2'
							htmlFor='courseCode'
						>
							CourseCode
						</label>
						<input
							className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
							id='courseCode'
							name='courseCode'
							type="text"
							placeholder='00xx00'
              required= {true}
							value={formData.courseCode}
							onChange={handleInputChange}
						/>
					</div>
				</div>
				
				<div className='flex flex-wrap gap-3'>
        <div className='w-full flex-1 mb-6 md:mb-0'>
						<label className='block uppercase text-white text-xs font-bold mb-2' htmlFor='amount'>
							Course Name
						</label>
						<input
							className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
							id='courseName'
							name='courseName'
							type="text"
							placeholder='eg .DBMS'
              required= {true}
							value={formData.courseName}
							onChange={handleInputChange}
						/>
					</div>

					{/* section */}
				
        <div className='w-full flex-1 mb-6 md:mb-0'>
						<label className='block uppercase text-white text-xs font-bold mb-2' htmlFor='amount'>
							Section
						</label>
						<input
							className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
							id='section'
							name='section'
							type="text"
							placeholder='A,B,C...'
              required= {true}
							value={formData.section}
							onChange={handleInputChange}
						/>
					</div>
				

					{/* semester */}
					<div className='w-full flex-1 mb-6 md:mb-0'>
						<label className='block uppercase text-white text-xs font-bold mb-2' htmlFor='amount'>
							semester
						</label>
						<input
							className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
							id='semester'
							name='semester'
							type='semester'
							placeholder='1,2,3,4....'
              required= {true}
							value={formData.semester}
							onChange={handleInputChange}
						/>
					</div>
				</div>
				{/* SUBMIT BUTTON */}
				<button
					className='text-white font-bold w-full rounded px-4 py-2 bg-gradient-to-br
          from-pink-500 to-pink-500 hover:from-pink-600 hover:to-pink-600'
					type='submit'
				disabled={updatingcourse}	
				>
					{updatingcourse ? 'Updating...' : 'Update Course'}
				</button>
			</form>
		</div>
	);
};
export default CoursePage;