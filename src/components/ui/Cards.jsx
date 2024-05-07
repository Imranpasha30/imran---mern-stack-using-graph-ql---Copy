import { useQuery } from "@apollo/client";
import Card from "./Card";
import { GET_COURSES } from "../../../graphql/queries/course.query";

const Cards = () => {
	const {data,loading,} = useQuery(GET_COURSES);
		
	console.log("cards:",data)	
	//TOCO => ADD RELATIONSHIPS
	return (
		<div className='w-full px-10 min-h-[40vh]'>
			<p className='text-5xl font-bold text-center my-10'>History</p>
			<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20'>
				{/* <Card cardType={"course"} />
				<Card cardType={"course2"} />
				<Card cardType={"course3"} />
				<Card cardType={"course4"} />
				<Card cardType={"course5"} />
				<Card cardType={"course6"} />  */}

				{!loading && 
				data.courses.map((course) =><Card key={course._id}  course={course}/>)}
					
			</div>
			{!loading && data?.courses?.length === 0 && (
				<p className="text-2xl font-bold text-center w-full">no  courses found.</p>
			)}
		</div>
	);
};
export default Cards;