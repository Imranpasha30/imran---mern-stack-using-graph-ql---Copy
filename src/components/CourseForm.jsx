import { useMutation, useQuery } from "@apollo/client";
import { CREATE_Course } from "../../graphql/mutations/course.mutation";
import toast from "react-hot-toast";
import { GET_AUTHENTICATED_USER } from "../../graphql/queries/user.query";
const CourseForm = () => {


const [createCourse,{loading}] =useMutation(CREATE_Course ,{refetchQueries:["GetCourses"],})

const {data:authuser} = useQuery(GET_AUTHENTICATED_USER);
console.log("authenticated user id is ",authuser?.authUser?._id);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const form = e.target;
		const formData = new FormData(form);
		const courseData = {
			courseCode: formData.get("courseCode"),
			courseName: formData.get("courseName"),
			section: formData.get("section"),
			semester: formData.get("semester"),
			userscourse: authuser?.authUser?._id
		};
		try{
			await createCourse({variables : {input:courseData}})
			form.reset();
			toast.success("COurse added successfully");
		}catch(error){
			toast.error(error.message);
		}
		
	};

	return (
		<form className='w-full max-w-lg flex flex-col gap-5 px-3' onSubmit={handleSubmit}>
			{/* Course */}
			<div className='flex flex-wrap'>
				<div className='w-full'>
					<label
						className='block uppercase tracking-wide text-white text-xs font-bold mb-2'
						htmlFor='description'
					>
						Course
					</label>
					<input
						className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
						id='courseCode'
						name='courseCode'
						type='text'
						required
						placeholder='00xx00'
					/>
				</div>
			</div>
			{/* coursename */}
			<div className='flex flex-wrap gap-3'>
            <div className='w-full flex-1 mb-6 md:mb-0'>
					<label className='block uppercase text-white text-xs font-bold mb-2' htmlFor='amount'>
                    Course Name
					</label>
					<input
						className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
						id='courseName'
						name='courseName'
						type='text'
						required
						placeholder='eg .DBMS'
					/>
				</div>
				

				{/* CATEGORY */}
				
				

				{/* Section */}
				<div className='w-full flex-1 mb-6 md:mb-0'>
					<label className='block uppercase text-white text-xs font-bold mb-2' htmlFor='amount'>
                    Section
					</label>
					<input
						className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
						id='section'
						name='section'
						type='text'
						required
						placeholder='A,B,C...'
					/>
				</div>
			</div>

			{/* semester */}
			<div className='flex flex-wrap gap-3'>
            <div className='w-full flex-1 mb-6 md:mb-0'>
					<label className='block uppercase text-white text-xs font-bold mb-2' htmlFor='amount'>
                    semester
					</label>
					<input
						className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
						id='semester'
						name='semester'
						type='text'
						required
						placeholder='1,2,3,4....'
					/>
				</div>

			</div>
			{/* SUBMIT BUTTON */}
			<button
				className='text-white font-bold w-full rounded px-4 py-2 bg-gradient-to-br
          from-pink-500 to-pink-500 hover:from-pink-600 hover:to-pink-600
						disabled:opacity-70 disabled:cursor-not-allowed'
				type='submit'
				disabled={loading}
			>
				{loading ? 'Loading...' : 'Add Course'}
			</button>
		</form>
	);
};

export default CourseForm;