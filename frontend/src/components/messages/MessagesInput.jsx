import {BsSend } from "react-icons/bs";

const MessagesInput = () => {
  return (
    <form className="px-4 my-3">
      {/* <div className="w-full"> */}
      <div className="w-full relative">
        <input type="text" 
          className="border text-sm rounded-g block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="Send a message"
        />

        {/* <button type="submit" className="absolute inset-y-0 end-0 flex items-end pe-6 pb-6"> */}
        <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3">

          <BsSend/>
        </button> 
      </div>
    </form>
  )
}

export default MessagesInput;

// STARTER CODE SNIPPET 
// import {BsSend } from "react-icons/bs";

// const MessagesInput = () => {
//   return (
//     <form className="px-4 my-3">
//       <div className="w-full">
//         <input type="text" 
//           className="border text-sm rounded-g block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
//           placeholder="Send a message"
//         />

//         <button type="submit" className="absolute inset-y-0 end-0 flex items-end pe-6 pb-6">
//           <BsSend/>
//         </button>
//       </div>
//     </form>
//   )
// }

// export default MessagesInput;
