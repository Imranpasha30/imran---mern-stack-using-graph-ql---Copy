import Card1 from "./card1";
import { useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "../../../../graphql/queries/user.query";

const Cards1 = () => {

    const {data,loading,} = useQuery(GET_ALL_USERS)
    data?.users.map(user => console.log(user._id));


    console.log("Data of users are : ", data);


	return (
		<div className='w-full px-10 min-h-[40vh]'>
			<p className='text-5xl font-bold text-center my-10'>ALL USERS</p>
			<div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20'>
				{/* <Card1 cardType={"saving"} />
				<Card1 Type={"expense"} />
				<Card1 cardType={"investment"} />
				<Card1 cardType={"investment"} />
				<Card1 cardType={"saving"} />
				<Card1 cardType={"expense"} /> */}
    
               {!loading && data.users.map((user ,index)=> (<Card1 key={user._id} user = {user} index={index ++}/>))} 
			</div>
		</div>
	);
};
export default Cards1;