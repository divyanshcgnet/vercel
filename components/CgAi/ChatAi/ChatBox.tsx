'use client'

import { ChatParams } from '@/types/chatParams'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { LuPlay } from 'react-icons/lu'
import ChatboxHeader from './ChatboxHeader'
import Chat from './Chat'
import { FaPaperclip } from 'react-icons/fa6'
import { CgClose, CgCross, CgSpinner } from 'react-icons/cg'
import Image from 'next/image'
import useChat from '@/hooks/useChat'
import { MessageTypeEnum } from '@/types/iMessage'
import {
  addMessage,
  getUserChat,
  getUserChatMessages,
  patchChat,
} from '@/services/chat'
import { v4 as uuidv4 } from 'uuid'
import axios, { AxiosError } from 'axios'
import { useDropzone } from 'react-dropzone'
import { IoMdCloseCircle } from 'react-icons/io'
import { IoCloseCircleOutline } from 'react-icons/io5'
import { RiCloseCircleFill } from 'react-icons/ri'
import { uploadImage } from '@/services/file'

// const API_BASE_URL =
//   'https://test-app-cg-era8e0ehd3cye7h0.southindia-01.azurewebsites.net'

const API_BASE_URL =
  'wss://abed-2401-4900-1c1b-21f9-9cf3-ca35-1ae2-e5d9.ngrok-free.app'

export default function ChatBox({
  params,
  searchParams,
}: {
  params: ChatParams
  searchParams: { [key: string]: string | undefined }
}) {
  const [started, setStarted] = useState(false)
  const [messages, setMessages] = useState<
    { content: string; role: MessageTypeEnum; fileUrl?: string }[]
  >([])
  const [message, setMessage] = useState('')
  const [lastUserMessage, setLastUserMessage] = useState('')
  const [responding, setResponding] = useState(false)
  const [fileInfo, setFileInfo] = useState<File | null>(null)
  const [url, setUrl] = useState('')
  const [imageUploading, setImageUploading] = useState(false)
  const [locked, setLocked] = useState(false)
  const { addChat } = useChat()
  const router = useRouter()
  const imageInputRef = useRef<any>()

  const handleImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    if (!files || !files[0]) return
    await handleFileSelection(files[0])
  }

  const handleFileSelection = async (selectedFile: File) => {
    if (selectedFile.size > 5000000) {
      alert('File size should be less than 5MB')
      return false
    }

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png']
    if (!validTypes.includes(selectedFile.type)) {
      alert('Please upload only JPG, JPEG, or PNG files')
      return false
    }

    setImageUploading(true)
    try {
      setFileInfo(selectedFile)
      setUrl(URL.createObjectURL(selectedFile))
      return true
    } catch (error) {
      console.error('Error handling file:', error)
      return false
    } finally {
      setImageUploading(false)
    }
  }
  const activeConnections = new Map();

// const processQuery = async (
//   userQuery,
//   onUpdate = () => {},
//   file,
//   chatId
// ) => {
//   if (!userQuery) {
//     throw new Error('Missing query parameter');
//   }

//   if (activeConnections.has(chatId)) {
//     activeConnections.get(chatId).close();
//     activeConnections.delete(chatId);
//     console.log(`Closed existing WebSocket connection for chatId: ${chatId}`);
//   }

//   try {
//     const socket = new WebSocket('wss://2305-2401-4900-1c1b-21f9-7193-c580-3a6a-54a2.ngrok-free.app/ws/trading');
//     activeConnections.set(chatId, socket);
//     console.log(`Created new WebSocket connection for chatId: ${chatId}`);

//     let fullResponse = '';  // Initialize to hold the final response
//     let isGenerating = false;  // Flag to check if the response is being generated

//     return new Promise((resolve, reject) => {
//       socket.onopen = () => {
//         console.log(`WebSocket connection opened for chatId: ${chatId}`);
//         const message = { user_query: userQuery, file: file ? file.name : null };
//         console.log(`Sending message:`, message);
//         socket.send(JSON.stringify(message));
//         isGenerating = true;  // Set flag indicating response generation has started
//       };

//       socket.onmessage = (event) => {
//         let responseChunk = event.data;
//         console.log(`Received chunk for chatId:`, responseChunk);

//         responseChunk = responseChunk.replace(/\b(\w+)\s+\1\b/g, '$1');  // Clean up duplicate words
//         console.log(`Cleaned chunk for chatId:`, responseChunk);

//         // Accumulate the response
//         fullResponse += responseChunk;

//         // Update the UI incrementally with each new chunk
//         onUpdate(fullResponse);
//       };

//       socket.onerror = (error) => {
//         console.error(`WebSocket error for chatId ${chatId}:`, error);
//         reject(new Error(`WebSocket error: ${error}`));
//       };

//       socket.onclose = () => {
//         console.log(`WebSocket connection closed for chatId: ${chatId}`);
//         activeConnections.delete(chatId);

//         // If generating response, resolve with the full response
//         if (isGenerating) {
//           resolve(fullResponse);
//         } else {
//           reject(new Error("Connection closed before response started"));
//         }

//         console.log(`Resolved full response for chatId: ${chatId}`);
//       };
//     });
//   } catch (error) {
//     console.error('Error processing request:', error);
//     throw new Error('An error occurred while processing your request');
//   }
// };


// const processQuery = async (
//   userQuery
//   onUpdate = () => {},
//   file,
//   chatId
const processQuery = async (
  userQuery: string,
  onUpdate: (response: string) => void = () => {},
  file: File | null ,
  chatId: string
) => {
  if (!userQuery) {
    throw new Error('Missing query parameter');
  }

  // Close any previous connection for the same chatId to avoid duplicates
  if (activeConnections.has(chatId)) {
    activeConnections.get(chatId).close();
    activeConnections.delete(chatId);
    console.log(`Closed existing WebSocket connection for chatId: ${chatId}`);
  }
var endpoint = '';
if (params.chatType === 'trade-analyzer') {
  endpoint = `${API_BASE_URL}/trade-analyzer/${chatId}`;
}
else{
  endpoint = `${API_BASE_URL}/chat-genius/${chatId}`; 
}
  try {
    // const socket = new WebSocket(`${API_BASE_URL}/chat-genius/${chatId}`);
    const socket = new WebSocket(endpoint);
    
    activeConnections.set(chatId, socket);
    console.log(`Created new WebSocket connection for chatId: ${chatId}`);

    let accumulatedResponse = ''; // Variable to store the full response as it builds

    return new Promise((resolve, reject) => {
      // Open WebSocket connection and send the message
      socket.onopen = () => {
        console.log(`WebSocket connection opened for chatId: ${chatId}`);
        const message = { user_query: userQuery, file: file ? file.name : null };
        console.log(`Sending message:`, message);
        socket.send(JSON.stringify(message));  // Send immediately on connection open
      };

      // Process each incoming chunk
      socket.onmessage = (event) => {
        let responseChunk = event.data;
        console.log(`Received chunk for chatId:`, responseChunk);

        // Optional cleanup: remove duplicate words or characters if needed
        responseChunk = responseChunk.replace(/\b(\w+)\s+\1\b/g, '$1');
        console.log(`Cleaned chunk for chatId:`, responseChunk);

        // Accumulate response and update UI incrementally
        accumulatedResponse += responseChunk;
        onUpdate(accumulatedResponse);  // Pass the full accumulated response so far
      };

      // Handle errors if any occur during the connection
      socket.onerror = (error: Event) => {
        console.error(`WebSocket error for chatId ${chatId}:`, error);
        const e = error as ErrorEvent; // Type cast the error to ErrorEvent
        reject(new Error(`WebSocket error: ${e.message || 'Unknown error'}`)); // Access the message property
      };
      

      // Close WebSocket connection once complete
      socket.onclose = () => {
        console.log(`WebSocket connection closed for chatId: ${chatId}`);
        activeConnections.delete(chatId);
        resolve(accumulatedResponse); // Resolve with the full accumulated response
      };
    });
  } catch (error) {
    console.error('Error processing request:', error);
    throw new Error('An error occurred while processing your request');
  }
};



const openAiCall = async (customMessage) => {
  setResponding(true);
  const chatMessage = customMessage || message;

  console.log("Sending user message:", chatMessage);

  const messagesWithUserChat = [
    ...messages,
    {
      content: chatMessage,
      role: MessageTypeEnum.USER,
      fileUrl: url || undefined,
    },
  ];
  console.log("messagesWithUserChat", messagesWithUserChat);
  setMessages(messagesWithUserChat);
  setMessage('');
  setUrl('');

  try {
    console.log("Adding chat to database...");
    await addChat({
      threadId: params.chatId,
      title: chatMessage.length > 50 ? chatMessage.substring(0, 50) : chatMessage,
      chatType: params.chatType,
    });

    const ImageUrl = async () => {
      if (fileInfo) {
        const formData = new FormData();
        formData.append('file', fileInfo);
        const res = await uploadImage(formData);
        console.log("Uploaded image and got URL:", res.data.url);
        return res.data.url;
      }
    };
    const ImageUrlAws = await ImageUrl();

    const reqBody = {
      threadId: params.chatId,
      content: chatMessage,
      role: MessageTypeEnum.USER,
      fileUrl: ImageUrlAws || undefined,
    };
    console.log("Adding message to database with body:", reqBody);
    await addMessage(reqBody);

    // Generate a unique id for the assistant message
    const assistantMessageId = `assistant-${Date.now()}`;

    // Append the assistant message placeholder to the messages
    const assistantMessagePlaceholder = {
      id: assistantMessageId, // Add unique id
      content: '', // Initially empty for Assistant's response
      role: MessageTypeEnum.ASSISTANT,
    };

    const messagesWithAssistantChat = [...messagesWithUserChat, assistantMessagePlaceholder];
    console.log("Message before messagesWithAssistantChat", chatMessage)
    setMessages(messagesWithAssistantChat);
    console.log("messagesWithAssistantChat", messagesWithAssistantChat);
    console.log("Waiting for processQuery response...");

    await processQuery(
      chatMessage,
      (accumulatedResponse) => {
        setMessages((prevMessages) => {
          const assistantMessageIndex = prevMessages.findIndex(
            (msg) => msg.id === assistantMessageId
          );
    
          if (assistantMessageIndex !== -1) {
            const updatedMessages = [...prevMessages];
            updatedMessages[assistantMessageIndex].content = accumulatedResponse; // Update with accumulated response
            return updatedMessages;
          }
          return prevMessages;
        });
      },
      fileInfo || undefined,
      params.chatId
    );
    
  } catch (error) {
    console.error('Error processing query:', error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'An error occurred while processing your request';

    const updatedMessages = [
      ...messagesWithUserChat,
      {
        content: errorMessage,
        role: MessageTypeEnum.ASSISTANT,
      },
    ];
    setMessages(updatedMessages);
    console.log("Error message added to the conversation:", errorMessage);
  } finally {
    setResponding(false);
    setFileInfo(null);
    setUrl('');
  }
};







  
  
  const sendMessage = async (e?: FormEvent) => {
    if (e) {
      e.preventDefault()
    }
    if (!message) return

    await openAiCall()
  }

  const handleRegenerate = async () => {
    await openAiCall(lastUserMessage)
  }

  const initiateChat = async () => {
    if (params.chatType === 'contract-insight' || params.chatType === 'crypto-buzz' ) setLocked(true)
    if (params.chatId === 'newChat') {
      const id = uuidv4()
      router.replace(
        searchParams.prompt
          ? `/CG-AI/chat/${params.chatType}/${id}?tab=${
              searchParams.tab ? searchParams.tab : 'beginner'
            }&prompt=${searchParams.prompt}`
          : `/CG-AI/chat/${params.chatType}/${id}?tab=${
              searchParams.tab ? searchParams.tab : 'beginner'
            }`
      )
    } else {
      const res = await getUserChatMessages(params.chatId)
      setMessages(res.data.messages ? res.data.messages : [])
    }

    if (searchParams.prompt) {
      setMessage(searchParams.prompt)
      await openAiCall(searchParams.prompt)
      router.replace(
        `/CG-AI/chat/${params.chatType}/${params.chatId}?tab=${searchParams.tab}`
      )
    }
  }

  useEffect(() => {
    if (messages.length > 0) setStarted(true)
  }, [messages])

  useEffect(() => {
    initiateChat()
  }, [])

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles?.[0]) {
      await handleFileSelection(acceptedFiles[0])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    maxSize: 5000000,
    multiple: false,
  })

  return (
    <div className="fixedHeightMob relative flex w-full flex-col overflow-hidden">
      <ChatboxHeader
        chatId={params.chatId}
        searchtab={searchParams.tab}
        chatType={params.chatType}
        started={started}
      />

      <div className="relative z-0 flex h-full flex-col justify-between gap-4 overflow-hidden px-4 pb-10 md:pb-8">
        <Chat
          openAiCall={openAiCall}
          chatId={params.chatId}
          searchtab={searchParams.tab}
          chatType={params.chatType}
          started={started}
          messages={messages}
          handleRegenerate={handleRegenerate}
          setLastUserMessage={setLastUserMessage}
          responding={responding}
        />
        <div className="relative flex w-full flex-grow flex-col items-center justify-end">
          <form
            onSubmit={sendMessage}
            className="flex w-full items-center justify-between rounded-lg bg-themeNavBlack p-4"
          >
            <div
              {...getRootProps({ className: 'dropzone' })}
              className="w-full space-y-4"
            >
              {!isDragActive ? (
                <div className="flex w-full flex-grow flex-col gap-8">
                  <input
                    type="text"
                    className="w-full border-none bg-inherit outline-none"
                    placeholder="Message CG AI"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              ) : (
                <></>
              )}

              {isDragActive ? (
                <div className="w-[90%] rounded-lg border border-dashed border-themeBorderBlue p-2">
                  <p>Drop the file here ...</p>
                </div>
              ) : (
                <>
                  {url && (
                    <div className="relative z-0 aspect-video w-full md:max-w-[200px]">
                      <button
                        type="button"
                        className="absolute -right-3 -top-3 z-50 cursor-pointer text-2xl text-red-500 hover:text-red-600"
                        onClick={(e) => {
                          e.stopPropagation()
                          setUrl('')
                          setFileInfo(null)
                        }}
                      >
                        <RiCloseCircleFill />
                      </button>
                      <Image src={url} fill alt="" className="object-cover" />
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="flex items-center gap-4">
              {params.chatType === 'chat-genius' || 'trade-analyzer' ? (
                <>
                  <button
                    disabled={imageUploading}
                    type="button"
                    onClick={() => imageInputRef.current.click()}
                    className="text-xl text-themeBorderBlue"
                  >
                    {imageUploading ? (
                      <CgSpinner className="animate-spin" />
                    ) : (
                      <FaPaperclip />
                    )}
                  </button>
                  <input
                    ref={imageInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    className="absolute z-0 h-0 w-0 opacity-0"
                  />
                </>
              ) : (
                <></>
              )}
              <button
                disabled={responding}
                type="submit"
                className="text-2xl text-themeBorderBlue"
              >
                {responding ? (
                  <CgSpinner className="animate-spin" />
                ) : (
                  <LuPlay />
                )}
              </button>
            </div>
          </form>
          <div className="mt-2 text-center text-xs text-white/40 md:text-sm">
            CG AI may display inaccurate info and it may take 30-40 seconds to
            respond since it is in Beta, including data, so double-check its
            responses.{' '}
            <Link href="/help/privacy-policy" className="underline">
              Your privacy and CG AI.
            </Link>
          </div>
        </div>
      </div>
      {locked && (
        <div className="absolute z-1 flex h-full w-full items-center justify-center backdrop-blur">
          <div className="flex aspect-square w-full max-w-[600px] flex-col items-center justify-center rounded-xl p-4 backdrop-blur md:bg-themeBgBlack/60">
            <div className="relative flex h-full w-full flex-col items-center justify-center bg-white/5">
              <div className="relative top-[15%] flex w-fit flex-col items-center justify-center gap-2">
                <span className={'mb-8 text-2xl font-bold'}>
                  Coming Soon...
                </span>
              </div>
              <Image
                src="/CgAi/ChatAi/locked.svg"
                width={673}
                height={277}
                alt=""
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
