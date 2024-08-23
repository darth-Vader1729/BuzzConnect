import useGetMessages from "../../hooks/useGetMessages";
import Message from "./Message";
import MessageSkeleton from "../skeletons/MessageSkeleton.jsx";
import { useEffect, useRef } from "react";

const Messages = () => {
  const { loading, messages } = useGetMessages();
  const lastMessageRef = useRef();
  
  useEffect(() => {
    // Scroll to the last message whenever the messages array changes
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior : "smooth"})
    }, 50)
  }, [messages])

  // console.log("messages : ", messages);
  
  return (
    // overflow-auto : if content overflows, css automatically scroll appears
    <div className="px-4 flex-1 overflow-auto ">     
        
        {!loading && 
        messages.length>0 && 
        messages.map((message) => (
        <div key={message._id}
          ref = { lastMessageRef }
          >      
          <Message message={message} />
        </div>    
        ))}    
        
        {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
    
        {!loading && messages.length===0 && (
          <p className="text-center">Send a message to start the conversation</p>
        )}
    </div>
  )
}

export default Messages;


// STATER CODE SNIPPET 
// import Message from "./Message";

// const Messages = () => {
//   return (
//     // overflow-auto : if content overflows, css automatically scroll appears
//     <div className="px-4 flex-1 overflow-auto ">
//         <Message />            
//         <Message />        
//         <Message />        
//         <Message />        
//         <Message />        
//         <Message />       
//         <Message />        
//         <Message />        
//         <Message />        
//         <Message />       
//         <Message />        
//         <Message />        
//         <Message />        
//         <Message />       
//         <Message />        
//         <Message />        
//         <Message />        
//         <Message />                
//     </div>
//   )
// }

// export default Messages;
