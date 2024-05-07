
import { BsCardText } from "react-icons/bs";
import { FaGraduationCap } from "react-icons/fa";

import { MdOutlinePayments } from "react-icons/md";

import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";

const getColorByIndex = (index) => {
    const color = index % colorGradients.length;
    console.log("this is index value ",index)
    return colorGradients[color];
  };
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

const Card1 = ({ user,index  }) => {
	const {username,email,program,profilePicture,} = user;
    const cardClass = getColorByIndex(index)||"from-gray-400 to-gray-200";
    

	return (
		<div className={`rounded-md p-4 bg-gradient-to-br ${cardClass}`}>
			<div className='flex flex-col gap-3'>
				<div className='flex flex-row items-center justify-between'>
					<h2 className='text-lg font-bold text-white'>Saving</h2>
					<div className='flex items-center gap-2'>
						<FaTrash className={"cursor-pointer"} />
						<Link to={`/transaction/123`}>
							<HiPencilAlt className='cursor-pointer' size={20} />
						</Link>
					</div>
				</div>
				<p className='text-white flex items-center gap-1'>
					<BsCardText />
					User Name : {username}
				</p>
				<p className='text-white flex items-center gap-1'>
					<MdOutlinePayments />
					email : {email}
				</p>
				<p className='text-white flex items-center gap-1'>
					<FaGraduationCap />
					Program : {program}
				</p>
			
				<div className='flex justify-between items-center'>
					<img
						src={profilePicture}
						className='h-8 w-8 border rounded-full'
						alt=''
					/>
				</div>
			</div>
		</div>
	);
};
export default Card1;